---
layout: default-nosearch
title: Quick-Start Guide to mLab
description: Support documentation on how to get started and use your mLab hosted MongoDB database
minc-docversion: v3.4
---


{% comment %} LINKS {% endcomment %}
[docs-plans]:        /plans
[docs-subscribe]:    /subscriptions
[docs-connect]:      /connecting
[docs-migrating]:    /migrating
[docs-accounts]:     /accounts
[docs-support]:      /support
[mlab-create]:       https://mlab.com/create/wizard
[mlab-signup]:       https://mlab.com/signup
[minc-home]:         http://www.mongdb.com
[minc-docs]:         http://docs.mongodb.com/{{ page.minc-docversion }}

{% comment %} IMAGE LINKS {% endcomment %} 
[img-newsub]:        /assets/screenshot-createwizard.png
[img-connectstring]: /assets/screenshot-connectinfo.png


# {{ page.title }}
{:.no_toc} 

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Step 1: Set up an mLab account {#account-setup}

To get started with mLab, you must first [create your free mLab account][mlab-signup]. When that's complete, you can add as many database subscriptions as you want.

For additional information about managing your mLab account users, contacts, and billing, see [mLab Account Setup][docs-accounts].


## Step 2: Create a database subscription {#create-sub}
After you've created your account, [add a new database subscription][mlab-create]. Get started quickly at no cost with a free Sandbox database.

![img-newsub][img-newsub]

For detailed steps on how to add a subscription, see [Database Subscriptions][docs-subscribe]. For a discussion on how to choose the right plan for your subscription, see [Plans and Data Centers][docs-plans].


## Step 3: Connect to your new database {#connect}

In a terminal window, connect to your database using the mongo shell (the command will look similar to the following example):

    % mongo ds012345.mlab.com:56789/dbname -u dbuser -p dbpassword

You can create a database user and password and grab your connection info after logging into your account and navigating to the database's home page:  

![img-connectstring][img-connectstring]

To view detailed connection instructions, troubleshooting tips, and alternate connection methods, see [Connecting to Your Database][docs-connect].

## Step 4: Load some data {#load-data}

Here's a quick exercise that tests an insertion into your new database: 

1. Assuming you successfully connected using the mongo shell in the previous step, run the following command:

        > db.mynewcollection.insert({ "foo" : "bar" })

1. Next, run the command in the first line below and confirm that the shell output matches the second line (your "\_id" value will be different):

        > db.mynewcollection.find()
        { "_id" : ObjectId("526705b4a3559a176784b4af"), "foo" : "bar" }

For additional instructions on how to get data, including larger datasets, into your mLab database, see [Migrating Data into mLab][docs-migrating].

## Everything else you need to know {#everything-else}

Congratulations---you've successfully created an mLab database! You're now on your way to discovering more about mLab's services so be sure to read through our documentation to get the most out of mLab and your MongoDB deployment(s). We have a broad range of topics that covers all the information you need to know about working with your mLab-managed database(s).

Our [Support][docs-support] page also links to some great MongoDB resources that you'll find super helpful.

<h3>Contact us</h3>
When in doubt, when you can't find specific information, or when you're just plain stuck, please don't hesitate to email us directly at <support@mlab.com>.







