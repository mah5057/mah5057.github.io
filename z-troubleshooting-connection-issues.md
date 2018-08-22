---
layout: default
title: Troubleshooting connection issues
permalink: /troubleshoot-connection-issues/
description: Troubleshooting guide when you can't connect to your database or experience timeouts.
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-timeout]:                         /timeouts
[docs-indexing]:                        /indexing
[docs-best-practices-create-indexes]:	/indexing/#best-practices-when-creating-indexes
[docs-SQT]:	                            /monitoring/#slow-query-analyzer
[docs-server-logs]:                     /monitoring/#database-log-files
[docs-telemetry]:                       /monitoring/#telemetry
[docs-current-ops]:                     /ops/#ops-mgmt
[docs-compact-repair]:                  /ops/#compacting-sandbox-or-single-node
[docs-private-environment]:             /private-environments
[docs-peering-connection-issues]:		/private-environments/#troubleshooting-peering-connections
[docs-connection-string]:               /connecting/#connect-string
[docs-database-users]:                  /connecting/#users
[docs-database-admin-user]:             /connecting/#creating-an-admin-database-user
[docs-replica-set-connection]:          /connecting/#replica-set-connections
[docs-firewalls]:                       /security/#custom-firewalls
[docs-account-users]:                   /accounts/#account-users
[docs-connecting-to-oplog]:             /oplog/#connecting-to-the-oplog
[blog-connection-pool]:					https://blog.mlab.com/2013/11/deep-dive-into-connection-pooling/
[minc-rs-status]:                       https://docs.mongodb.com/manual/reference/method/rs.status/#rs-status
[minc-rs-stepDown]:                     https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown
[minc-driver-compatibility]:            https://docs.mongodb.com/ecosystem/drivers/driver-compatibility-reference/
[minc-authentication-database]:         https://docs.mongodb.com/manual/core/security-users/#user-authentication-database


{% comment %} IMAGE LINKS {% endcomment %} 
[img-connectstring]:    /assets/screenshot-connectinfo.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Overview 
{:.no_toc}

What can you do if you are having trouble connecting to your database? Here are some things you can check to rule out possible culprits and find the real source of the problem.

### When you can't connect to a new database or experience consistent connection issue

#### Is it a basic network access issue? {#check-network-access}

The first thing to check is to make sure you have basic network access to connect to the port on which your database's server process is running.  You can get the database server address and port from your deployment's [connection string][docs-connection-string].

- If you're connecting from a machine that has access to a browser, the easiest way to test this is by entering your database server's address in your browser's address bar and connect from there.  For example:

        http://ds012345.mlab.com:12345

	If you're able to connect, you should see this output in our browser:

    {% highlight text %}It looks like you are trying to access MongoDB over HTTP on the native driver port{% endhighlight %}

