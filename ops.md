---
layout: default
title:  Managing Your MongoDB Deployment
permalink: /ops/
description: How to kill operations, repair or restart your mLab database. How to change the MongoDB version for your mLab database.
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:                   https://mlab.com/login
[mlab-create]:                  https://mlab.com/create
[docs-dbstats]:                 {{ site.url }}/storage-statistics/#size-stats
[docs-mongoversion]:            {{ site.url }}/db-version-requirements
[docs-rs-conn]:                 {{ site.url }}/connecting/#replica-set-connections
[docs-backups]:                 {{ site.url }}/backups
[docs-201609-event]:            {{ site.url }}/201609-maintenance-event
[docs-201807-event]:            {{ site.url }}/201807-maintenance-event
[minc-repairdb]:                http://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/repairDatabase
[minc-driver-compat-ref]:       https://docs.mongodb.com/ecosystem/drivers/driver-compatibility-reference/
[minc-sync]:                    http://docs.mongodb.com/{{ page.minc-docversion }}/core/replica-set-sync
[minc-reconfig]:                http://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/replSetReconfig/
[minc-currentop]:               http://docs.mongodb.com/{{ page.minc-docversion }}/reference/method/db.currentOp/
[minc-killop]:                  http://docs.mongodb.com/{{ page.minc-docversion }}/reference/method/db.killOp/
[minc-resync]:                  http://docs.mongodb.com/{{ page.minc-docversion }}/core/replica-set-sync/#initial-sync
[blog-ops]:                     http://blog.mlab.com/2014/02/mongodb-currentop-killop/
[blog-ops-ui]:                  http://blog.mlab.com/2014/08/find-and-kill-mongodb-operations-from-the-mongolab-ui/


{% comment %} IMAGE LINKS {% endcomment %} 
[img-connectstring]:    /assets/screenshot-connectinfo.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

When you host your MongoDB database with mLab, you have access to special tools and processes that help you manage routine MongoDB tasks. Some of these tasks are described here, with detailed instructions and links for further reading.


## MongoDB version management {#version-mgmt}

As MongoDB Inc. continues to roll out new versions of MongoDB, it's important to keep your database up-to-date so as to take advantage of new features, bug fixes, and more. 


### Versions currently available at mLab {#available-versions}

{% comment %} 
The version of MongoDB used by mLab as the default is currently version 3.4. However, you have the option of selecting other versions. Note that mLab's default will change to version 3.6 on July 20, 2018 (see below).
{% endcomment %} 

The version of MongoDB that mLab uses by default is currently MongoDB version 3.6; however, you have the option of selecting other versions.

Plan Type  | Supported Versions 
------------- | ------------- | -------------
Sandbox | 3.6
For-pay Shared | 3.6, 3.4, 3.2, 3.0 
For-pay Dedicated | 3.6, 3.4, 3.2, 3.0, 2.6

{% comment %} 
{:.note-box}
<div markdown="1">
On July 20, 2018, our default release version will become MongoDB 3.6. During a [three-day scheduled maintenance window][docs-201807-event] starting on that day, all free Sandboxes databases running MongoDB 3.4.x will be upgraded to MongoDB 3.6.x. 
</div>
{:.note-box}
{% endcomment %} 

{:.note-box}
<div markdown="1">
On July 20, 2018, our default release version became MongoDB 3.6. During a [three-day scheduled maintenance window][docs-201807-event] starting on that day, all free Sandboxes databases running MongoDB 3.4.x were upgraded to MongoDB 3.6.x. 
</div>
{:.note-box}

{% comment %}
{:.warning-box}
<div markdown="1">
Our Experimental Sandbox databases run with new and improved MongoDB features that are still in development, beta, and/or relatively new. Note that we will upgrade Experimental Sandbox plan databases without notice as new releases become available.
</div>
{:.warning-box}
{% endcomment %}

### Determining your current MongoDB version {#current-version}

