---
layout: default-nosearch
title: Backup and Recovery
permalink: /backups/
description: Create an mLab backup using mLab's backup system to archive and restore a MongoDB database when you lose data or need a copy
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:        https://mlab.com/login
[docs-secureS3]:     {{ site.url }}/secure-S3-bucket
[docs-S3-require-enc]: {{ site.url }}/secure-S3-bucket#require-encryption
[minc-installmongodb]:    https://docs.mongodb.com/{{ page.minc-docversion }}/installation/
[minc-installcommunity]:  https://docs.mongodb.com/{{ page.minc-docversion }}/administration/install-community/
[minc-mongodump]:    https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongodump/       
[minc-mongorestore]: https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongorestore/       
[docs-helpertool]:   /migrating/#prefilled-commands
[minc-dbstats]:      https://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/dbStats/
[minc-user-auth-26]: https://docs.mongodb.com/v3.0/release-notes/2.6-upgrade-authorization/
[minc-oplog]: https://docs.mongodb.com/manual/core/replica-set-oplog/
[mlab-account]:      https://mlab.com/account-details
[boto-tutorial]:     http://boto.readthedocs.org/en/latest/s3_tut.html
[aws-SSE-S3]:        http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[aws-ec2-instances]:          http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance_linux
[aws-ebs-restoring-volume]:   http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-restoring-volume.html
[view-aws-ebs-snapshots]:   http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-describing-snapshots.html
[amazon-ec2-console]:       https://console.aws.amazon.com/ec2/
[docs-data-disk-encryption]:  /security/#data-disk-encryption
[intel-faq-downloading]:    https://software.intel.com/en-us/faq/downloading

{% comment %} IMAGE LINKS {% endcomment %} 
[img-backup]:    /assets/screenshot-backup.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

Taking regular backups and knowing what to do to recover from data loss and corruption events are both very important. A multi-node replica set cluster helps protect against system failure, but it will not protect your data from human error (e.g., accidentally deleting data or deploying bad code). This is why backups are such a crucial part of any production database deployment.

In addition, taking and restoring backups is often a useful way to migrate known datasets between environments.

You can implement a backup and recovery strategy for your mLab-hosted deployment by using:

