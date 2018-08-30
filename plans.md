---
layout: default
title: Plans and Cloud Regions
permalink: /plans/
description: mLab database plans offer single-node and replica set cluster plans with cloud providers in many regions worldwide with size and performance options
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-plans]:           https://mlab.com/plans
[mlab-pricing]:         https://mlab.com/plans/pricing
[docs-versions]:        /ops/#version-mgmt
[docs-productionuse]:   {{ site.url }}/production-guide
[mlab-aws]:         https://mlab.com/aws
[mlab-azr]:         https://mlab.com/azure
[mlab-gcp]:         https://mlab.com/google
[minc-rs-elections]:	https://docs.mongodb.com/manual/core/replica-set-elections

[aws-instance-storage]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

# {{ page.title }}
{:.no_toc} 

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}

## Overview 
{:.no_toc}

mLab offers a wide selection of database plans to suit a variety of data sizes, workloads, and stages of development. We offer both single-node databases and multi-node cluster deployments, along with various tenanting and storage options. 

Our [plans][mlab-plans] and [pricing][mlab-pricing] pages provide the full list of plans, features, and prices but sometimes it's hard to know where to start. The following sections are meant to help you understand what the different options really mean.

## Plan types {#plan-types}

### Sandbox {#sandbox-plan-type}

Our free Sandbox plan provides a single database with 496 MB of storage on a shared `mongod` server process running on a shared virtual machine (VM). 

A Sandbox plan database is best for development and prototyping. It's also a great way to get familiar with MongoDB.

{:.warning-box}
<div markdown="1">
Sandbox plans are not suitable for production use. Read our [guide to running in production][docs-productionuse] for more information.
</div>
{:.warning-box}


### Shared {#shared-plan-type}

Our Shared plan provides a single database with 1 GB storage (expandable to 8 GB) on a dedicated `mongod` server process running on a shared VM. 

This plan is also known as our "Shared Cluster plan" because we only offer this as a multi-node, replica set cluster plan.

A Shared plan is an economical way to run MongoDB if you have a smaller dataset and lighter workload. This plan is multi-tenanted which means you share your infrastructure and its resources (CPU, RAM, disk, I/O) with others.

Shared Cluster plans are good for:

- Smaller datasets
- Lighter workloads
- Low-budget projects
- Development

### Dedicated {#dedicated-plan-type}

Our Dedicated plans offer dedicated `mongod` server processes running on dedicated VMs. With these plans, all resources available to the VM (CPU, RAM, disk, I/O) are exclusively yours. These plans also include full administrative access to the database server processes.

Except for a few single-node Dedicated plans, our Dedicated plans are multi-node replica set cluster plans which include redundancy and 24x7 emergency support.

Dedicated plans are good for:

- Larger datasets 
- Heavier workloads
- Environments where the consistent performance and isolation of a VM dedicated to your deployment is required

## Single-node vs. Cluster plans {#single-vs-cluster-plans}

### Single-node plans 
{:.no_toc}

Our single-node plans, including our Sandbox, Dedicated Single-node, and some legacy plans, do not include redundancy. If the primary node becomes unavailable, your application will not be able to use your database until the node comes back up again. In addition, maintenance on single-node deployments typically requires downtime.

As such, single-node plans are typically suitable for use only as development, utility, or analytics databases.

### Cluster plans 
{:.no_toc}

Our Shared and Dedicated Cluster plans are multi-node replica set cluster deployments with three or more nodes (e.g., two data-bearing nodes plus an arbiter node).

Cluster plans are designed for applications that have little tolerance for downtime and offer:

- Multiple redundant nodes each in isolated fault zones (on cloud providers that support this)
- Automatic failover to a secondary node should the primary become unreachable
- High availability for your application

## High Performance plans (local SSDs) {#hp-plans}

*Available only on AWS*  

Our High Performance line is designed for applications with the most demanding workloads, featuring high RAM-to-storage ratios and local SSD storage with very high throughput and extremely low latency. These plans can support workloads consisting of thousands to hundreds of thousands of reads and writes per second.

We offer these plans as single Replica Sets or as Sharded Clusters. For a more complete list of all of our plans and prices see our [pricing page][mlab-pricing].

