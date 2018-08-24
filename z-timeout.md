---
layout: default
title: Setting timeout values
permalink: /timeouts/
description: MongoDB driver connection timeout and socket timeout values determine how long your application waits to establish connections or wait for responses
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[minc-drivers]:      https://docs.mongodb.com/{{ page.minc-docversion }}/applications/drivers/
[minc-connect]:      https://docs.mongodb.com/{{ page.minc-docversion }}/reference/connection-string/#connection-options
[blog-pooling]:      http://blog.mlab.com/2013/11/deep-dive-into-connection-pooling/

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

<p></p>
At a high level, whenever you create or use a MongoClient object to talk to your database, the driver establishes a connection to your MongoDB server. How long your application waits for the initial connection to be established and how long it waits for responses to subsequent requests is determined by the values of your [connection and socket timeouts][minc-connect].

## Connection timeout {#connection-timeout}

The connection timeout value determines the maximum amount of time your driver will wait for a connection to be established with the server.

This value is only used when making an initial connection to your database, and so selecting the correct setting for this timeout can be a balancing act.

On the one hand you want to make sure that your connection timeout is high enough that your application can reliably establish a connection to the database server, even in the face of high server load or intermittent network lag. On the other hand you don’t want the timeout to be so large that your application “hangs” for an inordinate amount of time while it waits to connect to a server that may be temporarily unreachable; in this case you will want to propagate the error state up to your users in a relatively timely matter and too high a timeout can make this difficult.

The default driver connection timeout value ranges anywhere from 1 second (e.g. the Node.JS driver in some cases) to 30 seconds (e.g  the Ruby driver), so you really need to think about what the optimal setting is for your use case.

### Our suggestions for the connection timeout
{:.no_toc}

For connections made through a Platform-as-a-Service (PaaS) such as Heroku, we recommend a timeout of 30 seconds since your application is likely running in a container that can be “idled” or “passivated” during periods of low activity. In such cases it may take longer for your code to establish new database connections when your application is made active again.

For faster connection failures, you can adjust the timeout value down as needed.

Of course, we also recommend that you use [connection pooling][blog-pooling] so that you are seldom creating new connections to the database server.

## Socket timeout {#socket-timeout}

The socket timeout option specifies to your driver how long to wait for responses from the server. This timeout governs all types of requests (queries, writes, commands, authentication, etc.).

For example, if you have this timeout set to 30 seconds, your driver will never wait more than 30 seconds for the result of a query (although the query will continue to run to completion on the server). While there are some types of operations where you might consider defining a hard timeout (e.g. authentication), you usually don’t want to limit the amount of time your database operations take as they can be inherently variable.

The default socket timeout value for most drivers is infinite (i.e. no timeout) which is usually expressed as 0 or a null value.

### Our suggestions for the socket timeout
{:.no_toc}

We suggest leaving this setting at the default (i.e. no timeout) unless you have good reason to change it. That said, some drivers allow you to control this setting on a per operation basis, in which case you may consider fine-tuning this setting based on your knowledge of specific operations.


## Further your knowledge {#resources}

Each [MongoDB driver][minc-drivers] implements the MongoClient class and these network timeout options differently. If you would like to investigate these timeout options further, you can peruse each specific driver’s documentation and source code for details on how to configure these options with that driver.

These timeouts are only two of many MongoDB driver options available to you. We encourage you to explore and learn more about your driver configuration settings so that you may fine-tune your app with optimal settings based on your use case.