- Another way to test basic network connectivity is by using `nc`, `netcat` or `telnet`. For example:  

        % nc -w 3 -v ds012345.mlab.com 12345

	You should see output that includes the following:  

    {% highlight text %}Connection to ds012345.mlab.com port 12345 [tcp/*] succeeded!{% endhighlight %}

If the above tests give you an error or hang, you can:

- Check our status page at <https://status.mlab.com> to see if there are issues related to your database deployment (e.g. network related issues in your region/availability zone, Emergency maintenance)

- Check with your network administrator to see if there are any outbound firewall restrictions that would cause the connection failure. (e.g. the port is being blocked)

- If the deployment you're tyring to connect to is on a Dedicated plan, ensure the deployment's [inbound firewall rules][docs-firewalls] have been configured to allow in the machine(s) you are trying to connect from.

- Ensure the DNS service that your application/machine uses is properly resolving the deployment's address, using tools like `nslookup` or `dig`.  For example:

        % nslookup ds012345.mlab.com

	This should return the IP address for `ds012345.mlab.com`.   If `nslookup` returns an error,  check with your network administrator about the DNS problem.

- If your deployment is within a [Private Environment][docs-private-environment] and you're trying to connect from within your VPC via a peering connection, [review our troubleshooting guide on peering connection issues][docs-peering-connection-issues].

#### Is it a connection configuration issue? {#check-connection-config}

If everything is fine from a network perspective, the next thing to check is your connection settings.  Use the mongo shell to debug connection details.  For example:

{% highlight text %}
% mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword
MongoDB shell version: 3.2.11
connecting to: ds012345.mlab.com:56789/dbname 
Mon Apr 23 11:41:20 uncaught exception: login failed 
exception: login failed
{% endhighlight %}

- Ensure that you're providing the correct hostname and port number for the [connection string][docs-connection-string].

- Ensure that you're using a [database user/password][docs-database-users] to connect to the database, and *not* your [mLab account user/password][docs-account-users] that you use to log into mLab's management portal.

- Ensure that you are *not* using a special character such as "@", "/", or ":" in your database username or password. If not properly escaped, they can cause connection issues as well.   You may want to create a new database user and password without the special characters just for testing.

- Ensure your [authentication database][minc-authentication-database] is the correct one for the database user you're using.  If your database user is in the same database as the database you're connecting to, the pubished [connection string][docs-connection-string] for your deployment should be sufficient.  However, make sure you review your connection string when [connecting to the oplog][docs-connecting-to-oplog] or when you're using a [database admin user][docs-database-admin-user] to connect.

#### Is it a shell/driver version compatibility issue? {#version-compatibility}

If everything is fine from a network perspective and the database credentials you're using are correct, the next thing to check is whether you are connecting and authenticating using a compatible method.

- Ensure that the version of the mongo shell you're using to connect is compatible with your deployment's MongoDB version. For example, if your database is running MongoDB 3.4.x, then your shell version should also be 3.4.x.

- Ensure that the version of the driver you're using is compatible with your deployment's MongoDB version by checking [MongoDB's Driver Compatibility Tables][minc-driver-compatibility].

An common issue caused by version compatibility is the support for the SCRAM-SHA-1 authentication mechanism in MongoDB 3.0 or above.  To elaborate, the release of MongoDB 3.0 included support for the SCRAM-SHA-1 challenge-response user authentication mechanism, which changed how MongoDB uses and stores user credentials. Clients connecting to an mLab database running MongoDB 3.0 or above must do so using drivers or mongo shells which also support SCRAM-SHA-1.  

#### Is it a connection timeout issue? {#timeout}

- Check if the connection issue is related to a network latency problem between your application/machine and the database.

{:.note-box}
<div markdown="1">
For network latency and security reasons, we __strongly__ recommend that you connect from the same region as your database.   If this is not possible, make sure you are connecting from a region closest to your database to reduce latency. 
</div>
{:.note-box}

- If you still cannot connect or having intermittent problems connecting to your database, you should consider [adjusting the connection timeout for your driver][docs-timeout].    

### When you experience sudden or intermittent connection issues to an existing database 

If you are experiencing sudden or intermittent connection timeout/failure to a database that you had connected to previously, and have not changed your network settings or updated your driver, follow these troubleshooting tips:

#### Is it the database?

- **Check to see if the database server was down during the connection failure**

    There are a few reasons which can cause the database server to go down.  For example:

    1. Scheduled/Emergency maintenance, including user-initiated maintenance via the "Tools" tab of the deployment (e.g. Restart MongoDB server processes)
    2. The database server process crashed (e.g due to an out-of-memory (OOM) issue)
    3. The host/VM on which the database server runs on spontaneously rebooted.

    To determine whether your database server was down due to any of the above reasons:

    - For Shared/Dedicated deployments, check with your team members for any user-initiated maintenance request made via the "Tools" tab.

    - For Shared/Dedicated deployments, check the email address associated with your account's technical/admin user for down database server notfications or scheduled maintenance notifications.

    - Otherwise, check <https://status.mlab.com> for Emergency maintenance or other issues relating to your database deployment.

    If you are actively experiencing the connection problem at the moment, use the mongo shell to connect to your database server.   If you are able to connect via the mongo shell, this would indicate that the database server process is up.   For Shared/Dedicated Cluster deployments, you can also run [rs.status()][minc-rs-status] from the mongo shell to check the status of each server in your replica set and make sure you have a PRIMARY server running. 

    If the database server process crashed is due to an out-of-memory (OOM) issue, further investigation will be necessary to determined the root cause of the crash.

- **Check to see if you have reached the maximum number of open connections allowed to your database server**

    For Shared/Dedicated deployments, you would see the error message "connection refused because too many open connections" in the [server logs][docs-server-logs].   If this is the case:
    
    - Make sure your application is [connecting using a connection pool][blog-connection-pool].
    - Keep up-to-date with the driver that your application uses and check for known bugs related to your driver version that can cause connection issues. 

- **Check for globally blocking operations**

    Some MongoDB operations can cause the server to block all incoming requests from clients.  For example:   

    - Running [db.repairDatabase()][docs-compact-repair] to compact your database.
    - Creating indexes in the *foreground*.

    Check with your team members to see if the above globally blocking operations were executed.  For Shared or Dedicated plans, you can also check [current operations][docs-current-ops] or the [server logs][docs-server-logs] to see if these operations were executed/are running. 
 
- **Check to see if the database experienced heavy queuing or long-running operations**

    A connection timeout/failure can also be caused by an over burdened database system which can result in heavy queuing or long-running operations.  Below are some common scenarios to keep in mind if your application/client suddenly experiences intermittent connection problems.

    - The process of creating an index can require a lot of system resources.   Make sure you are not:
	    - Repeatedly creating and dropping indexes.   
	    - Creating multiple indexes at the same time. 

    - Make sure your application is [connecting using a connection pool][blog-connection-pool] to avoid:
	    - Connection churn which is caused by repeatedly opening and closing connections.
	    - Reaching/Exceeding the connection limit to the database server by never closing unused connections.

    - Check for an increase in load to the database (e.g. recent data load jobs)

    - Check for long-running resource intensive operations by looking in the [server logs][docs-server-logs] (e.g. mapReduce, Geo Spatial queries, aggregations, in-memory sorts).

    Note that free Sandbox/Shared deployments are run on shared environment and can be impacted by the activities of other users in the shared environment.  If you suspect that your connection issue is related to the activity of others on the shared environment,  please contact us at <suuport@mlab.com> and we'd be happy to investigate.


- **Check to make sure your queries are optimized and using indexes**

    Operations that are not indexed well use more resources than needed.  This unnecessary usage of resources can often lead to performance degradation which can appear as connection timeouts/failures to your application/client.   Even a single unindexed query is enough to cause significant performance degradation.      

    We recommned reviewing our [general guidance on performance and indexing][docs-indexing] and create the necessary indexes.

    When you create an index, please follow our [best practices for building indexes][docs-best-practices-create-indexes].

    If your deployment is on a Shared or Dedicated plan, we highly recommend visiting our [Slow Queries][docs-SQT] tab and considering our index recommendations for query patterns that will continue to be used.

- **Check for recent failovers**

    *Only applies to Shared/Dedicated Cluster deployments*

    Failovers can cause connection issues, especially when clients/applications are not connecting using a [replica set connection][docs-replica-set-connection] to a cluster deployment.  First, make sure you are connecting using a replica set connection.

    Once you confirm that you are connecting using a replica set connection, check in [Telemetry][docs-telemetry] for recent failovers by reviewing the "IS PRIMARY" graph for each node in your replica set.

    There are two types of failovers, manual failovers and automatic failovers.  [Manual failovers][docs-failover] are user-initiated and can be issued via the "Servers" tab for your deployment or via the command [rs.stepDown()][minc-rs-stepDown] from the mongo shell.
    
    - Check with your team members to see if a recent manual failover was issued around the time you experienced the connection problem.

    If it was an automatic failover that caused the connection failure, it is often times the symptom of the problem and not the root cause.  It may be necessary to investigate the root cause of repeated failovers which can include:

    - Database server contention due to operations that are not fully using indexes.
    - An overburden database system due to heavy load that causes queuing and long-running operations
    - Database server process crashing due to an Out-Of-Memory issue
    - Bad host/VM issues which require the VM to be replaced via an Emergency maintenance

#### Is it the network? 

If the issue does not appear to be related to the database, check for network issues that could cause the connection problem.

- **Check for network latency**

    For network latency and security reasons, we __strongly__ recommend that you always connect to your database from the same datacenter that your application is located in. 

    If you are *not* connecting from within the same region as your database, the network latency/issue between your application and the database can cause connection timeouts. 

    You can also contact your application's hosting provider to check for network issues around the timeframe when your connection problem occurred. 

- **Are the connection issues happening only on some clients and not others**

    If you are connecting to the database from multiple clients/applications and are only experiencing the connection issue from some of your clients:

    - Check the client's network setting.
    - Check the client's connection configuration or connection code.
    - Check changes to the client's driver or known driver bugs.

#### Is it the application/drivers? 

- Check with your team members for any recent rollouts that included changes to the driver.
- Check with your team members for any recent rollouts taht included changes to the application's connection code or connection configuration.
- Keep up-to-date with the driver that your application uses and check for known bugs related to your driver version that can cause connection issues.  

{:.note-box}
<div markdown="1">
It is important to note the time when your connection issue occured and to correlate that with what is shown in the [server logs][docs-server-logs], [Telemetry graphs][docs-telemetry], or [current operations view][docs-current-ops].
</div>
{:.note-box}

### Still having problems? {#stuck}

If you know you have network access and the correct credentials and you're still having problems connecting, contact us at <support@mlab.com> and be sure to include your connection details (e.g., hostname/server, port, database name). 