- [mLab's backup system](#mlab-backup-system) and/or 
- [MongoDB's `mongodump` and `mongorestore` utilities](#dump-and-restore) (on your own)

## Using mLab's backup system {#mlab-backup-system}

mLab's backup system offers an easy way, through the mLab management portal, for users to create a one-time backup or schedule recurring backups.

In addition, mLab's backup system offers a easy ways to restore a backup into an mLab-hosted deployment.

### Supported backup methods {#mlab-backup-methods}

There are two different methods used by mLab's backup system to take a backup: using the `mongodump` tool or taking a block storage snapshot (i.e., filesystem snapshot).

{:.note-box}
<div markdown="1">
For replica set cluster plans (Shared or Dedicated), mLab's backup system exclusively takes backups from secondary members to minimize the impact of backups.
</div>
{:.note-box}

#### mongodump 
{:.no_toc}

For Sandbox or Shared plan deployments, mLab's backup system uses MongoDB's `mongodump` tool. This utility queries your database deployment and creates BSON files which can then be used by the `mongorestore` tool to populate a database deployment. Dedicated plan deployments can choose to use the mongodump method or use block storage snapshots as described in the following section.

`mongodump` is great for small MongoDB deployments because the resulting backup is both portable and space-efficient. However, it is not a good backup and recovery strategy for larger deployments because of how time- and resource-intensive the strategy can be; most importantly, `mongorestore` must rebuild indexes as part of the restore. Also, note that `mongodump` backups do not include the `local` database which includes the operations log (oplog).

When using the mongodump method through mLab's backup system, backups can be stored in mLab's cloud storage containers or in custom Amazon S3 buckets.

#### Block storage snapshot of underlying data files 
{:.no_toc}

*Available for Dedicated plans only*  

Another way to create a MongoDB backup is to snapshot MongoDB's underlying data files using a file system or "block-level" backup method.

On Dedicated plans, mLab's backup system takes block storage snapshots to create backups of a MongoDB deployment at an exact moment in time. The mechanics of how these block storage snapshots are taken and how they can be used will vary by cloud provider. For example, we use Amazon EBS Snapshots on AWS, and we use Microsoft's blob snapshot features on Azure.

Block storage snapshots are preferred for larger MongoDB deployments because they tend to be orders of magnitude faster to both take and restore than the mongodump/mongorestore method. In addition, block storage snapshots include the `local` database which holds the [`oplog`][minc-oplog] while the mongodump method does not back up this operations log.

### Creating backups {#create-backups}

You can use mLab's backup system to take a one-time backup or set up a backup plan to take backups on a recurring schedule.

#### Step-by-step guide {#instructions}

__Backing up your Sandbox or Shared plan deployment__  
When you request a backup for your Sandbox or Shared plan deployment, mLab's backup system will use MongoDB's [`mongodump`][minc-mongodump] utility to create it. 

Follow these instructions to create backups for your Sandbox or Shared plan deployment:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment from which you will be taking a backup.
1. Click the "Backups" tab.
1. For a one-time backup, click the "Take one-time mongodump" button.
    - To take automatic backups on a regular basis, click the "Schedule recurring backup" button instead.
1. In the form that appears, select the desired options for each of the following:
    - Schedule (for recurring backup plans only)
    - Target (i.e., where you want your backup to be stored)
1. Click "Submit" to start the backup process.
    - For recurring backup plans, this button is labeled "Create backup plan".

__Backing up your Dedicated plan deployment__  
Creating backups for your Dedicated plan deployment has an option not available with other plan types: the ability to choose between block storage snapshots or `mongodump` as the backup method. 

By default, all newly provisioned Dedicated plans come with one daily recurring backup plan using the block storage snapshot method. You can create additional backup plans to suit your needs.

Follow these instructions to create backups for your Dedicated plan:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment from which you will be taking a backup.
1. Click the "Backups" tab.
1. For a one-time backup, click the "Take one-time backup" button.
    - To take automatic backups on a regular basis, click the "Schedule recurring backup" button instead.
1. In the form that appears, select the desired options for each of the following:
    - Backup type: mongodump or block storage snapshot
    - Schedule (for recurring backup plans only)
    - Target (i.e., where you want your [backup to be stored](#storage-options))
1. Click "Submit" to start the backup process.
    - For recurring backup plans, this button is labeled "Create backup plan".

{:.note-box}
<div markdown="1">
Prior to January 2018, backup plans could be created with the "Hybrid" backup strategy which uses mongodump if [dataSize][minc-dbstats] is less than 50GB, and block storage for 50 GB and above. Existing backup plans with this option are still valid but this option is not available for new backup plans.
</div>
{:.note-box}

#### Storage options {#storage-options}

##### Backups taken using mongodump {#mongodump-storage}
{:.no_toc}

mongodump-based backups are stored as compressed archives (.tgz) of [`mongodump`][minc-mongodump] outputs. Backups of this type can be stored in either:

1. A secure mLab-owned container 
   - On AWS, mongodump-based backups to mLab-owned containers are stored in the same AWS region as the database.
   - mLab-owned containers are encrypted at rest.
1. Your own Amazon S3 bucket
    - We highly recommend that you [secure your S3 bucket][docs-secureS3] first.
    - mongodump-based backups to a custom AWS S3 bucket are stored in the region of the AWS S3 bucket.
    - You can also choose to have your mLab backups stored encrypted at rest in your own S3 bucket using [server-side encryption with Amazon S3-managed encryption keys (SSE-S3)][aws-SSE-S3]. Enabling this encryption will not incur any additional charges and does not require any changes on your end. However, you may choose to [require server-side encryption for all objects uploaded to your S3 bucket][docs-S3-require-enc].
    

##### Backups taken as block storage snapshots {#snapshot-storage}
{:.no_toc}

*Available for Dedicated plans only*  

Block storage snapshots are file system or "block-level" snapshots of MongoDB's underlying data files. Backups of these types can *only* be stored in mLab's cloud account:

- Block storage snapshots are stored in mLab's account with the same cloud provider and in the same region that your deployment is hosted on (e.g., AWS, Azure, or Google).
- On AWS, if your deployment has [encrypted data disks][docs-data-disk-encryption], EBS Snapshots of those disks cannot be shared with another AWS account. However, if its data disks are *not* encrypted, EBS Snapshots *can* be shared with another AWS account. When you fill out the backup creation form, enter the AWS Account ID that you want to share the EBS Snapshot with. On Azure and Google Cloud Platform, block storage snapshots are not shareable.

{:.note-box}
<div markdown="1">
EBS Snapshots (applicable to AWS only) are still owned and managed by mLab's AWS account even if they are shared with another AWS account. If you'd like them to be owned and managed by your own AWS account, you can copy the EBS Snapshot to your own AWS account either manually or programatically via AWS's API. 

If you're having trouble finding the EBS Snapshots that we have shared with your account through AWS's management console, be sure to pull down the drop-down such that it says "Private Snapshots" in the same region that your mLab deployment is hosted.
</div>
{:.note-box}


### Accessing backups {#access}

All completed backups appear under the "Backups" tab of each deployment with informative details such as when the backup started/ended, the size of the original source, the size of the resulting backup, and more.

Backups for deployments that have already been deleted can be accessed by going to the [Account Settings page][mlab-account] for your account and clicking on the "Backups" tab.

{:.note-box}
<div markdown="1">
The system-level backups mLab takes for disaster recovery purposes will not appear under the "Backups" tab. See the [Frequently Asked Questions section below](#faq) if you need access to one of these.
</div>
{:.note-box}


__Backups taken using mongodump__  
For backups taken using `mongodump`, the icons on the far right side of each row allow you to delete, download, or view the log file for the backup. The backup itself is compressed into a .tar file and when extracted, the backup-related files are in the form of a binary dump which is the standard output of MongoDB's [`mongodump`][minc-mongodump] utility.

You do not need to retrieve the backup if you want to [use your mLab-created backup to create a new mLab deployment](#restore). However, if you need to retrieve your `mongodump` backup created by mLab's backup system for other purposes, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment with the backup you want to retrieve.
1. Click the "Backups" tab.
1. Under the "Backups" header, find the row with the backup that you want to download.
   - Click anywhere on the row to see additional details about the backup (e.g., backup ID, start and end time, type, size, etc.). 
1. Click the action button at the far right end of the row and choose the option "Download backup".  The compressed file will be automatically downloaded to your local machine.
![img-backup][img-backup]
1. Extract and decompress the contents into your desired directory using the following command:   
`tar -xvf myfilename.tgz`
1. You are now ready to restore your database or individual collection(s) from your backup [using the `mongorestore` utility](#dump-and-restore).

{:.note-box}
<div markdown="1">
If you need to programatically access your backups, one option is to store your backups in your own Amazon S3 bucket and use the [boto python interface][boto-tutorial] to access them. 
</div>
{:.note-box}


__Backups taken as block storage snapshots__  
For Dedicated plan deployments that use this method, block storage snapshots can be restored very quickly. See the [Restoring a backup](#restore) section below. 

Additionally, for EBS Snapshots (AWS only), there is a button on the far right side of the row which, when clicked, allows you to share the EBS Snapshot with another AWS account.  However, EBS Snapshots from deployments with [encrypted data disk][docs-data-disk-encryption] cannot be shared with another AWS account.

#### Retention policies {#retention-policies}

Depending on the type of backup and where it is stored, the retention policy for backups taken using mLab's backup system is based on the following rules:

Backup event | Stored in your Amazon S3 bucket  | Stored in mLab's cloud account [^foot-mlab-account]
------------- | ------------- | ------------- 
One-time backup  | Backups are never deleted | Backups are deleted after 30 days
Recurring backup plan backup | Retention based on "number to keep" value  | Retention based on "number to keep" value [^foot-retention]
Recurring backup plan deleted | Backups are never deleted | Backups are kept for 8 days beyond expected deleted date

If a deployment is deleted, the retention policy is the same as if the recurring backup plan were deleted (as specified above). Backups for deleted deployments can be accessed by logging into your mLab account, visiting the [Account Details page][mlab-account], and clicking on the "Backups" tab.

{:.note-box}
<div markdown="1">
mLab may delay the physical destruction of backup data for a short period of time (approximately a week) to help guard against accidental deletion.

As an exception to the above rule, we store some mongodump-based backups in cold storage for up to 8 weeks as an additional safeguard. After your deployment has been deleted, you may submit a request to support@mlab.com to delete such backups, if any, immediately.
</div>
{:.note-box}


### Restoring backups {#restore}

You can use the backups taken with mLab's backup system to easily restore data. mLab does not charge you when you use a backup to restore data.  

#### Supported restore methods {#mlab-backup-restore-methods}

There are two different methods to restore a backup taken by mLab's backup system:

- Create a new deployment from a backup.
- Replace an existing deployment with a backup.

##### Create a new deployment from a backup {#create-new-from-backup}
{:.no_toc}

If you want to use your [mLab-created backup](#create-backups) to create a new mLab deployment, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, click the "Create from backup" button.
1. Select the backup source (all eligible backups will be listed by deployment or you can enter a backup ID).
1. Complete the remaining options to configure your new deployment.
1. Click "Submit Order" and your new deployment will be created using your selected backup.

##### Replace an existing deployment from a backup {#restore-from-backup}
{:.no_toc}

*Not available for Sandbox databases* 

{:.note-box}
<div markdown="1">
When you restore a backup into an existing deployment, it is required that the target deployment be empty before we can replace it with a backup. You can either delete all the databases in your target deployment before attempting to do an in-place restore, or you will be prompted to delete it before the backup restore happens.
</div>
{:.note-box}

If you want to use your [mLab-created backup](#create-backups) to take the place of an existing mLab deployment, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment into which you want to restore a backup.
1. Click the "Tools" tab.
1. Click the "Restore from backup" button.
1. Select the backup source (all eligible backups will be listed by deployment or you can enter a backup ID).
1. If restoring from a mongodump, select database(s) from which to restore.
1. Click the "Restore from backup" button to start the process.
1. You will be prompted to confirm the process by manually entering your replica set ID in the pop-up window before the backup restore begins.

{:.warning-box}
<div markdown="1">
This deployment will not be available for the duration of the restore. Also, all changes (i.e., inserts/updates/deletes) that occurred since the backup will be lost.
</div>
{:.warning-box}

#### Restore considerations

mLab's restore features will only allow options/actions that apply to a given backup. Therefore, it is important to keep in mind the following limitations and restrictions when restoring a backup. If you continue to have questions or problems while restoring your backup, contact our support team at <support@mlab.com>, and we'd be happy to help.

__General limitations and restrictions__

- The MongoDB release version from which the backup was taken must match the target MongoDB release version.
    - For example, a backup taken from a deployment running MongoDB 3.0.5 can be restored into version 3.0.12 but not version 3.2.12.
    - To workaround this restriction, you can change the version of the source deployment prior to taking the backup or change the version of the target deployment prior to restoring.
- The target deployment must be in the same mLab account.
    
__Restoring from a block storage snapshot__

In general mLab recommends restoring using a block storage snapshot whenever possible, as block storage snapshots are generally orders of magnitude faster to restore. That being said, there are certain restrictions specific to block storage snapshots that you must keep in mind:

- The target deployment must be a Dedicated plan.
- The target deploymnt must be in the same region as the backup source.
- The target deployment's storage capacity needs to be at least as big as the backup source's storage capacity.
     - For restores of High Performance plan backups, the target must be another High Performance plan and/or a plan with 1 TB of storage capacity.
- Only full deployment restores are possible (i.e., not possible to restore a single database).

__Restoring from a mongodump__

When it's not possible to restore from a block storage snapshot, you can restore from a mongodump. Note the following restrictions when restoring from a mongodump:

- If the target is a Sandbox, `--oplogReplay` is not possible.
    - This means that if you need a consistent restore to a Sandbox, you'll need to ensure that no writes are occuring on the source while the mongodump is running.
- The storage capacity of the target plan/deployment must be large enough to fit the restored mongodump.
- The RAM available on the target must be sufficient to build all of the indexes in a reasonable amount of time.

#### Recommendations for common restore use cases {#restore-recommendations}

Below are some common backup restore use cases and out recommendations how to address them.

{:.note-box}
<div markdown="1">
We generally recommend restoring a block storage snapshot over a mongodump unless restoring from a block storage snapshot is not an option.
</div>
{:.note-box}

**Use Case: Human error causing lost data and/or corrupted data**

1. [Create a new deployment from a backup](#create-new-from-backup).
1. After the new deployment is running, retrieve the lost data/fix the corrupted data using the data from the new deployment.

**Use Case: Creating another environment (e.g., development, staging, etc.)**

1. [Create a new deployment from a backup](#create-new-from-backup).
1. [Add database user(s)](/connecting/#users). For security reasons, we highly recommend using different credentials from the production database(s).
1. Check [database and network security](/security/#database-and-network-security) settings are right for this environment.

**Use Case: Refreshing an existing non-production deployment**

1. [Replace an existing deployment from a backup](#restore-from-backup).

### Backup Fees {#backup-fees}

When taking a backup of a database on a Sandbox or Shared plan, there may be a fee as described below. 

__Sandbox plan__

Backups are 50 cents ($0.50) per run. For example, the monthly cost for a daily backup during a 30-day month would be $15.00 USD. 

__Shared plan__

One daily (recurring) backup plan is included free of charge with every Shared plan database.  Additional backups are 50 cents ($0.50) per run. 

__Dedicated plan__  

Unlimited backups are included free of charge and will be retained for up to 8 weeks.

{:.note-box}
<div markdown="1">
Starting January 2018, backup fees for Sandbox and Shared plan databases were simplified and reduced. Backups have always been free and unlimited for Dedicated plan deployments.
</div>
{:.note-box}

## Using mongodump/mongorestore {#dump-and-restore}

mLab's backup system is great for creating and storing backups easily. However, there are times when it is necessary to use a more manual method to create or restore a database. 

MongoDB's [`mongodump`][minc-mongodump] and [`mongorestore`][minc-mongorestore] utilities are command-line tools that provide fine-grained data import and export capabilities. To download these utilities visit the [MongoDB download page][minc-installmongodb].

The mLab management portal includes a [command-line helper tool][docs-helpertool] that provides pre-filled command-line strings specific to your database. You can copy and paste them directly into a terminal session, filling in any placeholders before executing the command.

{:.warning-box}
<div markdown="1">
To minimize the possibility of error, the versions of your target database, source database, and mongodump/mongorestore utility should match. For example: use mongodump 3.2 to restore a backup taken from MongoDB 3.2 into a MongoDB 3.2 database. 

Note that the version of your mongodump/mongorestore utility must match the version of MongoDB you have deployed. If you have multiple MongoDB versions installed, be sure to use the correct one.
</div>
{:.warning-box}


### Basic method

Before you take a backup of a single database, you must first stop writes to that database.

Then, to take a backup of that database, run a command in a terminal window that looks similar to this:

    % mongodump -h ds012345.mlab.com:56789 -d dbname -u dbuser -p dbpassword -o dumpdir

To restore this backup, run a command that looks similar to this:

    % mongorestore -h ds023456.mlab.com:45678 -d dbname -u dbuser -p dbpassword dumpdir/*

### Point-in-time method

*Applicable to Dedicated plans only*

If you have a Dedicated plan, you can take server-wide mongodumps to export all of the databases on the server.

This method is useful because it allows you to use the the ``--oplog`` and ``--oplogReplay`` options to ``mongodump`` and ``mongorestore`` (respectively). The options allow for a point-in-time snapshot of the server by also including the oplog in the dump. This oplog is then replayed when you use the ``--oplogReplay`` option upon restore. 

{:.note-box}
<div markdown="1">
When doing a point-in-time server-wide dump or restore you must use credentials to the __admin__ database. 
</div>
{:.note-box}


To take a backup of an entire server, run a command in a terminal window that looks similar to this:

    % mongodump -h ds012345-a0.mlab.com:56789 --authenticationDatabase admin -u admindbuser -p admindbpassword -o dumpdir --oplog

To perform a point-in-time restore of all the databases in this backup, run a command that looks similar to this:

    % mongorestore -h ds023456-a0.mlab.com:45678 --authenticationDatabase admin -u admindbuser -p admindbpassword dumpdir --oplogReplay

{:.note-box}
<div markdown="1">
All mongodump backups taken by mLab's backup system are server-wide except for Sandbox plan backups. Use the ``--oplogReplay`` option with ``mongorestore`` to restore to the point in time when the mongodump completed.
</div>
{:.note-box}


## Frequently Asked Questions {#faq}


### Help---I lost my data and do not have a backup! {#system-level-backup-restore}
{:.no_toc}

Rest assured, we take daily system-level backups of the databases that we host for disaster recovery purposes. These backups are stored for a limited time (approximately one week), so in the event that you need to restore from a system-level backup, contact <support@mlab.com> and we will let you know if it's available. If a backup is available, we will do our best to restore it into a new deployment for you.

It typically takes anywhere from three to 18 hours to restore a system-level backup. If you feel that you will need to self-service backup restores, we encourage you to create a custom backup plan.


### I cannot mongodump because of a "system.users: not authorized" error {#systemdotusers-not-authorized-error}
{:.no_toc}

If you are running MongoDB 3.0 or above and trying to take a `mongodump` of a specific database you might encounter the following error:

     not authorized on mydb to execute command { count: "system.users", query: {} }

To avoid this error, try using the `--excludeCollection=system.users` option with `mongodump`. Adding this option will allow you to exclude legacy database users leftover when the [user authorization schema was upgraded in release 2.6][minc-user-auth-26].

### Why can't I restore my EBS Snapshot into a smaller plan? {#ebs-snapshot-restore-restrictions}
{:.no_toc}

The reason why our management portal is restricting what plans you can restore into is that AWS requires that EBS Volumes created from EBS Snapshots be at least as large as the original snapshot. 

If your source deployment is on our High Performance line, note that the plans on this line utilize in-chassis/local disks for the electable nodes but also include a third, hidden node that is EBS-backed and designated for EBS Snapshot backups. This backup node often utilizes very large General Purpose SSD (gp2) EBS Volumes because performance on this volume type scales with volume size, and we need these backup nodes to keep up with the electable nodes. Therefore, if you're restoring from an EBS Snapshot taken from our High Performance line, you will likely need to restore into the same High Performance plan as your source deployment or a Single-node High Storage M5+ plan.

### I cannot find the EBS Snapshot that was shared {#find-shared-ebs-snapshot}
{:.no_toc}

If you have shared your EBS Snapshot backup with your AWS account but cannot find your shared EBS Snapshot when you log into your AWS account, make sure that you are in the [Amazon EC2 console][amazon-ec2-console] and in the same region that your mLab deployment is hosted. Finally, make sure you have selected the drop-down option "Private Snapshots" from the snapshot filter list.

Note that EBS Snapshots from deployments with an encrypted data disk cannot be shared with another AWS account.

For more information on how to view EBS Snapshots in AWS, see [Viewing Amazon EBS Snapshot Information][view-aws-ebs-snapshots].

### How do I restore a shared EBS Snapshot in my own AWS account? {#restoring-shared-ebs-snapshot-in-own-aws-account}
{:.no_toc}

If you want to restore an EBS Snapshot that was shared with your own AWS account to a self-hosted MongoDB deployment, here are the high-level steps:

1. [Create an AWS Instance][aws-ec2-instances] in the same region as the EBS Snapshot.
1. [Create an EBS Volume from your EBS Snapshot][aws-ebs-restoring-volume] (in same Availability Zone as your Instance).
1. Attach this EBS Volume to the Instance.
1. After you're ssh'd into the Instance, mount the EBS Volume.
1. [Install the MongoDB Community Edition][minc-installcommunity] version that matches your database (e.g., 3.4.x)
1. When you start the `mongod` process set `storage.directoryPerDB` to true. Set the `storage.engine` to `mmapv1` or `wiredTiger` depending on the storage engine of the source deployment.

### The backup that I downloaded has the wrong extension (e.g. does not end in .tgz)? {#backup-downloaded-with-wrong-extension}
{:.no_toc}

mongodump-based backups are stored as compressed archives (`.tgz`) of [`mongodump`][minc-mongodump] outputs and should have the `.tgz` extension when you download them.

If you downloaded your mongodump-based backup, and it instead has a `.solitairetheme8` extension, one workaround is to rename the extension to `.tgz` or append the extension `.tgz` to the downloaded file.  Once that is done, you can extract and uncompress the file using `tar -xvf myfilename.tgz`.

An [Intel Developer Zone FAQ][intel-faq-downloading] also covers this issue; for additional workarounds and details see the last question on this page, "My product .tgz file downloaded with a .solitairetheme8 extension. What do I do?".

<br/>
<br/>

---

[^foot-mlab-account]: "Stored in mLab's cloud account" refers to either `mongodump` backups stored in mLab's cloud container or block storage snapshots taken in mLab's account with the cloud provider that your deployment is hosted on (e.g., AWS, Azure, or Google).

[^foot-retention]: Backup plans resulting in block storage snapshots stored in mLab's account have a "number to keep" of 8 backups. This number is not customizable although note that it is possible to create multiple backup plans.
