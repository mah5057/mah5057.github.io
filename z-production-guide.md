---
layout: default
title: Running MongoDB in Production
permalink: /production-guide/
description: Guide to running MongoDB in production
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-plans]:        https://mlab.com/plans
[docs-security]:     {{ site.url }}/security
[docs-monitoring]:   {{ site.url }}/monitoring
[docs-rollingman]:   {{ site.url }}/ops/#rolling-node-replacement
[docs-slowqueries]:  {{ site.url }}/monitoring/#slow-query-analyzer

{% comment %} IMAGE LINKS {% endcomment %} 
[img-telemetry]:            /assets/screenshot-telemetry.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Sandbox databases are unsuitable for "production use" {#sandbox-suitability}

In the spirit of ensuring your project is successful, both today and in the future, we want to make you aware of important considerations that make Sandbox databases unsuitable for “production use.”

What does “production use” mean? Different people and companies have different definitions. Many developers and business leaders have some of the following requirements when they move from prototyping/development to “production use.” Other companies may have additional requirements not listed here, but the following requirements are some of the most common: 

1. High availability of the database to minimize costly downtime 
1. Access to 24x7 emergency support and/or a Service Level Agreement (SLA)
1. Consistent, predictable performance of the database and application 
1. Additional security beyond standard database authentication

If any of the items above correspond to your deployment's requirements, an mLab [Shared Cluster or Dedicated Cluster plan][mlab-plans] is more suitable than a Sandbox plan. 

And it may be obvious, but if your application has paying customers, we would consider you to be running in production!

## Key considerations when running in production {#key-considerations}

In this section, we provide additional detail around some of the key considerations when running in production. 

### High availability {#high-availability}

__High availability, or greater resiliency to downtime, can be achieved through moving to a multi-node “replica set” deployment.__ 

For applications that require high availability, minimizing the chance of downtime is extremely important. With a Sandbox plan, your database runs on a single server process, or “node,” which is shared with other Sandbox database users. 

There are three typical reasons a node experiences downtime: scheduled or unplanned maintenance, user-initiated plan changes (e.g. as your data size grows, Sandbox plans are limited to 500 MB), and hardware failures.

By adding a “redundant,” or secondary, node to your database deployment, you are protected from single-node deployment downtime scenarios. If your primary node becomes unavailable, your application can still access your database via your secondary node, thus minimizing your chance of experiencing downtime. 

mLab [Shared Cluster and Dedicated Cluster plans][mlab-plans] offer such replica set deployments. In addition, by adding a redundant node, your deployment is eligible to use the [rolling node replacement process][docs-rollingman] which provides high availability during maintenance events like compactions, disk space and hardware upgrades/downgrades, migrations to new database versions, and more.

### Emergency support {#emergency-support}

__A 24x7 emergency support contact, and/or an SLA, allows you to rest easily at night (and avoid calls from angry bosses or customers).__

mLab provides excellent email-based customer support to all users, independent of your plan type. Our response times and resolution rates are viewed as best-in-class among cloud service providers.

Our Dedicated plans also include a 24x7 emergency hotline which pages an on-call team member who will respond to your issue immediately. This service is valuable to customers who require immediate response in the case of unexpected, critical issues, which can happen at any time!

### Consistent and predictable performance {#predictable-performance}

__Consistent, predictable performance can be achieved by dedicating underlying VM resources to your application and by leveraging best-in-class performance and monitoring tools.__

For consistent, stable performance, your database should run on a dedicated VM. With a Sandbox plan, you run the risk of “noisy neighbors.” A Sandbox database’s underlying resources are shared with numerous multiple co-tenant databases, some of which may be servicing read- or write-intensive applications. With mLab Dedicated plans, your application is assigned a dedicated VM (which includes CPU and RAM), protecting your database from the activity of other users.

mLab has developed a world-class set of [database monitoring and performance enhancement tools][docs-monitoring] to help you optimize your database deployment (see screenshot of our Telemetry service below). These tools, including mLab’s [slow query analyzer and automated index recommendation service][docs-slowqueries], analyze VM and process-level metrics and statistics to provide the best and most actionable insights. (Note: performance data can also be forwarded to New Relic.) 

![img-telemetry][img-telemetry]

{:.note-box}
<div markdown="1">
These performance and monitoring tools are not offered with our Sandbox plans, as they require a dedicated mongod process. To obtain your own mongod process and access the tools, you must migrate to a for-pay mLab plan. 
</div>
{:.note-box}



### Secure access and communication {#security}

__Incremental levels of security can be achieved by adding an SSL certificate and/or custom firewall rules to your deployment.__

Some users prefer to include enhanced security features beyond standard database authentication between the application layer and the database. If you would like to add SSL support, or set up custom firewall rules, you must move to a Dedicated plan. For more information regarding mLab security options, please review our [security documentation][docs-security].




 


 
