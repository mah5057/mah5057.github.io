---
layout: default-nosearch
title:  MongoDB Storage Statistics (MMAPv1)
permalink: /storage-statistics/
description: Accessing and understanding the output of MongoDB's dbStats and collStats commands for your mLab database and collections running with MMAPv1
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:          https://mlab.com/login
[docs-compactions]:    /ops/#compacting
[minc-dbstats]:        https://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/dbStats/
[minc-collstats]:      https://docs.mongodb.com/{{ page.minc-docversion }}/reference/command/collStats/
[minc-disksize]:       https://docs.mongodb.com/{{ page.minc-docversion }}/faq/storage/#faq-disk-size

{% comment %} IMAGE LINKS {% endcomment %} 
[img-dbstats]:       /assets/screenshot-dbstats.png
[img-extents]:       /assets/img-data_extents.png
[img-datasize]:      /assets/img-data_size.png
[img-filesize]:      /assets/img-file_size.png
[img-storagesize]:   /assets/img-storage_size.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

In MongoDB, the [`dbStats`][minc-dbstats] and [`collStats`][minc-collstats] commands return storage statistics for your database and collections. 

Below, follow the instructions for viewing the output of these commands directly in the mLab management portal or running the commands in the mongo shell. 

We also discuss [how MongoDB storage works and what some of size-related metrics](#size-stats) actually mean.

## Viewing the current statistics {#view-stats}

To view the output of these commands in the mLab management portal (which also displays helpful definitions for each field):

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment with the database whose stats you want to view.
   - If necessary, navigate to the desired database after navigating to the deployment and if further desired, click the "Collections" tab to view stats for a specific collection.
1. Once you've navigated to the desired database or collection, click the "Stats" tab. 
![img-dbstats][img-dbstats]

To run these commands in the mongo shell, use the respective helper methods, both shown below:

    > db.stats()
    
    > db.<collection>.stats()

## Understanding MongoDB storage and size metrics {#size-stats}

MongoDB provides a variety of size-related metrics for your database and once you understand the basics of MongoDB storage, it's easier to understand the differences between these metrics.

### The basics: data files and extents 
{:.no_toc}

Every MongoDB instance consists of a namespace file,  journal files and data files. Here, we’ll focus only on data files, since that is where all of the data and indexes for your database reside.

__Data files__ store BSON documents, indexes, and MongoDB-generated metadata in structures called extents. Each data file is made up of multiple extents.

__Extents__ are logical containers within data files used to store documents and indexes.

![img-extents][img-extents]

The above diagram illustrates the relationship between data files and extents. Note:

- Data and indexes are each contained in their own sets of extents; no extent will ever contain content for more than one collection.
- Data and indexes are never contained within the same extent.
- The data and indexes for a collection will usually span multiple extents.
- When a new extent is needed, MongoDB will attempt to use available space within current data files. If space cannot be found MongoDB will create new data files.


### The metrics: dataSize, storageSize, and fileSize 
{:.no_toc}

Some of the more commonly examined metrics from the `dbStats` command are `dataSize`, `storageSize` and `fileSize`. What is the difference between how these metrics are calculated?

#### Data size  
{:.no_toc}

![img-datasize][img-datasize]

The `dataSize` metric is the sum of the the sizes (in bytes) of all the documents and padding stored in the database.

While `dataSize` does decrease when you delete documents, it does not decrease when documents shrink because the space used by the original document has already been allocated (to that particular document) and cannot be used by other documents.

Alternatively, if a user updates a document with more data, `dataSize` will remain the same as long as the new document fits within its originally padded pre-allocated space.

#### Storage size  
{:.no_toc}

![img-storagesize][img-storagesize]

The `storageSize` metric is equal to the size (in bytes) of all the data extents in the database. This number is larger than `dataSize` because it includes yet-unused space (in data extents) and space vacated by deleted or moved documents within extents.

The `storageSize` value does not decrease as you remove or shrink documents.

#### File size  
{:.no_toc}

![img-filesize][img-filesize]

The `fileSize` metric is equal to the size (in bytes) of all the data extents, index extents and yet-unused space (in data files) in the database. This metric represents the storage footprint of your database on disk. `fileSize` is larger than `storageSize` because it includes index extents and yet-unused space in data files.

`fileSize` does not decrease as you remove collections, documents or indexes. However, it will decrease if you drop a database or [compact your deployment][docs-compactions] in order to de-fragment and release space back to the OS.

For further reading, [MongoDB Inc. provides a technical explanation in its FAQ][minc-disksize].

