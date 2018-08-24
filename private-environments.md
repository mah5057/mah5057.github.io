---
layout: default
title: mLab Private Environments (VPC)
permalink: /private-environments/
description: Securing your MongoDB deployment with mLab Private Environments (AWS VPC Peering)
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-rs-conn]:            /connecting/#replica-set-connections
[aws-accountid]:           http://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
[aws-classiclink]:         https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/vpc-classiclink.html
[aws-describevpc]:         http://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/ApiReference-cmd-DescribeVpcs.html
[aws-vpcconsole]:          http://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/working-with-vpc-peering.html#accept-vpc-peering-connection
[aws-updatingrt]:          https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html#AddRemoveRoutes
[aws-global-infra]:        https://aws.amazon.com/about-aws/global-infrastructure/
[aws-ec2-pricing]:         https://aws.amazon.com/ec2/pricing/on-demand/
[docs-rnr]:                /ops/#rolling-node-replacement
[docs-createdeployment]:   /subscriptions/#create-deployment
[mlab-login]:              https://mlab.com/login
[docs-connectionstring]:   /connecting/#connect-string
[wiki-cidr]:               https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing
[ietf-rfc1918]:            https://tools.ietf.org/html/rfc1918
[docs-two-azs]:            /plans/#two-az-regions-faq

{% comment %} IMAGE LINKS {% endcomment %} 
[img-peering-success]:              /assets/screenshot-peering-success.png
[img-private-environments]:         /assets/img-private-environments.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview
{:.no_toc}

*Available for Dedicated plans on AWS only*

An mLab Private Environment is a dedicated, software-defined network into which you can provision multiple mLab-hosted MongoDB deployments. Using a Private Environment allows you to limit communication between your application and your database to private networks.

When you provision a Private Environment with mLab on AWS, we provision a VPC dedicated to your deployment(s) in mLab's AWS account(s). You can then have any number of mLab-hosted MongoDB deployments inside of that Private Environment. 

Once the Private Environment has been provisioned, you can peer the VPC backing it to the AWS VPC that houses your application infrastructure. This peering operation will create a single, extended, private network consisting of both your application infrastructure and your database deployments.

![img-private-environments][img-private-environments]

Once peered, you can conveniently and scalably design network routing and firewall rules to allow access to your database deployment from only the parts of your application infrastructure that need it. 


## Managing Private Environments {#manage-private-environments}

Users can create and manage one or more Private Environments through the mLab management portal. 

### Creating a Private Environment {#create-private-environment}

