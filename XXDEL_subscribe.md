---
layout: default-norobots
title: Database Subscriptions (OLD)
permalink: /subscriptions-old/
description: How to create, change and upgrade mLab database plans and subscriptions
---

{% comment %} LINKS {% endcomment %}
[docs-plans]:                 /plans
[docs-backups]:               /backups
[docs-errors]:                /errors/#cloning
[docs-migrating]:             /migrating
[docs-migrating-dr]:          /migrating/#dump-and-restore
[docs-repairdb]:              /ops/#compactions
[docs-createfrombackup]:      /backups/#create-from-backup
[docs-rollingman]:            /ops/#rolling-node-replacement
[mlab-login]:                 https://mlab.com/login
[mlab-pricing]:               https://mlab.com/plans/pricing
[minc-config]:                http://docs.mongodb.org/{{ page.minc-docversion }}/reference/configuration-options
[mlab-partners]:              https://mlab.com/company/partners/#paas

{% comment %} IMAGE LINKS {% endcomment %} 
[img-createsub]:              /assets/screenshot-createsub.png
[img-subscriptions]:          /assets/screenshot-subs.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

Adding subscriptions to your mLab account is a simple process after you've [determined which plan you need][docs-plans]. Once you've subscribed to a plan, you can make changes or delete it as well. Information on how to accomplish all of this is detailed below.


## Creating a new database subscription {#create-sub}

There are three main ways to create a new subscription: from scratch, by cloning an existing database, or using a backup from mLab's backup system. Follow the instructions in the sections that follow to create your new subscription.

![img-createsub][img-createsub]

### Create a new subscription from scratch {#start-from-scratch}

1. [Log in][mlab-login] to the mLab management portal 
1. On your account's Home page, click the "Create new" button 
1. Make all the desired selections and fill in the requested fields
1. Review your choices and when you're ready, click the "Create new MongoDB deployment" button
1. When the subscription has completed building, your new deployment will be listed on your account's Home page

{:.note-box}
<div markdown="1">
All Dedicated plan subscriptions will be followed up with an on-boarding email to your account's Admin User.
</div>
{:.note-box}


