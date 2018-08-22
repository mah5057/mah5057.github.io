---
layout: default-nosearch
title:  Version upgrades of mLab Sandbox and Shared plan databases
permalink: /20141119-maintenance-event/
description: mLab announcement regarding MongoDB version upgrades on November 19, 2014
minc-docversion: v2.6
---

{% comment %} LINKS {% endcomment %}
[mlab-partners]:       https://mlab.com/company/partners
[mlab-pricing]:        https://mlab.com/plans/pricing
[docs-changeversion]:  {{ site.url }}/ops/#change-version
[docs-mongoversion]:   {{ site.url }}/db-version-requirements
[docs-mongo26]:        {{ site.url }}/db-version-requirements/#v26
[docs-mongo24]:        {{ site.url }}/db-version-requirements/#v24
[docs-dbversion]:      {{ site.url }}/ops/#current-version
[docs-changeplans]:    {{ site.url }}/subscriptions/#change-plans
[minc-upgradecheck]:   http://docs.mongodb.org/{{ page.minc-docversion }}/reference/method/db.upgradeCheck/#db.upgradeCheck


## Important Notice: Version upgrades of mLab Sandbox and Shared plan databases on Nov. 19

Dear mLab user,

Thank you for powering your app with mLab! You are receiving this email because you have one or more databases that will be affected by upcoming maintenance.

We are in the process of making MongoDB 2.6 the default version for all newly provisioned deployments. We are also working to discontinue our support for MongoDB 2.2.

As part of this process, on Wednesday November 19 we'll be upgrading all free Sandboxes databases running MongoDB 2.4 to MongoDB 2.6. We will also be upgrading all for-pay Shared databases running MongoDB 2.2 to MongoDB 2.4.

### Key details about this maintenance window

- Sandbox and Shared Single-node databases will be unavailable for approximately 1 minute at some point during a 12-hour window. Shared Cluster databases will experience no downtime from this maintenance, just failovers.
- This 12-hour maintenance window starts Wednesday November 19 at 10:30 am PST / 6:30 pm UTC (convert to your timezone).
- You must ensure that your Sandbox databases running 2.4 meet the [upgrade requirements for 2.6][docs-mongo26] which include instructions on how to run the [preliminary check for upgrade preparedness to 2.6][minc-upgradecheck].
- You must also ensure that your for-pay Shared databases running 2.2 meet the [upgrade requirements for 2.4][docs-mongo24]. 
- No other configuration changes will be necessary on your end.


### Determining your current MongoDB version 

You can check what version of MongoDB your database is currently running by looking at the lower-right corner of your connection string box after logging into our management portal and navigating to your database's home page ([see screenshot of where to find this information][docs-dbversion]).

### How to avoid this maintenance window

If the maintenance window that we've chosen doesn't work well with your schedule, you can pre-emptively upgrade versions and/or plans prior to the scheduled window. Please see details below for your specific plan type.

__Sandbox (version 2.4)__

All of our free Sandbox databases running 2.4 will be upgraded to 2.6 during this scheduled window.

If you'd like to avoid this window, you can [upgrade to any for-pay plan][docs-changeplans] running 2.4 or 2.6 prior to this window (see [pricing][mlab-pricing]). Note that this will require a change to your connection string.

__For-pay Shared (version 2.2)__

All of our databases running 2.2 on shared virtual machines will be upgraded to 2.4 during this scheduled window.

If you'd like to avoid this window, you can [upgrade to 2.4 (and optionally, 2.6)][docs-changeversion] prior to this window. If you'd like to stay on 2.2, you can upgrade to a Dedicated plan running 2.2 prior to the window (see [pricing][mlab-pricing]). Please note, however, that we plan to discontinue 2.2 support over the next quarter on our Dedicated plans as well.

__For-pay Shared (version 2.4)__

Your database will not be touched during this maintenance window. That being said, if you are using us via one of our [Platform-as-a-Service partners][mlab-partners], please note the default version for all newly provisioned databases will become 2.6 at the time of this scheduled window.

__Dedicated (version 2.2)__

Your database will not be touched during this maintenance window. However, please note that we intend to discontinue 2.2 support over the next quarter on our Dedicated plans as well. We recommend that you carefully review the [upgrade requirements for 2.4][docs-mongo24] and the [upgrade requirements for 2.6][docs-mongo26] as soon as possible and plan accordingly.

__Dedicated (version 2.4)__

Your database will not be touched during this maintenance window. However, you can [upgrade versions][docs-changeversion] to 2.6 at any time; please be sure to carefully review the [upgrade requirements for 2.6][docs-mongo26] first.

### Additional help

As always, contact us anytime at <support@mlab.com> with any questions, issues, or feedback.

Best regards,  
mLab Operations



