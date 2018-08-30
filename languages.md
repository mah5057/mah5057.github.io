---
layout: default-nosearch
title: Language Center
permalink: /languages/
description: mLab provides MongoDB driver examples in many of the major languages like C#, Java, Node.js, PHP, Python, and Ruby
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[minc-drivers]:      https://docs.mongodb.com/{{ page.minc-docversion }}/applications/drivers/
[minc-csharp]:       https://docs.mongodb.com/ecosystem/drivers/csharp/
[minc-java]:         https://docs.mongodb.com/ecosystem/drivers/java/
[minc-nodejs]:       https://docs.mongodb.com/ecosystem/drivers/node-js/
[minc-php]:          https://docs.mongodb.com/ecosystem/drivers/php/
[minc-python]:       https://docs.mongodb.com/ecosystem/drivers/python/
[minc-ruby]:         https://docs.mongodb.com/ecosystem/drivers/ruby/
[mongoid-org]:       http://mongoid.org/en/mongoid/
[blog-mongoose]:     http://blog.mlab.com/2014/04/mongodb-driver-mongoose/
[blog-php]:          http://blog.mlab.com/2014/05/mongodb-driver-tips-tricks-php/
[git-csharp-simple]: https://github.com/mongolab/mongodb-driver-examples/blob/master/c%23/CSharpSimpleExample.cs
[git-java-simple]:   https://github.com/mongolab/mongodb-driver-examples/blob/master/java/JavaSimpleExample.java
[git-nodejs-simple]: https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/nodeSimpleExample.js
[git-nodejs-mongoose]:    https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js
[git-php-simple]:         https://github.com/mongolab/mongodb-driver-examples/blob/master/php/php_simple_example.php
[git-python-production]:  https://github.com/mongolab/mongodb-driver-examples/blob/master/python/pymongo_production_connection_example.py
[git-python-simple]:      https://github.com/mongolab/mongodb-driver-examples/blob/master/python/pymongo_simple_example.py
[git-ruby-simple]:        https://github.com/mongolab/mongodb-driver-examples/blob/master/ruby/ruby-driver/ruby_simple_example.rb
[git-mongoid3-simple]:    https://github.com/mongolab/mongodb-driver-examples/tree/master/ruby/mongoid


# {{ page.title }}
{:.no_toc}

## Overview

mLab is happy to provide driver examples in many of the major languages: C#, Java, Node.js, PHP, Python, and Ruby.

These examples should run outright after you install the appropriate drivers and insert your MongoDB URI. For additional information, [see MongoDB, Inc.'s documentation about MongoDB drivers][minc-drivers]. 

Currently, we illustrate a simple connection with authentication and query examples. If you have suggestions for other types of examples or languages, contact us at <support@mlab.com> to let us know.

## CSharp

The officially supported [C# / .NET driver][minc-csharp] driver for MongoDB:

- [CRUD example][git-csharp-simple]

## Java

The officially supported [Java driver][minc-java] for MongoDB:

- [CRUD example][git-java-simple]

## Node.js

The officially supported [Node.js Native driver][minc-nodejs] for MongoDB:
  
- [CRUD example][git-nodejs-simple]

Mongoose, an Object Document Mapper (ODM) for MongoDB:

- [Mongoose CRUD example][git-nodejs-mongoose]
- [Mongoose Tips & Tricks][blog-mongoose] (from mLab's blog)

## PHP

The officially supported [PHP driver][minc-php] for MongoDB:

- [CRUD example][git-php-simple]
- [PHP Driver Tips & Tricks][blog-php] (from mLab's blog)

## Python

Pymongo, the officially supported [Python driver][minc-python] for MongoDB:

- [CRUD example][git-python-simple]
- [Production connection example][git-python-production]

## Ruby

The officially supported [Ruby driver][minc-ruby] for MongoDB:

- [CRUD example][git-ruby-simple]

[Mongoid][mongoid-org], an Object Document Mapper (ODM) for MongoDB:

- [CRUD example][git-mongoid3-simple]




