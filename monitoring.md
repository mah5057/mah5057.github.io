---
layout: default-nosearch
title: Monitoring and Alerts
permalink: /monitoring/
description: Monitor health and status of mLab databases with alerts, logs, New Relic integration and MongoDB stats
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:             https://mlab.com/login
[mlab-status]:            https://status.mlab.com
[minc-mongostat]:         http://docs.mongodb.com/{{ page.minc-docversion }}/reference/program/mongostat/
[minc-serverstatus]:      http://docs.mongodb.com/{{ page.minc-docversion }}/reference/server-status/
[minc-utc]:               https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/model-time-data/
[docs-alerts]:            /telemetry-alerts/
[docs-contacts]:          /accounts/#account-contacts
[docs-compacting]:        /ops/#compacting
[docs-changeplan]:        /subscriptions/#change-plans
[docs-indexing]:          /indexing
[docs-indexing-sorting]:  /indexing/#sorting-efficiently
[docs-dbstats]:           {{ site.url }}/storage-statistics
[docs-adminuser]:         {{ site.url }}/connecting/#creating-an-admin-database-user
[blog-repllag]:           http://blog.mlab.com/2013/03/replication-lag-the-facts-of-life/
[newr-mongolab]:          http://newrelic.com/mongolab
[newr-key]:               https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-setup/license-key#finding
[blog-telintro]:          http://blog.mlab.com/2015/03/introducing-telemetry-monitoring-for-mongolab-deployments/
[blog-telpagefaults]:     http://blog.mlab.com/2015/08/telemetry-series-page-faults/
[blog-telqueues]:         http://blog.mlab.com/2015/11/telemetry-series-queues-and-effective-lock-percent/
[blog-telupdates]:        http://blog.mlab.com/2016/01/new-telemetry-features-metric-descriptions-and-alert-incidents/
[minc-profiler]:          https://docs.mongodb.com/manual/tutorial/manage-the-database-profiler/
[minc-profiler-overhead]: https://docs.mongodb.com/manual/tutorial/manage-the-database-profiler/#profiler-overhead
[ddog-mongodb]:           http://docs.datadoghq.com/integrations/mongodb/

{% comment %} IMAGE LINKS {% endcomment %}
[img-realtimetelemetry]: /assets/screenshot-realtimetelemetry.png
[img-status]:            /assets/screenshot-status.png
[img-logs]:              /assets/screenshot-logs.png
[img-telemetry]:         /assets/screenshot-telemetry.png
[img-newrelic]:          /assets/screenshot-newrelic.png
[img-newrelickey]:       /assets/screenshot-newrelickey.png
[img-enternrkey]:        /assets/screenshot-enternewrelic.png
[img-profiler]:          /assets/screenshot-profiler.png
[img-sqt-index]:         /assets/screenshot-sqt-index.png
[img-sqt-where]:         /assets/screenshot-sqt-where.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview
{:.no_toc}

mLab's monitoring features are designed to ensure you always have insight into the health of your deployment.

### mLab Telemetry {#telemetry}

*Not available for Sandbox databases*  

mLab's Telemetry service is a real-time and historical monitoring tool for mLab deployments that tracks key MongoDB metrics and helps you effectively monitor and tune database performance. It provides a customizable dashboard that gives you the ability to easily view and compare database and OS performance over time. You can also define [custom alerts][docs-alerts] with Telemetry.

![img-telemetry][img-telemetry]

#### How to access Telemetry  
{:.no_toc}

*Not available for Sandbox databases*

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, there are two different ways to open Telemetry:
   - Option 1: Locate the row of the deployment whose stats you want to view and click the graph button that appears at the end of the row.
   - Option 2: Click the row of the deployment whose stats you want to view.
      - Once the home page of the deployment opens, click the "Monitoring" tab to see the first set of critical metrics.
      - Click the row of the server whose statistics you want to see.
1. After Telemetry opens in its own window, you will see the historical graphs.
   - From here, you can switch which server you are viewing, re-arrange the dashboard layout, and/or use the controls in the menu bar to choose your desired view.
1. (Optional) To view real-time statistics, click the "LIVE STATS" button located in the "ZOOM" section of the menu bar above the graphs.
   - From within the new window that opens, you can also switch to any of the other servers in your deployment.

#### Real-time and historical statistics {#stats}

__Historical graphs in Telemetry__
{:.no_toc}

