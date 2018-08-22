---
layout: default
title: Migrating from Parse
permalink: /migrating-from-parse/
description: A guide to migrating from Parse to mLab
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[parse-announce]:     http://blog.parse.com/announcements/moving-on/
[git-parse]:          https://github.com/ParsePlatform/parse-server
[parse-server-guide]: https://parse.com/docs/server/guide
[parse-migration-guide]: https://parse.com/migration
[heroku-guide]:       https://devcenter.heroku.com/articles/deploying-a-parse-server-to-heroku
[elasticbeanstalk-guide]: http://mobile.awsblog.com/post/TxCD57GZLM2JR/How-to-set-up-Parse-Server-on-AWS-using-AWS-Elastic-Beanstalk
[azr-guide]:          https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/
[gcp-guide]:          https://cloud.google.com/nodejs/resources/frameworks/parse-server
[docs-production-guide]:  {{ site.url }}/production-guide/
[git-parseissues]:    https://github.com/ParsePlatform/parse-server/issues
[git-parseissue-83]:  https://github.com/ParsePlatform/parse-server/issues/83
[goog-parse]:         https://groups.google.com/forum/#!forum/parse-developers
[mlab-plans]:         https://mlab.com/plans
[mlab-pricing]:       https://mlab.com/plans/pricing
[docs-ssl]:           {{ site.url }}/ssl-db-connections/
[docs-clouds]:        {{ site.url }}/plans/#cloud-providers
[docs-plan-types]:    {{ site.url }}/plans/#plan-types
[docs-telemetry]:     {{ site.url }}/monitoring/#telemetry
[herk-home]:          http://heroku.com
[aws-elastic]:        https://aws.amazon.com/elasticbeanstalk/
[azr-webapps]:        https://azure.microsoft.com/en-us/services/app-service/web/
[goog-appengine]:     https://cloud.google.com/appengine/
[minc-failindexkey]:  http://docs.mongodb.com/{{ page.minc-docversion }}/reference/parameters/#param.failIndexKeyTooLong
[minc-indexkeylimit]: http://docs.mongodb.com/{{ page.minc-docversion }}/reference/limits/#Index-Key-Limit
[minc-indexes]:       https://docs.mongodb.com/{{ page.minc-docversion }}/core/indexes/
[docs-indexes]:       {{ site.url }}/indexing/
[docs-plantypes]:     {{ site.url }}/plans/#plan-types
[parse-hostfiles]:    http://blog.parse.com/announcements/hosting-files-on-parse-server/
[git-parsefiles]:     https://github.com/ParsePlatform/parse-server/wiki/Files-Migration
[file-adapters]:      https://github.com/ParsePlatform/parse-server/wiki/Configuring-File-Adapters#configuring-s3adapter
[file-migration-plan]: https://github.com/ParsePlatform/parse-server/wiki/Files-Migration
[parse-dashboard]:    https://dashboard.parse.com/
[appsettings]:        https://parse.com/migration
[file-associating-with-objects]: http://parseplatform.github.io/docs/rest/guide/#associating-with-objects
[parse-sdks]:         https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#using-parse-sdks-with-parse-server
[heroku-toolbelt]:    https://toolbelt.heroku.com/
[node-download]:      https://nodejs.org/en/download/
[heroku-config-vars]: https://devcenter.heroku.com/articles/config-vars
[mlab-signup]:        https://mlab.com/signup/
[parse-compatibility-issues]: https://github.com/ParsePlatform/parse-server/wiki/Compatibility-with-Hosted-Parse
[parse-server-example]: https://github.com/ParsePlatform/parse-server-example
[mlab-parse-faqs]:    http://docs.mlab.com/migrating-from-parse/
[parse-wiki]:         https://github.com/ParsePlatform/parse-server/wiki
[parse-blog]:         http://blog.parse.com/
[cloud-code]:         http://parseplatform.github.io/docs/cloudcode/guide/#cloud-code-modules
[cloud-compatibility-issues]: https://github.com/ParsePlatform/parse-server/wiki/Compatibility-with-Hosted-Parse#cloud-code
[parse-dashboard]:    https://github.com/ParsePlatform/parse-dashboard
[file-utility]:       https://github.com/parse-server-modules/parse-files-utils

{% comment %} IMAGE LINKS {% endcomment %} 
[img-parse-data-storage]: /assets/z-migrating-from-parse/screenshot-parse-data-storage.png
[img-deployment-view]: /assets/z-migrating-from-parse/screenshot-deployment-view.png
[img-parse-migration-tool]: /assets/z-migrating-from-parse/screenshot-parse-migration-tool.png
[img-cluster-view]: /assets/z-migrating-from-parse/screenshot-cluster-view.png
[img-database-view]: /assets/z-migrating-from-parse/screenshot-database-view.png
[img-cluster-command]: /assets/z-migrating-from-parse/screenshot-cluster-command.png
[img-migration-progress]: /assets/z-migrating-from-parse/screenshot-migration-progress.png
[img-mlab-progress]: /assets/z-migrating-from-parse/screenshot-mlab-progress.png
[img-backups-tab]: /assets/z-migrating-from-parse/screenshot-backups-tab.png
[img-staging-database]: /assets/z-migrating-from-parse/screenshot-staging-database.png
[img-parse-keys]: /assets/z-migrating-from-parse/screenshot-parse-keys.png
[img-parseserver-localhost]: /assets/z-migrating-from-parse/screenshot-parseserver-localhost.png
[img-appsettings-users]: /assets/z-migrating-from-parse/screenshot-appsettings-users.png
[img-parseserver-heroku]: /assets/z-migrating-from-parse/screenshot-parseserver-heroku.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

<br/>

## Overview

Parse announced on January 28th 2016 that it will be [shutting down the Parse service][parse-announce] and giving users one year to migrate their apps off of the service.

As a part of shutting down its service Parse has made it possible to deploy [Parse Server][git-parse], an open source version of the Parse backend, to any infrastructure that can run Node.js. Therefore, you can continue using Parse by self-hosting the Parse Server software and MongoDB, the database technology that powered the Parse service.

