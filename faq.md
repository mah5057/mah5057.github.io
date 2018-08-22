---
layout: default
title: Frequently Asked Questions (FAQ)
permalink: /faq/
description: Frequently Asked Questions (FAQ) for your mLab database
minc-docversion: v3.4
---


{% comment %} LINKS {% endcomment %}
[docs-languages]:         {{ site.url }}/languages/
[docs-helpconnect]:       /connecting/#help
[docs-indexing]:          /indexing/
[docs-slowqueries]:       /monitoring/#slow-query-analyzer
[docs-dataapi]:           /data-api
[docs-eu-dp]:             /eu-data-protection
[docs-timeout]:           /timeouts
[docs-cancel]:            /accounts/#cancel-account
[docs-changeplan]:        /subscriptions/#change-plans
[docs-security]:          /security
[docs-accountsecurity]:   /security/#account-security-settings
[docs-secureportal]:      /security/#mgmt-portal
[docs-plans]:             /plans
[docs-clouds]:            /plans/#cloud-providers
[docs-resources]:         /support/#community
[docs-oplog]:             /oplog
[mlab-company]:           https://mlab.com/company/
[mlab-password]:          https://mlab.com/reset-password/
[mlab-username]:          https://mlab.com/remind-usernames/
[mlab-architecture]:      https://mlab.com/products/architecture/
[mlab-pricing]:           https://mlab.com/plans/pricing/
[mlab-twitter]:           http://twitter.com/mlab
[mlab-competition]: https://mlab.com/mlab-vs-atlas
[blog-home]:              http://blog.mlab.com
[blog-repllag]:           http://blog.mlab.com/2013/03/replication-lag-the-facts-of-life/
[blog-pooling]:           http://blog.mlab.com/2013/11/deep-dive-into-connection-pooling/
[blog-production]:        http://blog.mlab.com/2013/08/are-you-ready-for-production/
[minc-drivers]:           http://docs.mongodb.com/{{ page.minc-docversion }}/applications/drivers/
[minc-performance]:       http://docs.mongodb.com/{{ page.minc-docversion }}/administration/analyzing-mongodb-performance/
[minc-getstarted]:        https://docs.mongodb.com/getting-started/shell/
[minc-installmongodb]:    https://docs.mongodb.com/{{ page.minc-docversion }}/installation/
[minc-mongo]:             https://docs.mongodb.com/getting-started/shell/client/
[minc-home]:              http://www.mongdb.com
[minc-docs]:              http://docs.mongodb.com/{{ page.minc-docversion }}/
[hero-mlab]:              https://elements.heroku.com/addons/mongolab


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Learning and Education

### I am new to MongoDB---where do I start?

In addition to [the official MongoDB Manual][minc-docs] created by MongoDB, Inc., the makers of MongoDB, we list some of our favorite MongoDB resources in the ["Community"][docs-resources] section of our support article.

Also, MongoDB, Inc. has created [a nice tutorial to help you get started][minc-getstarted]. Although this tutorial assumes you have [installed MongoDB on your own machine][minc-installmongodb] (i.e., not using an mLab-hosted database), it's certainly possible to go through the tutorial using your mLab-hosted database. All you need to do is provide your mLab URI when [they ask you to run the mongo command][minc-mongo]. The command will look similar to this:

    % mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword

Also, keep in mind that instead of using the database "test" as instructed in various sections of the tutorial, you must use your database (as represented by the placeholder "dbname" in the URI example above). In addition, there are certain commands (e.g., "show dbs"), that will not work unless you have a Dedicated plan with full database administrative privileges.

Another item to note is that mLab runs the MongoDB process with the "auth" mode enabled, which is why it is necessary to include the database user and password (as represented by the placeholders "dbuser" and "dbpassword" in the URI example above) when you connect. If you do not include the database user's credentials, then you will not be able to successfully run any commands after connecting to the database.


### What are some of the advanced MongoDB topics that I should read up on?
The [mLab blog][blog-home] is one place where our experts have contributed helpful articles on a myriad of MongoDB data- and operation-related topics. Some articles that are definitely worth a read include:

- [Deep Dive into Connection Pooling][blog-pooling]
- [Are you ready for production?][blog-production]
- [Replication Lag & The Facts of Life][blog-repllag]

### What is mLab vs. ObjectLabs?

ObjectLabs Corporation is the official, legal name of our company. mLab is the name of our product. [Read more about us!][mlab-company] 

### Does mLab have a Twitter feed?

Yes! Find us [@mlab][mlab-twitter].

## MongoDB Feature Support

### Which drivers and client libraries do you support?

We support all of the [standard MongoDB drivers][minc-drivers]. We also have [driver examples in many of the major languages][docs-languages] including C#, Java, Node.js, PHP, Python, Ruby, etc..

### Do you support features that aren't in your management portal (e.g., Views)?

Yes. Our web-based management portal does not support every feature of MongoDB, but any database you create with mLab will support all the features supported by that MongoDB version. 

For example, our management portal does not currently support Views. However, you can use the `mongo` shell or one of the standard MongoDB drivers to interface with Views.

### Do you support MongoDB Sharded Clusters?

Yes. We currently support sharding on AWS and Google. If you have questions about sharding please contact <support@mlab.com>.

### Do your plans include oplog access (e.g., for oplog tailing)?

All of our for-pay plans include [access to the local database][docs-oplog] which includes the oplog for your MongoDB deployment.

## mLab’s Cloud-hosted MongoDB Offering

### Will I be locked into your service?

You will *not* be locked into the mLab service. Here are some reasons why:

