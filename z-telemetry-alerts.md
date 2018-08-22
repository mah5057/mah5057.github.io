---
layout: default-nosearch
title: Telemetry Alerts
permalink: /telemetry-alerts/
description: Configure custom alerts in Telemetry for mLab-hosted MongoDB dpeloyments
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:        https://mlab.com/login
[mlab-account]:      https://mlab.com/account-details
[docs-contacts]:     /accounts/#account-contacts
[pagerduty-home]:    https://www.pagerduty.com
[hipchat-home]:      https://hipchat.com
[slack-home]:        https://slack.com
[slck-webhook]:      https://my.slack.com/services/new/incoming-webhook/



{% comment %} IMAGE LINKS {% endcomment %} 
[img-qs1]: /assets/screenshot-telemetry-alerts-qs1.png
[img-qs2]: /assets/screenshot-telemetry-alerts-qs2.png
[img-qs3]: /assets/screenshot-telemetry-alerts-qs3.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

Telemetry allows you to enable per-metric alerts so that you will be notified whenever a metric related to your MongoDB deployment meets conditions that you consider abnormal and/or undesired.

For each metric in your Telemetry dashboard you may define what the system will consider to be acceptable values for that metric and how to alert you when that metric falls outside the thresholds you've defined. Each alert definition allows you to specify the set of conditions that must be met for an alert to trigger, as well as a set of Notification Channels through which to notify you. 

In addition to email, Telemetry supports notification via other channels (e.g., Slack, PagerDuty, etc.) so that you can easily integrate with your internal infrastructure and third-party applications. 

## Quick-Start Guide {#quick-start}

### Step-by-step example 

This step-by-step example creating an alert on open connections is designed to help you quickly familiarize yourself with Telemetry alerts.

#### Step 1: Open Telemetry for your deployment 
{:.no_toc}

![img-qs1][img-qs1]  

#### Step 2: Find the "Connections" graph and click the bell button 
{:.no_toc}

![img-qs2][img-qs2]  

#### Step 3: Enter "1" in the "max" input field and click "Save" 
{:.no_toc}

![img-qs3][img-qs3]  

#### That's it! 
{:.no_toc}

Since the max acceptable value for number of open connections has been set to 1, you should receive an alert within 10-15 minutes. 

Once you are satisfied, you can either delete the alert that you created or adjust the max threshold to a more realistic value.

### Popular alerts  {#popular-alerts}

To help you get started, we have documented some popular alert definitions that we would consider as best practice.

Many of these suggestions are phrased in terms of a percentage above what is normal for your deployment. As such, you may need to first establish a baseline of what is normal for your application and then set/adjust thresholds accordingly. 

Note that not all deployments are the same, and that not all of these suggestions may apply to your particular deployment. 

Here are some definitions to quickly get you started:

__General alert definitions__

Metric | Condition Description | Condition Configuration |  Server role
------------- | ------------- | ------------- | ------------
CPU User [^foot-user] | over 20% | "max" value of 20 percent | Primary data nodes
CPU IOWait [^foot-iowait] | over 40% | "max" value of 40 percent | Primary data nodes
Connections | over 130% of normal peak or over 4,000 | "max" value of N connections | Primary data nodes
Replication Lag | over 10 minutes | "max" of 600 seconds [^foot-units] | Electable data node(s)
Replication Oplog Window [^foot-oplog] | under 24 hours | "min" of 24 hours | Any data node
Disk Space Used | over 80% | "max" value of 80 percent | Primary data nodes

[^foot-user]: A stable system with high CPU User time is possible.
[^foot-iowait]: A stable system with high CPU IOWait time is possible.
[^foot-units]: Replication Lag chart is in seconds instead of minutes.
[^foot-oplog]: The replication oplog window can be low immediately after a rolling node replacement, so we recommend configuring this to alert a non-critical channel (e.g., an email channel).

__AWS-specific alert definitions__

Metric | Condition Description | Condition Configuration |  Server role
------------- | ------------- | ------------- | ------------
CPU Credits Used | over 20% | "max" value of 20 percent | Primary data nodes
Disk Credits Used | over 20% | "max" value of 20 percent | Primary data nodes

__WiredTiger-specific alert definitions__

