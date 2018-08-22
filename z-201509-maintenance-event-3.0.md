---
layout: default-nosearch-norobots
title:  Version upgrades of mLab Sandbox and Shared plan databases
permalink: /20150930-maintenance-event/
description: mLab announcement regarding MongoDB version upgrades on September 30, 2015
minc-docversion: v3.0
---

{% comment %} LINKS {% endcomment %}
[mlab-partners]:       https://mlab.com/company/partners
[mlab-pricing]:        https://mlab.com/plans/pricing
[docs-changeversion]:  {{ site.url }}/ops/#change-version
[docs-mongoversion]:   {{ site.url }}/db-version-requirements
[docs-mongo30]:        {{ site.url }}/db-version-requirements/#v30
[docs-mongo26]:        {{ site.url }}/db-version-requirements/#v26
[docs-mongo24]:        {{ site.url }}/db-version-requirements/#v24
[docs-dbversion]:      {{ site.url }}/ops/#current-version
[docs-changeplans]:    {{ site.url }}/subscriptions/#change-plans
[minc-upgradecheck]:   http://docs.mongodb.org/{{ page.minc-docversion }}/reference/method/db.upgradeCheck/#db.upgradeCheck  
[minc-drivers30]:      http://docs.mongodb.org/manual/release-notes/3.0-compatibility/#driver-compatibility-changes

[timezone-converter]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=mLab+Version+Upgrades&iso=20150930T17&p1=1440&ah=12

## Version upgrades of Sandbox and Shared plan databases on September 30, 2015

### Notification of scheduled maintenance 
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

*A notice with subject of "Important Notice: Version upgrades of mLab Sandbox and Shared plan databases on Sep. 30" was first emailed on August 4, 2015 to the Technical Contacts of accounts which have deployments that will be impacted by this scheduled maintenance. Reminders were sent on September 11 and September 21.*

### Key details

We are in the process of making MongoDB 3.0 the default release version for all newly provisioned deployments. We are also taking steps to discontinue our support for MongoDB 2.4.

As part of this process, on Wednesday, September 30 we will be:
- Upgrading all free Sandbox databases running MongoDB 2.6 to MongoDB 3.0
- Upgrading all for-pay Shared databases running MongoDB 2.4 to MongoDB 2.6

#### What and when

- This 12-hour maintenance window starts Wednesday, September 30 at 10:00 am PDT / 5:00 pm UTC ([convert to your timezone][timezone-converter]).
- Sandbox and Shared Single-node databases will be unavailable for approximately 5 minutes at some point during a 12-hour window. Highly-available Shared Cluster databases will experience no downtime from this maintenance, just failovers.

#### Prerequisites

- Sandbox databases running 2.6 must meet the [upgrade requirements for 3.0][docs-mongo30] which includes a list of [MongoDB 3.0-compatible drivers][minc-drivers30]. __*If you are not using 3.0-compatible driver(s), you may be unable to connect to your deployment after upgrading to 3.0.*__
- For-pay Shared databases running 2.4 must meet the [upgrade requirements for 2.6][docs-mongo26] which include instructions on how to run the [preliminary check for upgrade preparedness to 2.6][minc-upgradecheck]. __*If you do not run this preliminary check and resolve detected issues, your app and database will encounter errors after upgrading to 2.6.*__

### How to avoid this maintenance window

If our planned maintenance window does not work well with your schedule, you can pre-emptively upgrade versions and/or plans prior to the event. Please read the details below for your specific plan type.

You can check which version of MongoDB your database is currently running by logging into the mLab management portal and looking at the lower-right corner of the connection information box on your deployment's home page ([sample screenshot of connection information box with MongoDB version][docs-dbversion]).

#### Sandbox (version 2.6)

All of our free Sandbox databases running 2.6 will be upgraded to 3.0 during this scheduled window. 

If you'd like to avoid this window, you can [upgrade to any for-pay plan][docs-changeplans] running 2.6 or 3.0 prior to this window (see [pricing][mlab-pricing]). Note that this will require a change to your connection string.

{:.warning-box}
<div markdown="1">
If your database is upgraded to 3.0, applications that aren't using [MongoDB 3.0-compatible drivers][minc-drivers30] may be unable to connect and authenticate.
</div>
{:.warning-box}


#### For-pay Shared (version 2.4)

All of our databases running 2.4 on shared virtual machines will be upgraded to 2.6 during this scheduled window. 

If you'd like to avoid this window, you can [upgrade to 2.6 (and optionally, 3.0)][docs-changeversion] prior to this window. If you'd like to stay on 2.4, you can upgrade to a Dedicated plan running 2.4 prior to the window (see [pricing][mlab-pricing]). Please note, however, that we plan to discontinue support for 2.4 over the next quarter on our Dedicated plans as well.

{:.warning-box}
<div markdown="1">
If your database is upgraded to 2.6, unresolved issues identified by the [preliminary check for upgrade preparedness to 2.6][minc-upgradecheck] will cause errors.
</div>
{:.warning-box}


#### For-pay Shared (version 2.6)

Your database will not be touched during this maintenance window. That being said, if you are using us via one of our [Platform-as-a-Service partners][mlab-partners], please note the default version for all newly provisioned databases will become 3.0 at the time of this scheduled window.

#### Dedicated (version 2.4)

Your database will not be touched during this maintenance window. However, please note that we intend to discontinue 2.4 support over the next quarter on our Dedicated plans as well. We recommend that you carefully review the [upgrade requirements for 2.6][docs-mongo26] and the [upgrade requirements for 3.0][docs-mongo30] as soon as possible and plan accordingly.

#### Dedicated (version 2.6)

Your database will not be touched during this maintenance window. However, you can [upgrade versions][docs-changeversion] to 3.0 at any time; please be sure to carefully review the [upgrade requirements for 3.0][docs-mongo30] first.

### Additional help 
{:.no_toc}

As always, contact us anytime at <support@mlab.com> with any questions, issues, or feedback that you may have.




