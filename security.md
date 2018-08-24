---
layout: default
title: Security
permalink: /security/
description: mLab security includes custom firewalls, two-factor authentication and other features to protect your deployment and databases.
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:                   https://mlab.com/login
[docs-api-auth]:                /data-api/#authentication
[docs-dbusers]:                 /connecting/#authentication
[docs-contacts]:                /accounts/#account-contacts
[docs-pe]:                      /private-environments
[docs-require-s3-encryption]:   /secure-S3-bucket/#require-encryption
[docs-rnr]:                     {{ site.url }}/ops/#rolling-node-replacement
[docs-mongodb-ssl]:             /ssl-db-connections/
[docs-snapshot-storage]: 		/backups/#snapshot-storage
[goog-auth]:                    https://support.google.com/accounts/answer/1066447?hl=en
[win-auth]:                     https://www.microsoft.com/en-us/store/p/microsoft-authenticator/9nblgggzmcj6
[wiki-cidr]:                    http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing
[aws-security]:                 http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html#security-group-rules
[aws-SSE-S3]:                   http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[aws-ebs-encryption]:           http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html
[gcp-encryption-at-rest]:       https://cloud.google.com/security/encryption-at-rest/
[herk-aws]:                     https://devcenter.heroku.com/changelog-items/353
[india-registry]:               http://ndnc.in/start-calls
[minc-scram]:                   http://docs.mongodb.com/{{ page.minc-docversion }}/core/security-scram/
[heroku-vpc-peering]:			https://devcenter.heroku.com/articles/mongolab#peering-your-heroku-private-space-with-a-mlab-private-environment

{% comment %} IMAGE LINKS {% endcomment %} 
[img-firewallip]:      /assets/screenshot-firewallip.png
[img-firewallsg]:      /assets/screenshot-firewallsg.png
[img-firewallcopy]:    /assets/screenshot-firewallcopyrules.png
[img-firewalltab]:     /assets/screenshot-firewalltab.png
[img-accountsecurity]: /assets/screenshot-accountsecurity.png
[img-encryptdisks]:    /assets/screenshot-encryptdisks.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Overview 
{:.no_toc}

mLab takes the security of mLab accounts and deployments seriously and is continuously working to provide features and tools that increase the safety of your account and data. 

## Database and network security

Securely accessing and communicating with an mLab database involves not just having the proper credentials but proper placement of all entities that connect to your database. Custom firewall rules can also be configured for select deployments, limiting the ability of non-trusted entities to gain access to your database.

### Database authentication {#database-authentication}

All mLab database servers are run in “auth mode” (mongod run with the --auth flag). Before the database can be accessed, you will need to [create a database user and password][docs-dbusers] in order to authenticate against the database. 

