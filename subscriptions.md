---
layout: default
title: Database Subscriptions
permalink: /subscriptions/
description: How to create, change and upgrade mLab deployments/subscriptions.
tags: ["upgrade", "upgrade plan"]
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-plans]:                 {{ site.url }}/plans
[docs-rs-conn]:               /connecting/#replica-set-connections
[docs-migrating]:             /migrating
[docs-indexing]:              {{ site.url }}/indexing/
[docs-migrating-dr]:          /migrating/#dump-and-restore
[docs-repairdb]:              /ops/#compacting
[docs-backups]:               /backups
[docs-backups-create]:        /backups/#create-backups
[docs-backups-restore]:       /backups/#restore
[docs-backups-retention]:     /backups/#retention-policies
[docs-createfrombackup]:      /backups/#create-from-backup
[docs-mongodump-storage]:     /backups/#mongodump-storage
[docs-snapshot-storage]:      /backups/#snapshot-storage
[docs-connect-string]:		  /connecting/#connect-string
[docs-rnr]:                   {{ site.url }}/ops/#rolling-node-replacement
[docs-restore-considerations]: /backups/#restore-considerations
[mlab-login]:                 https://mlab.com/login
[mlab-pricing]:               https://mlab.com/plans/pricing
[minc-config]:                http://docs.mongodb.com/{{ page.minc-docversion }}/reference/configuration-options
[jira-SERVER-701]:            https://jira.mongodb.org/browse/SERVER-701
[blog-pooling]:               https://blog.mlab.com/2013/11/deep-dive-into-connection-pooling/

{% comment %} IMAGE LINKS {% endcomment %} 
[img-createsub]:              /assets/screenshot-createsub.png
[img-subscriptions]:          /assets/screenshot-subs.png
[img-subscriptions-expand]:   /assets/screenshot-subs-expanded.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

Creating a new database deployment in your mLab account is a simple process after you've [determined which plan you need][docs-plans]. Once you've subscribed to a plan, you can make changes to the deployment or delete it when you do not need it any longer.

## Creating a new deployment/subscription {#create-deployment}

There are two ways to create a new deployment: from scratch or from a backup previously taken by mLab's backup system. Follow the instructions in the sections that follow to create your new deployment using one of these two methods.

![img-createsub][img-createsub]


### Create new {#create-new}
{:.no_toc}

To create a new deployment from scratch, follow these steps:

