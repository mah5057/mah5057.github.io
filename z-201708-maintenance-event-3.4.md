---
layout: default-nosearch-norobots
title:  Version upgrade of mLab Sandbox databases
permalink: /201708-maintenance-event/
description: mLab announcement regarding free Sandbox MongoDB version upgrades starting August 18, 2017
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-partners]:       https://mlab.com/company/partners
[mlab-pricing]:        https://mlab.com/plans/pricing
[docs-changeversion]:  {{ site.url }}/ops/#change-version
[docs-mongoversion]:   {{ site.url }}/db-version-requirements
[docs-mongo34]:        {{ site.url }}/db-version-requirements/#v34
[docs-mongo32]:        {{ site.url }}/db-version-requirements/#v32
[docs-mongo30]:        {{ site.url }}/db-version-requirements/#v30
[docs-dbversion]:      {{ site.url }}/ops/#current-version
[docs-changeplans]:    {{ site.url }}/subscriptions/#change-plans
[docs-rnr]:            {{ site.url }}/ops/#rolling-node-replacement
[minc-upgradecheck]:   http://docs.mongodb.org/{{ page.minc-docversion }}/reference/method/db.upgradeCheck/#db.upgradeCheck  
[minc-drivers30]:      http://docs.mongodb.org/manual/release-notes/3.0-compatibility/#driver-compatibility-changes

[timezone-converter]: https://www.timeanddate.com/worldclock/fixedtime.html?msg=mLab+Version+Upgrades&iso=20170818T17

## Version upgrades of free Sandbox databases starting August 18, 2017
{:.no_toc}

### Notification of scheduled maintenance 
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

{% comment %}
{:.note-box}
<div markdown="1">
An email notification with subject of "[ACTION REQUIRED] Version upgrades of Sandbox and Shared plan databases starting September 27" was sent on July 19, 2016 to the Technical Contact of accounts which have deployments that will be impacted by this scheduled maintenance. Reminders were sent out after that.
</div>
{:.note-box}
{% endcomment %}

### Key details

On Friday, August 18 we will start a three-day maintenance window to upgrade all free Sandbox databases running MongoDB 3.2 to MongoDB 3.4. On this day, MongoDB 3.4 will also become mLab's default release version for all new deployments.

#### What and when

- Three-day maintenance window starts Friday, August 18 at 10:00 am PDT / 5:00 pm UTC ([convert to your timezone][timezone-converter]).
- Each Sandbox database server will be unavailable for approximately 5 minutes at some point during this window.

#### Prerequisites

- Applications running with Sandbox databases must meet the [upgrade requirements for 3.4][docs-mongo34].

### How to avoid this maintenance window

All of our free Sandbox databases will be upgraded to MongoDB 3.4 during this scheduled window.

If our planned maintenance window on August 18 does not work well with your schedule, you can [preemptively change to a Shared or Dedicated plan][docs-changeplans] where we support multiple MongoDB versions (see [pricing][mlab-pricing]). Note that this will require a change to your connection string.


### Additional questions?

Please contact us anytime at <support@mlab.com> with any questions, issues, or feedback that you may have.


