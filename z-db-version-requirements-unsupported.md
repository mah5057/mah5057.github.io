---
layout: default-nosearch-norobots
title:  Upgrade Requirements for Unsupported MongoDB Versions
permalink: /db-version-requirements-unsupported/
description: MongoDB upgrade requirements for your mLab database (previous versions no longer supported)
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-rnr]:                             {{ site.url }}/ops/#rolling-node-replacement
[minc-home]:                            http://www.mongdb.com
[minc-install]:                         http://docs.mongodb.com/manual/installation/
[minc-driver-compatability-ref]:        http://docs.mongodb.com/ecosystem/drivers/driver-compatibility-reference/
[minc-dbv22]:                           http://docs.mongodb.com/manual/release-notes/2.2
[minc-dbv24]:                           http://docs.mongodb.com/manual/release-notes/2.4
[minc-dbv26]:                           http://docs.mongodb.com/manual/release-notes/2.6
[minc-dbv26-query-engine-improvements]: https://docs.mongodb.com/manual/release-notes/2.6/#query-engine-improvements
[minc-dbv26-compatibility]:             http://docs.mongodb.com/manual/release-notes/2.6-compatibility
[minc-dbv26-upgrade-authorization]:     http://docs.mongodb.com/manual/release-notes/2.6-upgrade-authorization
[hero-toolbelt]:                        https://toolbelt.heroku.com/
[minc-dbv30]:                           http://docs.mongodb.com/manual/release-notes/3.0
[minc-dbv30-upgrade-drivers]:           http://docs.mongodb.com/manual/release-notes/3.0-scram/#upgrade-drivers
[minc-dbv30-wiredtiger]:                http://docs.mongodb.com/manual/release-notes/3.0/#wiredtiger
[minc-dbv30-compatibility]:             http://docs.mongodb.com/manual/release-notes/3.0-compatibility/
[minc-dbv30-scram]:                     http://docs.mongodb.com/manual/release-notes/3.0-scram/
[minc-dbv30-downgrade]:                 http://docs.mongodb.com/manual/release-notes/3.0-upgrade/#downgrade-limitations
[minc-dbv32]:                           http://docs.mongodb.com/manual/release-notes/3.2
[minc-dbv32-compatibility]:             http://docs.mongodb.com/manual/release-notes/3.2-compatibility/
[minc-dbv34]:                           http://docs.mongodb.com/manual/release-notes/3.4
[minc-dbv34-compatibility]:             http://docs.mongodb.com/manual/release-notes/3.4-compatibility/
[jira-SERVER-24631]:                    https://jira.mongodb.org/browse/SERVER-24631

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Upgrade Requirements for MongoDB 2.6 {#v26}

*If you’re running a version of MongoDB before MongoDB 2.4, you must first upgrade to MongoDB 2.4 before upgrading to MongoDB 2.6.*

With [MongoDB version 2.6][minc-dbv26], you should be aware of the fact that:

- There are many changes that can affect compatibility with older versions of MongoDB.
- This release includes significant changes to the authorization model, which requires changes to the way that MongoDB stores users’ credentials. If your application requires access to the "local" database (e.g. for oplog tailing), the new authentication model will impact you.
- There were significant [query engine improvements][minc-dbv26-query-engine-improvements] in this
  release. These changes can cause a noticeable change in how the database responds to heavy resource contention, particularly when indexes do not fit in RAM.

Before upgrading, you must do the following:

1. Review the full list of [2.6 changes that can affect the compatability with older version of MongoDB][minc-dbv26-compatibility].
1. Run the preliminary upgrade check to verify compatibility of your data set with MongoDB 2.6 (see below).
1. Assess and resolve all issues identified by your review and by this upgrade check.

When you initiate an upgrade to MongoDB 2.6 from the mLab management portal, not only will we upgrade the binaries that are running your mongod processes, we will also complete the [authorization user schema upgrade][minc-dbv26-upgrade-authorization].

{:.warning-box}
<div markdown="1">   
Once upgraded to MongoDB 2.6, you cannot downgrade to any version earlier than MongoDB 2.4. If you absolutely need to downgrade back to version 2.4, you will need to contact our support team to help execute the steps outlined in MongoDB's documentation for downgrading from 2.6.
</div>
{:.warning-box}


### How to run the preliminary 2.6 preparedness check
{:.no_toc}

This command can be very taxing on your deployment as it performs collection scans against all collections. As such, you should consider running this preparedness check against either a staging environment or a secondary node on your production environment. We strongly recommend that you read the full documentation on this preparedness check before proceeding. 

<font color="red">IMPORTANT NOTE: You need to use the mongo shell from MongoDB version 2.6.x to run the check, even though your deployment is not yet on 2.6.x.</font>  [(Installation instructions from MongoDB Inc.)][minc-install]

#### ... on a Sandbox or for-pay Shared Single-node plan 
{:.no_toc}

1. Connect to your database using the mongo shell with a command similar to this:

        % mongo ds012345.mlab.com:56789/mydb -u dbuser -p dbpassword

1. Run the check
  
        > db.upgradeCheck()

#### ... on a for-pay Shared Cluster plan 
{:.no_toc}

1. Connect to your database on a secondary node using the mongo shell with a command similar to this:

        % mongo ds012345-a0.mlab.com:56789/mydb -u dbuser -p dbpassword

1. Run the check
  
        > rs.slaveOk()
        > db.upgradeCheck()

#### ... on a Dedicated Single-node plan 
{:.no_toc}

1. Connect to the "admin" database using the mongo shell with a command similar to this:

        % mongo ds012345-a0.mlab.com:56789/admin -u adminuser -p adminpassword

1. Run the check which cycles through all databases:
  
        > db.upgradeCheckAllDBs()


#### ... on a Dedicated Cluster plan 
{:.no_toc}

1. Connect to the "admin" database on a secondary node using the mongo shell with a command similar to this:

        % mongo ds012345-a0.mlab.com:56789/admin -u adminuser -p adminpassword

1. Run the check which cycles through all databases:
  
        > rs.slaveOk()
        > db.upgradeCheckAllDBs()

## Upgrade Requirements for MongoDB 2.4 {#v24}


*If you are upgrading from MongoDB 2.0, you should also be reviewing the [Upgrade Requirements for MongoDB 2.2](#v22).* 

With [MongoDB version 2.4][minc-dbv24], there are a couple of potentially breaking changes that should be highlighted:

- The `db.eval()` command now requires full admin privileges in 2.4.
- The `system.users` collection now enforces uniqueness on usernames in 2.4.
   - If any of your databases contain multiple users that have the same username, action will need to be taken before your database(s) can be upgraded to 2.4.

To resolve duplicate usernames (a change to your application code will be required):

1. Connect to the database using the mongo shell with a command similar to this:

        % mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword

1. Add a new user to the database that has a different username as that of the duplicate user:

        > db.addUser('username', 'password')

1. Update your application's connection code to use the new user you just created.
1. If your app requires a restart to start using to the new database credentials, do that now.
1. Verify that your app is able to authenticate to your database and is functioning normally.
1. Delete the old duplicate users:

         > db.removeUser('old_duplicate_username')

1. Add a unique index constraint to your system.users collection. See below for instructions.


__Alternate steps__: If for some reason you need to avoid a change to your application's connection code, you can follow these alternate instructions instead. However, be forewarned that this process will involve a brief period of time where your application will not be able to authenticate to your database:

1. Connect to the database using the mongo shell with a command similar to this:

        % mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword

1. Delete the old duplicate users:

        > db.removeUser('duplicate_username')

1. Add a user back to the database using the same username and password that your application is using to authenticate to your database:

        > db.addUser('username', 'password')

1. Verify that your app is able to authenticate to your database and is functioning normally.
1. Add a unique index constraint to your `system.users` collection. See below for instructions.

#### Prevent duplicate users before you upgrade 
{:.no_toc}
If you cannot upgrade to 2.4 right away, we recommend that you take the steps to ensure duplicate users are not created before your database is upgraded. To do this, you'll need to add a unique index contraint on your system.users collection:

    > db.system.users.ensureIndex({"user" : 1}, {"unique" : true})

#### Not sure what database credentials your application is using? 
{:.no_toc}
For those of you who are using mLab as an add-on with one of our partners and are having trouble figuring out what credentials your application is actually using, it might be because you are using an environment variable to authenticate to your mLab database. 

For example, if you are using the mLab add-on through Heroku, your application's connection code is probably using the `MONGODB_URI` environment variable. If so, you can install and use the [Heroku command line tool][hero-toolbelt] to fetch the value of this environment variable with the following command:

    heroku config --app your_heroku_app_name | grep MONGODB_URI

Using the pattern below, you can figure out your username and password with the result from the command above:

    mongodb://username:password@host:port/database_name


## Upgrade Requirements for MongoDB 2.2 {#v22}


### Driver Requirements {#v22-drivers}
{:.no_toc}

[MongoDB version 2.2][minc-dbv22] made changes to the way clients talk to the server, so it is critical that you make sure you are using the correct driver prior to upgrading.

Major 10gen-supported drivers that are compatible with 2.2 are as follows:

- Java - 2.9.3 (2.10.0 recommended)
- PHP - 1.3
- C++ - 2.2
- C#/.NET - 1.7
- Python - 2.4
- Node.JS - 1.1.5
- Perl - 0.46.1
- Ruby - 1.7

Of course, these are just minimum versions. We recommend running the latest version of you driver to get any bug fixes or improvements they may include.

### Limits and Thresholds {#limits-and-thresholds}
{:.no_toc}

#### Restriction on Collection Names 
{:.no_toc}

Collection names should begin with an underscore or a letter character, and cannot:

- Contain the symbol __$__
- Be an empty string (e.g. "")
- Contain the null character
- Begin with the __system.__ prefix which is reserved for internal use

#### Nested Depth for BSON Documents 
{:.no_toc}

MongoDB supports no more than 100 levels of nesting for BSON documents.