To help with the transition, Parse has partnered with mLab to allow existing Parse users to seamlessly migrate their database off the Parse platform. This migration guide is a detailed step-by-step tutorial that will teach you how to:

- Migrate your Parse data onto an mLab-hosted MongoDB database
- Create a new Parse Server
- Deploy your Parse Server onto Heroku
- Connect your client applications to the Parse Server

## Part 1: Migrate your Parse data onto mLab

### Choose your plan at mLab

Once you've created an account, you can create a new MongoDB database. Before creating the database, there are a couple things for you to consider:

1. Where should I host my mLab database?
1. Which mLab plan type should I choose?

#### Cloud hosting locations
{:.no_toc}

We strongly recommend that you host your database in the same datacenter as your Parse Server as it will be the most secure method of deployment and will minimize latency between your application and database.

mLab supports MongoDB hosting on Amazon (AWS), Azure, and Google. For more details, see our [list of supported cloud providers and datacenters][docs-clouds]. Once you've decided on a cloud provider, you'll need to choose the plan that is right for you.

{:.warning-box}
<div markdown="1">
The Parse service is hosted in AWS US East so if you choose to host your database with a different cloud provider or region, there will be a period of time during the migration process where your application will experience higher latency. Also, note that unless you have enabled SSL on your mLab-hosted database deployment, your data will be transmitted unencrypted over the open internet.
</div>
{:.warning-box}

#### mLab plan types
{:.no_toc}

mLab offers three types of plans: Sandbox, Shared, and Dedicated.

If you are running a non-production application with a small amount of data and modest performance requirements, our free Sandbox plan which includes up to 496 MB of storage is a good option. If you're unsure if a Sandbox plan is appropriate for your use case, you can consult our [guide on running MongoDB in production][docs-production-guide].

{:.warning-box}
<div markdown="1">
The Parse migration tool does not officially support MongoDB version 3.2.x which is what all of mLab's Sandbox are running on ([https://github.com/ParsePlatform/parse-server/issues/83][git-parseissue-83]) as of October, 2016. mLab currently offers MongoDB version 3.0.x on its Shared and Dedicated plans.
</div>
{:.warning-box}

If you are running a production application, we highly recommend using one of our for-pay plans because they include auto-failover to a redundant node in cases of component failures or maintenance. 

If your dataset is larger than a few gigabytes and/or you need consistent, stable performance, we recommend one of our Dedicated Cluster plans which utilize virtual machines dedicated to only a single mLab deployment.

