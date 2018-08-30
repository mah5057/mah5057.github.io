---
layout: default
title:  Upgrade Requirements for MongoDB Versions
permalink: /db-version-requirements/
description: MongoDB upgrade requirements for your mLab database
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-rnr]:                             {{ site.url }}/ops/#rolling-node-replacement
[docs-mongoversionunsupported]:         /db-version-requirements-unsupported/
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
[minc-dbv36]:                           http://docs.mongodb.com/manual/release-notes/3.6
[minc-dbv36-compatibility]:             http://docs.mongodb.com/manual/release-notes/3.6-compatibility/
[jira-SERVER-24631]:                    https://jira.mongodb.org/browse/SERVER-24631
[jira-SERVER-19402]:                    https://jira.mongodb.org/browse/SERVER-19402
[minc-dbv36-arraysortbehavior]:         https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#array-sort-behavior

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Upgrade Requirements for MongoDB 3.6 {#v36}

*If you're running a version of MongoDB before MongoDB 3.4, you must first upgrade to MongoDB 3.4 before upgrading to MongoDB 3.6.*

{:.warning-box}
<div markdown="1">
Once an mLab-hosted deployment is running MongoDB 3.6, it cannot be downgraded to an earlier release version without significant downtime. We strongly advise that you refrain from using any features new to 3.6 until you are confident that your deployment is healthy running on version 3.6.x.
</div>
{:.warning-box}

With [MongoDB version 3.6][minc-dbv36], you should be aware of the fact that:

- MongoDB provides a list of 3.6-compatible drivers in their [Driver Compatability reference][minc-driver-compatability-ref].

Before upgrading, you must do the following:

- Review the full list of [3.6 changes that can affect compatibility with older version of MongoDB][minc-dbv36-compatibility].
- Review your deployment for the performance impact of a specific change to multikey indexes (indexes on array fields). See [https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#array-sort-behavior][minc-dbv36-arraysortbehavior] for general information and [https://jira.mongodb.org/browse/SERVER-19402][jira-SERVER-19402] for specific information.

## Upgrade Requirements for MongoDB 3.4 {#v34}

*If you're running a version of MongoDB before MongoDB 3.2, you must first upgrade to MongoDB 3.2 before upgrading to MongoDB 3.4.*

{:.warning-box}
<div markdown="1">
Once an mLab-hosted deployment is running MongoDB 3.4, it cannot be downgraded to an earlier release version without significant downtime. We strongly advise that you refrain from using any features new to 3.4 until you are confident that your deployment is healthy running on version 3.4.x.
</div>
{:.warning-box}

With [MongoDB version 3.4][minc-dbv34], you should be aware of the fact that:

- MongoDB provides a list of 3.4-compatible drivers in their [Driver Compatability reference][minc-driver-compatability-ref].

Before upgrading, you must do the following:

- Review the full list of [3.4 changes that can affect compatibility with older version of MongoDB][minc-dbv34-compatibility].

## Upgrade Requirements for MongoDB 3.2 {#v32}

*If you're running a version of MongoDB before MongoDB 3.0, you must first upgrade to MongoDB 3.0 before upgrading to MongoDB 3.2.*

With [MongoDB version 3.2][minc-dbv32], you should be aware of the fact that:

- MongoDB provides a list of 3.2-compatible drivers in their [Driver Compatability reference][minc-driver-compatability-ref].
- Not all of mLab's plans support the WiredTiger storage engine.
- Choosing to upgrade an existing 3.0 MMAPv1 Dedicated Cluster deployment to 3.2 WiredTiger will automatically initiate a [rolling node replacement][docs-rnr] process that will seamlessly change your deployment to the WiredTiger storage engine.

Before upgrading, you must do the following:

- Review the full list of [3.2 changes that can affect compatibility with older version of MongoDB][minc-dbv32-compatibility].

## Upgrade Requirements for MongoDB 3.0 {#v30}

*If you’re running a version of MongoDB before MongoDB 2.6, you must first upgrade to MongoDB 2.6 before upgrading to MongoDB 3.0.*

{:.critical-box}
<div markdown="1">
Once an mLab-hosted deployment is running MongoDB 3.0, it cannot be downgraded to an earlier release version. Before upgrading, we strongly recommend testing the connectivity of your entire stack on a MongoDB 3.0 deployment with a [SCRAM-SHA-1 authSchema][minc-dbv30-scram], such as an mLab-hosted 3.0 Shared Cluster deployment.
</div>
{:.critical-box}

With [MongoDB version 3.0][minc-dbv30], you should be aware of the fact that:

- There are many changes that can affect compatibility with older versions of MongoDB.
- You must use a [MongoDB 3.0 and SCRAM-SHA-1-compatible driver][minc-dbv30-upgrade-drivers] to connect to MongoDB 3.0. This release includes changes to the user schema, which requires changes to the way that MongoDB stores users’ credentials. Not only will we upgrade the binaries that are running your mongod processes, we will also complete the [authorization user schema upgrade to SCRAM-SHA-1][minc-dbv30-scram].
- mLab's support for MongoDB 3.0 does NOT include support for the [WiredTiger storage engine][minc-dbv30-wiredtiger]. Our support for WiredTiger comes in MongoDB 3.2, when MongoDB supports WiredTiger as its default storage engine.
- Dedicated plan deployments with many databases relative to available RAM (e.g., 10 or more databases on our M1 plan), can experience performance degradation after upgrading due to inefficiencies in namespace file management (see [MongoDB SERVER-24631 bug][jira-SERVER-24631]). To avoid this, contact <support@mlab.com> for assistance before upgrading. 

Before upgrading, you must do the following:

1. Review the full list of [3.0 changes that can affect compatibility with older version of MongoDB][minc-dbv30-compatibility].
1. Upgrade all connecting apps to use a [MongoDB 3.0 and SCRAM-SHA-1-compatible driver][minc-dbv30-upgrade-drivers] (Moped/Mongoid users, see note below).

{:.note-box}
<div markdown="1">
Moped (used by Mongoid 4 and below), is not compatible with MongoDB version 3.0 because it does not support SCRAM-SHA-1 authentication. If you're using Mongoid, you must upgrade to Mongoid 5 before upgrading your mLab-hosted deployment to 3.0.
</div>
{:.note-box}

<br>
<br>

-----------

[Click here to view upgrade requirements for versions no longer supported by mLab.][docs-mongoversionunsupported]

