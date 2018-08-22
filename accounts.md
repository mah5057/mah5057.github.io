---
layout: default-nosearch
title: mLab Account Setup
permalink: /accounts/
description: Create your free mLab account and manage your account users, email contacts, and billing preferences
summary: This is a summary of the accounts page
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-charges]:      /subscriptions/#calculating-charges
[docs-deletesub]:    /subscriptions/#delete-sub
[docs-accountsecurity]:    /security/#account-security-settings
[docs-backups]:      /backups
[docs-dbusers]:      /connecting/#users
[mlab-login]:        https://mlab.com/login
[mlab-signup]:       https://mlab.com/signup
[pagerduty-home]:    http://pagerduty.com
[docs-twofa]:        /security/#two-factor-authentication

 

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

To get started with mLab, [create your free mLab account][mlab-signup]. Your mLab account allows you to create an unlimited number of MongoDB deployments and to manage those subscriptions, you'll want to make sure that you've adjusted your account settings to control who has access to your account and to specify your contact and billing preferences.

## Managing your mLab account {#manage-account}

In this section, we discuss everything you need to know about account users, Admin User privileges, and how to update settings such as your contact preferences and billing information. 

### Account Users {#account-users}
When you first sign up for an mLab account, you are prompted for an account name and a unique username and password for the initial account user. mLab account users are allowed to access the mLab management portal and manage the account's settings and database deployments. Each account user should have a unique username and a password which are used to [log in to the mLab management portal][mlab-login].

By default, the initial mLab account user (created when the account is first created) is designated as the __Admin User__. There can be only one Admin User per mLab account. The Admin User is the only one who can:

- Create additional account users 
- Manage (update, delete) other account users besides themselves 
- Transfer Admin User privileges to another account user
- Set [account-level security options][docs-accountsecurity]
- Configure the Technical Contact and Emergency Contact for the account
- Configure Telemetry Notification Channels
- Delete the mLab account entirely

#### Add a new account user
{:.no_toc}

*Performed only by the Admin User*

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page.
1. If the "Users" tab is not already highlighted, click it to show the list of Account Users.
1. Click the “Add account user” button.
1. Fill in the new account user’s information (a unique username, email, and password).
1. Click the "Add" button to add the new user.
1. Communicate the new username and password to the appropriate person, as they will need these credentials in order to log in successfully. They should also expect to receive an email verification request from mLab via email.

The same email address can be associated with different account users in the same account and/or across multiple accounts. However, each account user is unique and can be associated with only one account. As a result, a user can be logged into only one account at a time.


#### Change Admin User
{:.no_toc}

*Performed only by the Admin User*

{:.warning-box}
<div markdown="1">
There can be only one Admin User per mLab account. As soon as you re-assign Admin User rights to another user, you will *immediately* lose your Admin User status. Therefore, make sure that a user that is about to become the Admin User has already verified their email address and confirmed that they can log into the account.
</div>
{:.warning-box}

1. Click the row with the user that will become the new Admin User.
1. Click the “Change to admin” button on the User Details page.
1. Click “Yes” to confirm that new user should now become the Admin User. 
<p></p>



#### Update account user information (e.g., username, password, email)  
{:.no_toc}

Account users can update their own user information following the steps below. In addition, Admin Users can update any user profile.

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper right-hand corner to open the Account Settings page. 
1. If the "Users" tab is not already highlighted, click it to show the list of Account Users.
1. Click the row with your username (or if you are the Admin User, click the row of the user you want to update).
1. Make your desired changes.
1. Click “Modify” to save the changes.
   - If an email address is updated, an email verification message will be sent to the new address.

<p></p>

#### Set up two-factor authentication for your account user 
{:.no_toc}

Each account user has the ability to activate two-factor authentication so that in addition to entering a password when logging in, they must also provide an authentication code. To read more about how it works and how to set it up, see [Two-Factor Authentication][docs-twofa].


#### Delete an account user 
{:.no_toc}

If you are an account user, you can delete yourself as long as you are not the Admin User. In addition, the Admin User has the ability to delete any account user.

1. Click the delete button (a trash can) that appears at the end of the row for the user to be removed.
1. Click “Delete” to confirm that the account user should be permanently deleted.
<p></p>

{:.warning-box}
<div markdown="1">
Once you delete yourself as an account user, you will immediately lose access to the mLab management portal and your mLab account.
</div>
{:.warning-box}

{:.note-box}
<div markdown="1">
It's important to know that "account users" and "database users" are not the same. Database user credentials cannot be used to log in to the mLab management portal. Conversely, you cannot use account user credentials to authenticate against a MongoDB database. [Read more about database users here.][docs-dbusers]
</div>
{:.note-box}

### Account Contacts {#account-contacts}

Official communication, including notifications about incidents which have impacted or may impact database availability will always be sent out to the appropriate Account Contacts as defined below. It's also possible that all mLab users in your account will be contacted if the situation is critical enough to warrant it.

There are four possible Account Contacts which can be registered with your mLab account:

__Admin User__

By default, all communication related to your mLab account will be directed to the email address of the account user designated as the Admin User.

__Technical Contact__

To direct technical notifications to an email address different from the Admin User's email, fill out the "Technical contact email" field in the "Key Email Contacts" section of the Account Settings page. 

If a Technical Contact is not specified, technical messages will be sent to the Admin User instead. 

Only the Admin User can update this field. 

__Emergency Contact__

The "Emergency email" value, if provided, will be used in the event of an emergency. This field is also useful for emergency alerting through services such as [PagerDuty][pagerduty-home] which will allow you to set up alerting via email/phone/sms and define escalation policies for your organization.

