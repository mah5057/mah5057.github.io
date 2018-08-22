---
layout: default-nosearch
title: Migrating Data Into mLab
permalink: /migrating/
description: Copy an mLab database using mongodump and mongorestore, or other replication methods to migrate or transfer data
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:           https://mlab.com/login
[docs-ops]:             /ops
[docs-addcard]:         /accounts/#billing
[docs-dbuser]:          /connecting/#users
[docs-dumpandrestore]:  /backups/#dump-and-restore
[docs-rnr]:                  /ops#rolling-node-replacement
[minc-installmongodb]:    https://docs.mongodb.com/{{ page.minc-docversion }}/installation/
[minc-dumprestore]:     https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/backup-and-restore-tools/#binary-bson-dumps
[minc-mongodump]:       https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongodump/       
[minc-mongorestore]:    https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongorestore/       
[minc-importexport]:    https://docs.mongodb.com/{{ page.minc-docversion }}/core/import-export/
[minc-mongoexport]:     https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongoexport/      
[minc-mongoimport]:     https://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongoimport/       
[minc-databasecopy]:    https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/copy-databases-between-instances/
[minc-backup-role]:       https://docs.mongodb.com/manual/reference/built-in-roles/#backup

{% comment %} IMAGE LINKS {% endcomment %} 
[img-importexport]:       /assets/screenshot-importexport.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Migrating from an existing MongoDB deployment

There are several different ways to migrate data into mLab. The method you choose depends on your particular data source and your uptime requirements. 

If you have any questions about which process makes the most sense for your application, don't hesitate to contact <support@mlab.com> for help.

### Use mLab's migration tool {#mlab-migration-tool}

*Not available for Sandbox databases.*

If you are currently running a MongoDB instance that you would like to migrate over to a mLab-hosted deployment, you have the option to migrate with almost no downtime using mLab's migration tool. 

**Pre-requisites for Source Deployment**

1. Must be running version 2.6.x, 3.0.x, 3.2.x, or 3.4.x
  - Some restrictions apply if running 2.6.x but < 2.6.10
1. Must be running as a Replica Set
1. Must be able to supply mLab with an admin database user of the Replica Set that has least the privileges of the [backup role][minc-backup-role]
1. Must be able to allow inbound network access from a mLab-hosted deployment

**High-level Migration Steps**

1. Create your new deployment on mLab.
- If you're migrating into one of our Dedicated plans, we recommend creating a larger plan than you think you'll end up on to help with the initial bulk load. We pro-rate charges by the day and downgrades are seamless on our Dedicated Cluster plans via our [rolling node replacement process][docs-rnr].
- If you would like some help sizing your new deployment, please ask <support@mlab.com> for help.
1. Supply mLab with the credentials for a admin database user that has at least the privileges of the [backup role][minc-backup-role].
1. mLab will start the migration process and inform you when your mLab-hosted deployment is fully in-sync with your existing deployment.
- The migration tool will take an initial copy of your deployment and restore it into your mLab-hosted deployment.
- After that it will keep up-to-date with your deployment by tailing the source deployment's oplog.
1. You will confirm that you can connect and authenticate to your new mLab-hosted deployment.
1. When you are ready to finalize the migration to mLab:
  - You will stop writes to your application.
  - You will roll out a connection string change.

Contact <support@mlab.com> for more details on this migration method and/or if you'd like to get started.

{:.warning-box}
<div markdown="1">
Do not execute writes against the target deployment until the migration is complete or else there could be data integrity problems.
</div>
{:.warning-box}

### Using replica set replication {#replication}

*Available for Dedicated plans only.*  

If you are currently running a replica set that you would like to migrate over to one of mLab's Dedicated plans, you have the option to minimize downtime by using MongoDB's internal replication mechanisms.

Pre-requisites for the source deployment

1. Must be running version 2.6.x+, 3.0.x, 3.2.x, or 3.4.x
1. Must be running as a replica set
1. If running in "auth" mode, must be able to supply mLab with the replica set's key file (the value for the `--keyFile` option)
1. Must be able to allow network access from and to a mLab-hosted deployment

### Using mongodump / mongorestore {#dump-and-restore} 

MongoDB's [mongodump and mongorestore][minc-dumprestore] utilities are command-line tools that provide fine-grained data export and import capabilities. To download these utilities visit the [MongoDB download page][minc-installmongodb].

When you are ready to copy data from one MongoDB deployment to another, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. If you have not already done so, create a new mLab deployment as your target.
   - Be sure to create database user(s) on the new deployment.
1. To prevent data inconsistency, stop any processes running against your source deployment.
1. Take a backup your source deployment by running the [`mongodump`][minc-mongodump] command in a terminal window.
   - See below for a single-database example.
