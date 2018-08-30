---
layout: default-nosearch
title:  Scheduled maintenance for GHOST vulnerability
permalink: /201502-maintenance-event/
description: mLab security announcement
---

{% comment %} LINKS {% endcomment %}
[docs-rnr]:         /ops/#rolling-node-replacement
[mlab-login]:       https://mlab.com/login
[self-avoid]:       http://docs.mlab.com/201502-maintenance-event/#avoiding-the-window
[qualys-ghost]:     https://community.qualys.com/blogs/laws-of-vulnerabilities/2015/01/27/the-ghost-vulnerability

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview {#overview}

{:.note-box}
<div markdown="1">
The following email notification was sent out, on February 5 2015, to the technical contact of every mLab account with at least one database subscription.
</div>
{:.note-box}


Dear mLab user,

As you may have already heard, [a vulnerability in glibc, codenamed GHOST (CVE-2015-0235)][qualys-ghost], was announced on January 27, 2015. 

Our current assessment is that no immediately exploitable vulnerability exists in our infrastructure or our fleet of virtual machines running database servers. Nonetheless, as a precautionary measure, we have been working hard to patch all of our virtual machines, including the ones running customer database deployments.

At this point we have patched all of mLab's infrastructure and have deployed an updated glibc to hosts running customer database deployments. The next step is to reboot all virtual machines in our fleet that still need the patch. These reboots are scheduled for a maintenance window starting February 17, 2015 at 08:00 UTC and ending February 22, 2015 at 08:00 UTC. 

You have two choices in how you interact with this maintenance: 

1. Do nothing and let us completely handle this maintenance for you. If you have a cluster plan and your application/driver is configured properly for replica set connections, you should experience no downtime except during failover. 

1. For Dedicated plans only, [preemptively avoid the scheduled maintenance window ](#avoiding-the-window) by rebooting the virtual machines backing your deployment(s) through our management portal before February 17, 2015 at 08:00 UTC.

If you have any questions, please email us at <support@mlab.com>.

Best regards,  
The mLab Ops Team

## Scheduled maintenance window details {#maintenance-window}

- 5-day window starting February 17, 2015 at 08:00 UTC and ending February 22, 2015 at 08:00 UTC
- At some point during this window all virtual machines will be rebooted if necessary except those backing Sharded Clusters 
- Estimated downtime per plan type
    - Sandbox plans: up to 30 minutes of downtime 
    - Shared plans:
        - Single-node plans (discontinued): up to 30 minutes of downtime
        - Replica Set cluster plans: No downtime; however, the cluster will experience one failover and be without redundancy for up to 30 minutes
    - Dedicated plans
        - Single-node plans: approximately 5 minutes of downtime
        - Replica Set cluster plan: No downtime; however, the cluster will experience one failover and be without redundancy for approximately 5 minutes
    - Sharded Cluster Dedicated plans
        - Unaffected by this scheduled maintenance window; expect a separate notification for custom coordination

## How to preemptively avoid the maintenance window {#avoiding-the-window}

*Not available for Sandbox and Shared plans*

If you would like to avoid the scheduled maintenance window, you can preemptively reboot the virtual machines backing your Dedicated plan deployment(s) before the scheduled maintenance window.

For a Dedicated Cluster plan:

1. [Log in][mlab-login] to the mLab management portal 
1. Navigate to the MongoDB deployment in question
1. Click on the "Servers" tab
1. Click on the "Reboot host" link(s). 

You will want to reboot one node at a time and wait until that node has restarted before rebooting another. When you reboot your primary node it will first step down causing your application to failover.

## Frequently Asked Questions {#faq}

### How can Sandbox and other single-node plans avoid downtime?

If you have a single-node plan and are concerned about downtime, we recommend that you <a href="http://docs.mlab.com/subscriptions/#change-plans">upgrade to any cluster plan</a> prior to this window (see <a href="https://mlab.com/plans/pricing">pricing</a>). Note that this will require a change to your connection string.

### How can I tell if my deployment(s) will be impacted by this window?

If your deployment will be impacted by this scheduled maintenance window, you will see a status message after you:
1. [Log in][mlab-login] to the mLab management portal 
1. Navigate to the MongoDB deployment in question

### Why can't I see any "Reboot host" links?

If our management portal indicates that your Dedicated Cluster plan will be impacted by this maintenance window and yet you do not see any “Reboot host” links, it means that we need to actually replace the underlying virtual machine(s) backing your deployment which we will be doing during the maintenance window. You will experience no downtime from this maintenance, but will experience a failover and be without redundancy for approximately 5 minutes.

In this situation, if you’d like to avoid the maintenance window, contact us at support@mlab.com, and we will perform a [rolling node replacement][docs-rnr] so that your hosts are no longer vulnerable.