Deployments running with MongoDB release version 3.0 and above are using Salted Challenge Response Authentication Mechanism or SCRAM as their authentication mechanism (see [MongoDB's documentation on SCRAM-SHA-1][minc-scram]). 

### Securing communications to your database {#network}

You should always try to place your application infrastructure and your database in the same local network (i.e., datacenter/cloud region), as it will be the most secure method of deployment and will minimize latency between your application and database.

When you connect to your mLab database from within the same datacenter/region, you communicate over your cloud hosting provider’s internal network. All of our cloud hosting providers provide a good deal of network security infrastructure to isolate tenants. The hypervisors used do not allow VMs to read network traffic addressed to other VMs and therefore no other tenant can “sniff” your traffic.

However, when you connect to your mLab database from a different datacenter/region, your communications are less secure. While your database does require username/password authentication (with credentials that are always encrypted on the network), the rest of your data is transmitted unencrypted over the open internet. As such you are potentially vulnerable to others “sniffing” your traffic.

#### Using MongoDB with SSL connections 
{:.no_toc}

*Available for Dedicated plans only*

To further secure communications to your database, mLab offers [SSL for MongoDB connections][docs-mongodb-ssl] on Dedicated plans. Even when using SSL, we still recommend placing your application infrastructure and your database in the same datacenter/region to minimize latency and add another layer of security.

### Configuring custom firewalls {#custom-firewalls}

*Available for Dedicated plans only*  

Dedicated plans offer the ability for you to define custom firewall rules so that your database only allows network access from your application infrastructure. Access can be limited to specific IP address ranges and/or to Amazon EC2 Security Groups *(AWS only)*.

#### Whitelisting IP addresses 
{:.no_toc}

mLab can configure your firewall to limit access to only the IP address(es) (or address ranges) you specify. We use CIDR rules to define the allowable address(es) and secure access to your mLab-hosted Dedicated plan databases. 

Follow these instructions to add an IP address: 

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the MongoDB deployment that you wish to secure.
1. Click the “Networking” tab.
1. Click the "Add IP rule(s)" button.
1. Enter the IP address and an optional description for the rule. 
![img-firewallip][img-firewallip]{:.narrow}
1. Click the "Add" button.

#### Whitelisting Amazon EC2 Security Groups *(AWS only)* 
{:.no_toc}

{:.note-box}
<div markdown="1">
If you're interested in AWS VPC Peering, please visit our documentation on our [Private Environments][docs-pe] feature.
</div>
{:.note-box}

If your Dedicated plan deployment is hosted in AWS, you may also allow access to a [Security Group][aws-security]. If your deployment is in EC2-Classic, note that the Security Group that you allow must also be in EC2-Classic. If your deployment is in EC2-VPC, note that the Security Group that you allow must be in peered VPC.

To control access to your mLab-hosted database using your EC2 Security Group, you'll need to provide your AWS account ID (a 12-digit number) and Security Group ID (begins with "sg-").

Follow these instructions to add a Security Group:

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the MongoDB deployment that you wish to secure.
1. Click the “Networking” tab.
1. Click the "Add Security Group rule" button.
1. Enter your AWS account ID, Security Group ID and an optional description. 
1. Click the "Add" button.

{:.note-box}
<div markdown="1">
Are you using Heroku Private Spaces? If so, you'll be able to whitelist and/or set up [VPC Peering between your Heroku Private Space and your mLab Environment][heroku-vpc-peering].
</div>
{:.note-box}

#### Copying rules from another deployment 
{:.no_toc}

For convenience, you can use the "Copy existing rules" button to copy rules already added to another deployment in your mLab account. This saves you the effort of having to add each rule and/or Security Group one by one for all the deployments in your account.

![img-firewallcopy][img-firewallcopy]{:.narrow}

## Data security: Encryption at Rest {#encryption-at-rest}

{:.note-box}
<div markdown="1">
The content contained herein is correct for deployments __created on or after February 2, 2017__. mLab's security policies and systems may change going forward, as we continually improve protection for our customers and their data.
</div>
{:.note-box}

### Data disk encryption
{:.no_toc}

#### AWS
{:.no_toc}

On AWS, mLab offers the option to use [Amazon EBS encryption][aws-ebs-encryption] on EBS-backed Dedicated plans (i.e., Standard and High Storage lines). High Performance line plans using local SSDs do __not__ support encryption at rest.

For a new deployment, you must select the "Data Disk Encryption" option in the "Security Options" form to enable this feature.
 
For an existing deployment, follow the steps below but before you start, you may want to first read about mLab's [rolling node replacement process][docs-rnr] which is the process we will use to encrypt your disks:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment whose disks you want to encrypt.
1. Click the “Tools” tab.
1. Under the “Initiate maintenance operation” header, select the “Encrypt disks” option.
1. Select a failover option in the “Failover Preference” section.
1. Click the “Encrypt disks” button and confirm that you want to proceed. This will automatically initiate a rolling node replacement to encrypt your disks.
  - If you choose the "Manual Failover" option, you will need to check email for maintenance updates after the operation starts which will indicate when to perform the failover. The emails will be sent to the user that initiated the request as well as the [Technical Contact][docs-contacts] specified for your mLab account.

To check that your deployment's disks are encrypted, expand the deployment's description on the mLab management portal Home page. In the set of details that appears, you will see "(encrypted)" at the end of the disk description.

![img-encryptdisks][img-encryptdisks]

#### Azure
{:.no_toc}

On Dedicated plans running in mLab's newer Azure offering, Azure 2, the disks are always encrypted. At this time, mLab's other plans on Azure do not support encryption at rest.

#### Google Cloud Platform
{:.no_toc}

On Google Cloud Platform, data is [always stored encrypted at rest][gcp-encryption-at-rest].

### Backup encryption
{:.no_toc}

#### Backups
{:.no_toc}

When using mongodump:

* Backups uploaded to mLab-owned containers are encrypted at rest by default.
* Backups uploaded to Custom Amazon S3 bucket can be encrypted if [server-side encryption with Amazon S3-managed encryption keys (SSE-S3)][aws-SSE-S3] has been enabled. You can also choose to [require server-side encryption for all objects uploaded to your S3 bucket][docs-require-s3-encryption].

When using block storage snapshot:

* Block storage snapshots will be encrypted if the volume from which the snapshot was taken was encrypted.
* On AWS, this means that encrypted EBS volumes will have encrypted EBS Snapshots.
    * Note that if your deployment has [encrypted data disks](#encryption-at-rest), EBS Snapshots of those disks cannot be shared with another AWS account.
* On Google Cloud Platform, block storage snapshots are always encrypted.

#### Restore considerations
{:.no_toc}

For restores of backups taken using mongodump, whether the target for the restore is encrypted depends on whether the target has disk encryption enabled.

For restores of backups taken using block storage snapshots, the target of the restore will be encrypted if the volume from which the snapshot was taken was encrypted.

## Web management portal security {#portal-security}

The [mLab management portal][mlab-login] is run entirely over HTTPS.

### Account-level security settings {#account-security-settings}

The mLab management portal offers a number of security-related settings that determine what users can or cannot do in terms of securing their user profiles and other mLab features. In this section we provide instructions on how to set these global security options as well as an explanation for each of the available options. 

#### Adjusting the account-level security settings
{:.no_toc}
 
The Admin User of an account is the only user who can adjust the account-level security settings. All users on the account, including the Admin User, are subject to these settings. 

To adjust the account-level security settings, the Admin User can follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page. 
1. Click the "Security" tab to display the Security Settings page.
1. Make changes to each of the available options as desired.
1. Click the "Save changes" button to save any updates.

![img-accountsecurity][img-accountsecurity]

#### Account-level security settings explained
{:.no_toc}

__Two-factor authentication__


- This feature is available only for accounts created via mlab.com. 
- `Optional` means that each user in the account has the choice whether or not to [set up and use 2FA](#two-factor-authentication). This is the default option when an mLab account is first created.
- `Required` means that all users on the account are required to [set up and use 2FA](#two-factor-authentication).

__Username recovery__

- `Enabled` means that the username reminder email will include the username for the user on this account, along with any other usernames associated with the email address from other accounts. This is the default option when an mLab account is first created.
- `Disabled` means that the username reminder email will not include the username associated with the email address for this account (but will list usernames of any other accounts associated with the email address provided they are not also disabled). 

__Password reset__

- `Enabled` means that all users on the account will have the ability to reset the password for their user on this account. This is the default option when an mLab account is first created.
- `Disabled` means that users on the account will not have the ability to reset the password for their user on this account. Even if the user enters a valid username into the password reset form, an email containing a link to reset the password will not be sent.

__Data API access__

- `Enabled` means that all users on the account will have the ability to [enable or disable Data API access][docs-api-auth]. This is the default option when an mLab account is first created.
- `Disabled` means that none of the users on the account will have the ability to [enable Data API access][docs-api-auth]. 





### Two-factor authentication {#two-factor-authentication}

*Available only for accounts created via mlab.com*  

Two-factor authentication provides an extra layer of security for your mLab account and can be enabled on a per-user basis. Each account user who has activated the feature will be prompted for more than just a password when logging in to mlab.com. A second piece of information is also required (hence, *two*-factor) which in mLab's case is an authentication code that can be retrieved from an application that the user installs on a mobile phone or device. Requiring two separate pieces of information (a password and an authentication code) helps protect your mLab account from unauthorized access.

Even though it is an optional feature, we strongly recommend that you enable it for your mLab account.

#### Enable two-factor authentication {#enable-2FA} 
{:.no_toc}

Before you follow the instructions below, if you do not already have an authenticator application installed on your mobile phone/device, you will need to install one. Any application that supports the Time-based One-Time Password (TOTP) protocol should work, for example the [Google Authenticator][goog-auth] which works on iOS, Android, and Blackberry devices or [Authenticator for Windows Phone 7][win-auth] which works for Windows Phone devices.

1. [Log in][mlab-login] to the mLab management portal. 
1. Click your username (not the account name) in the upper right-hand corner to open your account user profile. 
1. In the section titled "Two-Factor Authentication", follow the instructions to activate this setting.
1. Check your inbox to confirm you have received an email reporting successful enablement of two-factor authentication.
1. Set up a [fallback SMS number](#fallback-number) (required for Admin Users, optional for non-admin users).

{:.warning-box}
<div markdown="1">
It is important to keep your fallback SMS number up-to-date. Without a valid and accessible fallback number, then you will __permanently lose the ability to access your mLab account__ if your authenticator application is also deleted, lost, or stolen. You would then need to manually migrate your data to a new account which will probably entail significant downtime for your application. 
</div>
{:.warning-box}


#### Fallback SMS number {#fallback-number}
{:.no_toc}

If you do not have access to your authenticator application, a fallback SMS number is a secondary mechanism by which mLab can deliver the authentication code to you. This feature is mandatory for Admin Users who have enabled two-factor authentication for their user login. For non-admin users, this is an *optional though strongly recommended* feature. 

To use this feature, add your fallback SMS number to your account profile, as part of the [two-factor authentication setup process](#enable-2FA). If you set the fallback SMS number correctly, you will receive an SMS message confirming that the number has been configured as your fallback number. If you do not receive the confirmation message, this means that you will not receive a code via SMS.

{:.note-box}
<div markdown="1">
For international numbers, please be sure to include your country code up front. For example, if your country code is 55, you would set the fallback SMS number as `+551155256325`.
</div>
{:.note-box}

Once your fallback SMS number is set up and confirmed, you can request an authentication code at any time by clicking the "Send the code via SMS" link that appears on the screen where you would typically enter your authentication code.


## API security {#api}

Connecting to your database via our API is secured via HTTPS and an API key. 

Be sure to read [this section on API authentication][docs-api-auth] to learn more about security as it relates to mLab's RESTful Data API.