1. Restore the backup into your target deployment by running the [`mongorestore`][minc-mongorestore] command.
   - See below for single-database example.   
   - Also, mLab provides [pre-filled command-line strings for import/export commands](#prefilled-commands) to help.
1. Update your application with the target's connection URI and start writing to your new deployment.

#### Example {#mongodump-mongorestore-example}
{:.no_toc}

To `mongodump` a single database from your source deployment:

    % mongodump -h source_host:source_port -d dbname -u source_dbuser -p source_dbpassword -o dump_dir

To `mongorestore` this backup to your target deployment:

    % mongorestore -h target_host:target_port -d dbname -u target_dbuser -p target_dbpassword dump_dir/*

<p></p>

{:.warning-box}
<div markdown="1">
To minimize the possibility of error, the versions of your target database, source database, and mongodump/mongorestore utility should match. For example: use mongodump 3.0 to restore a backup taken from MongoDB 3.0 into a MongoDB 3.0 database. 

Note that the version of your mongodump/mongorestore utility must match the version of MongoDB you have deployed. If you have multiple MongoDB versions installed, be sure to use the correct one.
</div>
{:.warning-box}

### Using copydb {#copydb}

*Available for Dedicated plans only*  

MongoDB's [`copydb`][minc-databasecopy] command allows you to copy a database directly from a remote, source instance to the current, destination instance. 

This method is faster than mongodump/mongorestore, but you must have a Dedicated plan with mLab in order to run this command, since it requires full administrative privileges on the destination instance.

1. [Log in][mlab-login] to the mLab management portal.
1. If you have not already done so, create a new mLab deployment to host the destination database.
   - The destination database itself does not need to be created; the command will implicitly create it if it does not  exist.
1. If you have not already done so, create an [admin database user][docs-dbuser] for the destination deployment.
1. To prevent data inconsistency, stop any processes running against your source database.
1. In a terminal window, connect to the destination instance using the admin database user's credentials.
1. Run the [`db.copyDatabase()`][minc-databasecopy] helper method.
   - The expected order of arguments is somewhat confusing so take caution as you construct the command.
   - The duration of the copy process can vary widely, depending on the amount of data, number of indexes, network latency, etc..
1. When the copying has completed and you have updated your application with the new connection URI, you can start writing to your new database.

{:.warning-box}
<div markdown="1">
If you have SSL enabled on your deployment, note that `copydb` will not work unless the remote source also supports SSL.
</div>
{:.warning-box}


## Importing a JSON, CSV or TSV file {#import}

If you need to import or export data in a flat file (non-binary) format such as JSON, CSV, or TSV, the [`mongoimport`][minc-mongoimport] and [`mongoexport`][minc-mongoexport] commands are the appropriate MongoDB command-line tools to use. To download these utilities, visit the [MongoDB download page][minc-installmongodb].

Once MongoDB is installed successfully, follow the instructions below to import a JSON, CSV, or TSV file into your mLab-hosted database:

1. [Log in][mlab-login] to the mLab management portal.
1. If you have not already done so, create a new mLab deployment as your target.
   - Be sure to create database user(s) on the new deployment.
1. Use the [`mongoimport`][minc-mongoimport] command to import your text file(s) into your new deployment.
   - Take advantage of mLab's [pre-filled command-line strings for import/export commands](#prefilled-commands) and choose the JSON- or CSV-specific line to get you started with constructing the command.

#### Example {#mongoimport-example}
{:.no_toc}

To `mongoimport` a JSON file to a collection in your target deployment:

    % mongoimport -h ds012345.mlab.com:56789 -d dbname -c collectionname -u dbuser -p dbpassword --file filename.json


To `mongoimport` a CSV file to a collection in your target deployment:

    % mongoimport -h ds012345.mlab.com:56789 -d dbname -c collectionname -u dbuser -p dbpassword --file filename.csv --type csv --headerline 
    
- The first row of the CSV input file must specify the field names; each subsequent line in the file must represent a single document.
- The `--headerline` option in the command is what tells `mongoimport` to interpret the first line of the CSV file as the field names and not as a document.
- For a TSV file, all of the above also applies, the only difference is that `--type tsv` should replace `--type csv` in the command.


## Pre-filled import/export command-line strings {#prefilled-commands}
MongoDB commands can be tricky to write and typos aren't any fun so we've tried to make it easier for you by constructing pre-filled command-line strings that you can copy and paste directly into your terminal. To obtain these strings, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment with the database that you are going to import or export.
   - If necessary, navigate to the desired database after navigating to the deployment.
1. Click the "Tools" tab.
1. Click the "import/export" link and find the command you want to use.
![img-importexport][img-importexport]
1. Replace all placeholders (i.e., the values enclosed in angled brackets).
   - Make sure the [database user][docs-dbuser] is NOT a read-only user.
   - The \<input db directory\> for mongorestore is not the same as the \<output directory\> for mongodump.  The \<input db directory\> should be one level below the \<output directory\>.   For example, if the mongodump \<output directory\> was "dump_dir" for the database "foo", the \<input db directory\> for mongorestore would be "dump_dir/foo".
1. In your terminal window, run the adjusted command.

<br />

{:.warning-box}
<div markdown="1">
The strings provided in the tool are basic and do not include many of the extra options associated with the [MongoDB commands][minc-importexport]. You may need to adjust the strings further, depending on which options you desire to use. 
</div>
{:.warning-box}




