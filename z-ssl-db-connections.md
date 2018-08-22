---
layout: default-nosearch
title: SSL for MongoDB Connections
permalink: /ssl-db-connections/
description: Securing communications to your MongoDB database with SSL
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[minc-sslclient]:         https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/configure-ssl-clients/
[minc-sslmodes]:          https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongod/#cmdoption--sslMode
[minc-netsslmode]:        https://docs.mongodb.com/{{ page.minc-docversion }}/reference/configuration-options/#net.ssl.mode
[minc-x509clientauth]:    https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/configure-x509-client-authentication/
[minc-connectionstring]:  https://docs.mongodb.com/{{ page.minc-docversion }}/reference/connection-string/
[digicert]:               https://www.digicert.com
[digicert-rootcerts]:     https://www.digicert.com/digicert-root-certificates.htm
[wikihow-lookupip]:       http://www.wikihow.com/Find-a-Website%27s-IP-Address
[mlab-login]:             https://mlab.com/login
[docs-create-deployment]:         /subscriptions/#create-deployment
[docs-changeversions]:    /ops/#change-version
[docs-languages]:         /languages/
[docs-connectionstring]:  /connecting/#connect-string
[docs-rnr]:               {{ site.url }}/ops/#rolling-node-replacement

{% comment %} IMAGE LINKS {% endcomment %}
[img-wizard-ssl-option]:    /assets/screenshot-wizard-ssl-option.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Overview {#overview}

mLab offers SSL support for MongoDB connections as a free option on all Dedicated plans. Enabling SSL adds another level of security for communication between the application and database, allowing clients to open encrypted connections to the database servers and then verify the identity of those servers before sending any sensitive information.

Even when using SSL to secure your connections to MongoDB, we still recommend placing your application infrastructure and your database in the same datacenter/cloud region, to minimize network latency and take advantage of the network security features offered by the cloud provider.


## How to enable/disable SSL {#configuring-ssl}

*Available for Dedicated plans only*

Whether creating a new deployment or upgrading an existing deployment, you can enable SSL support for MongoDB connections directly from mLab's management portal.

### Enabling SSL when creating a new deployment {#create-new-with-ssl}

While you are [creating a new deployment][docs-create-deployment] in mLab's management portal, you can enable SSL by toggling the SSL switch in the "Security Options" page of mLab's create deployment wizard.

![img-wizard-ssl-option][img-wizard-ssl-option]

Once SSL is enabled, MongoDB client driver configuration can be set up to [connect over SSL](#connecting-over-ssl).

### Upgrading an existing deployment to enable SSL {#enabling-ssl}

If you have an existing deployment, you can enable SSL from the Tools tab for that deployment. The option will only appear if the deployment is subscribed to a Dedicated plan.

When you're ready to enable SSL, follow these steps:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, navigate to the deployment that will be modified.
1. Click the “Tools” tab.
1. Under the "Initiate maintenance operation" header, select the "Enable SSL" option.
1. Click the “Enable SSL” button and confirm that you want to proceed. This will initiate the process of enabling SSL on your deployment.
1. Wait for the process to complete.
1. Update your driver configuration to [connect over SSL](#connecting-over-ssl), keeping in mind that the DNS names in your connection string have likely been changed.

The upgrade process will require a replica set reconfiguration to move the deployment into the target [SSL domain](#ssl-domain) followed by two rolling restarts of the entire deployment to step through the [MongoDB SSL modes][minc-sslmodes] from *disabled* to *allowSSL* and finally *preferSSL*. While a well-configured client will handle this operation gracefully, we recommend scheduling the upgrade for a time when you can monitor your application in case of any unexpected issues.

Enabling SSL is likely to change the DNS names of the servers in your deployment which, in turn, will cause your connection string to change. We will leave the old DNS names bound for a period of time to give you time to transition. However, the certificates used to establish SSL connections will use the new DNS names, so clients attempting to connect using SSL will need to use the new connection string.

{:.warning-box}
<div markdown="1">
After enabling SSL, the old connection string will work only until we have to perform certain maintenance operations (e.g., a plan change) that require a [rolling node replacement][docs-rnr]. Therefore, ALL clients attempting to connect---whether or not they are connecting using SSL---will need to use the new connection string.
</div>
{:.warning-box}

### Disabling SSL for a deployment {#disabling-ssl}

When you need to disable SSL, follow these steps:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, navigate to the deployment that will be modified.
1. Click the “Tools” tab.
1. Under the "Initiate maintenance operation" header, select the "Disable SSL" option.
1. Click the “Disable SSL” button and confirm that you want to proceed.
1. Wait for the rolling restart process to complete (see explanation below).
1. Update your application to remove the SSL option in the connection string (e.g. remove `ssl=true`).

Disabling SSL will prompt a rolling restart of each process in this deployment to change [MongoDB SSL modes][minc-sslmodes] (from *preferSSL* to *disabled*). Restarting your primary will require two failovers and the original primary node will be reinstated as primary upon completion.

## How to connect over SSL {#connecting-over-ssl}

To be sure you are taking full advantage of SSL for MongoDB connections, it is important to correctly configure your driver and verify that it is connecting securely. In particular, you want to be confident that SSL is being used and that the server is being authenticated using the certificate it presents.

### Configuring your driver to use SSL securely {#securing-your-driver}

The latest version of most drivers will create secure SSL connections using browser-like server authentication if you specify `ssl=true` as an option in the [connection string URI][minc-connectionstring]. However, some drivers require additional options to connect securely. For example, some older driver versions need to have host name validation enabled or need to be provided an explicit list of trusted certificates.

MongoDB, Inc. provides some [driver-specific documentation about connecting using SSL][minc-sslclient]. Of course, you should consult your driver’s documentation for more information.

{:.note-box}
<div markdown="1">
Eventually, we will be publishing in the [Language Center][docs-languages] examples of how to securely connect to your SSL-enabled mLab deployment using each of the drivers our customers use most often. Keep an eye out there for an example in your driver of choice.
</div>
{:.note-box}


### Verifying the security of your SSL connection {#driver-configuration-testing}

While it can be complicated and time consuming to test all the security features of SSL, there is a simple test we recommend to cover the most common cases of misconfiguration. Simply try connecting with two different connection strings (with placeholders filled in, of course):

1. Your normal connection string [as shown in the mLab management portal][docs-connectionstring]
1. The same connection with each host name replaced by [its current IP address][wikihow-lookupip]

If connecting with host names succeeds but connecting with IPs fails with an SSL validation error, you can be confident that your driver is connecting over SSL, requesting a certificate from the server, and checking the host name against the certificate presented.

A successful result does not mean that every possible authentication test is being performed, but in our experience host name verification is the test most often skipped, so it is a good litmus test to use.

{:.note-box}
<div markdown="1">
Use of IPs in connection strings is not supported in permanent configurations. The host names your deployment uses will rarely change except to add or remove features such as additional servers or to support SSL domain.
</div>
{:.note-box}

### Hardening your SSL configuration (optional) {#driver-configuration-hardening}

As an optional step, consider the following steps to harden your SSL configuration:

1. Upgrade your driver to the latest stable version. The most recent driver versions will contain security patches. If upgrading to the latest stable driver version is too onerous, at the very least you should upgrade to the most recent patch release on the code line you're already using.

1. Configure your clients to trust only those certificates you know you need to use. All SSL-enabled MongoDB deployments hosted by mLab will use certificates signed by the same root certificate. See below for instructions on how to download and use that certificate.

#### Downloading and using mLab's root certificate 
{:.no_toc}

All certificates used to protect SSL-enabled MongoDB deployments hosted by mLab will be signed by the "DigiCert Global Root CA" which can be downloaded from DigiCert's [list of root certificates][digicert-rootcerts].

Be aware that the certificates will download in the DER binary format, whereas most drivers expect a PEM ASCII-based format certificate. There are many tools available, such as `openssl`, to convert between the two formats.

Most drivers validate SSL certificates against the canonical set of trusted certificates distributed either with your language or your operating system. Consult your driver or client docs for how to trust only an explicit list of certificates, sometimes called CA certificates.

## How mLab manages SSL domains and certificates {#how-mlab-manages-ssl}

Each SSL-enabled mLab deployment belongs to exactly one SSL domain, consisting of:

- a DNS domain 
- the certificates and key pairs used to secure all SSL connections made to or from servers in that domain

###  DNS domains {#ssl-dns-domain}

All SSL enabled servers will be in a subdomain of *fleet.mlab.com* unique to your deployment. The exact subdomain will be randomly generated. This domain will not be shared with any other deployments.

###  SSL certificates {#ssl-certificates}

mLab manages all certificates required to support SSL connections to your MongoDB deployment. There is no need to generate or manage certificates yourself.

mLab's certificate authority is [DigiCert][digicert], one of the most respected issuers in the industry, with widely-distributed root certificates. As such, you should not need to install a special root certificate on your application servers in order to validate the SSL certificates presented by SSL-enabled mLab deployments, though you may consider doing so to [harden your configuration](#driver-configuration-hardening).

New certificates are provisioned by mLab as needed during the deployment provisioning process and as necessary during any upgrades or maintenances. We have worked with our issuer to automate this process so that it is both reliable and fast.

When generating certificates, the key pair never leaves the virtual machine (VM) on which it will be used and is encrypted using a cryptographically-random password that is encrypted and stored in a location not accessible from the VM.

###  SSL certificate renewal {#ssl-certificate-renewal}

We issue certificates that are valid for two years and must be renewed prior to becoming invalid. Certificate renewal is a seamless process that involves a restarting each database server process individually. 

At least 30 days before a certificate is schedueld for renewal, we will notify the listed Technical Contact on the account via email with details about a scheduled maintenance window.  You will then have the opportunity to self-service the required maintenance before the scheduled maintenance window.

If you have been notified that the SSL certificate for your deployment is about to expire and would like to perform the self-service certificate renewal for your deployment, follow these steps:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account’s Home page, navigate to the deployment that will be modified.
1. Click the “Tools” tab.
1. Under the "Initiate maintenance operation" header, select the "Renew SSL certificate" option.
1. Confirm that you want to proceed. This will automatically initiate the certificate renewal process.

## Frequently asked questions (FAQ) {#faq}

### Q. How much do you charge for SSL? {#fees}
{:.no_toc}

As of October 1, 2017, mLab no longer charges for SSL, even on existing deployments with SSL enabled.

Prior to this date, SSL domains incurred an additional monthly charge of $80, pro-rated on a daily basis. Account-scoped SSL domains (now deprecated) would incur a single monthly charge regardless of the number of deployments using that SSL domain. Each deployment-scoped SSL domain in an account incurred a separate charge.

### Q. Why choose mLab's SSL offfering? {#mlab-ssl-advantages}
{:.no_toc}

We use a premium certificate authority (DigiCert) to make it as simple as possible to correctly and securely configure SSL. Because DigiCert’s root certificates are well trusted and distributed, most drivers will authenticate them without further configuration. 

Your certificate will never be shared with other accounts and customers. While it was something we considered offering, we feel sharing certificates across accounts is a mistake because it has the potential of exposing one customer to the mistakes of another.

### Q. What SSL modes do you support? {#ssl-modes}
{:.no_toc}

Currently, all deployments with SSL enabled use the *preferSSL* [net.ssl.mode][minc-netsslmode] which guarantees that SSL is used for all communication between the nodes of a deployment, but allows other clients to connect with or without SSL.

In the future, we may support *requireSSL* which requires SSL for all connections and rejects all connections that don't use SSL.

### Q. Do you support authenticating clients with an X.509 certificate? {#x509-client-authentication}
{:.no_toc}

No, mLab's deployments do not support [client authentication with X.509 certificates][minc-x509clientauth] at this time.

### Q. Should I be worried about the "no SSL certificate provided by peer" errors in my logs? {#no-ssl-certificate}
{:.no_toc}

There is no need to worry; this message is completely normal when connecting to any of mLab's SSL-enabled deployments. It is simply warning that the client didn't provide X.509 client certificates for authentication, but that is to be expected since mLab currently does not support [client authentication with X.509 certificates][minc-x509clientauth].

    2016-01-01T00:00:00.400-0700 I NETWORK  [initandlisten] connection accepted from 100.200.300.400:50000 #9999 (10 connections now open)
    2016-01-01T00:00:00.500-0700 W NETWORK  [conn9999] no SSL certificate provided by peer
    2016-01-01T00:00:00.600-0700 I ACCESS   [conn9999] Successfully authenticated as principal testdbuser on testdatabase

A few key points to note from the log snippet (MongoDB 3.2) above:

* The offending message is simply a warning message, as indicated by "W" on the second line.
* Even though X.509 client certificates were not provided to authenticate, client authentication did happen later on (we happen to know this was done with a username/password challenge).
* MongoDB treats the SSL handshake and authenticating as potentially independent phases of the connection lifecycle.

### Q. Do you support one key pair per deployment?
{:.no_toc}

Not at this time. Eventually, we will create a unique key pair per VM to which a certificate is deployed. This increases the power of each key pair should it be stolen as well as the surface area an attacker can use to try to steal it. Until then, however, all servers in all deployments sharing a single SSL domain will use the same key pair. 

### Q. Do you have any driver configuration examples?
{:.no_toc}

To take the guesswork out of configuring your driver, over time we will be publishing examples for how to securely connect over SSL to mLab-hosted deployments using the drivers we see our customers using the most. The examples will be listed in our [Language Center][docs-languages].

### Q. How can I tell if my deployment has SSL enabled?
{:.no_toc}

We run SSL -enabled deployments in the *preferSSL* [MongoDB SSL modes][minc-sslmodes].  Follow these steps to determine if your deployment is running with the *preferSSL* SSL mode:

1. Log in to the mLab management portal.
1. Navigate to the MongoDB deployment whose SSL mode you want to determine.
1. At the top of the screen, you will see a box with the connection information; the "SSL mode" is indicated in the lower right-hand corner of this box, next to the MongoDB version.   
    - If "SSL mode" is not there, it means the MongoDB SSL mode is *disabled*.

Note that you will need to configure your driver to [connect over SSL](#connecting-over-ssl) to ensure that your application communicates with your deployment over the SSL connection.

### Q. What is this SSL certificate expiration notice?
{:.no_toc}

To minimize the impact of stolen certificate credentials, certificates must be renewed at least every 2 years.  This notification indicates that your deployment is up for [SSL certificate renewal](#ssl-certificate-renewal).  

{:.note-box}
<div markdown="1">
Have feedback? We welcome feedback at any time. SSL certificate management, SSL-related features, and security in general are nuanced but important subjects so contact us at <support@mlab.com> with your input.
</div>
{:.note-box}