For more information, read our [documentation on mLab's plan types][docs-plan-types].

{:.note-box}
<div markdown="1">
We encourage you to email <support@mlab.com> so that we can help you pick the right plan and help monitor the migration process.
</div>
{:.note-box}

##### Key considerations when selecting a Dedicated plan
{:.no_toc}

__1. Current size of data stored at Parse__

We suggest provisioning an mLab plan that has roughly 3-4 times the data size currently used by your Parse application. This allows for room to hold indexes, which are not included in the data size shown by Parse. For example, if Parse reports your app is storing 10GB of data in the "Database storage" metric we suggest an mLab plan that can accommodate 30-40GB of storage. You can always downgrade with no downtime after the migration if your deployment is over provisioned.

You can find your current data usage by looking up the Parse "Database storage" value. Using the new dashboard view, go to Analytics -> Overview.

![img-parse-data-storage]

{:.warning-box}
<div markdown="1">
If you are running a Parse Push app, your data size may be bigger than what Parse reports for "Database storage". Email us at <support@mlab.com> for help.
</div>
{:.warning-box}

__2. Rate of operations your application will need the database to support__

If you have a high traffic application you should consider our High Performance plans which have local SSD storage and high RAM-to-storage ratios. These plans offer the best performance of all of our plan types.

__3. Upsizing temporarily for the migration__

For migrations to Dedicated plans, we recommend choosing a plan that is one size up from where you think you'll ultimately end up in order to ensure a smooth migration. In case your indexes are unusually large, the additional RAM and storage will help reduce migration time and mitigate any risk of running out of storage space. We pro-rate all of our plans daily although prices are listed at the monthly rate.

If your attempt to migrate to one of our Dedicated plans encounters errors, please email <support@mlab.com> right away, and we'll help you troubleshoot.

Once the migration is complete, our performance team can on request analyze the performance of the deployment and work with you to optimize indexes and potentially remove redundant indexes. Our Ops team can then assist you in scaling down with a zero-downtime migration.

__4. Enabling SSL support for your MongoDB connections__

Enabling SSL adds another level of security for communication between the application and database, allowing clients to open encrypted connections to the database servers and then verify the identity of those servers before sending any sensitive information. 

If you are running workloads with sensitive data, you may want to consider enabling SSL connections on your database deployment. In addition, if you will be hosting your mLab deployment in a datacenter other than AWS US East (where Parse service is hosted), we highly recommend enabling SSL connections at least until your Parse Server is also hosted in the same datacenter. 

Visit our [documentation on enabling SSL][docs-ssl] for more information and pricing.

### Create and prepare your mLab database deployment

First, [create a free mLab account][mlab-signup]. This will allow you to create new MongoDB databases on demand and manage multiple database deployments in a single view. We suggest that Parse users with multiple applications should create a database deployment per app.

![img-deployment-view]

For this tutorial, we created a Shared Cluster plan with the database name "parse-demo". Once your deployment is created and ready to be used, you'll see a green check mark by the deployment name. 

#### Set the failIndexKeyTooLong parameter to false
{:.no_toc}

MongoDB has a limit on how large an index key value may be if it is to be indexed. If you attempt to insert or update a document so that the value of an indexed field is longer than the Index Key Length Limit, the operation will fail and return an error to the client.

Parse migration guide suggests that the `failIndexKeyTooLong` MongoDB server parameter be set to “false” which will suppress this error and insert the document, although the document will not appear in the index and therefore not be found by queries that use that index.

*Available only for Shared and Dedicated plans*

You can temporarily toggle this parameter by navigating to the “Tools” tab for the deployment's primary node. Note that this parameter will not survive a restart and that setting this parameter on the primary will not affect the parameter on any other nodes in the deployment.

![img-cluster-command]

{:.note-box}
<div markdown="1">
This parameter cannot be modified on a Sandbox database because other users on the shared database server process would be affected by the change.

If you want to migrate to a Sandbox, we suggest first attempting the migration without modifying the parameter. A “false” value is only necessary if your data contain indexed fields that exceed the maximum index key length of 1024 bytes. The migration may succeed without changing this parameter.
</div>
{:.note-box}


Keep this browser tab open as we'll need the database information in the next step.

### Start the data migration process

From a new browser tab, open your Parse dashboard and navigate to App Settings -> General. Here you'll find the "Migrate to external database" option.

![img-parse-migration-tool]

Once you click "Migrate", you'll be prompted for your database connection string. Go back to the mLab UI and click on the deployment you created.

![img-cluster-view]

If you created a Dedicated or Shared Cluster plan, you will see the cluster view above. Click on your database name, which is "parse-demo" in our example.

![img-database-view]

You'll then be taken to the database view. If you created a Sandbox plan, you are automatically brought to the database view.

Notice that we have not created a database user yet. Go ahead and create one now.

Once you've created a database user, you can construct a proper connection string URI that the Parse migration tool can use. Under "To connect using a driver via the standard MongoDB URI", you'll find your deployment-specific connection string. Copy this URI and replace the "dbuser" and "dbpassword" values with the user and password information that you have just created (note: do not include the "<>" characters in your username or password as they are placeholders).

Navigate back to the Parse tab and paste your database URI in the migration tool. If your deployment is running without SSL, you will receive a warning message but will be able to continue the migration. If you want to run a deployment with SSL enabled, you will have to use one of our Dedicated plans.


### Verify and finalize the data migration

Once the migration is ready to be finalized, the progress will be in the "Verify" state, and you will receive an email from Parse to saying that you have "less than 24 hours" to finish the migration. Note that until the migration has been finalized, read traffic will still be hitting your database at Parse and not mLab.

#### Check document counts
{:.no_toc}

Review the "Rows Migrated" metric at Parse to make sure that this number is in line with the rows you see in your Parse Core -> Browser view.

![img-migration-progress]

You can also verify that the documents are in your mLab database by navigating to the database view.

#### Check health of database deployment in Telemetry
{:.no_toc}

*Available only for Shared and Dedicated plans*

Before you click the "Finalize" button, you should ensure that your database deployment has stabilized from the intensive load of the migration and is ready to start receiving live application traffic.

Our [Telemetry service][docs-telemetry] is a real-time and historical monitoring tool for mLab deployments that tracks key MongoDB metrics and helps you effectively monitor and tune database performance. It provides a customizable dashboard that gives you the ability to easily view and compare database and OS performance over time.

After you've navigated to the primary member of your deployment's Telemetry page, we recommend that you perform the following basic checks for the time range since the migration was ready to be finalized:

* "Queues" chart - metrics at or near 0
* "CPU Time" chart - metrics under 20% (available on Dedicated plans only)
* "Replication Lag in Cluster (min)" chart - under 10 seconds of lag

Once you finalize, note that these stats will now look very different because your application will be running on your mLab-hosted database. After a couple hours, you should look at Telemetry again to see how your database is handling application load, and if any performance or hardware tuning is needed. Make sure you also monitor your app and database through peak traffic times.

If you would like help or have questions, please email <support@mlab.com>.

#### Finalize
{:.no_toc}

Go back to the Migration tab and click the "Finalize" button. 

![img-mlab-progress]


Congratulations! You are now running Parse on your own MongoDB deployment!

### Review important notes on database management

Now that your data has been migrated, there are a couple items to be conscious of:

__1. You will need to manage your own database indexes.__

The original Parse platform featured auto-indexing of your MongoDB collections based on your application's query patterns.

The open-source Parse Server software does not support auto-indexing. You will be responsible for managing your indexes, which is crucial for maintaining optimal database performance.

When you migrate your database to mLab, all existing indexes will be migrated. However, as you change your application and add new query patterns you will need to manage your indexes appropriately.

For more information on managing indexes please see:

- mLab's [indexing][docs-indexes] documentation
- The official [MongoDB, Inc. documentation on indexing][minc-indexes]

If at any time you have questions about performance or need help with indexing strategies, please email <support@mlab.com> for help.

__2. Images and files are not migrated as part of the database migration.__

File storage is an important part of your application as it allows for shared storage of files such as documents, images, or videos. There are several ways Parse Server can store files associated with your application. To implement these Parse provides a number of [File Adapters][file-adapters]: 

- GridStoreAdapter, which is backed by MongoDB;
- S3Adapter, which is backed by Amazon S3; or
- GCSAdapter, which is backed by Google Cloud Storage

We strongly suggest storing files in S3 or Google Cloud Storage, as it is more scalable, less expensive, and minimizes load on your database. 

We have provided steps on configuring S3 with Parse Server in a later section of this guide.

## Part 2: Self-host the open-source Parse Server software

Now that you have successfully migrated your data from the Parse-hosted database onto an mLab database, you will have to replace the Parse backend service.

__Parse Server prerequisites__

Parse Server is an open-source version of the Parse backend that can be deployed to any infrastructure that can run Node.js. We'll walk through how to deploy Parse Server both locally and on Heroku.

Ensure that you have the following installed on your local machine:

- [Heroku toolbelt][heroku-toolbelt] - This provides you access to the Heroku Command Line Interface (CLI), which can be used for managing and scaling your applications and add-ons.
- [Node.js][node-download]

### Test locally

#### Set up a staging database
{:.no_toc}

We will first set up a local Parse Server and test that it can read and write to a test MongoDB database. We recommend setting up a staging database using a snapshot of your production database for this testing phase. If you use an empty database you might not be able to test your client applications properly. In contrast, if you use your actual production database for testing you risk corrupting production data.

To create a backup of your production database, go to the "Backups" tab for your deployment.

![img-backups-tab]

Click the "Take one-time mongodump" or "Take one-time backup" button.

Once the backup is complete, go back to the home deployment view and click "Create from backup". Choose the newly created backup and choose the same plan type that your production database is running. This will create a new staging database from the backup. We recommend adding "-staging" to the name of the cluster or database. 

![img-staging-database]

#### Set up a local Parse Server
{:.no_toc}

Now let's create a local Parse Server that connects to your staging database. This will allow you to test client applications and different API requests.

{:.note-box}
<div markdown="1">
There are a few areas where Parse Server does not provide compatibility with the Parse-hosted backend service. Carefully read through the list of [compatibility issues with hosted Parse][parse-compatibility-issues].
</div>
{:.note-box}

Make sure you have at least Node.js v4.3. 

    $ node --version
    > v5.7.0

Clone the repo and cd into the `parse-server-example` directory.

    $ git clone https://github.com/ParsePlatform/parse-server-example
    $ cd parse-server-example

Install the Node.js modules

    $ npm install

Take note of the MongoDB connection URI of the staging database.

![img-staging-database]

Open the `parse-server-example/index.js` file in your favorite text editor. 

    $ open index.js

Assign the MongoDB connection URI from your staging database to the databaseUri variable on line 7. The MongoDB connection URI is used to authenticate from your Parse Server to your mLab database.

    var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://<dbuser>:<dbpassword>@ds######-a0.mlab.com:#####,ds######-a1.mlab.com:#####/parse-demo?replicaSet=rs-ds######';

Next, go to the "Security & Keys" section of App Settings in your [Parse Dashboard][parse-dashboard] and take note of the "Application ID", "File key", and "Master key" values.

![img-parse-keys]

Within the opened `parse-server-example/index.js` file in your text editor, pass the following values into the ParseServer constructor. 

- Replace "myAppID" in the ParseServer constructor with your Application ID. 
- Replace "masterKey" in the ParseServer constructor with your Master key.
- Replace "optionalFileKey" in the ParseServer constructor with your File key.

The "myAppID" is a unique identifier for your application, the "masterKey" overrides all permissions, and the "optionalFileKey" allows access to files already hosted on parse.com. The "optionalFileKey" will allow you to read images hosted on parse.com, and any writes will be saved by your Parse Server to the datastore you select through the files adapter (MongoDB, S3, ...). Later in this tutorial we will go over how to set up your S3 bucket with Parse Server.

__ParseServer constructor__

    var api = new ParseServer({
      databaseURI: databaseUri,
      cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
      appId: process.env.APP_ID || 'myAppId',
      masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
      fileKey: process.env.FILE_KEY || 'optionalFileKey', // For migrated apps, this is necessary to provide access to files already hosted on parse.com
      serverURL: process.env.SERVER_URL || 'http://localhost:1337'  // Don't forget to change to https if needed
    });

{:.note-box}
<div markdown="1">
Replace your "myAppId", "masterKey", "optionalFileKey", and MongoDB connection URI values only when testing the local Parse Server. Remove these string values before deploying to Heroku. We will be setting config vars later in this tutorial that will keep your sensitive application information hidden on Heroku. Always remember to keep your "myAppId", "masterKey", "optionalFileKey", and MongoDB connection URI information secure.
</div>
{:.note-box}

#### Run your local Parse Server
{:.no_toc}

Now that we have finished configuring your ParseServer constructor, lets try running the local Parse Server.

Start the Parse Server

    $ npm start
    > parse-server-example@1.1.0 start /Users/username/code/parse/parse-server-example
    > node index.js
    > parse-server-example running on port 1337.

Confirm your Parse Server is running by visiting <http://localhost:1337/>. You should see "I dream of being a web site." in your browser.

![img-parseserver-localhost]

#### Migrate Cloud Code to local Parse Server
{:.no_toc}

We will now migrate your existing Cloud Code to run in your local Parse Server. 

Change directory to the `parse-server-example/cloud` directory. 

    $ cd cloud

Copy your app's Cloud Code to the `parse-server-example/cloud` directory, replacing the example `main.js`.

    $ open main.js

If you use additional Node.js modules with Cloud Code, you may want to create a subdirectory to store all of your JavaScript files. An example folder structure might look similar to this:

    cloud/
    |__main.js
    |__modules/
        |__file.js

If you `require` any modules within your `main.js` cloud code file, be sure to use the correct relative paths. The example above would use this require statement: `require(./modules/file.js)`.

There are a few considerations when using Cloud Code with Parse Server. 

1. You will need to replace any relative paths in your application code from ‘cloud/…’ to ‘./cloud’ because of the new folder structure in Parse Server.
2. Native Cloud Code modules are not available in Parse Server, so you will need to use a [replacement Node.js module][cloud-code].
3. There may also be [compatibility issues][cloud-compatibility-issues] with your Parse Server depending on your Cloud Code SDK version, queries, and methods.

##### Verify Cloud Code runs correctly
{:.no_toc}

With Parse Server running, make example requests to verify that your Cloud Code is running correctly.

Because the Parse-hosted Cloud Code isn't running a full Node.js environment, there may be subtle differences in how your Cloud Code runs in Parse Server. We recommend exercising all your critical code paths to ensure full functionality before moving on.

#### Configure File Adapter for your local Parse Server
{:.no_toc}

File storage is an important part of your application as it allows for shared storage of files such as documents, images, or videos. There are several ways Parse Server can store files associated with your application. To implement these Parse provides a number of [File Adapters][file-adapters]: 

- GridStoreAdapter, which is backed by MongoDB;
- S3Adapter, which is backed by Amazon S3; or
- GCSAdapter, which is backed by Google Cloud Storage

We strongly suggest storing files in S3 or Google Cloud Storage, as it is more scalable, less expensive, and minimizes load on your database.

##### Set up S3 bucket and permissions
{:.no_toc}

1. Log into your AWS account or create a new one.
2. Head to the S3 service and choose "Create Bucket".
3. Fill out a unique Bucket Name and click "Create". The bucket name should not contain any period "." for directAccess to work. All other defaults are OK.
4. Now head to the Identity and Access Management (IAM) service.
5. Click the "Users" tab, then "Create New User".
6. Fill out at least one user name and make sure "Generate an access key for each user" is selected before clicking "Create".
7. Make sure to "Download Credentials" on the next screen.
8. Now select the "Policies" tab, then "Create Policy".
9. Select "Create Your Own Policy", fill out a "Policy Name".
10. Copy the following config in "Policy Document", changing "BUCKET_NAME" for the name of the bucket you created earlier.

        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource": [
                "arn:aws:s3:::BUCKET_NAME/*"
              ]
            }
          ]
        }