For more information about managing your subscriptions, see ["Managing your subscriptions"](#manage-subs) further down on this page.

### Clone an existing database into a new subscription {#clone-database}

Do you have another MongoDB database (hosted by mLab or elsewhere) that you'd like to copy into a new mLab subscription? Or do you need to change plans for an existing subscription? A convenient way to do this is to use the "Clone existing" button on your account's Home page.  

If you have stringent uptime requirements, you may prefer a different method for [migrating data into mLab][docs-migrating] or for [changing plans](#change-plans). 

1. Stop any processes running against your current database to avoid data inconsistencies
1. [Log in][mlab-login] to the mLab management portal
1. On your account's Home page, click the "Clone existing" button
1. Select an existing mLab-hosted database or fill in the URI for your cloud-accessible MongoDB database hosted elsewhere
1. In the remaining fields, make your desired selections and fill in the required information
1. Click "Create new mLab deployment"
1. After your new deployment finished provisioning, the database copying will begin. Only after the copying has completed will the database be available for read and writes. If applicable, you will also need to update your application with the new connection URI (server, port and database name).  	

{:.warning-box}
<div markdown="1">
The version of your target database should match the version of your source database or you may encounter errors during the clone process.

If you plan to delete the source database, do not remove it until you have confirmed that all data has been copied into the new database.
</div>
{:.warning-box}


#### Troubleshooting 
{:.no_toc}

It's possible for errors to occur during the cloning process. If you encounter an error during the cloning process, view the [list of common error messages][docs-errors] to understand what may happening and how you might resolve it.


### Create a new subscription from a backup  {#create-from-backup}

Do you take `mongodump` backups of your database using mLab's backup system? If so, you can also [create a new subscription with data restored from one of your backups][docs-createfrombackup]. 

## Managing your subscriptions {#manage-subs}

mLab's management portal is a web-based user interface with rich admin tools that give you insight into your data and control over your database. When you log in with your account user credentials, you are automatically directed to your account's Home page which lists all of your single-node and multi-node mLab deployments.

![img-subscriptions][img-subscriptions]

From your Home page, you can navigate to the home (administrative) page for a specific deployment by clicking the appropriate row. Additionally, as you move around the portal, you'll come across services and tools that help you manage your data and maintain your deployment.

For example, if you click on the row for a Sandbox deployment, you'll be taken directly to the home page for that database. From there you can browse the collections and documents in that database, run queries, add indexes, repair the database, and so forth.

Or, if you click on the row for a multi-node replica set deployment, you'll be taken to the cluster's home page from where you'll be able to access the administrative pages for any of the servers or databases associated with that deployment.  You'll also have access to server- and cluster-specific tools that allow you to view live statistics, look for slow queries, access log files, and so forth.

Detailed information about the different services and tools are included throughout our support documentation - just browse the categories on the left side of this documentation portal to find what you're looking for. 


## Calculating charges {#calculating-charges}

The essentials on how we calculate charges for each of your subscriptions are documented here. 

#### Frequency 
{:.no_toc}
You will be billed at the start of each month for all chargeable services provided in the prior month using our secure, hassle-free credit card-based payment system.

For-pay plans are prorated on a daily basis, although prices shown on our pricing page are monthly.  You will only be charged for the days your plan is active.

#### Basis and determination 
{:.no_toc}  
All plans include a basic amount of disk space to hold your data. 

Sandbox databases are free but quota enforcement will be based on the `fileSize` value output from MongoDB's `dbStats` command. The file size is the total size of the storage files used for your database, which represents the overall storage footprint for your database on disk. Read here for more information about [file size vs. data size][docs-repairdb]. 

For Shared Cluster plans, the plan is metered by the byte after the first 1 GB which is automatically included in the base price. Daily file size is calculated by averaging the `fileSize` value (described in the preceding paragraph) of the primary and secondary nodes in the replica set. 

Dedicated plan pricing is based on the specifications of your virtual machines as well as the size and type of pre-allocated block storage.

{:.note-box}
<div markdown="1">
Shared plan databases run with the `--smallfiles` option. The first file allocated is 16MB, the second 32MB, the third 64MB... until 512MB is reached at which point each subsequent file is 512MB. To read more about this, visit the [official MongoDB manual][minc-config].
</div>
{:.note-box}


## Changing plans {#change-plans}

Cloning your database is the most convenient way to change your subscription to a different plan. Alternatively, you can take a backup and then restore it to a new deployment with the new plan. Both of these methods will require you to update your application's connection URI (host, port and database name).

If you are on a for-pay plan and your application has stringent uptime requirements, contact <support@mlab.com>. We can perform a no-downtime upgrade (or downgrade depending on plan type) of your cluster using a [rolling node replacement](#rolling-replacement). 

For subscriptions created via one of our [Platform-as-a-Service (PaaS) partners][mlab-partners] (e.g., Heroku), refer to the documentation available on the partner's site.

### Using mLab's clone feature {#clone-feature}

Cloning is an efficient way to upgrade (or downgrade) from one plan to another. The [cloning instructions written above](#clone-database) will migrate your data from your existing subscription to a new subscription with your desired plan. 

{:.warning-box}
<div markdown="1">
After you clone, don't forget to [delete your old subscription](#delete-sub) if you do not intend to use it any longer. If it is a for-pay plan, charges will continue to be incurred until the subscription is deleted.
</div>
{:.warning-box}



### Using mongodump and mongorestore  {#mongodump-mongorestore} 

If you'd like more fine-grained control over the process, you might prefer to use the MongoDB commands `mongodump` and `mongorestore`. Since changing plans essentially entails migrating data associated with one mLab subscription to another, follow our instructions for [migrating data between MongoDB databases][docs-migrating-dr] to change your plan. 

{:.warning-box}
<div markdown="1">
After you migrate your data to a new database on a different subscription, don't forget to [delete your old subscription](#delete-sub) if you do not intend to use it any longer. If it is a for-pay plan, charges will continue to be incurred until the subscription is deleted.
</div>
{:.warning-box}




### Using a rolling node replacement {#rolling-replacement}

If you are on a for-pay plan and are sensitive to downtime, we can use a rolling node replacement process so that you can minimize downtime and keep your existing connection string.

A rolling node replacement is a process that replaces each node in your cluster in turn. Each node is replaced by bringing a new node into the cluster, replicating the data to that node, removing the old node, and updating DNS records. 

If the node being replaced is the primary, a failover is performed so that it will be a secondary during the replacement. In this way, the cluster remains available during the entire process.

Read more about the [rolling node replacement process][docs-rollingman] or email <support@mlab.com> if you have any further questions.

{:.note-box}
<div markdown="1">
A Dedicated plan cannot be downgraded to a Shared plan using the rolling node replacement process because Dedicated plans include the ability to create multiple databases while Shared plans do not. However, downgrades between Dedicated plan types can leverage the rolling node replacement process.
</div>
{:.note-box}
 


## Deleting a subscription {#delete-sub}
The process to delete a subscription is very simple: 

- For Sandbox database subscriptions, click the "Delete database" button on the database's home page
- For server subscriptions, click the "Delete server" button on the server's home page
- For cluster subscriptions, click the "Delete cluster" button on the cluster's home page

{:.warning-box}
<div markdown="1">
With for-pay subscriptions, you must delete the whole deployment, not just the database(s) that are associated with the server/cluster.
</div>
{:.warning-box}


If you wish to save your data before deleting your subscription, be sure to [create a backup][docs-backups] and save it to your own custom container or download it to a safe place.