Metric | Condition Description | Condition Configuration |  Server role
------------- | ------------- | ------------- | ------------
Queues | over 1 | "max" value of 1 queued | Primary data nodes
Read Transaction Tickets In Use | over 10 | "max" value of 10 in use | Primary data nodes
Write Transaction Tickets In Use | over 10 | "max" value of 10 in use | Primary data nodes
Pages Evicted by Application Threads | over 1 | "max" value of 1 page/second | Primary data nodes

__MMAPv1-specific alert definitions__

Metric | Condition Description | Condition Configuration |  Server role
------------- | ------------- | ------------- | ------------
Queues | over 10 | "max" value of 10 queued | Primary data nodes
Page Faults | over 130% of normal peak | "max" value of N faults/second | Primary data nodes

## Telemetry Alert Definitions {#alert-definitions}

You may define alerts on any metric that we track in your Telemetry dashboard. 

When you define an alert you specify:

- A target metric
- An acceptable range for the target metric
- A server role to specify which nodes in the deployment the alert is applicable for
- One or more Notification Channels that specify where incident notifications are sent

### Target metric 
{:.no_toc}

A target metric must be defined with every alert definition. For charts that contain only one metric this will be selected automatically. On charts that contain more than one metric you will need to choose the metric that's the target of the alert you are defining.

### Acceptable range 
{:.no_toc}

An acceptable range for the values of its target metric must be defined with every alert definition. This is expressed as specifications of min and max values that the metric must remain between. 

You may specify one or both of min and max. If you specify only one, the metric will have only a single threshold. For example, if you want to configure an alert such that it notifies if queries/second falls below 100, you would a set a min value of 100.

A metric is considered to be out of compliance with its condition when it remains outside of the acceptable range for three consecutive checks (roughly 3 minutes). This is to avoid “flapping” and over-alerting when a metric value is somewhat erratic. 

### Applicable server role 
{:.no_toc}

Each alert allows you to specify which types of nodes in the deployment (the server role) that the alert is applicable for.

The set of supported server roles are:

- Any node
- Primary data node (default)
- Secondary data node(s)
- Electable data node(s)
- Any data node (either Primary or Secondary data node)
- Config servers
- Mongos routers

### Notification channels 
{:.no_toc}

Each alert allows you to select one or more Notification Channels for Telemetry to use to determine the recipient and method by which an alert notification will be sent. 

