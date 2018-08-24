---
layout: default
title: Connecting to Your Database
permalink: /connecting/
description: Connect to your mLab database using the mongo shell, a standard driver, or mLab's Data API. Troubleshoot issues when you can't connect to your database.
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-languages]:                       /languages
[docs-data-api]:                        /data-api
[docs-managesub]:                       /subscriptions/#manage-subs
[docs-failover]:                        /ops/#failover
[docs-troubleshoot-connection-issues]:  /troubleshoot-connection-issues
[mlab-login]:                           https://mlab.com/login
[mlab-flipflop]:                        http://flip-flop.mlab.com/
[minc-drivers]:                         https://docs.mongodb.com/{{ page.minc-docversion }}/applications/drivers/
[minc-mongo]:                           https://docs.mongodb.com/getting-started/shell/client/
[minc-string]:                          https://docs.mongodb.com/{{ page.minc-docversion }}/reference/connection-string/
[minc-ping]:                            https://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/ping/
[minc-replication]:                     https://docs.mongodb.com/{{ page.minc-docversion }}/replication/
[minc-driver]:                          https://docs.mongodb.com/ecosystem/drivers
[mdbuser-azure]:                        https://groups.google.com/forum/?fromgroups=#!topic/mongodb-user/_Z8YepNHnbI
[wiki-keepalive]:                       http://en.wikipedia.org/wiki/Keepalive
[tldp-keepalive]:                       http://tldp.org/HOWTO/html_single/TCP-Keepalive-HOWTO/
[stack-reconnect]:                      http://stackoverflow.com/questions/13980236/does-mongodb-have-reconnect-issues-or-am-i-doing-it-wrong/14409431#14409431
[google-shell]:                         https://cloud.google.com/shell/docs/
[google-shell-limitations]:             https://cloud.google.com/shell/docs/limitations
[google-flexible-env]:					https://cloud.google.com/appengine/docs/flexible
[google-standard-env]:					https://cloud.google.com/appengine/docs/standard


{% comment %} IMAGE LINKS {% endcomment %} 
[img-connectstring]:    /assets/screenshot-connectinfo.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Overview 
{:.no_toc}

The various methods by which you can connect to your mLab-hosted database are described here. We also provide some troubleshooting advice for issues you might encounter while trying to establish a connection.

## Finding your database connection info {#connect-string}

Follow these steps to obtain the information required to connect to your mLab-hosted database(s):

1. [Log in][mlab-login] to the mLab management portal. 
1. Navigate to the MongoDB deployment that you wish to connect to.
1. At the top of the screen, you will see a box with the connection information.
![img-connectstring][img-connectstring]