1. [Log in][mlab-login] to the mLab management portal. 
1. On your account's Home page, click the "Create new" button.
1. Make all the desired selections and fill in the requested fields as you step through the available options.
1. On the final page, review your choices and when you're ready, click the "Submit Order" button.
1. Your new deployment will be listed on your account's Home page where you can monitor provisioning progress.
1. When the deployment has been completely provisioned, you will be able to navigate to its home (administrative) page to [manage the deployment](#manage-subs).


{:.note-box}
<div markdown="1">
It is not possible to change the name of a MongoDB database unless you export the data and re-import it again (see [feature request for the ability to rename databases][jira-SERVER-701]); for any sizable database, this requires significant downtime.

For this reason, we discourage decorating the name of your database with word(s) that indicate the environment in which the deployment will be used (e.g., Development, Staging, Production). As an example, let's say you name your database, "users-production."  Later on you might create a new, Staging environment from a filesystem-level backup of this database; your Staging environment's database would then also be called "users-production."
</div>
{:.note-box}



### Create from backup {#create-from-backup}
{:.no_toc}

If you used the mLab backup system to take a custom backup of an existing mLab database deployment, you can [create a new deployment with data restored from one of your backups][docs-backups-restore]. 

## Changing plans {#change-plans}

Restoring a backup into a brand-new deployment using the "Create from backup" feature mentioned above is a convenient way to change plans. A different method is to manually take a backup and then restore it to a new deployment on the desired plan. Both of these methods will require you to update your application's connection URI (host, port and database name) and require downtime.

If you would like a seamless plan change and are migrating from a Shared Cluster plan to a Dedicated Cluster plan or between Dedicated Cluster plan types, we can use our seamless rolling node replacement process which requires no change in connection string.

{:.note-box}
<div markdown="1">
For subscriptions created via one of our Platform-as-a-Service (PaaS) partners (e.g., Heroku), refer to the documentation available on our partner's site.
</div>
{:.note-box}

### Recommended plan change methods
{:.no_toc}

Using the table below, you can quickly identify our recommended method to change from your current plan to your desired plan. The two recommended methods are then described in detail below.

Current Plan  | Target Plan | Recommended Method | Requires Downtime?
------------- | ------------- | ------------- | ------------- | 
Sandbox  | Shared | Restore backup (mongodump) into new deployment | Yes
Sandbox | Dedicated | Restore backup (mongodump) into new deployment | Yes
Shared | Dedicated [^foot-text] | Rolling node replacement | No
Shared | Sandbox | Restore backup (mongodump) into new deployment | Yes
Dedicated | Sandbox  [^foot-text2]| Restore backup (mongodump) into new deployment | Yes
Dedicated | Shared  [^foot-text2] | Restore backup (mongodump) into new deployment | Yes
Dedicated | Dedicated [^foot-text] | Rolling node replacement | No

[^foot-text]: The rolling node replacement method requires a target plan that is a Cluster plan (e.g., the target plan cannot be a Dedicated Single-node plan).
[^foot-text2]: For Dedicated Clusters that have more than one database, each database has to be restored into its own deployment if downgrading to a Shared Cluster or Sandbox plan. 

### Restore backup (mongodump) into new deployment {#change-plans-using-backup}

Taking a backup and restoring it into a deployment is a convenient way to change plans. However, it will require you to update your connection string and require downtime.

{:.note-box}
<div markdown="1">
If you're migrating from a Single-node plan to a Cluster plan, be sure to first read our [documentation on making replica set connections][docs-rs-conn].
</div>
{:.note-box}

#### Using mLab's backup system
{:.no_toc}

To use mLab's backup system to restore a backup into a new deployment, follow these steps:

1. Stop all processes running against your current deployment.
1. [Take a one-time backup][docs-backups-create].
   - Choose mongodump as the backup method.
   - Be sure to note the backup ID.
1. Wait for the backup to complete.
1. [Create a new deployment from backup][docs-backups-restore] using this backup ID.
    - Be sure to review backup [restore considerations][docs-restore-considerations] first.
    - Note that database users will not be included as part of the restore process.
1. Create database user(s) on the new deployment.
1. Change your connection string and start your app again.
1. Once you are no longer using the original deployment, [delete it](#delete-sub) (otherwise, if it is a for-pay subscription, it will continue to incur charges).

#### Using mongodump and mongorestore {#change-plans-using-mongodump-mongorestore}
{:.no_toc}

To manually change from one plan to another, you can use the [mongodump and mongorestore commands][docs-migrating-dr] to move your data from one deployment to another. After you have completed the migration of data and are no longer using the original deployment, [delete it](#delete-sub) (otherwise, if it is a for-pay subscription, it will continue to incur charges).


### Rolling node replacement {#change-plans-using-rnr}

If you are migrating from a Shared Cluster plan to a Dedicated Cluster plan or changing between Dedicated Cluster plans, we can use mLab's rolling node replacement process so that you won't have downtime or need to change your connection string.

{:.warning-box}
<div markdown="1">
A Dedicated plan cannot be downgraded to a Shared plan using the rolling node replacement process because Dedicated plans include the ability to create multiple databases while Shared plans do not. However, downgrades between Dedicated plan types can leverage the rolling node replacement process.
</div>
{:.warning-box}

__Process overview__

mLab's seamless rolling node replacement is a process that replaces each node in your cluster in turn. Each node is replaced by bringing a new node into the cluster, replicating the data to that node, removing the old node, and updating DNS records. 

If the node being replaced is the primary, a failover is performed so that it will be a secondary during the replacement. In this way, the cluster remains available during the entire process.

Read more about the [rolling node replacement process][docs-rnr] or email <support@mlab.com> if you have any further questions.

__How to initiate a rolling node replacement to change plans__
{:.no_toc}

To use mLab's management console to initiate a rolling node replacement process to change plans, follow these steps:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account’s Home page, navigate to the deployment you wish to change plan.
1. Click the “Tools” tab.
1. Under the "Initiate maintenance operation" header, select the "Change plan" option.
1. Select the target plan in the drop-down menu that appears below "This deployment's current plan..."
1. Select the failover option in the drop-down menu that appears at the bottom of the "Failover Preference" section.
1. Click the "Change to...." button and confirm that you want to proceed. This will automatically initiate a rolling node replacement to change your plan.

{:.note-box}
<div markdown="1">
Not all plan changes are self-service via mLab's management console (e.g., High Performance line changes). If there is a target plan that's not available, please email <support@mlab.com> to request the change.
</div>
{:.note-box}


## Managing your subscriptions {#manage-subs}

mLab's management portal is a web-based user interface with rich admin tools that give you insight into your data and control over your deployment. When you log in with your mLab account user credentials, you will automatically be directed to your account's Home page which lists all of your mLab deployments.

### Home page for mLab's management portal
{:.no_toc}

![img-subscriptions][img-subscriptions]

From your Home page, you can navigate to the home (administrative) page for a specific deployment by clicking the appropriate row. Additionally, as you move around the portal, you'll come across tools that help you browse your data and manage your deployment.

For example, if you click on the row for a Sandbox database, you'll be taken directly to the home page for that database. From there you can browse the collections and documents in that database, run queries, add indexes, edit documents, compact, and so forth.

Or, if you click on the row for a for-pay deployment (Shared or Dedicated plan), you'll be taken to the deployment's home page from where you'll be able to access the administrative pages for any of the servers or databases associated with that deployment. You'll also have access to server- and cluster-specific tools that allow you to view live statistics, look for slow queries, access log files, upgrade MongoDB versions, and so forth.

#### Expand row for more details
{:.no_toc}

As described above, information about your subscriptions is summarized on the Home page in the mLab management portal. Some information such as the deployment identifier and plan type is readily displayed up front after logging in. 

However, additional information about your deployment is available by clicking the gray triangle that appears to the left of the deployment name in order to expand the row. 

For example, the deployment's cloud region and MongoDB version will appear if you expand the row. Additionally for Dedicated plans, if you expand the row you will be able to see the type and size of disk that has been allocated for your deployment.

![img-subscriptions-expand][img-subscriptions-expand]

## Calculating charges {#calculating-charges}

The essentials on how we calculate charges for each of your subscriptions are documented here. 

#### Frequency 
{:.no_toc}
You will be billed at the start of each month for all chargeable services provided in the prior month using our credit card-based payment system.

For-pay plans are prorated on a daily basis, although prices shown on our pricing page are monthly. You will only be charged for the days your deployment exists. An unused (inactive) deployment that is still subscribed to the account will continue to incur charges until it is deleted.

#### Basis and determination 
{:.no_toc}  
All plans include a specific amount of disk space to hold your data. 

__Sandbox__ plans are free but quota enforcement will be based on the `fileSize` value output from MongoDB's `dbStats` command. The file size is the total size of the storage files used for your database, which represents the overall storage footprint for your database on disk. We display the `fileSize` metric in our management portal under the "Size on Disk" header. Read here for more information about [file size vs. data size][docs-repairdb]. 

__Shared Cluster__ plans automatically come with 1 GB which is included as part of the base price. The fees increase after the first 1 GB according to the `fileSize` value from MongoDB's `dbStats` command. Specifically, the plan is metered by the byte on a daily basis by calculating the average value of the file size values of BOTH the primary and secondary nodes of a Shared Cluster. For example, a cluster whose daily average file size value is 1.5GB throughout an entire month would pay $22.50 for that month based on a rate of $15/GB/month. 

We display the `fileSize` metric in our management portal under the "Size on Disk" header. For the primary node, this value is easily found on the Home page of the mLab portal. For a secondary node, navigate to the "Servers" tab for your deployment, then click on the server that is currently secondary. This will open the page that displays the `fileSize` value under the "Size on Disk" header for the secondary node.

Since deletion of data does not automatically reduce the file size of a deployment, it is often necessary to [compact a Shared Cluster to reclaim disk space][docs-repairdb] for BOTH the primary and secondary nodes.

__Dedicated__ plans are priced based on the specifications of your virtual machines as well as the size and type of pre-allocated block storage.

{:.note-box}
<div markdown="1">
Shared plan databases run with the `--smallfiles` option. The first file allocated is 16MB, the second 32MB, the third 64MB... until 512MB is reached at which point each subsequent file is 512MB. To read more about this, visit the [official MongoDB manual][minc-config].
</div>
{:.note-box}

#### Frequently asked questions
{:.no_toc}

##### Q. What is the "local" database and does it count towards my quota and/or bill?
{:.no_toc}

The `local` database stores data used in the replication process and other node-specific data (i.e., its data does not replicate). Most importantly, this database contains the oplog (operations log).

We currently configure our Shared Cluster plans with a 2 GB oplog, and this oplog is included for free. In other words, it does not contribute to your quota or your bill.

## Deleting a deployment/subscription {#delete-sub}

The process to delete a deployment is as follows:

- For Sandbox plans, click the "Delete database" button on the database's home page.
- For Shared or Dedicated plans, click either the "Delete server" or "Delete cluster" button on the deployment's home page.

Importantly, note that:

* With for-pay subscriptions, you must delete the whole deployment, not just its database(s) in order stop incurring charges.
* If you wish to save your data before deleting your deployment, carefully review [our FAQ below on keeping your data](#q-can-i-cancel-my-subscription-but-keep-the-data).

##### Data Deletion Policy {#data-deletion-policy}
{:.no_toc}

Upon deletion of a database deployment or backup, such data will be no longer be available to you. We may delay the physical destruction of your database deployment or backup data for a short period of time (approximately a week) to help guard against accidental deletion.

As an exception to the above rule, we store some mongodump-based backups in cold storage for up to 8 weeks as an additional safeguard. After your deployment has been deleted, you may submit a request to <support@mlab.com> to delete such backups, if any, immediately.

## Frequently Asked Questions (FAQ) {#faq}

### Q. What is the deployment identifier for my subscription? {#deployment-identifier}
{:.no_toc}

The deployment identifier is the minimum amount of information that we need to identify your mLab deployment.

Every mLab-hosted database server can be identified by a six-digit identifier. Sandbox databases must also be identified with a database name since our Sandbox databases are on shared database server processes with other Sandbox tenants.

The deployment identifier will look like the following depending on the plan type:

- For Sandbox database plan - dsNNNNNN/dbname
- For Shared plan - dsNNNNNN
- For Dedicated plan - dsNNNNNN
- For Sharded Dedicated plan - sc-NNNNNN

This information can be attained from the [connection string for your deployment][docs-connect-string] although be sure to mask the username and password if you share your connection string.

### Q. Why is downtime necessary when upgrading from a Sandbox plan to a for-pay plan?
{:.no_toc}

We run many Sandbox databases on the same database server process (i.e., same hostname:port), so unfortunately it's not possible for seamless upgrades from Sandbox to for-pay plans. You will instead need to restore a backup into a brand-new deployment and change your connection string. Once your deployment is on a for-pay plan, from that point forward it will be possible to seamlessly upgrade.

### Q. Can I cancel my subscription but keep the data?
{:.no_toc}

It's not possible to put a subscription on pause or temporarily deactivate your deployment without the data being deleted.

If you would like to stop incurring charges for your deployment without losing your data, you will need to safely store a [backup of the deployment][docs-backups] and then delete your deployment.

* For a backup taken using mongodump, you should ensure that the [backup is stored in your own S3 bucket][docs-mongodump-storage]. If you don't have an S3 bucket and your deployment is small, you can download the mongodump to your local computer; from there, we strongly recommend making sure that it's backed up.

* For an [EBS Snapshot on AWS][docs-snapshot-storage], you must share the EBS Snapshot with your AWS account and then copy it into your AWS account. If the backup is not stored in (and owned by) your own AWS account, it will be deleted as per [mLab's backup retention policies][docs-backups-retention].  Note that for relatively small deployments, we recommend storing a mongodump instead of an EBS Snapshot since mongodump-based backups are simpler to restore.

Before you delete your deployment, we strongly recommend testing to make sure that you can restore the backup that you've safely stored.

### Q. How many open connections do each of your plans support?   
{:.no_toc}

Depending on plan type, mLab deployments are currently configured with a hard upper limit of 15,000 to 20,000 connections.[^foot-text3]

However, the practical limit on connections supported by your deployment generally depends on available RAM. Since each active connection uses 1 MB of memory in addition to the memory required by the operations performed by that connection, a large number of active connections can have a negative impact on memory usage and performance. Furthermore, creating and destroying many connections when not needed is resource-intensive and puts unnecessary CPU load on the database.

Note that it is extremely rare for a deployment to require thousands of connections when its clients are correctly utilizing [connection pools][blog-pooling]. We recommend making sure that your application servers are connection pooling so that your deployment uses a reasonable number of connections (typically under a few hundred).

[^foot-text3]: These values are subject to change in the future.

### Q. How many transactions per second does the Shared plan support? 
{:.no_toc}

The rate of transactions that a given plan can handle depends on the length of each transaction which can vary dramatically depending on a number of factors (e.g., the size of documents, index utilization, etc.). That said, our Shared plans can usually handle hundreds of transactions per second, and sometimes thousands per second.

To maximize performance on any database deployment, ensure that all recurring query patterns are indexed well (see our [guide to indexing][docs-indexing]).

<br/>

---
