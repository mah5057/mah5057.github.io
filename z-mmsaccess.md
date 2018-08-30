---
layout: default-norobots
title: How to access MMS Monitoring
permalink: /mms-access/
description: How to access MMS Monitoring for your mLab deployment
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:        https://mlab.com/login
[minc-mms]:          https://mms.mongodb.com/help/monitoring/
[minc-mmsregister]:  https://mms.mongodb.com/user/register

{% comment %} IMAGE LINKS {% endcomment %} 
[img-mmsuser]:       /assets/screenshot-mmsuser.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Steps to set up access to MMS Monitoring

*Not available for Sandbox databases and Shared single-node servers*
  
While mLab takes care of setting up the Monitoring Agent and MMS group for each of your eligible deployments, your responsibility is to attach one or more MMS users to your mLab account.  Each MMS user attached to your mLab account will be given access to MMS Monitoring for all eligible deployments, including any new deployments that you create down the line.

To attach an MMS user to your mLab account:

1. [Register for an MMS account][minc-mmsregister] if you do not already have one
   - In the MMS Group section, do NOT use an existing mLab-created MMS group; see [Choosing an MMS group](#mms-groups) below for a detailed explanation 
1. [Log in][mlab-login] to the mLab management portal 
1. Click "Account" in the upper right-hand corner to open the Account Settings page 
1. Click the "MMS Monitoring" tab 
1. Click the "Attach MMS user" button
1. In the window that appears, fill in your MMS username and click "Attach"
![img-mmsuser][img-mmsuser]

An email will be sent to all group admins for each MMS group (one per deployment) that the MMS user has been added to.


## Managing MMS Users

The benefit of attaching MMS users to your mLab account is that you have just one place that you need to go to for making sure that MMS users are added or removed from all of your eligible deployments. In other words, you do not need to log into the MongoDB MMS portal and navigate to the Users tab for each and every MMS group (if your group has more than one MMS-eligible deployments) to add or remove an MMS user.

Also, while you are not prevented from using the Users tab in the MMS UI from MongoDB, Inc. to add or remove a user from an individual MMS group, doing so will NOT adjust the list of MMS users attached to your mLab account. mLab will continue to use the list of attached MMS users to determine who should be automatically added to any MMS-eligible deployments that are subsequently created.


{:.warning-box}
<div markdown="1">
When a person should no longer have access to your mLab deployments (e,g, leaves organization, changes job responsibilities, etc.),  make sure that both the mLab user and MMS user entries associated with that person are deleted from the mLab account. Otherwise, the user will continue to have access to the account's MongoDB and/or MMS Monitoring data.
</div>
{:.warning-box}



## Choosing an MMS group  {#mms-groups}

In MongoDB's [MMS registration page][minc-mmsregister], there is a section titled "MMS Group" where you are asked to select whether you are the first person in your organization to use MMS or if you'll be joining an existing MMS group at your organization. You are also asked to provide the name of the MMS group that you'd like to create or be added to. 

It does not matter which option you choose, however, if you choose to join an existing MMS group, you cannot use any of the existing MMS groups created for your mLab account's hosted deployments (these MMS groups have names that start with "mongolab_").  