Currently, there are historical graphs for all of the MongoDB metrics below and more:

- Operations (per second)
- Docs Affected (per second)
- Connections
- CPU Time (system, user, iowait, etc.)
- Queues (readers, writers)
- Sizes (dataSize, indexSize, etc.)
- Memory (resident, mapped, etc.)
- Network (in, out, requests)
- Replication Oplog Window
- Replication Lag

Additional graphs primarily applicable to the MMAPv1 storage engine:

- Page Faults (per second)
- Non-mapped Virtual Memory

Additional graphs primarily applicable to the WiredTiger storage engine:

- Cache Size
- Cache In/Out (per second)
- Cache Pages Evicted (per second)
- Transaction Tickets
- Transaction Checkpoint Time

__Real-time stats in Telemetry__

If you clicked the “LIVE STATS” button after opening the Telemetry dashboard, you can view key performance metrics for your database deployment in real-time. These metrics are streamed from MongoDB's [mongostat][minc-mongostat] utility.

When you open the live stats view, you will see the output of `mongostat` streaming in a tabular form. For an explanation of these metrics, read the [mongostat][minc-mongostat] documentation.

In addition to these real-time performance statistics, you can use the mLab management portal to view [current database and collection storage statistics][docs-dbstats] (e.g., data size).

#### Custom alerts {#custom-alerts}

mLab's Telemetry service also allows you to define custom alerts on database metrics. When alert thresholds are breached, notifications will be sent to associated notification channels such as email or services like PagerDuty, HipChat, and Slack. For details, visit our [documentation on Telemetry Alerts][docs-alerts].

#### Further reading {#further-reading}
{:.no_toc}

mLab's blog is a place where we provide additional insight and assistance with Telemetry-related metrics and features. Our posts are designed to help you make the most out of the valuable data in Telemetry with articles such as:

- [Introducing Telemetry – monitoring for MongoLab deployments][blog-telintro]
- [Telemetry Series: Page Faults][blog-telpagefaults]
- [Telemetry Series: Queues and Effective Lock Percent][blog-telqueues]
- [New Telemetry features – metric descriptions and alert incidents][blog-telupdates]

## mLab's Slow Query Analyzer {#slow-query-analyzer}

*Not available for Sandbox databases*

Our __Slow Query Analyzer__ provides an analysis of the slow operations that have recently run on your database deployment. We run this analysis several times a day so that you can have up-to-date information.

### Accessing the analysis

#### "Slow Queries" tab
{:.no_toc}

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment you want to analyze.
1. Click the "Slow Queries" tab.

The __last analyzed__ timestamp at the top of the tab reports the last time the Slow Query Analyzer processed the log file on this deployment. The __log lines read__ metric reports the time range of the log file that was read by the Slow Query Analyzer at that __last analyzed__ time.

#### Weekly email report
{:.no_toc}

Each week, emails are sent to the account's [Technical Contact][docs-contacts] highlighting the slowest operations running on each deployment that could benefit from improved indexing.

### Understanding the analysis

#### Recommendations
{:.no_toc}

A recommendation is automatically generated for each slow operation based on the methodology described in our [Indexing guide][docs-indexing].

![img-sqt-index][img-sqt-index]


We also make other recommendations based on our special index considerations.

![img-sqt-where][img-sqt-where]

Results are sorted by the total combined time of all occurrences for a query, so that the most time consuming queries are at the top. This sorting has the effect of emphasizing the most impactful queries without hiding frequent relatively fast queries or infrequent very slow queries. Additional sorting options will be supported in the future.

{:.note-box}
<div markdown="1">
An optimally indexed query with a high average time is potentially a symptom of other unindexed queries.
</div>
{:.note-box}

{:.warning-box}
<div markdown="1">
This analysis is not a substitute for having a direct understanding of your data model and the queries your application uses. If you have any questions, don't hesitate to email <support@mlab.com> at any time.
</div>
{:.warning-box}

#### Historical statistics for each operation
{:.no_toc}

The Slow Query analyzer provides detailed information about slow operations on your deployment, including:

* __namespace__ - The name of the database and collection the operation queried.

* __command__ - A generalized version of the query or command that was issued; specific values are removed from each operation to allow operations to be grouped by their structure.

* __total time (all occurrences)__ - The cumulated execution time of all observed instances of the operation among the log lines read, showing how much time the database spent on operations of this structure.