If an Emergency Contact is not specified, emergency notices will be sent to the Admin User. 

Only the Admin User can update this field. 

__Billing Contact__

Invoices, payment receipts, and other billing-related notifications can also be sent to an email that is different from the Admin User's email. If you'd like to use a different email address for billing-related notifications, provide it in the "Billing email" field on the "Billing" tab (instructions available in the [Billing](#billing) section).

If a Billing Contact is not specified, billing-related messages will be sent to the Admin User instead. 

The Billing Contact can be updated by any account user, not just the Admin User.


### Billing {#billing}

Our automated credit card billing system offers a secure, hassle-free payment process for customers who choose a for-pay plan or want to use our [Backup][docs-backups] services. 

Your credit card is automatically charged at the beginning of each month for services provided in the prior month. See our Database Subscriptions documentation for more information about how we [calculate services charges][docs-charges].

#### Add a new credit card   
{:.no_toc}
1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper-right hand corner to open the Account Settings page.
1. Click the "Billing" tab.
1. Click the "Add card" button and fill in the required information.
1. Click “Add” to save the credit card information.

More than one credit card can be added to your account; just click the "Add card" button again to add more. 

#### Change the default credit card   
{:.no_toc}
The first credit card you enter will be automatically set as the default card to be used for account charges. If you have more than one card, you can change the default by clicking the action button that appears at the far right end of the row of the card you wish to designate as default. In the menu of options that appears, select "Make default card" and if successful, an asterisk will appear in the "Default?" column.

In the event you have more than one credit card associated with your account and we run into a problem with your default credit card (e.g., our monthly charge attempt is being declined), you will be notified via email of the issue. If we do not hear back from you, we may change the default card in order to attempt the charge on a card not originally marked as the default. 

#### Remove a credit card 
{:.no_toc}
To remove a credit card, click the delete (trash can) button that appears at the end of the row of the card you want to delete.

#### Update an existing credit card  
{:.no_toc}
To update the information for a specific card, first delete the original credit card and re-add the card again as a new card. If there is more than one credit card in your list, make sure you have the correct one selected as the default.

#### Change billing contact and invoice information  
{:.no_toc}
If you'd like to use a different email address for billing-related notifications and invoices, specify the email address on the "Billing" tab. You can also specify additional information to appear on your monthly invoice (e.g., VAT ID, company address, etc.).

To update the billing contact and/or organizational information, follow these instructions:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper-right hand corner to open the Account Settings page.
1. Click the "Billing" tab.
1. Update the email address in the "Billing email" field.
1. Update organization information in the “Organization Info” section.
1. Click "Save changes" to save your changes.

#### View payment history and re-send invoices {#paid-invoices} 
{:.no_toc}
If you'd like to view the account's payment history or re-send invoices, follow the steps below:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click "Account" in the upper-right hand corner to open the Account Settings page.
1. Click the "Billing" tab.
1. Click the link that appears in the section "Paid Invoices".
1. On the page that appears, you can view a history of payments or select invoices to be re-sent to any email address associated with the account.
1. To re-send invoices, select the invoice(s) to re-send then click the "Send invoices" button and choose the recipient's email address. 


### Changing your account name {#account-name-change}

Your mLab account's name (not the username for an account user) can be changed if requested by the Admin User. To change the name of your mLab account, contact <support@mlab.com> and in your request, please specify the current account name and at least two choices for a new account name.

## Closing your account {#cancel-account}
We understand if you no longer require our services. We've tried to make the process as simple as possible to delete your account. 

Steps to delete your account and permanently delete all of its associated data:

1. [Log in][mlab-login] to the mLab management portal. 
1. If you would like to keep a copy of your data, [export it][docs-backups].
1. [Delete all active subscriptions][docs-deletesub].
1. Click "Account" in the upper right-hand corner to open the Account Settings page. 
1. Click the "Delete account" button in the upper-right hand corner.
1. If there is no balance associated with your account, your account will be deleted immediately. 

{:.note-box}
<div markdown="1">
If you have any outstanding charges at the time you delete your account, you will receive your final invoice within a week and your account will be deleted immediately after the invoice is sent. If you do not receive your invoice within a week or if you'd like us to rush it to you sooner, please contact <support@mlab.com>.
</div>
{:.note-box}


### Have feedback? 
{:.no_toc}

We're always looking for ways to improve our service so please send us your feedback at <support@mlab.com>. We appreciate the comments and suggestions from our users---thank you!

## Frequently Asked Questions (FAQ) {#faq}

### Q. Where can I find the unpaid balance for my account?
{:.no_toc}

You can [view an account's payment history and re-send paid invoices](#paid-invoices) but we do not display unpaid invoices or the account's currently owed balance in the mLab management portal. Contact us at <support@mlab.com> for more information about your account's payment balance.

### Q. How do I get a PDF version of the invoice?
{:.no_toc}

We do not provide invoices in an attachable format such as PDF. However, you can convert the invoice that we send via email into a PDF file by using an app that creates PDF files or by using the "Save to PDF" option that is typically available in the print menu of most popular browsers and mail programs.


### Q. How do I set up an account on behalf of a client?
{:.no_toc}

There are situations where a third-party resource is hired by an individual or organization for application or database development. Under the assumption that the Admin User is the user that effectively owns the account and its associated data, our recommendation for account setup follows these guidelines:

- The Admin User of the account should be associated with the individual client/organization.
- The Admin User adds the third-party resource as a non-admin account user. 
- If using any for-pay services, the credit card is ideally provided by the individual client/organization. 
- The Billing, Technical and Emergency Contacts should be set accordingly.



