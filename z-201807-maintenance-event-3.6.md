---
layout: default-nosearch-norobots
title:  Version upgrade of mLab Sandbox databases
permalink: /201807-maintenance-event/
description: mLab announcement regarding free Sandbox MongoDB version upgrades starting July 20, 2018
minc-docversion: v3.6
---

{% comment %} LINKS {% endcomment %}
[mlab-partners]:       https://mlab.com/company/partners
[mlab-pricing]:        https://mlab.com/plans/pricing
[docs-changeversion]:  {{ site.url }}/ops/#change-version
[docs-mongoversion]:   {{ site.url }}/db-version-requirements
[docs-mongo36]:        {{ site.url }}/db-version-requirements/#v36
[docs-mongo34]:        {{ site.url }}/db-version-requirements/#v34
[docs-mongo32]:        {{ site.url }}/db-version-requirements/#v32
[docs-dbversion]:      {{ site.url }}/ops/#current-version
[docs-changeplans]:    {{ site.url }}/subscriptions/#change-plans
[docs-rnr]:            {{ site.url }}/ops/#rolling-node-replacement
[minc-upgradecheck]:   http://docs.mongodb.org/{{ page.minc-docversion }}/reference/method/db.upgradeCheck/#db.upgradeCheck  
[minc-drivers30]:      http://docs.mongodb.org/manual/release-notes/3.0-compatibility/#driver-compatibility-changes

[timezone-converter]: https://www.timeanddate.com/worldclock/fixedtime.html?msg=mLab+Version+Upgrades&iso=20180720T17

## Version upgrades of free Sandbox databases starting July 20, 2018
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

{:.note-box}
<div markdown="1">
An email notification about this planned maintenance event was sent during the week of June 25, 2018 to the Technical Contact of accounts which have deployments that will be impacted by this scheduled maintenance. 
</div>
{:.note-box}

### Key details

On Friday, July 20 we will start a three-day maintenance window to upgrade all free Sandbox databases running MongoDB 3.4 to MongoDB 3.6. On this day, MongoDB 3.6 will also become mLab's default release version for all new deployments.

#### What and when

- Three-day maintenance window starts Friday, July 20 at 10:00 am PDT / 5:00 pm UTC ([convert to your timezone][timezone-converter]).
- Each Sandbox database server will be unavailable for approximately 5 minutes at some point during this window.

#### Prerequisites

- Applications running with Sandbox databases must meet the [upgrade requirements for 3.6][docs-mongo36].

### How to avoid this maintenance window

All of our free Sandbox databases will be upgraded to MongoDB 3.4 during this scheduled window.

If our planned maintenance window on July 20 does not work well with your schedule, you can [preemptively change to a Shared or Dedicated plan][docs-changeplans] where we support multiple MongoDB versions (see [pricing][mlab-pricing]). Note that this will require a change to your connection string.


### Additional questions?

Please contact us anytime at <support@mlab.com> with any questions, issues, or feedback that you may have.