- We run standard MongoDB on standard virtual machines on all the major cloud providers.
- We charge by the day, so charges will stop as soon as you delete your deployment.
- If you no longer require our services, we will be glad to help you migrate your data out.
- If you are migrating a reasonably sized Dedicated Cluster plan deployment that is sensitive to downtime, we will provide you with the replication key so that you can migrate seamlessly.
- We've tried to make the [steps to close your mLab account][docs-cancel] simple. 

### Which cloud providers and regions do you support?

We offer our MongoDB-hosting services on AWS, Google Cloud Platform, and Microsoft Azure in [most of their regions worldwide][docs-clouds].

### How are you different from your competition?

We have a [comparison page][mlab-competition] which should help answer this question. If you have questions please email us at support@mlab.com anytime.

### What are the advantages of using mLab through one of our partners (e.g., Heroku)? {#mlab-partner-integrations}

Many of our users provision mLab-hosted MongoDB deployments through one of our partners. There are two primary advantages to provisioning your deployment through a partner integration such as the Heroku Add-Ons marketplace: (1) The convenience of a single billing and vendor relationship; (2) The convenience of single-sign on between your application’s management portal and the mLab management portal.

In addition, some of our partner integrations automatically expose an environment variable to your application with your database deployment’s connection URI.

Note that some of the plans and features that we offer directly through mlab.com are different from what’s available through our partners. As such, be sure to read the documentation published on the partner’s website (e.g., for Heroku, [https://elements.heroku.com/addons/mongolab][hero-mlab]).

In the event you decide to provision your mLab-hosted MongoDB deployments directly through mlab.com instead of a partner, make sure that you provision your deployment in the same datacenter/region that your application is hosted in. For example, on Heroku, this would be either AWS US East or AWS EU West.

### Do you charge extra for data transfer / network traffic?

No we do not. You will have to pay your hosting provider for network traffic in and out of your app's instances, but the charges directly related to the instances hosting your mLab deployments are already included.

### Do you offer custom professional services or consulting?

You can always contact us at <support@mlab.com> for timely, thoughtful advice from real developers. Database support is included, for free, as part of all of our plans.

However, we do not offer custom professional services or consulting. 

### How do I choose the right plan for my needs?

Making sense of all the plan options in the context of your data-related requirements is not always an easy task. To aid you in this process, read the article where we [discuss plan types and the factors to consider when choosing a plan][docs-plans].

Feel free to contact <support@mlab.com> if you'd like our assistance in helping you figure out which plan will be best for you.

### How do I upgrade/downgrade?

For subscriptions created directly in the mLab management portal (i.e., not as an add-on with one of our Platform-as-a-Service (PaaS) partners such as Heroku), you can change the plan for your MongoDB deployment by following the instructions documented in our article about [database subscriptions][docs-changeplan].

For subscriptions created via add-ons with one of our partners, refer to the add-on documentation available on the partner's site.

### Which browsers do you support in the mLab management portal? {#supported-browsers}

We only support the following desktop browsers when logged into mLab's management portal:

| Desktop browser                    | Version
-------------------------------------|------------
| Chrome (recommended)               | 56 and up
| Firefox                            | 51 and up
| Safari                             | 9 and up
| Edge                               | 14 and up
| Internet Explorer                  | 11

### What are the "objectlabs-system" and "objectlabs-system.admin.collections" collections? 

These collections are created by mLab to store metadata about your deployment to service data browser features such as saved searches or table view definitions.

### Are you PCI compliant?

mLab has satisfied the certification process for PCI DSS Merchant Compliance.  This means that mLab adheres to the data security standards set by the Payment Card Industry (PCI) to ensure that credit card information remains safe and secure.  Note that this compliance relates to mLab as a merchant and does not mean that mLab is PCI compliant to store credit card information. 

### Are you compliant with EU data protection standards and/or laws (e.g., GDPR, Privacy Shield)?

Please visit our documentation on [EU Data Protection][docs-eu-dp].

### Are you HIPAA compliant?

Not at this time.

### Do you have a REST API?

[Yes, we do][docs-dataapi]. However, it is not our recommended approach to connect to the database. You should only use the mLab Data API if you cannot use one of the [standard MongoDB drivers][minc-drivers].

## Troubleshooting

### I forgot the username and/or password for my mLab account

Use the form at [https://mlab.com/reset-password/][mlab-password] to retrieve your password. You will be asked to enter the __username__ for your account user (not to be confused with your mLab account name nor with a user in one of the databases you host with mLab). An email with a link to reset your password will be sent to the email address on file for that account user. If you do not receive an email, please double-check that you entered the correct username in the form.

If you do not remember the username for your account user, enter your email address in the form at [https://mlab.com/remind-usernames/][mlab-username]. If that email address matches any of the email addresses entered for account users in our system, an email will be sent which will include the mLab account name and the account user's username.

If you do not receive the password reset or username reminder emails, please also check your spam or trash folders, in case your email system has automatically placed it there. It is also possible that the Admin User of your account has [disabled the functionality which allows you to reset your password or recover your username][docs-accountsecurity]. If you are not sure about this, please contact us at <support@mlab.com> so that we can investigate the situation for you.



### I can't connect to my mLab database!

Are you finding yourself on the receiving end of an error message while trying to connect? Or is your application timing out? Our [troubleshooting guide for connection issues][docs-helpconnect] may help you investigate possible causes. 

### My database seems slow---what do I do?

The performance and responsiveness of your database is affected by a variety of factors. First, it's important to read MongoDB, Inc.'s comprehensive article, ["MongoDB Performance"][minc-performance], which discusses the breadth of these factors. 

In addition, we highly recommend that you read our [Indexing and Performance][docs-indexing] page. Since proper indexing is a critical component in avoiding performance degradation, we discuss some very important indexing fundamentals and considerations here.

There is also the [mLab Slow Query Analyzer][docs-slowqueries] which helps you discover potentially slow queries and implement recommended indexes. Note that this feature is available for for-pay plans only.