11. Make sure to "Validate Policy" first, then click "Create Policy".
12. Go back to the "Users" tab and select the user you created earlier.
13. In Permissions, select "Attach Policy" and find the policy we just created to attach it.

Your S3 bucket has now been created, and a policy has been created to allow for Parse Server to access your S3 bucket for files storage. Now let's configure your Parse Server to be able to communicate with your S3 bucket.

##### Configure Parse Server to store files in S3
{:.no_toc}

Within your `parse-server-example/index.js` file, configure the ParseServer constructor to use the S3 files adapter.
 
Require the S3 adapter within the `parse-server-example/index.js`.

    var S3Adapter = require('parse-server').S3Adapter;

Make sure you place the above line before the ParseServer constructor code.

We will also be adding the "filesAdapter" constructor within the ParseServer constructor, which requires the "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", and "BUCKET_NAME". You can find the AWS keys in the credentials file you had downloaded earlier (in step 7).

    var api = new ParseServer({
      databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
      cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
      appId: process.env.APP_ID || 'myAppId',
      masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
      fileKey: process.env.FILE_KEY || 'optionalFileKey', // For migrated apps, this is necessary to provide access to files already hosted on parse.com. 
      serverURL: process.env.SERVER_URL || 'http://localhost:1337',  // Don't forget to change to https if needed
      filesAdapter: new S3Adapter(
        process.env.AWS_ACCESS_KEY_ID || "AWS_ACCESS_KEY_ID",
        process.env.AWS_SECRET_ACCESS_KEY || "AWS_SECRET_ACCESS_KEY",
        process.env.BUCKET_NAME || "BUCKET_NAME"
      )
    });