* __average documents examined__ - The average number of documents examined by the operation. The higher this number, the higher the CPU and RAM requirements of the query.

* __average index keys examined__ - The average number of index entries being examined by the operation. The higher the value, the higher the CPU and RAM requirements of the query.

* __last seen__ - The last time the operation was last seen within the log lines read. This is useful after indexing an operation to see whether it is still visible in the logs.

* __average time__ - Average execution time of all observed instances of the operation among the log lines read. Network time notwithstanding, this should approximate the application-side latency for fulfilling the operation.

* __query count__ - Number of times an operation was seen within the log lines read. This is helpful for understanding the frequency of an operation.

* __In-memory sort__ - Identifies if the operation sorted results in memory. Sorting results in memory is CPU-intensive, requires additional memory use, and delays a response to the app. We strongly recommend [sorting results using an index][docs-indexing-sorting]. The indexes recommend for an operation will always attempt to index the sort phase of a query.

## MongoDB log files and database profiler

### Access to MongoDB log files {#database-log-files}
{:.no_toc}

mLab has made it convenient to access database server log files through the mLab management portal and watch in real-time as operations are written to the log. You can also download archived log files instead of streaming them, if you choose.

{:.note-box}
<div markdown="1">
While MongoDB [stores its times in UTC][minc-utc], mLab's database log files are logging in UTC-08 (or UTC-07 during Pacific Daylight Time), based on the timezone setting of the underlying hosts for your deployment.
</div>
{:.note-box}

#### Current log file streaming
{:.no_toc}

*Not available for Sandbox databases*  

To watch in real-time as operations are written to the log, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment with the desired logs.
1. Click the "Logs" tab and the mongodb.log files for your current primary will be listed.
![img-logs][img-logs]
1. To see the log files for a secondary or arbiter server, use the "Select server" drop-down menu to select the desired server.
1. Click the "Stream current log" button to watch the current log file in real-time.


#### Downloading archived log files
{:.no_toc}

*Not available for Sandbox databases*  

In addition to the ability to stream the current MongoDB log file, you can also download archived log files by following these instructions:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment with the desired logs.
1. Click the "Logs" tab and the log files for your current primary will be listed.
![img-logs][img-logs]
1. To see the log files for a secondary or arbiter server, use the "Select server" drop-down menu to select the desired server.
1. Click the download icon to download the file (or use a download method appropriate for your system, such as right-clicking the filename and selecting save).
   - Log files are identifiable by timestamps that indicate the last time (in UTC) the file was written to before being rotated to the next file.

### Access to MongoDB's database profiler {#database-profiler}
{:.no_toc}

Through the mLab management portal you can easily enable and examine the [database profiler][minc-profiler].

{:.warning-box}
<div markdown="1">
Because profiling incurs additional overhead on your database, we recommend you [understand the profiler’s overhead][minc-profiler-overhead] before making use of this MongoDB feature.
</div>
{:.warning-box}


#### Enabling the profiler
{:.no_toc}

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment with the database that you want to profile.
   - If necessary, navigate to the desired database after navigating to the deployment.
1. Click the "Tools" tab.
1. Click the "Commands" link to display the "Run command" drop-down menu.
1. In the drop-down menu, select "profile (log slow)" or "profile (log all)".
![img-profiler][img-profiler]  
1. Click "Run command" to enable profiling.
1. Click the "Collections" tab and then refresh the browser page.
1. Navigate to the *system.profile* collection to analyze the results of the profiler.

If you choose “profile (log slow)”, MongoDB logs operations that take longer than the SLOW\_MS value set for your database (the default is 100ms). You can check the current SLOW_MS value by selecting the “profile (get current status)” command in the mLab management portal, or by running `db.getProfilingLevel()` in the mongo shell.

#### Disabling the profiler and deleting the results
{:.no_toc}

To turn off the database profiler and delete the data in the `system.profile` collection:

1. Click the "Tools" tab.
1. Click the "Commands" link to display the "Commands" drop-down menu.
1. To disable the profiler, select "profile (turn off)" in the drop-down menu.
1. (Optional) To clear the contents of the profiler, connect to your database using the mongo shell and run `db.system.profile.drop()`.

## Critical notifications {#critical-notifications}

Notifications about incidents which have impacted or may impact the availability or durability of your deployment will always be sent to the appropriate [Account Contacts][docs-contacts] listed for your mLab account or posted on our status page, [mLab Status][mlab-status].