These Notification Channels are created and managed in your account settings and are discussed in the section below titled ["Creating Notification Channels"](#channels). 

By default, your mLab account has one Notification Channel already defined based on your account's Technical Contact (or Admin User if no Technical Contact is specified). You can see it listed in the Monitoring tab of your Account Settings page. 

After you create additional Notification Channels, a person button will appear in the form where you define an alert. Clicking the person button will allow you to select one or more Notification Channels to specify the recipient(s) of an alert notification. The person button will NOT appear if only the default Notification Channel has been set up for your account; this means that your alert will be sent to the Technical Contact (or Admin User if no Technical Contact is specified).

## Creating Notification Channels {#channels}

When you define an alert, you must select one or more Notification Channels which specify where and how an alert notification will be sent. A Notification Channel consists of the following:

- Channel name
- Channel type
- Renotify frequency


### Channel name
{:.no_toc}

You can label your Notification Channels with easy-to-understand display names such as "CRITICALS (PagerDuty)" and "WARNINGS (Bob)".

### Channel types
{:.no_toc}

The channel type determines the recipient and method by which the alert is sent. The available channel types for Telemetry alerts are described in this section, including the additional details required to set up a particular channel type. 

__Account Contact channel__

You may configure a Notification Channel with a reference to one of your official [Account Contacts][docs-contacts] such as the Admin User or the Technical Contact. The advantage of this channel type is that you can maintain email addresses in your [account settings][mlab-account] and do not need to update the channel directly when the email address associated with an Account Contact needs to change. This is especially helpful when the same email address is used in multiple alerts *and* is the same email address you use for communications from mLab.

__Email channel__

You may configure a Notification Channel with a specific email address. 

__PagerDuty channel__

If you use [PagerDuty][pagerduty-home], a popular DevOps alerting tool, you may configure a Notification Channel to send to a "Generic API" service in PagerDuty. Just provide your PagerDuty service key to have Telemetry send alerts to that PagerDuty service. 

When the incident closes, Telemetry will automatically resolve the PagerDuty incident (assuming it has not already been resolved on your side).

__HipChat channel__

If you use the [HipChat][hipchat-home] communication platform, you can configure a Notification Channel to send messages into a HipChat room. Just provide your HipChat room API ID and and HipChat API auth token.

To locate the room API ID, first go to the list of rooms at https://YourSubdomain.hipchat.com/rooms (where "YourSubdomain" is replaced with your organization's value). Locate your room and click on it to open the room's profile page where the API ID is displayed in the Room Details table. 

To obtain the HipChat API auth token, your HipChat admin can access the proper V1 token at https://YourSubdomain.hipchat.com/admin/api (where "YourSubdomain" is replaced with your organization's value).
   
If a new token needs to be generated on the page at the link above, be sure to select the token type "Notification".

__Slack channel__

If you use the [Slack][slack-home] communication platform, you can configure a  Notification Channel to send messages into a Slack channel. Just provide your [Slack Webhook URL][slck-webhook] (viewable by Slack admins only) and Telemetry will send alerts to the designated Slack channel.

### Renotify frequency
{:.no_toc}

With each Notification Channel you are able to define how frequently Telemetry should renotify you about open incidents. If you want to be notified only once about an open incident, you should specify no value at all.

### Managing Notification Channels
{:.no_toc}

Admin Users can add, update, and delete Notification Channels through mLab's management portal. Account users who are not the Admin User can view the available Notification Channels but cannot add, edit, or delete them.

__Add a new channel (admin-only)__

Follow these steps to create a new Notification Channel:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page. 
1. Click the "Monitoring" tab. 
1. Click the "Add channel" button.
1. Fill in the new Notification Channel's information.
1. Click the "Create" button to add the new channel.

__Update an existing channel (admin-only)__ 

When you update an existing Notification Channel, the changes will automatically apply to existing alerts and open incidents that use this channel.

Follow these steps to update an existing channel:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page. 
1. Click the "Monitoring" tab. 
1. Click the row with the channel that you'd like to modify.
1. Make your desired changes.
1. Click the "Modify" button to update the existing channel.

__Deleting a channel (admin-only)__

You can delete a Notification Channel even if you have already configured alerts using that channel. However, note that:

- Existing alerts configured to notify a deleted channel will no longer notify that channel.
- A notification will not be sent to the deleted channel when an existing open incident (e.g., opened before the channel was deleted) is subsequently closed.

Follow these steps to delete a channel:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page.
1. Click the "Monitoring" tab. 
1. Click the delete button (a trash can) that appears at the end of the row for the channel you want to delete.

## Telemetry Incidents {#incidents}
   
### Overview

Once you configure a new alert definition (or modify an existing one) it can take up to 10-15 minutes for that new alert definition to become active and trigger if applicable. 

To avoid flapping, Telemetry will not consider a metric value to breach a threshold unless it remains out of compliance for 3 sample cycles. 

Whenever a metric breaches a threshold defined by an alert, that alert will create an “open incident” in Telemetry. When an incident is opened, Telemetry will alert the set of Notification Channels configured in the alert definition.

This incident will remain open until the target metric returns to an acceptable value or the alert definition is removed. In both cases the incident will close and Telemetry will notify the same set of Notification Channels of the closed incident.

### Renotification 

Whether or not Telemetry renotifies you of an open incident depends on how your Notification Channel has been configured. For example, if you have configured your PagerDuty channel to renotify once every 24 hours, we will open a new PagerDuty Incident after 24 hours (assuming the threshold continues to be breached for your metric) regardless of what you did in response to receiving the PagerDuty Incident.

### Effect of changing an existing alert definition

At any time you can delete an alert definition or update an existing one. 

However, note that:

- If you delete an alert definition for which there is an open incident, the incident will close regardless of whether the metric is now in compliance.
- If you change an alert definition that currently has an open incident against it, and the new alert definition causes the metric to become compliant, the existing open incident will close.
- If you update an alert definition for which there is an open incident, the existing incident will continue to use the original notification channel(s); only new incidents will use the updated notification channel(s).


<br>

---