The first string is what you would use if you were to [connect using the mongo shell](#mongo-shell) and the second string is the [standard connection URI][minc-string] string that [MongoDB's drivers and client libraries][minc-drivers] use.

## Managing database users {#users}

To add a new database user (to create an admin database user, skip these steps and read the sub-section below):

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account’s Home page, navigate to the deployment.
   - If applicable, then navigate to the database for which you will be adding a user.
1. Click the "Users" tab.
1. Click the "Add database user" button to create a new user.

You can then use this database user to connect to your database.

If you need to update the password for an existing database user, you'll have to delete the existing user first, then create a new one with the same name (but different password).

{:.note-box}
<div markdown="1">
We recommend avoiding special characters such as "@", "/", or ":" in your database username or password as they can cause issues if they are not properly escaped. 
</div>
{:.note-box}

### Creating an admin database user {#admin-user}
{:.no_toc}

*Available for Dedicated plans only*  

If your mLab plan includes a dedicated `mongod` process and full database server admin privileges, you will be able to manage fully privileged database users in a special system database in MongoDB called the "admin" database.

To add a new database user in the "admin" database:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account’s Home page, navigate to the deployment.
1. Navigate to the "admin" database listed in the "System Databases" section.
1. Click the "Users" tab.
1. Click the "Add database user" button to create a new user.

Once you are authenticated to your "admin" database, you will be able create more databases, access all the other databases in the deployment, etc.

To authenticate as a fully privileged admin database user, be sure to use "admin" as the database name. For example:

    mongodb://<adminuser>:<password>@ds012345-a0.mlab.com:56789,ds012345-a1.mlab.com:56790/admin?replicaSet=rs-ds012345

## Connection methods {#methods}

While you can always browse your database [using the mLab management portal][docs-managesub], there are other methods by which to connect to and interact with your MongoDB database. These other methods will be necessary for application integration and many system administration tasks. 

### mongo interactive shell {#mongo-shell}

The [mongo][minc-mongo] shell is an interactive JavaScript shell interface to MongoDB. After you have installed the version of MongoDB that matches the version that your mLab-hosted deployment is running on, open a terminal window. In the window, connect to your mLab-hosted database with a command similar to the following (replace the necessary values with the information specific to your database, of course):  

    % mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword

A successful connection to the mongo shell will look similar to this:

{% highlight text %}
% mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword
MongoDB shell version: 3.4.7
connecting to: ds012345.mlab.com:56789/dbname
> 

{% endhighlight %}

You may find our [troubleshooting guide](#help) helpful if you continue to experience problems trying to connect to your deployment via the mongo shell.


### MongoDB driver {#drivers}

In order to provide your application a means to communicate with your MongoDB database, you will need a driver in a language appropriate to your application. 

You can go to MongoDB, Inc.'s site to read about the [official MongoDB drivers][minc-drivers], but we also provide [driver examples in many of the major languages][docs-languages]: C#, Java, Node.js, PHP, Python, Ruby, etc.. These examples should run out-of-the-box after you install the appropriate driver(s) and update your MongoDB URI. 

You may find our [troubleshooting guide](#help) helpful if you continue to experience problems trying to connect to your deployment using a compatible driver.

### mLab Data API {#data-api}

mLab databases can be accessed by your application code in two ways. 

The first method---the one we __strongly__ recommend whenever possible for added performance and functionality---is to connect using one of the MongoDB drivers (as described above). 

The second method is to connect via [mLab's RESTful Data API][docs-data-api]. __Use this method only if you cannot connect using a MongoDB driver__.

Please note that neither the Data API nor any driver is intended for use in an untrusted environment such as a JavaScript browser app where securing credentials to connect would be prohibitive. In such use cases, we recommend building your own server for the browser to connect to and then have that server connect to your database.

## Replica set connections and high availability {#replica-set-connections}

[MongoDB replica sets][minc-replication] provide high availability using automatic failover. Failover allows a secondary member to become primary if the primary is unavailable.

Our Shared and Dedicated Cluster plans are MongoDB replica sets with at least two data-bearing nodes that have been configured to be electable (i.e., eligible to be primary). This configuration allows for redundancy and increased data availability which are critical for most production applications.

An application will gracefully handle failover events if it has been properly configured to use a replica set connection.

### How to make a replica set connection {#making-a-replica-set-connection}

Your connection configuration should include the address of every primary-eligible member (in any order) of your replica set.

If you follow the steps to [find your database connection information](#connect-string), you'll notice that your replica set connection URI has a list of server addresses (hostname/port pairs) and looks similar to the following example:

    mongodb://<dbuser>:<dbpassword>@ds012345-a0.mlab.com:56789,ds012345-a1.mlab.com:56790/<dbname>?replicaSet=rs-ds012345

Each hostname/port pair corresponds to one of the data-bearing members in your replica set. Drivers will use this list as a seed list to connect to the replica set. Once connected, drivers will auto-discover the replica set's member configuration.

For most drivers, passing in the replica set connection URI is sufficient. If you’re using an unofficial MongoDB library, you should consult the library’s documentation to ensure that it supports replica set connections and configure your connection code accordingly.

### What to expect during failover {#understanding-failover}

When a primary becomes unavailable, the failover process initiates and the replica set will hold an election to select a new primary. Typically, this process lasts about 10 seconds, but it can range anywhere between 5-30 seconds. During failover, your application will encounter errors as it attempts to write.

To help you understand and prepare for failover, we provide a publicly-accessible MongoDB replica set called [flip-flop][mlab-flipflop] that fails over every 60 seconds. This tool makes it easy to visualize the replica set election process and is available so that you can practice writing client driver connection using a test application. 

### Testing auto-failover {#testing-failover}

We highly recommend testing to ensure that your application can survive replica set elections and failover without the need for manual intervention. One easy way to conduct this test is to manually [initiate a failover][docs-failover] for your cluster.

If you experience any issues related to your replica set connection, contact us at <support@mlab.com> with your exact driver version and your connection configuration settings with your database password masked for security (we do not need to know the password to assist).

## Troubleshooting connection issues {#help}

What can you do if you are having trouble connecting to your database? Check out our [troubleshooting connection issues][docs-troubleshoot-connection-issues] guide to help find the problem.

## Frequently Asked Questions (FAQ) {#faq}

### Q. Is it possible to connect to an mLab deployment from Google App Engine?
{:.no_toc}

Yes, it is possible.  If you are having trouble connecting to your database from Google App Engine, follow these troubleshooting steps:

- If you are connecting to your mLab deployment using a [MongoDB driver][minc-driver] , make sure you are *not* connecting from the [Google Cloud Shell][google-shell] due to its [limitation on outbound ports][google-shell-limitations].  

- If you have deployed your application in [App Engine standard environment][google-standard-env], try deploying your application in [App Engine flexible enviroment][google-flexible-env] since some standard environment do not allow an application to make "arbitrary network connections".

- Try to first connect from your local/development environment by following the [troubleshooting guide](#help) above.   

If you still experience issues connecting after deploying your application to Google App Engine,  please contact us at <support@mlab.com>.

### Q. How do I handle dropped connections on Azure Classic?
{:.no_toc}

There is a known issue that the Azure IaaS network enforces an idle timeout of four (4) minutes. This can affect persistent connections to our Azure-hosted databases from both inside and outside of Azure. It can also affect connections from an app running in Azure to an mLab database (or really any database for that matter) running elsewhere.

We are working with Azure to see if we can't make things more user-friendly, however, in the meantime, others have had success by configuring their driver options to work around the issue.

#### Max connection idle time  
{:.no_toc}

The most effective workaround we've found in working with Azure and our customers has been to set the max connection idle time below four minutes. The idea is to make the driver recycle idle connections before the firewall forces the issue. 

For example, one customer, who is using the C# driver, set `MongoDefaults.MaxConnectionIdleTime` to one minute and it cleared up the issue.

    MongoDefaults.MaxConnectionIdleTime = TimeSpan.FromMinutes(1);

The application code itself didn't change, but now, behind the scenes, the driver aggressively recycles idle connections. The result can be seen in the server logs as well: lots of connection churn during idle periods in the app.

Additional details on this approach can be found in one of the related MongoDB user forums on the Internet such as: [SocketException using C# driver on Azure][mdbuser-azure].

#### Keepalive 
{:.no_toc}

You can also work around the issue by making your connections less idle with some kind of [keepalive][wiki-keepalive]. This is a little tricky to implement unless your driver supports it out of the box, usually by taking advantage of [TCP Keepalive][tldp-keepalive]. If you need to roll your own, make sure to grab each idle connection from the pool every couple minutes and issue some simple and cheap command, probably a [ping][minc-ping].

#### Handling disconnects 
{:.no_toc}

Disconnects can happen from time to time even without an aggressive firewall setup. Before you get into production, you want to be sure to handle them correctly.

First, be sure to enable auto reconnect. How to do so varies from driver to driver, but when the driver detects that an operation failed because the connection was bad, turning on auto reconnect tells the driver to attempt to reconnect.

However, this doesn't completely solve the problem. You still have the issue of what to do with the failed operation that triggered the reconnect. Auto reconnect doesn't automatically retry failed operations. That would be dangerous, especially for writes. Usually an exception is thrown and the app is asked to handle it. Often, retrying reads is a no-brainer, but retrying writes should be carefully considered.

The mongo shell session below demonstrates the issue. The mongo shell, by default, has auto reconnect enabled. In this example, a document was inserted into a collection named `stuff`, then a find was issued for all the documents in that collection. Thirty minutes later, the same query was tried again. The query  failed, but the shell automatically reconnected and upon another re-try, the query worked as expected.

{% highlight text %}
% mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword
MongoDB shell version: 3.2.11
connecting to: ds012345.mlab.com:56789/dbname
> db.stuff.insert({})
> db.stuff.find() { "_id" : ObjectId("50f9b77c27b2e67041fd2245") }

// wait 30 min 
> db.stuff.find()
Fri Jan 18 13:29:28 Socket recv() errno:60 Operation timed out 192.168.1.111:56789
Fri Jan 18 13:29:28 SocketException: remote: 192.168.1.111:56789 error: 9001 socket exception [1] server [192.168.1.111:56789]
Fri Jan 18 13:29:28 DBClientCursor::init call() failed Fri Jan 18 13:29:28 query failed : dbname.stuff {} to: ds012345.mlab.com:56789
Error: error doing query: failed
Fri Jan 18 13:29:28 trying reconnect to ds012345.mlab.com:56789
Fri Jan 18 13:29:28 reconnect ds012345.mlab.com:56789 ok
> db.stuff.find() { "_id" : ObjectId("50f9b77c27b2e67041fd2245") }
{% endhighlight %}

 
#### Related materials 
{:.no_toc}

- [StackOverflow: Does mongoDB have reconnect issues or am i doing it wrong?][stack-reconnect]