### Types of notifications
{:.no_toc}

#### Downtime
{:.no_toc}

If your database is experiencing or has experienced downtime, you can expect to receive updates about this downtime on [mLab Status][mlab-status] or via an email notification to the Technical Contact listed on your account.

Note that we do not post incidents on our public status page about free Sandbox databases that have been or will be down for a short period of time since these are single-node plans without redundancy.

#### Low disk space
{:.no_toc}

mLab sends multiple warning emails when you approach and/or exceed the storage limit allowed for your plan.

Do not ignore these warnings because running out of disk space will lead to downtime. We strongly recommend that you immediately take one or more of the following steps after receiving a notification:

- Reduce your storage needs (and compact after doing so)
- [Compact][docs-compacting] your database(s)
- [Upgrade][docs-changeplan] to a plan with more storage

#### Rollbacks during failover
{:.no_toc}

A rollback reverts changes on a former primary as it comes back as a secondary after failover in order to maintain database consistency with the other member(s).

If the node is able to successfully write the rollback data to files, we will load these files into your database(s) within the same deployment as new collection(s) and then notify you via email.

If the node is unable to rollback, it will enter the FATAL state, and we will notify you immediately and work with you to manually recover the data.

#### Backup failures
{:.no_toc}

mLab's backup system will automatically send out an email notification for any custom backup that has failed and will not be retried.

Included in the notification are the details about the backup and backup plan (if applicable) as well as the reason for failure.

### mLab Status {#status-page}
{:.no_toc}

We monitor all of our services 24x7 and keep our status page at [status.mlab.com][mlab-status] up-to-date.

Our status page provides historical, current, and upcoming availability updates for our Sandbox and Shared plan databases. This page also provides availability updates for other services such as mLab's management portal, mLab Telemetry, mLab Backup System, mLab Slow Query Analyzer, and Partner API. It also provides updates on widespread outages.

Generally if a notifiation is sent via email directly to an account, it will not also appear on mLab Status. If you have a question about your deployment and don't see anything relevant on our status page, you may have been alerted directly through email. Otherwise, contact <support@mlab.com> for more information.

If you have a Dedicated Cluster plan deployment which is facing a critical, production issue that requires immediate attention, you may also use the emergency email address we have provided.

![img-status][img-status]

## Integrating with third parties

### New Relic {#new-relic}
{:.no_toc}

*Not available for Sandbox databases*  

If you use New Relic for application performance management (APM), you can integrate your mLab-hosted deployment(s) to quickly view MongoDB performance metrics.

![img-newrelic][img-newrelic]  
Our plugin provides users with important MongoDB [serverStatus][minc-serverstatus] data. Specifically, you can view the following database metrics:

1. Operations
1. Queues
1. Lock %
1. Page Faults
1. Non-mapped Virtual Memory
1. Memory
1. Replication Operations
1. Replication Lag
1. Oplog Window

The plugin also comes with default alert thresholds set on the database lock % metric. If there are any other metrics you’d like to see, let us know at <support@mlab.com>.

#### Setting up the integration
{:.no_toc}

For teams that already use New Relic, simply add your New Relic APM license key to your mLab account by following these steps:

1. [Obtain your New Relic license key][newr-key].
    ![img-newrelickey][img-newrelickey]
1. [Log in][mlab-login] to the mLab management portal.
1. Click "Account" in the upper right-hand corner to open the Account Settings page.
1. Click the "Monitoring" tab.
1. Enter your key in the "License key" field in the "New Relic" section.
   ![img-enternrkey][img-enternrkey]
1. Click "Save key".

{% comment %} If you’re not yet using New Relic, mLab users can receive [New Relic APM Standard][newr-mongolab] for free. You can then follow the instructions above to enable the integration.
{% endcomment %}

### Datadog {#datadog}
{:.no_toc}

*Available for Dedicated plans only*

If you use Datadog to monitor your infrastructure and applications, you can integrate an mLab-hosted Dedicated plan deployment with this service by running your own monitoring agent from the same datacenter/region as your database deployment and then using the [Datadog-MongoDB integration][ddog-mongodb] to gather MongoDB performance metrics. Note that we do not install the Datadog agent directly on the mLab-hosted virtual machines.

As per Datadog's documentation, the integration requires full admin access. [Full admin access][docs-adminuser] is only available on our Dedicated plans.
