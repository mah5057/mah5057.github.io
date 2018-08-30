---
layout: default
title: Shutdown of mLab's integration with the Azure Marketplace
permalink: /20160622-maintenance-event/
description: Critical mLab notification about shutdown of integration with Azure Marketplace on June 22, 2016
---

{% comment %} LINKS {% endcomment %}
[docs-cancel]:            /accounts/#cancel-account

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Email notification sent to all affected users

Below is an example of the email that was sent on May 20, 2016, to all associated users of impacted accounts created via the Azure Marketplace's add-on program.

### Subject of email notification

[CRITICAL ACTION REQUIRED] Transfer your mLab databases off the Azure Marketplace by June 22 (account - pacific-acme-8)

### Body of email notification

Dear mLab user,

You are receiving this email because you have at least one MongoDB deployment with mLab (formerly known as MongoLab) that was created through the Azure Marketplace.

We will be shutting down our integration with the Azure Marketplace on June 22, 2016.

All of the MongoDB deployments you previously created through the Azure Marketplace can be moved directly to mLab (<a href='https://mlab.com'>https://mlab.com</a>) without service interruption. However, you **must take action by June 22, 2016** to avoid data loss, a disruption in service, and/or the inability to manage your database deployment(s).

#### Impacted deployments in the "pacific-acme-8" mLab account

    Free Sandbox databases
      * ds012345/MongoLab-3

    For-pay deployments
      * ds067891 (production)

#### Required steps

1. Use the Azure Marketplace's single-sign-on feature to connect to your mLab account.
1. <a href='http://docs.mlab.com/accounts/#add-a-new-account-user-admin-only'>Create a new mLab account user</a>. It is *not* sufficient to rename the user that was originally auto-created.
1. Ensure this new user can <a href='https://mlab.com/login'>login directly to mLab</a>.
1. Make this new user the admin user on the account by <a href='http://docs.mlab.com/accounts/#re-assign-admin-privileges-admin-only'>re-assigning admin rights</a>.

#### Additional steps required if you have for-pay deployment(s)

1. <a href='http://docs.mlab.com/accounts/#add-a-new-credit-card'>Add a credit card</a> to your mLab account.
1. Email us at support@mlab.com to request that we disconnect your for-pay deployment(s) from the Azure Marketplace and switch to being directly billed by mLab. This is simply a metadata change and will not affect your actual database deployment(s).
1. Once mLab has confirmed the previous step is complete, delete your mLab add-on(s) from the Azure Marketplace to stop Azure from billing you for them. If you do not wait for mLab's confirmation you risk deleting your actual database deployment(s).

#### If you do not complete the steps above by June 22

- You could lose the ability to manage your free Sandbox databases via the mLab management console.
- All of your for-pay deployments will be deleted and your data and databases will no longer be available.

Please let us know if you have any questions or concerns by replying to this email (support@mlab.com).

Best regards,

mLab Operations

## Frequently Asked Questions (FAQ)

### Q. Does this mean you no longer support Azure?

We still support Azure, and you do not need to migrate your database from its current location. In other words, your data and your database will not be moved physically. 

What we are discontinuing is our support for purchasing and managing mLab-hosted deployments via the Azure Marketplace. Going forward you will still be able to provision new databases and upgrade existing databases on Azure directly with mLab. 

### Q. Why are you de-supporting the Azure Marketplace?

Azure will be closing down the original Azure Marketplace and replacing it with the new Azure Marketplace. As one of the original vendors on the Azure Marketplace, mLab's technical integration with Azure is via their original API which will no longer be supported by Microsoft after June 30th. 

mLab may, at a later date, join the new Azure Marketplace, but we will first need to port its existing integration over to the newer API. 

### Q. How do I "use the Azure Marketplace' single-sign-on feature" to connect to my mLab account?

To single-sign-on into your mLab account from the Azure Portal:

1. <a href='https://manage.windowsazure.com/'>Log in to the Azure Portal</a>
1. Click on "Marketplace" in the Azure Portal left nav
1. Select your mLab MongoDB deployment from the list
1. Click the "Manage" button on the bottom nav

This will open up a new tab, log you into your mLab account, and bring you to the page for the MongoDB deployment you selected in step (2).

If you'd like to see screenshots and further details, this <a href='http://blog.mlab.com/2013/02/node-js-and-mongolab-on-windows-azure/#manage'>tutorial from 2013</a> is still pretty accurate. The only thing out of date about this 2013 tutorial is that the "Add-ons" tab in the left nav is now "Marketplace" as specified in step (1) above.

### Q. Can I connect to my mLab account and delete it without going through Azure Marketplace?

Follow these steps to retrieve your mLab username, reset the password, and delete the account if desired:

1. Enter the email address associated with your Azure account in our username reminder form at https://mlab.com/remind-usernames
1. mLab will send an email with the username to email address above. 
1. Copy that username exactly as it appears in the email into the password reset form at https://mlab.com/reset-password/
1. Click the password reset link that is included in the email that arrives from mLab.
1. You will be prompted to change the password and will be subsequently logged into the mLab account.
1. If you want to delete the mLab account, [read the instructions for deleting an account][docs-cancel].

### Q. I am not using my free Sandbox database. Please delete my account!

Apologies for the inconvenience, but we cannot delete data on your behalf.  You have two options:

(1) Do nothing

Note that your free Sandbox database will still exist, so the email address that we have on file will receive future service-related notifications.

(2) Delete your database **before June 22** by removing the mLab add-on via the Azure Marketplace (see next FAQ)

### Q. How do I remove my mLab add-on?

Steps to delete your mLab add-on from the Azure Portal:

1. <a href='https://manage.windowsazure.com/'>Log in to the Azure Portal</a>
1. Click on "Marketplace" in the Azure Portal left nav
1. Select your mLab MongoDB deployment from the list
1. Click the "Delete" button on the bottom nav

Note that if your deployment has already been detached by mLab Support from the Azure Marketplace, deleting your mLab add-on will not affect your actual database deployment.