{:.note-box}
<div markdown="1">
Replace your "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", and "BUCKET_NAME" values only when testing the local Parse Server. Remove these values before deploying to Heroku. We will be setting config vars later in this tutorial that will keep your information hidden on Heroku. Always remember to your "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", and "BUCKET_NAME" information secure.
</div>
{:.note-box}

S3Adapter constructor options

    new S3Adapter(accessKey, secretKey, bucket, options)

| Parameter | Description | Notes |
| --------- | ----------- | ----- |
| accessKey    | The AWS access key for a user that has the required permissions | Required. |
| secretKey    | The AWS secret key for the user | Required. |
| bucket       | The name of your S3 bucket. | Required. |
| options      | JavaScript object (map) that can contain: | |
| region       | Key in `options`. Set the AWS region to connect to. | Optional. Default: 'us-east-1' |
| bucketPrefix | Key in `options`. Set to create all the files with the specified prefix added to the filename. Can be used to put all the files for an app in a folder with 'folder/'. | Optional. Default: '' |
| directAccess | Key in `options`. Controls whether reads are going directly to S3 or proxied through your Parse Server. If set to true, files will be made publicly accessible, and reads will not be proxied. | Optional. Default: false |

After you configure your Parse Server to use the S3 adapter, new files will be stored in your S3 bucket, not on parse.com. 

##### Existing files on Parse backend service
{:.no_toc}

Even though you have migrated your application data from Parse to mLab, your existing files are still in Parse's backend service. As long as you have specified the correct File key in the ParseServer constructor of your `parse-server-example/index.js` file, Parse Server knows exactly how to access them, so they will keep working just fine. Any new file you create using Parse Server will be saved in the datastore you set up through the files adapter.

{:.note-box}
<div markdown="1">
Old client applications that are still configured to use the Parse backend service (api.parse.com), will not be able to access new files stored in your S3 bucket. In order to access both old and new files, client applications will need to be updated to use your self-hosted Parse Server.
</div>
{:.note-box}

##### File Migration from Parse backend service
{:.no_toc}

Parse's backend service (S3 bucket) will be turned down on January 28th, 2017, which means those files will need to be migrated to your own S3 bucket account before that date. Parse has a [file utility][file-utility] that can be used to perform the file migration.

#### Review app settings impacted by Parse Server
{:.no_toc}

Go through your app settings panel and make sure to review how these settings will be impacted by moving to Parse Server. Go to the App Settings -> Users in your [Parse Dashboard][parse-dashboard] and view the different settings for user sessions, authentication, and social login.

![img-appsettings-users]