{:.note-box}
<div markdown="1">
Maintenance activities will generally take significantly longer (e.g., upgrades, restores from backups, etc.) on the High Performance line because we are not able to take advantage of the flexibility of EBS Volumes and EBS Snapshots. If you have questions about whether the High Performance line is recommended for your specific deployment's workload please contact support@mlab.com.
</div>
{:.note-box}

#### Includes hidden, EBS-backed node designated for backups only #### {#hp-line-backup-node}
{:.no_toc}

Our High Performance plan deployments use local SSDs on the electable nodes. These disks are what AWS calls [instance store volumes][aws-instance-storage]. While offering the best performance, the data unfortunately is not durable in the event of VM stop/start.

To give you the throughput benefits of the local disks while still providing maximum data durability, our High Performances plans include a hidden node backed by Elastic Block Storage (EBS) which is not only durable but also has full backup capabilities (allows for EBS Snapshots).



## Supported cloud providers and regions {#cloud-providers}

Currently, we offer plans with the following cloud providers in the specified regions:

Cloud Provider  | Sandbox and Shared plans | Dedicated plans | 
------------- | ------------- | ------------- | ------------- 
Amazon Web Services (AWS)  | us-east-1, us-west-2 [^foot-text], eu-west-1, eu-central-1 [^foot-text] | Most regions [^foot-text2] |
Microsoft Azure | East US, West US, North Europe | Most regions [^foot-text3]  | 
Google Cloud Platform | us-central1, europe-west1 [^foot-text4] | All regions [^foot-text5]  |

We do not offer custom services to host with cloud providers or regions not listed here. However, user feedback is a part of our process of identifying new ones to add in the future so contact us at <support@mlab.com> to let us know if there is a particular cloud provider or region that you'd like to see as an option. 



## Selecting the right plan {#select-a-plan}

There are many things to consider when selecting the right plan for your application. In particular you will want to think about:

- __Data set size__ - How much data will you need to store? How big is the "working set" of your data? How big are the size of your indexes? These questions will help you select the appropriate plan size. 

- __Availability requirements__ - Is this database for a production application with stringent uptime requirements? If so, you want a replica set cluster. If your database is for development/testing or is a non-mission-critical utility instance or offline analytics database you might consider a single-node database. 

- __Location__ - Where is your application infrastructure hosted? You should always place your database in the same region as your application to minimize network latency and increase security.

- __MongoDB version__ - Is the version of MongoDB that you intend to use available? See our list of [currently supported MongoDB versions][docs-versions].

If you need help determining the right plan for you, email us at <support@mlab.com> and we would be happy to help.

## Frequently Asked Questions (FAQ) {#faq}

### Q. Why are AWS regions with only two Availability Zones not recommended? {#two-az-regions-faq}
{:.no_toc}

You might have seen a warning simliar to the following while you were provisioning or managing a Dedicated Cluster plan on AWS:

"AWS ap-northeast-1 is not a recommended region because it currently has only two Availability Zones. This means that a single Availability Zone issue could result in downtime."  

The reason why regions with two Availability Zones are not recommended for clusters that require high availability is because it is possible for the deployment to experience downtime if a zone-wide issue occurs.  Let's take the following example of an mLab cluster deployment:

Node                        |  Availability Zone   
--------------------------- | -------------------- |
Node_a0 (data bearing node) | A
Node_a1 (data bearing node) | B
Node_ar0 (arbiter node)     | B
--------------------------- | -------------------- |

If Node_a1 is Primary and there was a zone-wide issue in Availabilty Zone B, Node_a0 would not be able to promote itself to become Primary since it will not have the majority votes (2 votes) necessary to do so during the [replica set election][minc-rs-elections].  
 
<br/>
<br/>

---

[^foot-text]: AWS us-west-2 (Oregon) and AWS eu-central-1 (Frankfurt) currently only support our Shared Cluster plan and do not support our Sandbox plans.
[^foot-text2]: We do not support AWS China.
[^foot-text3]: For the definitive list of Azure regions we support, use our "Create new" form. Some of the regions we do not currently support: East US 2, US Gov regions, China regions, and Germany regions.
[^foot-text4]: GCP europe-west1 (Belgium) currently only supports our Shared Cluster plan and does not support our Sandbox plans.
[^foot-text5]: Contact <support@mlab.com> if your desired Google region is not available when creating a new Dedicated plan.


