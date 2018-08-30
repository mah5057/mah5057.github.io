---
layout: default-nosearch
title: mLab Maintenance Events
permalink: /maintenance-events/
description: What to expect during required maintenance events
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[docs-rs-conns]:  /connecting/#replica-set-connections

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Replacing the underlying machine {#replacing-vm}

### Sandbox plan {#replace-vm-sandbox}

You should expect a few minutes of downtime when we replace the underlying machine for a Sandbox database.  If the existing underlying machine is degraded, you could experience up to a couple of hours of downtime.

### Shared Single-node plan {#replace-vm-shared-single-node}

*This is a legacy plan. Contact support@mlab.com for help migrating to a Cluster plan to avoid downtime.*

You should expect about 30 minutes of downtime when we replace the underlying machine for a database on our legacy Shared Single-node plan.

### Shared Cluster plan {#replace-vm-shared-cluster}

#### Electable node
{:.no_toc}

You should expect no downtime if your application is properly configured with a [replica set connection that can handle auto-failover][docs-rs-conns].  However, you will lose redundancy/high availability for approximately 60-90 minutes while we will take the node down and move it to a different virtual machine.

If this node is currently Primary, and you'd like to avoid failover during this maintenance, you can pre-emptively initiate a failover now.

#### Arbiter node
{:.no_toc}

You should expect no downtime. However, you will lose redundancy/high availability for a couple minutes while we take the node down and move it to a different virtual machines.

### Dedicated Single-node plan {#replace-vm-dedicated-single-node}

*Contact support@mlab.com for help migrating to a Cluster plan to avoid downtime.*

You should expect about 10-20 minutes of downtime when we replace the underlying machine.

### Dedicated Cluster plan {#replace-vm-dedicated-cluster}

#### Electable node
{:.no_toc}

You should expect no downtime if your application is properly configured with a [replica set connection that can handle auto-failover][docs-rs-conns]. If this node is Primary there will be a failover so that it becomes Secondary.

You will keep the same level of availability during the maintenance because we use our seamless rolling node replacement process for host replacements on Dedicated Cluster plan deployments.

#### Non-electable node
{:.no_toc}

You should expect no downtime.  You will also keep the same level of availability during the maintenance because we use our seamless rolling node replacement process for host replacements on Dedicated Cluster plan deployments.

#### Arbiter node
{:.no_toc}

You should expect no downtime. However, you will lose redundancy/high availability for a couple minutes while we take the node down and move it to a different virtual machines.