Refer to [Parse's Migration Guide][appsettings] for a detailed description of each one of these settings that are currently supported by Parse Server versus what was available through the Parse backend service.

#### Test local Parse Server via command line
{:.no_toc}

Once you've confirmed that your local Parse Server is running, you can now verify that your local server can receive requests. If you have successfully created a Parse Server, you can use the REST API directly. 

Here are example requests you can use to confirm that your local server is configured properly. We recommend making test production client application requests to properly ensure full functionality.

    curl -X POST -H "X-Parse-Application-Id: YOUR_APP_ID" -H "Content-Type: application/json" -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' http://localhost:1337/parse/classes/GameScore
    > {"objectId":"svbLKCXlzG","createdAt":"2016-03-03T00:46:45.828Z"}

    curl -X GET -H "X-Parse-Application-Id: YOUR_APP_ID" -H "X-Parse-Master-Key: YOUR_APP_MASTER_KEY" http://localhost:1337/parse/classes/GameScore
    >{"results":[{"objectId":"svbLKCXlzG","score":1337,"playerName":"Sean Plott","cheatMode":false,"updatedAt":"2016-03-03T00:46:45.828Z","createdAt":"2016-03-03T00:46:45.828Z"}]}

##### Test S3 file storage configuration
{:.no_toc}

If you have added the S3 adapter for storing files, here are example requests you can use to confirm your local server can store files in your S3 bucket. 

    curl -X POST -H "X-Parse-Application-Id: YOUR_APP_ID" -H "Content-Type: image/jpeg" --data-binary '@myPicture.jpg' http://localhost:1337/parse/files/pic.jpg
    >{"url":"https://parse-demo.s3.amazonaws.com/1d4732c8555d0b026aaaefbc34453bc8_pic.jpg","name":"1d4732c8555d0b026aaaefbc34453bc8_pic.jpg"}

Put the "url" <https://parse-demo.s3.amazonaws.com/1d4732c8555d0b026aaaefbc34453bc8_pic.jpg> into your browser. If it downloads a jpg file, you have successfully stored a file onto S3 and can access it. Now you can [associate files with objects][file-associating-with-objects]. 

For additional examples storing and accessing files on Parse Server, refer to their docs here:

- JS: <https://parse.com/docs/js/guide#files>
- iOS: <https://parse.com/docs/ios/guide#files>
- Android: <https://parse.com/docs/android/guide#files>
- REST: <https://parse.com/docs/rest/guide#files>

{:.note-box}
<div markdown="1">
Before moving to production, be sure to remove any test files from your S3 bucket.
</div>
{:.note-box}

#### Move your test client app onto your local Parse Server
{:.no_toc}

Before deploying your Parse Server onto Heroku, first test your local Parse Server with a test client application.

Update your app with the latest version of the Parse SDK (at least version 1.12 for iOS, 1.13.0 for Android, 1.6.14 for JS, 1.7.0 for .NET), which [have the ability to change the server URL][parse-sdks].

Update your test client application to point to the `SERVER_URL` of the local Parse Server. This may vary based on your code base, but be sure to configure your `SERVER_URL` to have "/parse" or "/1" (for older versions) at the end.

    SERVER_URL: http://localhost:1337/parse 

In addition, ensure that your AppId within your test client application matches the `APP_ID` config variable in your local Parse Server.

    APP_ID: myAppId

We highly recommend that you practice configuring and deploying a development or test client application to use your local Parse Server before deploying your Parse Server to Heroku. Test thoroughly before pushing to production to prevent any unexpected behavior.

### Deploy to Heroku

Now that you have fully vetted your local Parse Server, you can deploy it to Heroku, a Platform-as-a-Service provider, which will host your production Parse Server. Your final production Parse Server will be used by your existing client applications.

The following steps will walk you through deploying to Heroku via command line.

#### Configure Heroku Toolbelt
{:.no_toc}

Log in with the [Heroku Toolbelt][heroku-toolbelt].

    $ heroku login
    > Enter your Heroku credentials.
    > Email: name@example.com
    > Password:
    > ...

#### Create an application on Heroku
{:.no_toc}

Next, you will create a new Heroku application to host our Parse Server

    $ heroku create
    > Creating app... done, stack is cedar-14
    > https://still-island-32919.herokuapp.com/ | https://git.heroku.com/still-island-32919.git

When you create an app, a remote git repository (called heroku) is also created and associated with your local git repository.

Heroku generates a random name (in this case "still-island-32919") for your app, or you can pass a parameter to specify your own app name e.g. `heroku apps:create example-app`

#### Set config vars
{:.no_toc}

In our local workspace and previous testing, the Parse Server object has been configured with string values. The index.js file in the parse-server-example specifies defaults, which are superseded by Heroku [config vars][heroku-config-vars].

We'll now configure all the relevant config variables so that you no longer need to have string values in your Parse Server constructor.

    $ heroku config:set APP_ID=myAppId
    > Setting config vars and restarting still-island-32919... done
    > APP_ID: myAppId

    $ heroku config:set MASTER_KEY=masterKey
    > Setting config vars and restarting still-island-32919... done
    > MASTER_KEY: masterKey

    $ heroku config:set FILE_KEY=optionalFileKey
    > Setting config vars and restarting still-island-32919... done
    > FILE_KEY: optionalFileKey

    $ heroku config:set MONGODB_URI=mongodb://<dbuser>:<dbpassword>@ds######-a0.mlab.com:#####,ds######-a1.mlab.com:#####/production_db?replicaSet=rs-ds######
    > Setting config vars and restarting still-island-32919... done
    > MONGODB_URI: mongodb://<dbuser>:<dbpassword>@ds######-a0.mlab.com:#####,ds######-a1.mlab.com:#####/production_db?replicaSet=rs-ds######

    $ heroku config:set CLOUD_MAIN_CODE=”./cloud/main.js”
    > Setting config vars and restarting still-island-32919... done
    > CLOUD_MAIN_CODE: ./cloud/main.js

    $ heroku config:set SERVER_URL=http://myAppName.herokuapp.com/parse
    Setting config vars and restarting still-island-32919... done
    SERVER_URL: http://myAppName.herokuapp.com/parse

    $ heroku config:set PARSE_MOUNT=/parse
    Setting config vars and restarting still-island-32919... done
    PARSE_MOUNT: /parse

{:.note-box}
<div markdown="1">
By default the Parse Server will use a path of "/parse" for the API routes. To change this, or to use older client SDKs, run the command below.
</div>
{:.note-box}

    $ heroku config:set PARSE_MOUNT=/1

If you added the S3 adapter, be sure to also add the AWS ID, Key, and Bucket Name variables.

    $ heroku config:set AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
    > Setting config vars and restarting still-island-32919... done
    > AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID

    $ heroku config:set AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
    > Setting config vars and restarting still-island-32919... done
    > AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY

    $ heroku config:set BUCKET_NAME=BUCKET_NAME
    > Setting config vars and restarting still-island-32919... done
    > BUCKET_NAME: BUCKET_NAME

#### Deploy your code
{:.no_toc}

Now that you've set your config vars, you can remove your "myAppId", "masterKey", "optionalFileKey", and MongoDB connection URI from your `parse-server-example/index.js` file before you deploy your code. 

If you have added an S3 adapter, be sure to remove your "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", and "BUCKET_NAME" as well. These steps will ensure that your sensitive application information is kept safe and not saved within your code as plain-text.

Now deploy your Parse Server code to Heroku:

    $ git push heroku master
    > Counting objects: 136, done.
    > Delta compression using up to 8 threads.
    > Compressing objects: 100% (70/70), done.
    > Writing objects: 100% (136/136), 28.97 KiB | 0 bytes/s, done.
    > Total 136 (delta 63), reused 136 (delta 63)
    > remote: Compressing source files... done.
    > remote: Building source:
    > remote:
    > remote: -----> Node.js app detected
    > remote:
    > remote: -----> Creating runtime environment
    > remote:
    > remote:        NPM_CONFIG_LOGLEVEL=error
    > remote:        NPM_CONFIG_PRODUCTION=true
    > remote:        NODE_ENV=production
    > remote:        NODE_MODULES_CACHE=true
    > remote:
    > remote: -----> Installing binaries
    > remote:        engines.node (package.json):  >=4.3
    > remote:        engines.npm (package.json):   unspecified (use default)
    > remote:
    > remote:        Resolving node version >=4.3 via semver.io...
    > remote:        Downloading and installing node 5.6.0...
    > remote:        Using default npm version: 3.6.0
    >      ....
    > remote: -----> Build succeeded!
    > remote:        ├── express@4.2.0
    > remote:        ├── kerberos@0.0.18
    > remote:        ├── parse@1.6.14
    > remote:        └── parse-server@2.1.4
    > remote:
    > remote: -----> Discovering process types
    > remote:        Procfile declares types     -> (none)
    > remote:        Default types for buildpack -> web
    > remote:
    > remote: -----> Compressing...
    > remote:        Done: 20.5M
    > remote: -----> Launching...
    > remote:        Released v3
    > remote:        https://still-island-32919.herokuapp.com/ deployed to Heroku
    > remote:
    > remote: Verifying deploy.... done.
    > To https://git.heroku.com/still-island-32919.git
    >  * [new branch]      master -> master

#### Open on Heroku
{:.no_toc}

Confirm your Parse Server is running on Heroku. 

    $ heroku open

You should see "I dream of being a web site." in your browser.

![img-parseserver-heroku]

#### Test Parse Server via command line
{:.no_toc}

Once you've confirmed that your Parse Server on Heroku is running, you can test that the Parse Server is working by using the previous methods used above for your local Parse Server. Note that the URL has changed, because your Parse Server is now running on Heroku. For example, our test GET request to our Heroku-hosted Parse Server is now:

    curl -X GET -H "X-Parse-Application-Id: YOUR_APP_ID" -H "X-Parse-Master-Key: YOUR_APP_MASTER_KEY" http://myAppName.herokuapp.com/parse/classes/GameScore
    >{"results":[{"objectId":"Ry13dOYYIH","score":2016,"playerName":"Hans Gruber","cheatMode":true,"updatedAt":"2016-03-05T02:37:42.474Z","createdAt":"2016-03-05T02:37:42.474Z"}]}

## Part 3: Migrate your client app to Parse Server

### Test your client app

#### Move test client app onto self-hosted Parse Server
{:.no_toc}

Now that you have a production-ready Parse Server deployed to Heroku, the next task is to try connecting a test client application. This is a precursor to moving your existing production client applications onto your Parse Server.

Update your test client application to point to the `SERVER_URL` of the Parse Server that you deployed on Heroku. Be sure to configure your `SERVER_URL` to have "/parse" or "/1" at the end.

    SERVER_URL: http://myAppName.herokuapp.com/parse

Also change your AppId in your test client application to the `APP_ID` config variable in your Parse Server.

    APP_ID: myAppId

### Roll out new client app to production

#### Change from the staging database to the production database
{:.no_toc}

We have now tested end to end with a staging database, a Parse Server deployed to Heroku, and a test client application. Once you're confident with your Parse Server testing, you can replace the staging database URI with your production database URI. This is done by changing the config var in your Heroku deployment with the MongoDB connection URI of your production database. Your production database is the deployment you originally migrated your Parse data into.

Change config vars via the Heroku CLI:

    $ heroku config:set MONGODB_URI=mongodb://<dbuser>:<dbpassword>@ds######-a0.mlab.com:#####,ds######-a1.mlab.com:#####/production_db?replicaSet=rs-ds######
    > Setting config vars and restarting still-island-32919... done
    > MONGODB_URI: mongodb://<dbuser>:<dbpassword>@ds######-a0.mlab.com:#####,ds######-a1.mlab.com:#####/production_db?replicaSet=rs-ds######'

#### Move production client apps onto product Parse Server
{:.no_toc}

Once you've configured your Parse Server to use your production database, you can begin migrating your production client applications onto your Parse Server. You can migrate your apps by changing the server URL to your Parse Server URL and configuring your AppId. You can find examples specific to your client application languages in the Parse [wiki][parse-sdks].

Once you finish migrating your production client applications, you should encourage users to update to the newest version of your app as soon as possible. On January 28, 2017, any calls to the hosted Parse backend service (api.parse.com) will cease to function. 

## Resources

For the full Github repository of the example used in this tutorial, check the [Parse Server example][parse-server-example].

The following resources will be useful to you as you migrate your application from Parse.

- [Parse Server Guide][parse-server-guide] including their [official migration guide][parse-migration-guide]
- [Complete Parse Wiki][parse-wiki]
- [GitHub issue tracker for Parse Server][git-parseissues]
- [Parse Google Group][goog-parse]
- [Official Parse Blog][parse-blog]

If you need any help with this migration guide or have any questions please contact the mLab team at <support@mlab.com>.

{:.note-box}
<div markdown="1">
There are a few areas where Parse Server does not provide compatibility with the Parse-hosted backend. Carefully read through the list of [compatibility issues with hosted Parse][parse-compatibility-issues].
</div>
{:.note-box}

## FAQ

### Q. Why use mLab instead of self-hosting MongoDB on AWS, Azure, or Google?
{:.no_toc}

mLab provides a Database-as-a-Service platform for MongoDB that takes care of all the operational aspects of running a fault-tolerant MongoDB cluster so that you can focus on your application. Our for-pay plans include:

- Full automation of provisioning and scaling
- Multi-zone replication and auto-failover 
- Automatic backups with easy restore
- Monitoring and alerting
- Web-based tools for managing your deployment and your data
- Expert support, including 24x7 emergency support on Dedicated plans

See mLab's [plans and features page][mlab-plans] as well as our [pricing page][mlab-pricing] for more information and details. If you have any questions about our service, please contact <support@mlab.com>. 

### Q. Where should I host my Parse Server?
{:.no_toc}

This tutorial shows you how to deploy your Parse Server onto Heroku, which is hosted on AWS. However, there are other alternative hosting providers to consider, especially if your mLab database is not on AWS. We strongly suggest that you host your database in the same datacenter as your Parse Server to minimize the latency between these two components of your application. Failure to do so can lead to poor application performance. 

mLab supports MongoDB hosting on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform [in most regions][docs-clouds].

Here are some suggested strategies by cloud provider:

__AWS:__

- Self-host your Parse Server on AWS and place your mLab database in the same AWS region.
- Host your Parse Server on Heroku's Platform-as-a-Service (PaaS) and place your mLab database in the same AWS region ([Heroku's guide][heroku-guide]).
- Host using AWS Elastic Beanstalk, AWS's PaaS, and place your mLab database in the same AWS region ([AWS' guide][elasticbeanstalk-guide]).

