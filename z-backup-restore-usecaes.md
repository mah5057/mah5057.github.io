---
layout: default-nosearch
title: Supported backup restore use cases
permalink: /backup-restore-usecases/
description: Supported use cases for restoring mLab-created backups from/to various plan subscriptions 
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-backup-create-new-restore]:		{{ site.url }}/backups/#create-new-from-backup
[docs-backup-in-place-restore]:      	{{ site.url }}/backups/#in-place-restore
[docs-backup-EBSsnapshot]:     			{{ site.url }}/backups/#faq-ebs-snapshot-restore

# {{ page.title }}
{:.no_toc} 

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

Below are the supported use cases for various mLab-created backup restore scenarios.

### Backups taken using mongodump ### 
{:.no_toc}

Restore method     | Source plan                         |   Sandbox              |  Shared Cluster        |  Dedicated Cluster
------------------ | ----------------------------------- | ---------------------- | -----------------------| ----------
Create new         | Sandbox                             |   yes                  |   yes                  |   yes  
Create new         | Shared Cluster                      | yes (w/out opLogReplay)|   yes                  |   yes 
Create new         | Dedicated Cluster w/ 1 database     | yes (w/out opLogReplay)|   yes                  |   yes
Create new         | Dedicated Cluster w/ > 1 database   |   yes  (1 database)    |   yes (1 database)     |   yes
Create new         | Dedicated Cluster w/ > 1 database   |   no  (all databases)  |   no (all databases)   |   yes



Restore method      | Source plan                         |   Sandbox              |  Shared Cluster        |  Dedicated Cluster
------------------- | ----------------------------------- | ---------------------- | -----------------------| ----------
In-place restore    | Sandbox                             |   n/a                  |   yes                  |   yes  
In-place restore    | Shared Cluster                      |   n/a                  |   yes                  |   yes 
In-place restore    | Dedicated Cluster w/ 1 database     |   n/a                  |   yes                  |   yes
In-place restore    | Dedicated Cluster w/ > 1 database   |   n/a                  |   no                   |   yes



### Backups taken as block storage snapshots ###
{:.no_toc}

Since backups taken as block storage snapshots are snapshots of the entire underlying disk volume, it is [necessary they are restored into a deployment with at least the same disk volume as the backup.][docs-backup-EBSsnapshot] 

The below use cases applies for both [in-place restore][docs-backup-in-place-restore] and [creating a new][docs-backup-create-new-restore] deployment from an mLab-created backup.

Source_plan         | Sandbox | Shared |  M1[^foot-mlab-Standard] |  M2[^foot-mlab-Standard] |  M3[^foot-mlab-Standard] |  M4[^foot-mlab-Standard] |  M5[^foot-mlab-Standard] |  M6[^foot-mlab-Standard] | M1_HS[^foot-mlab-HS]| M2_HS[^foot-mlab-HS]| M3_HS[^foot-mlab-HS]| M4_HS[^foot-mlab-HS]| M5_HS[^foot-mlab-HS]| M6_HS[^foot-mlab-HS]| M3_HP[^foot-mlab-HP]| M4_HP[^foot-mlab-HP]| M5_HP[^foot-mlab-HP]| M6_HP[^foot-mlab-HP]
--------------------|---------|--------|------|------|------|------|------|------|-------|-------|-------|-------|-------|-------|-------|-------|-------|------    
M1 Standard         |  n/a    |   n/a  |  Yes |  Yes |  Yes |  Yes |  Yes |  Yes |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes
M2 Standard         |  n/a    |   n/a  |  No  |  Yes |  Yes |  Yes |  Yes |  Yes |  TBD [^foot-mlab-RAM] |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes
M3 Standard         |  n/a    |   n/a  |  No  |  No  |  Yes |  Yes |  Yes |  Yes |  No   |  TBD [^foot-mlab-RAM] |  Yes  |  Yes  |  Yes  |  Yes  |  No   |  Yes  |  Yes  |  Yes
M4 Standard         |  n/a    |   n/a  |  No  |  No  |  No  |  Yes |  Yes |  Yes |  No   |  No   |  TBD [^foot-mlab-RAM] |  Yes  |  Yes  |  Yes  |  No   |  No   |  Yes  |  Yes
M5 Standard         |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  Yes |  Yes |  No   |  No   |  No   |  TBD [^foot-mlab-RAM] |  Yes  |  Yes  |  No   |  No   |  No   |  Yes
M6 Standard         |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  Yes |  No   |  No   |  No   |  No   |  TBD [^foot-mlab-RAM] |  Yes  |  No   |  No   |  No   |  No
M1 High Storage     |  n/a    |   n/a  |  No  |  No  |  Yes |  Yes |  Yes |  Yes |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes
M2 High Storage     |  n/a    |   n/a  |  No  |  No  |  No  |  Yes |  Yes |  Yes |  No   |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  No   |  Yes  |  Yes  |  Yes
M3 High Storage     |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  Yes |  Yes |  No   |  No   |  Yes  |  Yes  |  Yes  |  Yes  |  No   |  No   |  Yes  |  Yes
M4 High Storage     |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  Yes |  No   |  No   |  No   |  Yes  |  Yes  |  Yes  |  No   |  No   |  No   |  Yes
M5 High Storage     |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  No   |  No   |  No   |  No 
M6 High Storage     |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  No   |  No   |  No   |  No
M3 High Performance |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  Yes  |  Yes  |  Yes  |  Yes
M4 High Performance |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  TBD[^foot-mlab-SSD]  |  Yes  |  Yes  |  Yes
M5 High Performance |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  TBD[^foot-mlab-SSD]  |  TBD[^foot-mlab-SSD]  |  Yes  |  Yes
M6_High_Performance |  n/a    |   n/a  |  No  |  No  |  No  |  No  |  No  |  No  |  No   |  No   |  No   |  No   |  Yes  |  Yes  |  TBD[^foot-mlab-SSD]  |  TBD[^foot-mlab-SSD]  |  TBD[^foot-mlab-SSD]  |  Yes

In the case of "TBD", please send a request to <support@mlab.com> for further assistance.

--------

[^foot-mlab-Standard]: Refers to "Standard Dedicated Cluster"
[^foot-mlab-HS]: Refers to "High Storage Dedicated Cluster"
[^foot-mlab-HP]: Refers to "High Performance Dedicated Cluster"
[^foot-mlab-RAM]: Further investigation will be necessary to ensure appropriate amount of RAM is allocated.
[^foot-mlab-SSD]: Further investigation will be necessary to ensure appropriate amount of in-chassis/local disk volume is allocated.


