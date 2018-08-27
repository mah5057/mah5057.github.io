---
layout: default
title: Accessing the MongoDB oplog 
permalink: /oplog/
description: Oplog tailing by accessing the local database
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:          https://mlab.com/login
[minc-oplog]:          https://docs.mongodb.com/{{ page.minc-docversion }}/core/replica-set-oplog/
[minc-oplog-size]:     https://docs.mongodb.com/{{ page.minc-docversion }}/core/replica-set-oplog/#oplog-size
[minc-change-streams]: https://docs.mongodb.com/manual/changeStreams/
[meteor-main]:         https://www.meteor.com
[es-mongodbriver]:     https://github.com/richardwilly98/elasticsearch-river-mongodb/
[mongo-connector]:     https://github.com/mongodb-labs/mongo-connector/wiki
[minc-tailablecursor]: https://docs.mongodb.com/{{ page.minc-docversion }}/core/tailable-cursors/


{% comment %} IMAGE LINKS {% endcomment %} 
[img-localdb]:         /assets/screenshot-localdb.png
[img-admindb]:         /assets/screenshot-admindb.png
[img-addlocaldbuser]:  /assets/screenshot-addlocaldbuser.png
[img-addoploguser]:    /assets/screenshot-addoploguser.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 

All for-pay plans with mLab have access to the "local" database which contains the [oplog][minc-oplog] (operations log), a special capped collection that keeps a rolling record of all insert, update, and delete operations.

The oplog provides valuable information that can be used in a variety of ways. For example, [Meteor-built][meteor-main] websites rely on the oplog to get real-time updates on data changes. Search and analytic engines such as Elasticsearch (via the [mongo-connector][mongo-connector]) can also use the oplog to sync your data and help you gain insight from all of your application’s data-related activities. These are just two of the many applications and libraries out there that are designed to take advantage of an oplog’s contents.

Since the oplog is critical to replication and the health of a cluster, we recommend against querying the oplog on the primary node of a cluster.  Oplog queries are resource intensive because they are not able to utilize indexes and require full collection scans for each operation.  Regularly querying the oplog can severely impact performance and even cause downtime.

{:.note-box}
<div markdown="1">
On Shared plans, we recommend tailing the oplog using [tailable cursors][minc-tailablecursor] in order to sync data from the oplog.

On Dedicated plans running MongoDB 3.6 and the WiredTiger storage engine, we recommend instead using the [Change Streams][minc-change-streams] feature.  This means that if your Dedicated plan deployment is running a version below MongoDB 3.6, we recommend upgrading to version 3.6 to use Change Streams.
</div>
{:.note-box}

## Accessing the oplog
*Not available for Sandbox databases*

### Creating a database user to access the oplog

For any application to read or tail the oplog, you will need to create a database user as per the following instructions: 


1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment whose oplog you want to access.
1. Click the "admin" database under the "System Databases" section.
![img-admindb][img-admindb]{:.narrow}
1. Click the "Users" tab.
1. Click the “Add oplog user” button to create a new user.  
![img-addoploguser][img-addoploguser]{:.skinny}

### Connecting to the oplog

To connect to the oplog, you'll need to make sure that your connection string is pointing to the "local" database where the oplog resides but authing against the "admin" database because the oplog reader database user was created in that database.

For example, your connection string may look like this:

    mongodb://<dbuser>:<dbpassword>@ds012345-a0.mlab.com:56789,ds012345-a1.mlab.com:56790/local?replicaSet=rs-ds012345&authSource=admin

## Frequently Asked Questions

##### Q. Does the "local" database holding the oplog count towards my quota and/or bill?

Shared plan deployments are currently configured with a 2 GB oplog, and this oplog is included for free. In other words, the local database does not contribute to the quota or bill for Shared plan deployments.

Dedicated plans are initially configured using [MongoDB's default oplog size][minc-oplog-size] but the size can then be customized. The oplog on Dedicated plan deployments does count toward the pre-configured amount of storage that comes with each plan. For example, if your Dedicated plan includes 60 GB of storage and the oplog has been configured to be 10 GB, there will only be 50 GB left for use.

##### Q. How do I create a database user that can read both the oplog and my database?

Some client libraries such as `mongo-connector` need access not only to the oplog, but also to the database itself. To support client libraries like this, mLab oplog database users are automatically granted the following access privileges:

__Dedicated plan deployments__

The oplog reader user is automatically granted this role:

    db.grantRolesToUser(OPLOG_READER_USER, ["readAnyDatabase"])

__Shared plan deployments__

The oplog reader user is automatically granted this role:

    db.grantRolesToUser(OPLOG_READER_USER, [{"role": "read", "db": YOUR_DB}] )

<p></p>

{:.warning-box}
<div markdown="1">
If created an oplog database user prior to April 2018, it might not have access to the database itself. In this situation, you will need to create a brand-new oplog database user in order to get this access.
</div>
{:.warning-box}