__Azure:__

- Self-host your Parse Server on Azure and place your mLab database in the same Azure region. 
- Host your Parse Server with [Azure App Service][azr-webapps] (Azure’s PaaS) and place your mLab database in the same Azure region ([Azure's guide][azr-guide]).

__Google:__

- Self-host your Parse Server on Google and place your mLab database in the same Google region.
- Host your Parse Server on Google App Engine (Google's PaaS) and place your mLab database in the same Google region ([Google's guide][gcp-guide]).

{:.note-box}
<div markdown="1">
The Parse API runs in AWS US East, so if you are executing a migration plan that migrates the database first, we suggest you run your database in AWS US East. Placing your database in the same datacenter will maximize performance while your app is still hosted on Parse.
</div>
{:.note-box}

### Q. How do I "ensure the user in the connection string has admin privileges"?
{:.no_toc}

The reason that Parse's migration guide asks for a user that has "admin privileges" is that the migration tool will try to set the failIndexKeyTooLong parameter to false (see next FAQ). If the database user provided to Parse does not have admin privileges, the migration will still continue without setting the parameter.

An alternative approach which does not require you to provide Parse with a database user that has admin privileges is to:

1. Set the `failIndexKeyTooLong` parameter to false (see instructions in next FAQ)
1. Create a database user on the "Users" tab of the database that you'll be migrating into
1. Provide Parse with a connection string with the username/password for this database user

{:.warning-box}
<div markdown="1">
If you're using a Dedicated plan and really want to provide Parse with a database user that has full admin privileges (even though this is unnecessary), you can *not* use "admin" as the name of the database in the connection string or else the data will be migrated into the "admin" database which is intended for deployment metadata only.
</div>
{:.warning-box}

### Q. How do I set the failIndexKeyTooLong parameter to false?
{:.no_toc}

MongoDB has a limit on how large a key value may be if it is to be indexed. If you attempt to insert or update a document so that the value of an indexed field is longer than the [Index Key Length Limit][minc-indexkeylimit], the operation will fail and return an error to the client. 

Parse's migration guide suggests that the [`failIndexKeyTooLong`][minc-failindexkey] MongoDB server parameter be set to "false" which will suppress this error and insert the document, although the document will not appear in the index and therefore not be found by queries that use that index. 

The following instructions, by plan type, explain how to set the parameter to "false" for the migration. 

__Sandbox plan__

Admin privileges are required in order to set the "failIndexKeyTooLong" parameter. Our free Sandbox plans do not provide administrative privileges nor the ability to override the default setting for this parameter. 

If you are unable to use a for-pay plan, we suggest first attempting the migration without modifying the parameter. A "false" value is only necessary if your data contain indexed fields that exceed the maximum index key length of 1024 bytes. The migration may succeed without setting the parameter to "false". 

__Shared and Dedicated plans (for-pay plans)__

Our Shared and Dedicated plans provide a means to override this setting. You can temporarily toggle this parameter by navigating to the "Tools" tab for the deployment.

![img-cluster-command]

### Q. Will Parse Server still manage my database indexes?
{:.no_toc}

The original Parse platform featured auto-indexing of your MongoDB collections based on your application's query patterns. 

The open-source Parse Server software does not support auto-indexing. You will be responsible for managing your indexes, which is crucial for maintaining optimal database performance. 

When you migrate your database to mLab, all existing indexes will be migrated. However, as you change your application and add new query patterns you will need to manage your indexes appropriately. 

For more information on managing indexes please see:

- mLab's [indexing][docs-indexes] documentation
- The official [MongoDB, Inc. documentation on indexing][minc-indexes]

If at any time you have questions about performance or need help with indexing strategies, please email <support@mlab.com> for help.

### Q. Does Parse Server include the web-based Parse dashboard?
{:.no_toc}

Parse Server does not automatically include the web-based Parse dashboard. However, you can deploy your own [Parse Dashboard][parse-dashboard] which is a standalone dashboard for managing your Parse apps. You can use it to manage your Parse Server apps and your apps that are running on Parse.com.

### Q. Do I need SSL for my deployment?
{:.no_toc}

You should always try to place your application infrastructure and your database in the same local network (i.e., datacenter/cloud region), as it will be the most secure method of deployment and will minimize latency between your application and database.

When you connect to your mLab database from within the same datacenter/region, you communicate over your cloud hosting provider’s internal network. All of our cloud hosting providers provide a good deal of network security infrastructure to isolate tenants. The hypervisors used do not allow VMs to read network traffic addressed to other VMs and so no other tenant can “sniff” your traffic.

To further secure communications to your database, mLab offers SSL for MongoDB connections on Dedicated plans provisioned via mlab.com. Enabling SSL adds another level of security for communication between the application and database, allowing clients to open encrypted connections to the database servers and then verify the identity of those servers before sending any sensitive information.

The Parse Service (api.parse.com) is hosted in the AWS US East region so we recommend hosting your mLab database in AWS US East. If you host your database in AWS US East, you will only need to enable SSL if you want an additional layer of security. If you plan to migrate your Parse Server and database in a different datacenter/region (e.g. AWS US West, Azure or Google), we highly recommend enabling SSL because your data will otherwise travel over the open internet unencrypted.

For more information, refer to our documentation on [SSL database connections][docs-ssl].
