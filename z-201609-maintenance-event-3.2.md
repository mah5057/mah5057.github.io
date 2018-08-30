---
layout: default-nosearch-norobots
title:  Version upgrades of mLab Sandbox and Shared plan databases
permalink: /201609-maintenance-event/
description: mLab announcement regarding MongoDB version upgrades starting September 27, 2016
minc-docversion: v3.2
---

{% comment %} LINKS {% endcomment %}
[mlab-partners]:       https://mlab.com/company/partners
[mlab-pricing]:        https://mlab.com/plans/pricing
[docs-changeversion]:  {{ site.url }}/ops/#change-version
[docs-mongoversion]:   {{ site.url }}/db-version-requirements
[docs-mongo32]:        {{ site.url }}/db-version-requirements/#v32
[docs-mongo30]:        {{ site.url }}/db-version-requirements/#v30
[docs-mongo26]:        {{ site.url }}/db-version-requirements/#v26
[docs-dbversion]:      {{ site.url }}/ops/#current-version
[docs-changeplans]:    {{ site.url }}/subscriptions/#change-plans
[docs-rnr]:            {{ site.url }}/ops/#rolling-node-replacement
[minc-upgradecheck]:   http://docs.mongodb.org/{{ page.minc-docversion }}/reference/method/db.upgradeCheck/#db.upgradeCheck  
[minc-drivers30]:      http://docs.mongodb.org/manual/release-notes/3.0-compatibility/#driver-compatibility-changes

[timezone-converter]: http://www.timeanddate.com/worldclock/fixedtime.html?msg=mLab+Version+Upgrades&iso=20160927T17

## Version upgrades of Sandbox and Shared plan databases starting Sept. 27, 2016
{:.no_toc}

### Notification of scheduled maintenance 
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

{:.note-box}
<div markdown="1">
An email notification with subject of "[ACTION REQUIRED] Version upgrades of Sandbox and Shared plan databases starting September 27" was sent on July 19, 2016 to the Technical Contact of accounts which have deployments that will be impacted by this scheduled maintenance. Reminders were sent out after that.
</div>
{:.note-box}

### Key details

MongoDB 3.2 is now generally available on mLab, so we are in the process of making MongoDB 3.2 the default release version for all newly provisioned deployments. We are also taking steps to discontinue our support for MongoDB 2.6.

To this end, on **Tuesday, September 27** we will start a four-day maintenance window to:

- Upgrade all free Sandbox databases running MongoDB 3.0 to MongoDB 3.2
- Upgrade all for-pay Shared databases running MongoDB 2.6 to MongoDB 3.0

#### What and when

- Four-day maintenance window starts Tuesday, September 27 at 10:00 am PDT / 5:00 pm UTC ([convert to your timezone][timezone-converter]).
- Sandbox and Shared Single-node databases will be unavailable for approximately 5 minutes at some point during this window. Highly-available Shared Cluster databases will experience no downtime from this maintenance, just failovers. Dedicated plan deployments will not be impacted.

#### Prerequisites

- Sandbox databases running 3.0 must meet the [upgrade requirements for 3.2][docs-mongo32]
- For-pay Shared databases running 2.6 must meet the [upgrade requirements for 3.0][docs-mongo30] which includes a list of [MongoDB 3.0-compatible drivers][minc-drivers30]. __*If you are not using 3.0-compatible driver(s), you may be unable to connect to your deployment after upgrading to 3.0.*__

### How to avoid this maintenance window

If our planned maintenance window does not work well with your schedule, you can pre-emptively upgrade versions and/or plans prior to the event. Please read the details below for your specific plan type.

You can check which version of MongoDB your database is currently running by logging into the mLab management portal and looking at the lower-right corner of the connection information box on your deployment's home page ([sample screenshot of connection information box with MongoDB version][docs-dbversion]).

#### Sandbox (version 3.0)

All of our free Sandbox databases running 3.0 will be upgraded to 3.2 during this scheduled window. 

If you'd like to avoid this window, you can [upgrade to any for-pay plan][docs-changeplans] running 3.0 or 3.2 prior to this window (see [pricing][mlab-pricing]). Note that this will require a change to your connection string.


#### For-pay Shared (version 2.6)

All of our databases running 2.6 on shared virtual machines will be upgraded to 3.0 during this scheduled window. 

{:.warning-box}
<div markdown="1">
If your database is upgraded to 3.0, applications that aren't using [MongoDB 3.0-compatible drivers][minc-drivers30] may be unable to connect and authenticate.
</div>
{:.warning-box}

If you'd like to avoid this scheduled maintenance window, you can [self-service your upgrade to 3.0][docs-changeversion] prior to this window. 

If you'd like to stay on 2.6, you can upgrade to a Dedicated plan running 2.6 prior to the window (see [pricing][mlab-pricing]). Please note, however, that we plan to discontinue support for 2.6 in the first half of 2017 on our Dedicated plans as well. Upgrades to Dedicated Cluster plans are seamless using our [rolling node replacement][docs-rnr] process.

### What deployments will not be impacted by this maintenance window?

Deployments running version 3.0 and above as well as Dedicated plan deployments will not be affected by this maintenance window.

#### For-pay Shared (version 3.0)

Your database will not be impacted by this maintenance window. That being said, if you are using us via one of our [Platform-as-a-Service partners][mlab-partners], please note the default version for all newly provisioned databases will become 3.2 at the time of this scheduled window.

#### Dedicated (version 2.6)

Your database(s) will not be impacted by this maintenance window. However, please note that in the first quarter of 2017 we intend to discontinue 2.6 support on our Dedicated plans as well. We recommend that you carefully review the [upgrade requirements for 3.0][docs-mongo26] and the [upgrade requirements for 3.2][docs-mongo30] as soon as possible and plan accordingly.

#### Dedicated (version 3.0)

Your database(s) will not be impacted by this maintenance window. However, you can [upgrade versions][docs-changeversion] to 3.2 at any time; please be sure to carefully review the [upgrade requirements for 3.2][docs-mongo30] first.

### Additional questions?

Please contact us anytime at <support@mlab.com> with any questions, issues, or feedback that you may have.

{% comment %}
### Frequently asked questions

#### Q. Which storage engine are 
{% endcomment %}