To create a new Private Environment, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, click “Create new” under the “Private Environments” section.
1. You will be prompted for a name, cloud region, and [IP address space](#choose-ip-address-space).
    - We recommend naming your Private Environment based on what applications or phase of development it will serve (e.g., Production, Staging, or Test). This name can be changed at any time.
    - The region must be the same as the VPC you are planning to peer with.
1. Review your choices and when you’re ready, click the “Create new" button. Your new Private Environment will then be listed on your account’s Home page.
1. Once the Private Environment has been provisioned, you will be able to navigate to its home (administrative) page.

#### Choosing an IP address space {#choose-ip-address-space}
{:.no_toc}

When creating a Private Environment, you will be prompted to supply an IP address space. This is the set of IPs from which all private IPs used in the Private Environment will be drawn. 

{:.note-box}
<div markdown="1">
It will be possible to change your Environment's IP address space in the future by using our seamless [rolling node replacement][docs-rnr] process.  That said, if you plan to VPC peer in the forseeable future, we recommend reviewing the IP address spaces used by your application servers and other products and services to look for potential routing conflicts so as to avoid the need for future maintenance.
</div>
{:.note-box}

##### IP address space rules 
{:.no_toc}

The IP address space that you supply when creating your mLab Private Environment must conform to the following rules:

**(1) It MUST use IPv4 addresses exclusively**

IPv4 addresses are 32 bits in size and commonly expressed as four octets written in decimal notation with values between 0 and 255 and dots ('.') in between octets, e.g. "192.168.0.1".

IPv6 addresses are not supported for use in the address space for Private Environments.

**(2) It MUST be expressed as a /16 IPv4 CIDR block**

You must supply a /16 [CIDR][wiki-cidr] block, which is an IP address range that consists of 65,536 IP addresses (2^16 IPs). If, for example, you choose 172.21.0.0/16 for your IP address space, the private IPs of your mLab-hosted deployments in this Private Environment would then range from 172.21.0.0 to 172.21.255.255.

**(3) It MUST be a private address space**

The address space must be a subspace of the [RFC 1918][ietf-rfc1918] IPv4 private address space. Specifically:

* 10.0.0.0/8
* 172.16.0.0/12
* 192.168.0.0/16

**(4) It MUST NOT overlap with the IP address space of any VPC with which you plan to peer your mLab-hosted VPC**

The IP address space that you supply must not overlap with the IP address space of any of your app's VPCs that you want to or could potentially want to peer with.

For example, let's say there are two VPCs that you plan to peer with:

* App VPC #1 uses an IP address space of 10.0.0.0/16
* App VPC #2 uses an IP address space of 172.19.1.0/24

You would want to:

* Avoid supplying an IP address space of 10.0.0.0/16 since it would match the IP address space of App VPC #1 exactly
* Avoid supplying an IP address space of 172.19.0.0/16 since the IP address space of App VPC #2 would be within this space

**(5) It MUST NOT create routing conflicts with transitive networks**

The IP address space that you supply should not overlap with the IP address space of any VPC or other private network to which your peered VPC(s) can route. This includes, for example, Docker containers and networks routable via a VPN.

If you do choose to overlap the IP address space with any transitive network, this must not create routing conflicts.

For example, let's say you were using the following network toplogy:

* App VPC #1 uses 10.0.0.0/16
    * Peered with mLab Private Environment
* App VPC #2 uses 10.1.0.0/16
    * Not peered with mLab Private Environment
    * Peered with App VPC #1 therefore is part of transitive network topology

You would want to:

* Avoid using 10.0.0.0/16 because it violates rule (4) above
* Either:
    * Avoid using 10.1.0.0/16 OR
    * Somehow ensure no subnet in App VPC #1 ever needs to use the same IP in both App VPC #2 and your Private Environment
    
Other examples of possible transitive networks:

   * Corporate VPN
   * [EC2 ClassicLink][aws-classiclink] uses 10.0.0.0/16 and 10.1.0.0/16

#### IP address space tips
{:.no_toc}

Avoid these IP address spaces unless you know what you're doing:

- 10.0.0.0/16 - heavily used
- 192.168.0.0/16 - heavily used
- 172.16.0.0/16 - heavily used
- 172.17.0.0/16 - Docker's default

These IP address spaces are not as popular and are the least likely to
cause collision:

- 172.19.0.0/16, 172.21.0.0/16, 172.23.0.0/16, 172.25.0.0/16, 172.27.0.0/16, 172.29.0.0/16

### Peering a Private Environment {#peering}

To create a new peering connection between your application’s VPC and your mLab Private Environment, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, navigate to the Private Environment that you would like to create a peering connection with.
1. Click the “Peerings” tab.
1. Click the “Add peering connection” button.
1. In the form that appears, provide your [AWS account ID][aws-accountid] and VPC ID.
    - This VPC's region must be the same as your mLab Private Environment's region.
1. Click “Start peering process” to initiate the peering request.
1. Accept the peering connection from mLab via the [AWS console][aws-vpcconsole].
    - You'll need to first log in to your AWS account.
    - Navigate to the correct region and the "VPC Dashboard".
    - Under the "Peering Connections" section, select the peering connection and "Accept Request".
1. When the peering connection is complete, you will see “active” for peering connection STATUS.
    - Note that this change can take a few minutes to propagate to mLab's management console.
![img-peering-success]
1. Add this peering connection to each route table that your app uses.
  - For help with this, see the question about [updating route tables](#updating-route-tables) in our FAQ section below.

You have now successfully peered your application's VPC to the mLab-hosted VPC. In order to actually connect to your database, you'll still need to open up your mLab-hosted deployment's firewall to your VPC by [adding inbound allow rules](#firewall-rules) which whitelist an IP address range or Security Group within your VPC.

### Deleting a Private Environment {#delete-private-environment}

To delete your Private Environment, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, navigate to the Private Environment that you would like to delete.
1. Click the “Delete environment” button.
1. Click the “Delete” button.

## Managing deployments within Private Environments {#managing-deployments}

### Creating a new deployment {#create-deployment}

You can place a new deployment in a Private Environment by selecting a specific Private Environment during the [deployment creation process][docs-createdeployment]. 

When provisioning into a Private Environment, you can provision into either the Public or Private network access mode directly. Documentation about [network access modes and how to manage them](#network-access-modes) follows in a section below.

### Migrating an existing deployment from EC2-Classic {#migrate-deployment}

{:.note-box}
<div markdown="1">
You should *not* set up VPC Peering before you migrate your deployment to Private Environment as we will leave your deployment in Public network access mode initially.  VPC Peering can be done after the migration whenever you are ready.
</div>
{:.note-box}

We can seamlessly migrate the data-bearing nodes of any existing Dedicated Cluster deployment into a Private Environment using our [rolling node replacement process][docs-rnr]. This is the same process that we use for plan upgrades/downgrades and compactions which allows you to maintain high availability and requires no changes to connection string(s).

To migrate an existing deployment to a Private Environment, follow these steps:

1. [Log in][mlab-login] to the mLab management portal.
1. Navigate to the MongoDB deployment that you want migrated to a Private Environment.
1. On the “Networking” tab, validate that you can proceed:
  - Ensure you have under 25 inbound allow rules.
  - Ensure that you do not have any inbound allow rules from `10.0.0.0/8` (EC2-Classic) or EC2-Classic Security Groups.
  - Contact support@mlab.com if you could use assistance.
1. On the “Tools” tab, under the "Initiate maintenance operation" header, select the "Migrate to a Private Environment (EC2-VPC)" option.
1. In the options that follow, first select the desired Private Environment.
  - You can choose an existing Private Environment already created for your mLab account (they will be listed here by name) OR
  - You can create a new one.  If you are not planning to VPC peer in the forseeable future, you can use a default IP address range. Otherwise [choose a IP address space](#choose-ip-address-space). We recommend naming your Private Environment based on what applications or phase of development it will serve (e.g., Production, Staging, or Test); this display name can be changed at any time.  
1. Next, choose a failover option.
   - A failover will be required to complete this process. If you are not confident that your clients have been configured with [replica set connections that can handle failover][docs-rs-conn] and/or you'd like to be conservative with this maintenance, we recommend selecting the "Manual Failover" option which is to initiate the failover yourself. This way you can fail back over to your original Primary in case of an unexpected issue. 
1. Click the "Migrate to a Private Environment" button. Once you confirm, the seamless [rolling node replacement][docs-rnr] process will begin.
  - If you have chosen to initiate the failover yourself, you will need to perform the failover before the migration to  a Private Environment can be completed. Check your email (or the Technical Contact's email) for maintenance updates.
1. (Optional) Set up VPC Peering and transition your deployment from the Public network access mode to one of the Private modes
  - Documentation about [network access modes and how to manage them](#network-access-modes) follows in a section below.

### Managing inbound firewall rules {#firewall-rules}

You can specify which IP address ranges or Security Groups within your VPC should have inbound access to your database deployment.

When you add in an additional inbound allow rule, we will make changes to both your firewall and routing rules.

Follow these instructions to allow in an IP address range: 

1. [Log in][mlab-login] to the mLab management portal.
1. Navigate to the MongoDB deployment that you want to configure.
1. Click the “Networking” tab.
1. Click the "Add IP address range rule(s)".
1. Select a Network.
  - When allowing in private IP addresses, select the VPC of the private IP addresses.
  - When allowing public IP addresses, select "Public Internet".
1. Enter the IP address range, expressed as an IPv4 CIDR block and optionally, a description for the rule.
1. Click the "Add" button.
1. Optionally, you can make additional changes to the firewall rules.
1. Click the "Apply security changes" button to apply the firewall rules.
  - If you want to revert back to the firewall rule(s) before the changes, click the "Revert changes" link.

Follow these instructions to allow in a Security Group within your VPC:
1. [Log in][mlab-login] to the mLab management portal.
1. Navigate to the MongoDB deployment that you want to configure.
1. Click the “Networking” tab.
1. Click the "Add Security Group rule".
1. In the "Network" field, select the VPC of the Security Group.
1. Enter the Security Group's ID and optionally, a description for the rule.
1. Click the "Add" button.
1. Optionally, you can make additional changes to the firewall rules.
1. Click the "Apply security changes" button to apply the firewall rules.
  - If you want to revert back to the firewall rule(s) before the changes, click the "Revert changes" link.

#### Copy firewall rules from an existing deployment {#copy-firewall-rules}
{:.no_toc}

For convenience, you can use the “Copy existing rules” button to copy firewall rules from an existing deployment within the same Private Environment as your deployment. This saves you the effort of having to add each firewall rule one by one.

Follow these instructions to copy existing inbound allow rules from an existing deployment:
1. [Log in][mlab-login] to the mLab management portal.
1. Navigate to the MongoDB deployment that you want to configure.
1. Click the “Networking” tab.
1. Click the "Copy existing rules".
1. Select the deployment from which you want to replace the firewall rules with.
1. Click the "Submit" button.
1. Optionally, you can make additional changes to the firewall rules.
1. Click the "Apply security changes" button to apply the firewall rules.
  - If you want to revert back to the firewall rule(s) before the copy, click the "Revert changes" link.

{:.note-box}
<div markdown="1">
We allow a max of 25 CIDR block rules. This is a hard limit which cannot be changed.
</div>
{:.note-box}

### Managing network access modes {#network-access-modes}

{:.note-box}
<div markdown="1">
If your deployment is in an [AWS region with only two Availability Zones][aws-global-infra], it is possible that the arbiter node was originally placed in a different region to increase the likelihood of availabilty.

If this is the case, you will not be able to change your deployment's network access mode from Public mode to one of the Private modes until you contact us at <support@mlab.com> requesting that we move your arbiter into the same Availability Zone as one of your data-bearing nodes. When you do so, be aware of the [downsides of just two Availability Zones][docs-two-azs]. 
</div>
{:.note-box}

You can choose between three different network access modes for your deployments in a Private Environment: Public, Private (Dual Access), and Private. To switch between network access modes:

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the MongoDB deployment that you want to configure.
1. Click the “Networking” tab.

Network access modes determine:

- How a deployment’s DNS is routed, using either a public or private IP address
- Whether a deployment is accessible via its public IP address

#### Public mode
{:.no_toc}

In the Public network access mode, traffic to a deployment via the [standard MongoDB connection string URI][docs-connectionstring] that we publish is routed via the deployment’s public IP addresses.

Note that this mode also allows you to access the deployment via its private IP addresses. Before switching from Public to Private (Dual Access) mode, you should test connecting to your deployment via private IPs.

**Test Private IP access from your VPC before leaving Public mode**

From a machine in your VPC, confirm that you can connect to your deployment by appending "-internal" to the leading part of the DNS address. This address is mapped to the private IP address that the deployment's addresses will be remapped to use when switching to Private mode.

For example, you could test access by connecting via the `mongo` shell to one of the nodes in your deployment. In this example, the address in your connection string is "ds012345-a0.mlab.com:12345" but you would test the "-internal" version of this address.  To get the "-internal" address from the connection string, append "-internal" to the string to the left of the first period.

    % mongo ds012345-a0-internal.mlab.com:12345

If this test fails, review the [troubleshooting section below on peering connection issues](#troubleshooting-peering-connections).  In particular, ensure that you have added the VPC peering connection to your route table(s) and that you've added your application’s VPC to your firewall whitelist (an inbound allow rule to 0.0.0.0/0 over the Public Internet is *not* sufficient).

For SSL-enabled deployments, if you run into trouble with this test please contact <support@mlab.com> for help.

{:.warning-box}
<div markdown="1">
You should *not* change the connection string that your application within your peered VPC is using. The "-internal" address that we have made available is to be used only for testing purposes.
</div>
{:.warning-box}


#### Private (Dual Access) mode 
{:.no_toc}

In the Private (Dual Access) network access mode, traffic to a deployment via [your deployment's published connection URI][docs-connectionstring] using a DNS address (e.g. ds012345-a0.mlab.com) is routed via the deployment’s private IP address. However, this mode still allows you to access the deployment via its public IP address using a single-node (non replica set) connection (see [FAQ below on how to connect from your home and/or office)](#q-how-do-i-connect-to-my-deployment-from-home-andor-office).

Before changing to this mode from Public mode, ensure that you have tested private IP address from your VPC (see instructions above).

#### Private mode 
{:.no_toc}

In the Private network access mode, traffic to a deployment via the [connection URI][docs-connectionstring] using a DNS address, e.g. ds012345-a0.mlab.com, is routed via the deployment’s private IP address. This mode does not allow access to the deployment via its public IP address.

{:.warning-box}
<div markdown="1">
It is common for software components to cache the IP result of DNS name resolutions. If the public IP is cached when you either disallow inbound access from the public internet and/or move to Private mode, your application may encounter errors.

To flush such caches you should restart all processes connecting to your deployment. Doing so will ensure that by the time you transition from Private (Dual Access) mode to Private mode, all of the clients connecting to your deployment are routed using private IPs.
</div>
{:.warning-box}

### Steps to move out of "Public" network access mode {#move-out-of-public-access-mode}

When a deployment is provisioned in a Private Environment, it can be configured to be in "Public" network access mode.  When you are ready to move it to one of the private mode (i.e. "Private (Dual Access)" or "Private") and allow communication between your application and the deployemnt to happen via VPC Peering, there are a few required setups to follow.  The setup steps are:

1. Verify that your application is running within a VPC (i.e. on a EC2-VPC instance type) and is in the same region as your deployment.
2. [Create a new peering connection](#peering) between your application’s VPC and your deployment's Private Environment/VPC.
3. Log into your AWS account to accept the peering connection request.
4. [Add the peering connection to the route table(s)](#updating-route-tables) that your application(s) use.
5. Set up [inbound allow rule(s)](#firewall-rules) to allow private network traffic from your application's VPC to your deployment. 
6. Test that you are able to access the deployment from within your peered VPC using the deployment's "-internal" addresses. See section ["Test Private IP access from your VPC before leaving Public mode"](#public-mode).
7. Once the test in Step #6 passes, [change the network access mode](#network-access-modes) from Public to Private (Dual Access). 

Once you are in "Private (Dual Access)" mode, you may move into "Private" network access mode which will disable all access to the deployment via its public IP address.

If you run into any issues, the following section on how to troubleshoot peering connection issues may help. Contact us anytime at <support@mlab.com> for additional assistance.

## Troubleshooting peering connection issues {#troubleshooting-peering-connections}

If you are having trouble connecting to your database in a Private Environment via a peering connection, please review the following troubleshooting steps.

#### Temporarily return to Public mode if you started having trouble only after switching to a Private mode
{:.no_toc}

If your application was able to connect while your deployment was in Public mode but unable to in one of the Private modes, we highly recommend switching back to Public mode temporarily.

Once you're in Public mode again, be sure to review the "Test Private IP access from your VPC before leaving Public mode" section of the [Public mode](#public-mode) documentation above before trying to switch to  Private (Dual Access) mode.

#### Ensure the peering connection is "active"
{:.no_toc}

Verify that the peering connection between your VPC and the Private Environment's VPC for your deployment is "active."  To do this:

1. Navigate to the Peerings tab for your Private Environment.
1. Make sure the status for your peering connection is "active".
  - If the status is not "active", please review Step 7 from the [Peering a Private Environment](#peering) section above to accept the request to peer connection with mLab.


#### Ensure the peering connection has been added to the route table used by your application
{:.no_toc}

Verify that you have added the peering connection (pcx-xxxxx) to the route table used by your application. See Step 9 from section [Peering a Private Environment](#create-private-environment) above.

#### Ensure that you added your application's VPC to your firewall whitelist
{:.no_toc}

Make sure that you have set up [inbound allow rule(s)](#firewall-rules) to allow private network trafffic from your VPC to your deployment.

If you are still having trouble connecting, and you whitelisted an IP address range to your application's VPC, verify the private IP address of the machine you're connecting from by running the following command on the machine you are trying to connect from.

    % curl http://169.254.169.254/latest/meta-data/local-ipv4

This private IP address should be within an IP address range defined in your deployment's [inbound allow rules](#firewall-rules).

Also, ensure that your database and application are in the same AWS region. Confirm the region of the machine that you're trying to connect from by running:

    % curl http://169.254.169.254/latest/meta-data/placement/availability-zone

If you are still having trouble connecting, and you whitelisted a Security Group in your application's VPC, verify that the machine you're connecting from really is part of the Security Group that you whitelisted.

### Still having problems?
{:.no_toc}

If you’re still having problems connecting, contact us at <support@mlab.com> and be sure to include your deployment's identifier as well as relevant details (output, error messages, etc.) from the troubleshooting steps above.

## Frequently Asked Questions (FAQ) {#faq}

### Q. Can my database run in a Private Environment but still be publicly accessible (i.e., without VPC Peering)?
{:.no_toc}

Yes. To do so, place your deployment in [Public network access mode](#public-mode). Be sure to also configure your database's firewall rules on the "Networking" tab to allow in traffic from the public internet. 

### Q. Do you charge for VPC peering via your Private Environments feature?
{:.no_toc}

We do not charge extra for our Private Environments feature. In other words, if you choose to peer your VPC with your mLab deployment's VPC, there is no additional charge.

### Q. How do I add my peering connection to my route table(s)? {#updating-route-tables}
{:.no_toc}

For more information, read [AWS's documentation on configuring Route Tables][aws-updatingrt].

The "Destination" for the route in AWS's route table should be the Private Environment's IP address range.  You can find this value in the "IP address range" field in the upper left area of your Private Environment page in mLab's mangagement portal (e.g., "172.21.0.0/16").

The "Target" for the route in AWS's route table should be the AWS peering connection ID. You can find this value under the "PEERING CONNECTION" column, in the "Peerings" tab after navigating to your Private Environment page in mLab's management portal (e.g., "pcx-a1b23456").

### Q.  Why can't I configure inbound allow rules from different VPCs with overlapping IP address ranges?
{:.no_toc}

Routers route data based on IP address only; they do not have the context of a target VPC. Therefore, if you were to peer VPCs with overlapping IP addresses, the routing rules from the deployment's perspective would be ambiguous.

As such, you need to configure your peered VPC(s) to avoid overlapping IP address spaces.

### Q. How do I connect to my deployment from home and/or office? 
{:.no_toc}

If you need to access your deployment from outside of your peered VPC(s), your deployment must be in either Public or Private (Dual Access) mode; it cannot be in Private mode.

If you're in the Private (Dual Access) mode you will need to connect using one of the "-external" addresses that we have made available.

For example, let's say you absolutely need to connect from your office with IP address 199.116.71.90 but you still want your app to exlusively use private routing. You would then:

1. Ensure that your deployment is in Private (Dual Access) mode.
1. Add 199.116.71.90/32 as an inbound allow rule. 
1. Connect from your office using the `mongo` shell to one of the nodes in your deployment using an "-external" address. If the address in your connection string is "ds012345-a0.mlab.com:12345", you would append "-external" to the string left of the first period and connect using that "-external" addresss.

         % mongo ds012345-a0-external.mlab.com:12345

{:.note-box}
<div markdown="1">
You will not be able to make a replica set connection to your deployment, only a single-node connection. If you are having trouble connecting using a single-node connection, make sure that your connection string does *not* include the `replicaSet` parameter.
</div>
{:.note-box}

### Q. Will connecting via a peering connection reduce latency or reduce data transfer costs?
{:.no_toc}

No. In general, connecting via a peering connection strengthens security but it does not reduce latency or reduce costs. More details:

* If your application is already connecting from within the same AWS region as your mLab deployment via the public internet, connecting via a peering connection should not reduce latency between your application and the deployment. 

* AWS charges the same amount for data transfer regardless of whether you're connecting to public IP addresses or to private IP addresses (via peering connection to peered VPC).

The following excerpts taken from the "Data Transfer" section of [Amazon's EC2 Pricing][aws-ec2-pricing] page are applicable.

Data Transfer | Pricing[^foot-text]
--------------|--------
Data transferred "in" to and "out" from Amazon EC2... across Availability Zones or VPC Peering connections in the same AWS Region | $0.01 per GB
--------------|--------
IPv4: Data transferred “in” to and “out” from public or Elastic IPv4 address | $0.01 per GB
--------------|--------
Data transferred between Amazon EC2... in the same Availability Zone is free. See above when transferring data using VPC peering | free


{:.note-box}
<div markdown="1">
Data transfer costs are included with every mLab plan.  In other words, mLab does not charge extra for the data transfer costs that mLab incurs in mLab's AWS account.  
</div>
{:.note-box}

[^foot-text]: EC2 prices on July 2018 for US East (N. Virginia)