Follow these steps to see which version of MongoDB your deployment is currently running:

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the MongoDB deployment whose version you want to determine.
1. At the top of the screen, you will see a box with the connection information; the MongoDB version is indicated in the lower right-hand corner of this box. 
![img-connectstring][img-connectstring]

Alternately, you can use the `db.version()` method via the mongo shell to see which version your deployment is running. 

    > db.version()
    3.4.10


### How to change MongoDB versions {#change-version}

*Not available for Sandbox databases*  

If you have a for-pay deployment, you can upgrade (or change) the version of MongoDB you are running directly from the mLab management portal. The process is seamless if you are [making a replica set connection][docs-rs-conn] to one of our Cluster plans.

#### Prerequisites {#version-change-prerequisites}
{:.no_toc}

We strongly recommend reviewing the following before a release (major) upgrade:

- [The requirements for the version to which you are upgrading][docs-mongoversion]
- [MongoDB's Driver Compatability reference][minc-driver-compat-ref]

#### Steps to change versions {#version-change-steps}
{:.no_toc}

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment that will be modified.
1. Click the "Tools" tab.
1. Under the "Initiate maintenance operation" header, select the "Change MongoDB version" option.
1. Select the desired version in the drop-down menu that appears below "This deployment is running MongoDB version..."
1. Read the instructions and requirements carefully before clicking the "Upgrade to..." or "Patch to..." button.
1. Confirm that you want to proceed. This will automatically initiate the version change process.

#### What to expect {#version-change-process}
{:.no_toc}

If you have a replica set cluster plan, the entire process should take just a few minutes to complete although some exceptions[^foot-text] may apply.

We will first restart your non-primary nodes (e.g., arbiter and secondary node(s)) with the binaries for the new version. Then we will intentionally fail you over in order to upgrade your original primary. Finally, we will fail you back over so that your original primary is once again primary. You should experience no downtime if your drivers and client code have been properly configured with a [replica set connection][docs-rs-conn]. Note that during failover, it may take 5-30 seconds for a new member to be elected primary.

If you are on a single-node plan, your database server will be restarted which usually involves approximately 20 seconds of downtime.

{:.note-box}
<div markdown="1">
If your Dedicated plan deployment is currently running 3.0.x with the MMAPv1 storage engine, an upgrade to 3.2.x will also include an automatically migration to the WiredTiger storage engine via our rolling node replacement process.  [Read more about this process](#version-change-duration) down below.
</div>
{:.note-box}

### Frequently asked questions {#version-change-faq}

#### Q. Are for-pay deployments automatically upgraded when mLab supports a new MongoDB version?
{:.no_toc}

##### Maintenance (minor) versions 
{:.no_toc}

We do not automatically patch any for-pay deployments to the latest maintenance/minor version (e.g., 3.2.11 to 3.2.12). Instead, we send out email notifications if maintenance releases have very important bug fixes in them.

That being said, if there were any truly critical issues (e.g., one that would result in data loss), it's likely that we would automatically patch and send a notification.

##### Release (major) versions
{:.no_toc}

The only time we will automatically upgrade the MongoDB version on a for-pay deployment is when we de-support the currently-running version.

We typically support at least two release (major) versions on our for-pay Shared plans and three release versions on our Dedicated plans ([listed here](#available-versions)). Eventually, as release versions are de-supported, an upgrade will be necessary. In those cases, we send multiple notifications well in advance of a mandatory upgrade such as this [example notice][docs-201609-event]. If the user doesn't perform the upgrade at their convenience by the stated deadline, we will automatically perform the version upgrade to our minimum supported version.

#### Q. Why can't I change the MongoDB version that's running on my Sandbox database?  
{:.no_toc}

Because our Sandbox databases are running on server processes shared by multiple users, version changes are not possible. To run on a specific version of MongoDB, you will need to upgrade to one of our for-pay plans which provide your own `mongod` server process and the flexibility of making version changes at your convenience.

#### Q. How do I test a specific maintenance (minor) version?
{:.no_toc}

We do not offer the ability to change to a specific maintenance (minor) version. Maintenance versions are supposed to contain only bug fixes and patches and as a result, we don't consider it necessary to treat these versions (e.g., 3.2.11 and 3.2.12) differently. At any given time, we offer only the latest maintenance version of each release.

That being said, if you are upgrading to a different release (major) version (e.g., 2.6.x vs. 3.0.x), we highly recommend thorough testing in a Staging environment.

#### Q. Can I skip a release (major) version when going from one version to another?
{:.no_toc}

MongoDB does not allow release (major) versions to be skipped. For example, you cannot go straight from MongoDB 3.0.x to 3.4.x.  You must first upgrade your deployment to 3.2.x before upgrading to 3.4.x. 

Furthermore, we recommend waiting a few days between version upgrades to make sure there are no issues before proceeding to the next version.

#### Q. How much time does a version change take? {#version-change-duration}
{:.no_toc}

[Binary upgrades](#version-change-process) take just a few minutes.

However, note that on our Dedicated plans, the upgrade from 3.0.x to 3.2.x also includes an automatic migration to the WiredTiger storage engine and as such is a two-step process:

**Step 1**: Upgrade binaries from 3.0.x to 3.2.x

This requires a rolling process restart which takes just a few minutes. When complete, a support ticket to track the next step will automatically be created and the listed Technical Contact on your account will be notified that the migration to WiredTiger has begun.

**Step 2**: Migrate to the WiredTiger storage engine

This process uses our seamless [rolling node replacement process](#rolling-node-replacement). Since [MongoDB's initial sync process][minc-resync] needs to complete during a storage engine migration, this process typically take several hours (more for larger datasets). Check your email for updates, as you will be prompted for the required failover with detailed instructions.

#### Q. How do I mitigate the risks of migrating to WiredTiger {#how-to-mitigate-risks-migrating-to-wiredtiger}
{:.no_toc}

From a database functionality perspective, the older MMAPv1 storage engine and the newer WiredTiger storage engine are the same.  However, if you are worried about the process, note that:

* You will be able to control when Step 4 of [our rolling node replacement steps](#steps-to-replace-multiple-nodes-in-a-cluster) occurs. This means that if there is an unexpected issue with your Primary on the WiredTiger storage engine, you'll still have an opportunity to fail back over to your original Primary running on the MMAPv1 storage engine.

* We advise checking for pre-existing performance issues or an undersized deployment. WiredTiger offers significant compression benefits and typically offers more efficient disk I/O, but it does have greater CPU requirements.
 
## Viewing and killing current operations {#ops-mgmt}

*Not available for Sandbox databases*

Although there can be many reasons for unresponsiveness, we sometimes find that particularly long-running and/or blocking operations (either initiated by a human or an application) are the culprit. Some examples of common operations that can bog down the database are:

- Operations on unindexed fields
- Index builds
- Expensive map-reduce jobs

To quickly see if one or more operations are particularly long-running, use the [tool in the mLab management portal][blog-ops-ui].

If you have a Dedicated plan, you can directly get a report on these current operations by running the [`db.currentOp()`][minc-currentop] method in the mongo shell. In addition, you can use the [`db.killOp()`][minc-killop] helper method in the mongo shell to terminate a currently running operation. To do this pass the value of the `opid` field as an argument to [`db.killOp()`][minc-killop]. 

Don't hesitate to contact <support@mlab.com> for help. If you have a Dedicated plan and are in an emergency situation, use the emergency email that we provided to you.

Additional reading from the mLab Blog: [Finding and terminating long-running operations in MongoDB][blog-ops]

## Restarting your MongoDB processes {#restarts}

*Not available for Sandbox databases*

On a rare occasion, you may need to restart your server processes. If you have a for-pay database, you can do this directly from the mLab management portal. 

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment that needs to be restarted.
1. Click the "Tools" tab.
1. Under the "Initiate maintenance operation" header, select option with the "Restart" prefix.
1. Click the "Restart" button. 
1. Follow the instructions in the "Warning" window to confirm the restart, then click the "Restart" button.

If you have a replica set cluster with auto-failover, we will use MongoDB's `replSetFreeze` command to ensure that your current primary remains primary during the restart. Then we will restart each of your nodes in turn. The entire process could take a few minutes, but you should only lose access to your primary for about 20 seconds.

If you are on a single-node plan, your database server will be restarted which typically involves approximately 20 seconds of downtime.

__Sandbox database limitations__  
Because our Sandbox databases are shared by multiple users, restarting MongoDB on-demand is not possible. If you suspect a restart is required, contact <support@mlab.com>.

## Compacting your database deployment {#compacting}

Sometimes it's necessary to compact your database in order to reclaim disk space (e.g., are you quickly approaching your storage limits?) and/or reduce fragmentation. When you compact your database, you are effectively reducing its  file size.

### Understanding file size vs. data size 
{:.no_toc}

{:.note-box}
<div markdown="1">
The `fileSize` metric is reported under the "Size on Disk" heading in our management portal. It is only relevant for deployments running the MMAPv1 storage engine.
</div>
{:.note-box}

Deployments running the MMAPv1 storage engine (including Sandbox and Shared plans) use the `fileSize` (as opposed to `dataSize`) value from the output of the `dbStats` command as the basis for determining whether you are nearing your storage quota. However, when you compare the two metrics, you'll notice that `fileSize` is often a much larger value. This is because when MongoDB deletes objects, deletes collections, or moves objects due to a change in size, it leaves "holes" in the data files. MongoDB does try to re-use these holes but they are not freed to the OS. 

For a more detailed explanation of how this works, read our discussion
about [how MongoDB's size metrics are calculated with the MMAPv1 storage engine][docs-dbstats].

### How to compact your database(s) 
{:.no_toc}

If you are on a multi-node, highly available replica set cluster plan (Shared or Dedicated) and would like to try to reclaim disk space, you can do so while still using your database. However, compacting a Sandbox or any single-node plan will require downtime while the compaction is taking place.

#### Compacting Sandbox and single-node plan deployments {#compacting-sandbox-or-single-node}
{:.no_toc}

If you are on a Sandbox or single-node plan and would like to try to reclaim disk space, you can use MongoDB's [`repairDatabase`][minc-repairdb] command.

If your `fileSize` or "Size on Disk" is under 1.5 GB, you can run this repair command directly through our UI by visiting the page for your database, clicking on the "Tools" tab next, and then selecting "repairDatabase" from the drop-down list. Otherwise, you can run the `db.repairDatabase()` command after connecting to your database with the mongo shell.

We would also be happy to run this command for you---send your request to <support@mlab.com>.

If you have run `repairDatabase` on your Sandbox database and are wondering why it's not compacting further, we have [some possible explanations for you below](#sandbox-not-compacting).

{:.warning-box}
<div markdown="1">
The `repairDatabase` command is a blocking operation. Your database will be unavailable until the repair is complete.
</div>
{:.warning-box}

#### Compacting Shared Cluster plan deployments {#compacting-shared-cluster}
{:.no_toc}

The process we use for compactions on Shared Cluster plans is to resync each node from scratch. This is a better method of reclaiming disk space than `db.repairDatabase()` because when resyncing a secondary member of your replica set, you'll be able to use the primary member of your replica set.

High-level process:

1. Resync the current secondary node using an [initial sync][minc-resync].
2. Initiate a failover.
3. Resync the now secondary, originally primary.

Steps to compact:

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the Shared Cluster deployment that you want to compact.
1. On the "Databases" tab, note values in the "Size" and "Size on Disk" columns.
   - If your database's "Size on Disk" is only a little larger than the "Size" a compaction will have no or little effect. A good rule of thumb is that a compaction is only likely to be effective if the "Size on Disk" is more than 30% larger than the "Size" value.
1. Navigate to the "Servers" tab.
    1. For the node that's currently in the state of SECONDARY, click the action button at the far right of the row and choose the option "Resync".
    1. Wait for the sync to complete (this typically takes anywhere from a few minutes to half an hour).
    1. For the node that's currently in the state of PRIMARY, click the action button at the far right of the row and choose the option "Step down (failover)".
    1. Once the original primary is in the state of SECONDARY, click the action button at the far right of the row and choose the option "Resync".

{:.warning-box}
<div markdown="1">
Your deployment will not have the same level of availability during the maintenance because the node being synced will be unavailable. In addition, backups could be delayed or cancelled while the sync is in progress.
</div>
{:.warning-box}

{:.note-box}
<div markdown="1">
An application will gracefully handle failover events if it has been properly configured to [use a replica set connection][docs-rs-conn].
</div>
{:.note-box}

#### Compacting Dedicated Cluster plan deployments {#compacting-dedicated-cluster}
{:.no_toc}

The process we use to compact a Dedicated Cluster plan deployment is our seamless rolling node replacement process. This is the best method of reclaiming disk space because your deployment will maintain the same level of availability during the process. Read about mLab's [rolling node replacement process](#rolling-node-replacement) below.

Steps to compact:

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the Dedicated Cluster deployment that you want to compact.
1. Click the “Tools” tab.
1. Under the "Initiate maintenance operation" header, select the "Compact using MongoDB’s initial sync process" option.
1. Read the recommendation on whether or not to compact.
1. Select the failover option in the drop-down menu that appears at the bottom of the "Failover Preference" section.
1. Click the "Compact" button and confirm that you want to proceed. This will automatically initiate a rolling node replacement to compact your deployment.

### Frequently Asked Questions (FAQ) {#compacting-faq}
{:.no_toc}

#### Q. Why won't my Sandbox database compact further? {#sandbox-not-compacting}
{:.no_toc}

If you have run the `repairDatabase` command on your Sandbox database according to the instructions above and yet the `fileSize` metric (which is reported under the "Size on Disk" heading in mLab's management portal) is still 496 MB, the explanations below might help you understand why.

But first, note that the portal also includes a heading labeled "Size". The value under this heading represents the total size of the data plus indexes in your database, whereas the "Size on Disk" value mentioned above represents the overall storage footprint for your database on disk. Depending on the value under the "Size" heading, we can explain why the "Size on Disk" value is not decreasing.

__"Size" over 240 MB__

If the size of data plus indexes ("Size") is more than 240 MB, then the `fileSize` ("Size on Disk") cannot be compacted below 496 MB. This is because mLab's Sandbox databases are run with MongoDB's `smallFiles` configuration option. This option results in the allocation of data files in increasing sizes (i.e., the first data file is 16 MB, the second is 32 MB, then 64 MB, 128 MB, and 256 MB). This means that if your database contains more than 240MB of data, then the combination of the 16, 32, 64 and 128 MB data files is not enough, resulting in the use of the 256 MB data file and a "Size on Disk" value of at least 496 MB.

__"Size" under 240 MB__

If the size of data plus indexes ("Size") is less than 240 MB, you'll need to investigate more deeply.  Common reasons include (but are not limited to):

 - Capped collection(s)
 - Extremely large document(s)
 - A large number of collections
 - A large number of indexes

Contact <support@mlab.com> if you could use our assistance determining why your Sandbox database is not compacting any further.

## Initiating a failover for your cluster  {#failover}

If you would like to force your current primary to step down, you can do so through the mLab management portal. The following instructions are the equivalent of running the `rs.stepDown()` function in the mongo shell:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment that needs a failover. 
1. Click the "Servers" tab.
1. For the node that's currently in the state of PRIMARY, click the action button at the far right of the row and choose the option "Step down (failover)".
1. In the dialog box that appears, click the "Step down" button.


## mLab's rolling node replacement process  {#rolling-node-replacement}

If you are on a replica set cluster plan with auto-failover, mLab's rolling node replacement process will allow you to maintain high availability and keep your existing connection string during scheduled maintenance. If your application/driver is [properly configured for replica set connections][docs-rs-conn], you should experience no downtime during this process except during failover. 

{:.note-box}
<div markdown="1">
A Dedicated Cluster plan cannot be downgraded to a Shared Cluster plan using the rolling node replacement process. However, a downgrade from one Dedicated Cluster plan to another Dedicated Cluster plan using this process is both possible and recommended.
</div>
{:.note-box}


#### What is this process used for? 
{:.no_toc}

The rolling node replacement process is most commonly used for:

- Upgrading or downgrading plans
- Migrating to the WiredTiger storage engine
- Compactions

#### Steps to replace multiple nodes in a cluster
{:.no_toc}

Replacing all electable nodes in a cluster:

1. For every node to be replaced, mLab will add a new, hidden node to the existing replica set.
    - To expedite the process, we will use a recent block storage snapshot whenever possible as the basis for this new node.
    - Otherwise, the replacement node will need to undergo [MongoDB's initial sync process][minc-sync].
1. Wait for the new nodes to be in the SECONDARY state and in sync with the primary (i.e., no replication lag).
1. For every secondary to be replaced, mLab will swap it out, updating DNS records to preserve the connection string.
1. You or mLab will intentionally initiate a failover so that your current primary becomes secondary.
1. mLab will swap out the final node, now secondary, with the new node, updating DNS records to preserve the connection string.

#### Steps to replace one node in a cluster
{:.no_toc}

Replacing one node in a cluster:

1. mLab will add a new, hidden node to your existing replica set.
    - To expedite the process, we will use a recent block storage snapshot whenever possible as the basis for this new node.
    - Otherwise, the replacement node will need to undergo an [initial sync][minc-sync].
1. Wait for the new node to be in the SECONDARY state and in sync with the primary (i.e., no replication lag).
1. If the node being replaced is currently primary, either you or mLab will intentionally initiate a failover so that your current primary becomes secondary.
1. mLab will swap out your existing node with the new node, updating DNS records to preserve the connection string.

#### Expected impact on running applications 
{:.no_toc}

The rolling node replacement process is mostly seamless. However, be aware that:

* If MongoDB's initial sync process is necessary for the maintenance event (e.g., during a compaction), the syncing process will add additional read load during the initial, clone phase of the initial sync.

* During a failover it may take 5-30 seconds for a primary to be elected. If your application has not been configured with a [replica set connection that can handle failover][docs-rs-conn], writes will continue to fail after the new primary is elected. As such, mLab will coordinate with you for the required failover unless you explicitly tell us it's not necessary (see next section).

* MongoDB's replica set reconfiguration command, [replSetReconfig][minc-reconfig], will be run in an impactful way two times during this process. While this command can sever existing connections and temporarily cause errors in driver logs, these types of disconnects usually have minimal effect on application/drivers that have been configured properly.

#### Notification and coordination 
{:.no_toc}

Swapping out a current secondary:

- We will notify you when we swap out your current secondar(ies) with replacement nodes.

Swapping out your current primary:

- When your current primary is ready to be swapped out, we will coordinate with you so that you can initiate the required failover at the time that makes the most sense for you and/or your team.
- If you know that your application has no trouble handling failover, let us know, and we can initiate the required failover on your behalf immediately before we swap out your current primary.

#### Additional charges {#rnr-additional-charges}
{:.no_toc}

The extra virtual machines that are used during a rolling node replacement process in order to maintain the same level of availability may incur charges.

<br />

---

[^foot-text]: Database server processes for deployments with a large number of databases can take significantly longer to start.




