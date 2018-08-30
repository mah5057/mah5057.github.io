---
layout: default-nosearch
title: Indexing and Performance
permalink: /indexing/
description: Improve performance of your mLab database by creating indexes. Examine slow queries with mLab's performance monitoring tools.
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-support]:                     mailto:support@mlab.com
[mlab-login]:                       https://mlab.com/login
[docs-telemetry]:                   /monitoring/#telemetry
[docs-dex]:                         /monitoring/#slow-query-analyzer
[docs-logs]:                        /monitoring/#database-log-files
[docs-telemetry-alerts]:            /telemetry-alerts
[docs-realtimedash]:                /monitoring/#real-time-stats
[docs-cluster-restart]:             /ops/#restarts
[docs-backups]:                     /backups
[docs-change-version]:          /ops/#change-version
[docs-removing-indexes]:            /indexing/#removing-unnecessary-indexes
[blog-cardinal-sins]:               http://blog.mlab.com/2012/06/cardinal-ins/
[blog-indexStats]:                  https://blog.mlab.com/2017/01/using-mongodb-indexstats-to-identify-and-remove-unused-indexes
[minc-profiler]:                    https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/manage-the-database-profiler/
[minc-index-single]:                https://docs.mongodb.com/manual/core/index-single/
[minc-index-compound]:              https://docs.mongodb.com/manual/core/index-compound
[minc-index-compound-sort]:         https://docs.mongodb.com/manual/core/index-compound/#sort-order
[minc-index-sort-order]:            https://docs.mongodb.com/manual/tutorial/sort-results-with-indexes/
[minc-prefixes]:                    https://docs.mongodb.com/v3.0/core/index-compound/#prefixes
[minc-index-multikey]:              https://docs.mongodb.com/manual/core/index-multikey/
[minc-index-interrupted]:           https://docs.mongodb.com/manual/core/index-creation/#interrupted-index-builds
[minc-embedded-doc-index]:          https://docs.mongodb.com/manual/core/index-single/#create-an-index-on-embedded-document
[minc-index-geospatial]:            https://docs.mongodb.com/manual/applications/geospatial-indexes/
[minc-sort-method]:                 https://docs.mongodb.com/manual/reference/method/cursor.sort/
[minc-or-clause]:                   https://docs.mongodb.com/manual/reference/operator/query/or/
[minc-index-creation]:              https://docs.mongodb.com/{{ page.minc-docversion }}/core/index-creation/
[minc-index-removal]:               https://docs.mongodb.com/{{ page.minc-docversion }}/reference/method/db.collection.dropIndex/
[minc-get-indexes]:                 https://docs.mongodb.com/{{ page.minc-docversion }}/reference/method/db.collection.getIndexes/
[minc-build-indexes-rs]:            https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/build-indexes-on-replica-sets/
[minc-profiler-overhead]:           https://docs.mongodb.com/{{ page.minc-docversion }}/tutorial/manage-the-database-profiler/#profiler-overhead
[minc-indexintersection]:           https://docs.mongodb.com/manual/core/index-intersection/
[minc-sortmultiple]:                https://docs.mongodb.com/manual/tutorial/sort-results-with-indexes/#sort-on-multiple-fields
[minc-explain-method]:              https://docs.mongodb.com/manual/reference/method/cursor.explain/
[baby-name-stats]:                  http://catalog.data.gov/dataset/baby-names-from-social-security-card-applications-national-level-data
[minc-ObjectId]:                    https://docs.mongodb.com/manual/reference/method/ObjectId/
[minc-ids]:                         https://docs.mongodb.com/manual/indexes/#default-id-index
[minc-embedded-docs]:               https://docs.mongodb.com/v3.2/tutorial/query-documents/#exact-match-on-the-embedded-document
[minc-equality-match]:              https://docs.mongodb.com/v3.2/tutorial/query-documents/#equality-match-on-fields-within-an-embedded-document
[minc-count-definition]:            https://docs.mongodb.com/manual/reference/method/db.collection.count/
[minc-count-index-use]:             https://docs.mongodb.com/manual/reference/method/db.collection.count/#index-use
[minc-where-operator]:              https://docs.mongodb.com/manual/reference/operator/query/where/
[minc-size-operator]:               https://docs.mongodb.com/manual/reference/operator/query/size/
[minc-nor-operator]:                https://docs.mongodb.com/manual/reference/operator/query/nor/
[minc-ne-operator]:                 https://docs.mongodb.com/manual/reference/operator/query/ne/
[minc-not-operator]:                https://docs.mongodb.com/manual/reference/operator/query/not/
[minc-near-operator]:               https://docs.mongodb.com/manual/reference/operator/query/near/
[minc-nearSphere-operator]:         https://docs.mongodb.com/manual/reference/operator/query/nearSphere/
[minc-maxDistance-operator]:        https://docs.mongodb.com/manual/reference/operator/query/maxDistance/
[minc-natural-operator]:            https://docs.mongodb.com/manual/reference/operator/meta/natural/
[minc-limit-operator]:              https://docs.mongodb.com/manual/reference/method/cursor.limit/
[minc-geoWithin-operator]:          https://docs.mongodb.com/manual/reference/operator/query/geoWithin/
[minc-aggregation-pipeline]:        https://docs.mongodb.com/manual/core/aggregation-pipeline/
[minc-geoNear-operator]:            https://docs.mongodb.com/manual/reference/command/geoNear/
[minc-regex-index-use]:             https://docs.mongodb.com/manual/reference/operator/query/regex/#index-use
[minc-case-insensitive-indexes]:    https://docs.mongodb.com/manual/core/index-case-insensitive/
[minc-collation]:                   https://docs.mongodb.com/manual/reference/collation/#collation-document-fields
[minc-skip-operator]:               https://docs.mongodb.com/manual/reference/method/cursor.skip/
[minc-limit-operator]:              https://docs.mongodb.com/manual/reference/method/cursor.limit/
[minc-skip-behavior]:               https://docs.mongodb.com/manual/reference/method/cursor.skip/#using-cursor-skip
[minc-gt-operator]:                 https://docs.mongodb.com/manual/reference/operator/query/gt/
[minc-aggregation-reference]:       https://docs.mongodb.com/manual/reference/aggregation/
[minc-inline-output]:               https://docs.mongodb.com/manual/reference/method/db.collection.mapReduce/#output-inline
[blog-analytics-node]:              https://blog.mlab.com/2016/10/configuring-a-mongodb-replica-set-for-analytics/
[mjira-13732]:                      https://jira.mongodb.org/browse/SERVER-13732
[mjira-13946]:                      https://jira.mongodb.org/browse/SERVER-13946
[mjira-26734]:                      https://jira.mongodb.org/browse/SERVER-26734

{% comment %} IMAGE LINKS {% endcomment %} 
[img-profiler]:      /assets/screenshot-profiler.png
[img-indexes]:       /assets/screenshot-indexes.png
[img-addindex]:      /assets/screenshot-addindex.png

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Indexing fundamentals and considerations {#index-fundamentals}

### The importance of proper indexing {#importance-of-indexing}
{:.no_toc}

This is a change. Indexes in MongoDB are B-tree data structures that dramatically reduce the resource (i.e., RAM, CPU, and I/O) requirements of querying. Proper indexing is critical; even a single unindexed query is enough to cause significant performance degradation.

When a query is not indexed, MongoDB performs a full collection scan, iterating through every single document in the collection to find results. In contrast, an indexed query performs and scales much better because it inspects far fewer documents.

Without sufficient indexing, the hardware costs for a performant database increase significantly. Importantly, because un-indexed queries use more resources than needed, they also impact the performance of other operations--even if those operations are indexed.

### Limiting the number of documents to scan using indexes {#limiting-documents}

#### Single-field indexes
{:.no_toc}

A query like `{"name": "Adam"}` may seem straightforward, but if it's not indexed, it could perform quite badly (the larger the collection, the worse the query will perform).

Rather than examining all the documents in a collection, create a [Single Field Index][minc-index-single] on this "name" field:

    db.collection.createIndex( {“name”: 1} )

Now, no matter how large the collection, only documents matching `{"name": "Adam"}` will enter into memory.

#### Compound indexes
{:.no_toc}

When a query includes multiple filters, it is best to include all filters in a compound index. For example, `{"name": "Adam", "year": {"$gte": 2016}}` can use the following [Compound Index][minc-index-compound]:

    db.collection.createIndex( {“name”: 1, "year": 1} )
    
This is preferable to a `{"year": 1, "name": 1}` index because an equivalency check on "name" is more selective than a range check on "year".

### Sorting efficiently using indexes {#sorting-efficiently}

The [sort() method][minc-sort-method] returns documents in the requested ascending (1) or descending (-1) sort order. For example, the results of `.sort( {"lastName":1} )` are in ascending, alphabetical order.

For a query with sort that isn't covered by an index, MongoDB sorts results at query time, using precious CPU time and delaying the response to the app.

However, if that same query is covered by an index which includes, in proper order, all fields used to filter and sort the result set, MongoDB does not sort results at query time. Instead, results are already sorted in the index and can be returned immediately.

#### Determining the order of fields
{:.no_toc}

A good rule of thumb for queries with sort is to order the indexed fields in this order:

* First, the field(s) on which you will query for exact values
* Second, one small `$in` array
* Third, the field(s) on which you will sort in the same order and specification as the sort itself ([sorting on multiple fields][minc-sortmultiple])
* Finally, the field(s) on which you will query for a range of values in the order of most selective to least selective (see range operators below)

The reason one `$in` filter can precede sort fields is because MongoDB can break the query up according to that `$in` and merge sort the results.

An example of using this rule of thumb is in the section on “Sorting the results of a complex query on a range of values” below, including a link to further reading. Note that these ordering recommendations are good for most use-cases but may not be the best for your data. The best index in a given scenario is determined through testing [using .explain][minc-explain-method].

##### Range operators
{:.no_toc}

Query fields(s) which use the following operators should generally be included after the field(s) on which you will sort:

* `$in`, `$nin`
* `$gt`, `$gte`, `$lt`, `$lte`
* `$ne`
* `$regex`
* `$exists:true` (note that `$exists:false` is not considered a range operator for sorting purposes)


#### Determining sort orders
{:.no_toc}

MongoDB can traverse an index in either direction. The `{"lastName":1}` index therefore satisfies both `.sort( {"lastName":1} )` and `.sort( {"lastName":-1} )`. Therefore, for single-field indexes, the sort order of keys does not matter.

However, for compound indexes, sort order can matter in determining whether the index can support a sort operation; the combination of index field order and each field's sort order determines whether the index can support a sort operation.

If you are using sort() with compound indexes, more information can be found in the ["Sort Order" section of MongoDB's documentation on Compound Indexes][minc-index-compound-sort].

#### Sorting the results of a simple query on an exact value
{:.no_toc}

__Example of an exact value query with sort__

	db.collection.find( {"firstName": 1} ).sort( {"lastName": 1} )

__Recommended index for this query__

	{"firstName": 1, "lastName": 1}

As described in [MongoDB's documentation on using indexes to sort query results][minc-index-sort-order], an index with the sort direction reversed on all fields would work as well:

	{"firstName": -1, "lastName": -1}

#### Sorting the results of a complex query on a range of values
{:.no_toc}

Sorting a query result with an index is not always straightforward. Consider the following query on a collection that contains baby name statistics per year by gender.

{:.note-box}
<div markdown="1">

We created this example using a publicly available dataset of baby names from US Social Security Card Applications. Here’s an sample document:

{% highlight text %}
{
	"_id" : ObjectId("577462ff0d1d34fcb64ba7d4"),
	"year" : 1880,
	"name" : "John",
	"sex" : "F",
	"count" : 46
}
{% endhighlight %}

This data is available at Data.gov under [Baby Names from Social Security Card Applications-National Level Data][baby-name-stats] if you would like to test these behaviors on your own. If you'd like to view database server log lines, use the “Logs” tab to access them (for-pay plans only).

</div>
{:.note-box}

__Example of a range query with sort__

     db.names.find( {"sex": "M", "count": {"$gt": 10000}} ).sort( {"year": 1} )

__Non-optimal index for this query__

     {"sex": 1, "count": 1, "year": 1} 

__Resulting log message when using non-optimal index__

{% highlight text %}
2016-08-05T11:37:10.140-0700 I QUERY    [conn39] query data.names query: { query: { sex: "M", count: { $gt: 10000 } }, orderby: { year: 1 } } planSummary: IXSCAN { sex: 1.0, count: 1.0, year: 1.0 } ntoreturn:10000 ntoskip:0 nscanned:6480 nscannedObjects:6480 scanAndOrder:1 keyUpdates:0 writeConflicts:0 numYields:101 nreturned:3240 reslen:229840 locks:{ Global: { acquireCount: { r: 204} }, MMAPV1Journal: { acquireCount: { r: 102 } }, Database: { acquireCount: { r: 102 } }, Collection: { acquireCount: { R: 102 } } } 38ms
{% endhighlight %}

Even though the query is using an index that includes the sort field, the `scanAndOrder: 1` is evidence that an in-memory sort took place. This is because of the range criteria on count and the structure of the index. To avoid scanAndOrder in these situations, place sort fields before range fields in the index.

__Recommended index for this query__

     {"sex": 1, "year": 1, "count": 1} 

__Resulting log message when using recommended index__

{% highlight text %}
2016-08-05T11:38:21.780-0700 I QUERY    [conn39] query data.names query: { query: { sex: "M", count: { $gt: 10000 } }, orderby: { year: 1 } } planSummary: IXSCAN { sex: 1.0, year: 1.0, count: 1.0 } ntoreturn:10000 ntoskip:0 nscanned:3376 nscannedObjects:3240 keyUpdates:0 writeConflicts:0 numYields:29 nreturned:3240 reslen:229840 locks:{ Global: { acquireCount: { r: 60 } }, MMAPV1Journal: { acquireCount: { r: 30 } }, Database: { acquireCount: { r: 30 } }, Collection: { acquireCount: { R: 30 } } } 9ms
{% endhighlight %}

The omission of `“scanAndOrder:1”` confirms that the query is completed without an in-memory sort.

To better understand the log lines above, read the next section below. Further reading on this topic of sorting the results of complex queries is available at our blog post on [sorting the results of queries on ranges][blog-cardinal-sins].

### Performing efficient $or queries {#performing-efficient-or-queries}

In general, index for [$or][minc-or-clause] queries as though each `$or` clause was its own query. Be sure to consider the sort clause as part of each `$or` clause.

__Example $or query__

    db.names.find( {"$or": [ {"firstName": "Linda"}, {"middleName": "Linda"} ]} ).sort( {"count": -1} )
    
__Recommended indexes for this query__

    {"firstName": 1, "count": 1}
    {"middleName": 1, "count": 1}

#### SERVER-13732
{:.no_toc}

Certain `$or` queries are affected by a known bug, [SERVER-13732][mjira-13732], which prevents efficient index selection. To avoid this bug when composing `$or` queries, either [upgrade to MongoDB 3.6][docs-change-version] or ensure that `$or` is the only top-level field in the query. For example:

__Example of an $or query affected by SERVER-13732__

    db.names.find( {"year": 1972, "$or": [ {"name": "Eric", "sex": "M"}, {"name": "Erica", "sex": "F"} ]} ).sort( {"count": -1} )

__Example of an $or query not affected by SERVER-13732__

    db.names.find( {"$or": [ {"year": 1972, "name": "Eric", "sex": "M"}, {"year": 1972, "name": "Erica", "sex": "F"} ]} ).sort( {"count": -1} )
    
__Recommended index for this query__

Since both of these `$or` clauses use the same query filters, each clause can use the same index:

    {"year": 1, "name": 1, "sex": 1, "count": -1}

### Comparing a log line for an unindexed query vs. an indexed one {#comparing-log-lines}

This example uses the same baby name statistics data as above and compares two log lines for the same query.

The first operation takes almost 2 seconds because it does not use an index, but the second takes 1 millisecond with an index. The key
differences between these log messages lie in the `planSummary`,`nscannedObjects`, and `scanAndOrder` values.

{:.note-box}
<div markdown="1">

Starting in MongoDB 3.2, the following key words in MongoDB log lines changed:

* `scanAndOrder` ---> `hasSortStage`
* `nscanned` ---> `keysExamined` 
* `nscannedObjects` ---> `docsExamined`

</div>
{:.note-box}

__Example query with sort__

We want to find the number of babies named "Arya" each year in ascending year order. Our database query is:

    db.names.find( {"name": "Arya"} ).sort( {"year": 1} )

__Resulting log message when unindexed__

{% highlight text %}
2016-06-30T12:21:05.153-0700 I QUERY    [conn120] query data.names query: { query: { name: "Arya" }, orderby: { year: 1.0 } } planSummary: COLLSCAN ntoreturn:0 ntoskip:0 nscanned:0 nscannedObjects:1858689 scanAndOrder:1 keyUpdates:0 writeConflicts:0 numYields:14562 nreturned:58 reslen:4022 locks:{ Global: { acquireCount: { r: 29126 } }, MMAPV1Journal: { acquireCount: { r: 14563 } }, Database: { acquireCount: { r: 14563 } }, Collection: { acquireCount: { R: 14563 } } } 1795ms
{% endhighlight %}


The following information observed in the log line above shows a lot of room for improvement:

* __planSummary__: The `planSummary: COLLSCAN` shows the database did not use an index and instead performed a full collection scan. 

* __nscannedObjects__: The `nscannedObjects:1858689` shows the number of documents inspected. By comparing this to the number of returned documents (`nreturned:58`), we see how inefficient the query is. To return 58 documents, the database brought almost two million documents into memory. Note that in MongoDB 3.2+ this would look like `docsExamined:1858689`.

* __scanAndOrder__: The `scanAndOrder:1` shows that the results were sorted in memory after the data was retrieved. Note that in MongoDB 3.2+ this would look like `hasSortStage:1`.

__Recommended index__

We can improve performance by:

- Reducing the number of documents being inspected in memory
- Removing the need to perform in-memory sorts

We now build the following index:

     {"name": 1, "year": 1}

__Resulting log message when using recommended index__

Once the index is created, the query runs orders of magnitude faster:

{% highlight text %}
2016-06-30T12:21:24.883-0700 I QUERY    [conn120] query data.names query: { query: { name: "Arya" }, orderby: { year: 1.0 } } planSummary: IXSCAN { name: 1.0, year: 1.0 } ntoreturn:0 ntoskip:0 nscanned:58 nscannedObjects:58 keyUpdates:0 writeConflicts:0 numYields:0 nreturned:58 reslen:4022 locks:{ Global: { acquireCount: { r: 2 } }, MMAPV1Journal: { acquireCount: { r: 1 } }, Database: { acquireCount: { r: 1 } }, Collection: { acquireCount: { R: 1 } } } 1ms
{% endhighlight %}

The following information observed in the log line above shows an efficient query:

* __planSummary__: The `planSummary: IXSCAN { name: 1.0, year: 1.0 }` indicates what index was used for the query.

*  __nscannedObjects__: The `nscannedObjects:58` shows that only 58 documents were inspected. Because this number matches the number of documents in the result set (nreturned:58), the query is very efficient. Note that in MongoDB 3.2+ this would look like `docsExamined:58`.

* __scanAndOrder__: The omission of `scanAndOrder:1` means results were not sorted in memory; the index allowed documents to be read in the requested order. Note that the omission of `hasSortStage:1` in MongoDB 3.2+ means the same thing.

Results were not sorted in memory, and the number of documents inspected is equal to the number of documents returned. This is an efficient query.

### Further reading

One of MongoDB’s strengths is its flexible data model. Flexible data modeling is powerful, but dangerous without proper indexing. If your data contains complex fields such as arrays, embedded documents, or geospatial data, read the following for important information about index behavior:

* [Indexing arrays using Multikey Indexes][minc-index-multikey]
* [Indexing embedded documents][minc-embedded-doc-index]
* [Geospatial indexes][minc-index-geospatial]

## Special indexing considerations

### Avoid operators/modifiers that can never use indexes {#avoiding-operators-and-modifiers-that-cannot-use-indexes}
{:.no_toc}

We recommend against using the below operators and modifiers that cannot use indexes.

#### $where operator
{:.no_toc}

[$where][minc-where-operator] does not use indexes and instead uses the server-side JavaScript engine to examine documents in memory. Importantly, the `$where` operator is usually only necessary to evaluate field values against each other. When applying conditions on field values independently, use the MongoDB query language instead. 

The following two examples illustrate how the `$where` operator can be re-written as a query.

__Example 1__

    db.collection.find( {"$where": "this.count >= 5"} )

    db.collection.find( {"count": {"$gte": 5}} )

__Example 2__

    db.collection.find( {"$where": "this.make=='BMW' && this.model=='M3'"} )

    db.collection.find( {"make": "BMW", "model": "M3"} )

Sometimes it's not possible to replace a `$where` with a query but it is possible using MongoDB's [aggregation framework][minc-aggregation-pipeline]. For example, `db.collection.find( {"$where": "this.count >= this.maxCount"} )` cannot be rewritten using a MongoDB query but it can be evaluated using MongoDB's aggregation framework.

If you absolutely must use `$where`, limit the number of documents evaluated to a very small number using standard query operators with supporting indexes.

#### $size operator
{:.no_toc}

[$size][minc-size-operator] does not use indexes and instead must examine documents in memory to count the number of elements in embedded arrays. If you must use `$size`, limit the number of documents evaluated to a very small number using standard query operators with supporting indexes.

#### $nor operator
{:.no_toc}

[$nor][minc-nor-operator] will always perform a collection scan (i.e., examine every document in a collection), so the performance impact is based on the size of the collection. If at all possible, try and avoid the `$nor` operator so your query patterns can properly use indexes. Below are two examples of how the `$nor` operator can be re-written.
 
The `$nor` operator can sometimes be re-written using the [$ne][minc-ne-operator] operator:
 
    db.collection.find( {"$nor": [ {"a": 1}, {"b": 1} ]} )
 
    db.collection.find( {"a": {"$ne": 1}, "b": {"$ne": 1}} )
 
The `$nor` operator can also sometimes be re-written using the [$not][minc-not-operator] operator:
 
    db.collection.find( {"$nor": [ {"a": {"$gt": 1}}, {"b": {"$gt": 1}} ]} )
 
    db.collection.find( {"$and": [ {"a": {"$not": {"$gt": 1}}}, {"b": {"$not": {"$gt": 1}}} ]} )
 
 When refactoring queries, be sure to test that query results are as expected and logically correct for your application.

#### $natural modifier
{:.no_toc}

Sorting by [$natural][minc-natural-operator] does not use indexes and instead forces a collection scan, even if a query filter is provided. 

If you must use `$natural`, also use a small [limit][minc-limit-operator] value to keep the number of documents scanned to a minimum. Alternatively, size your cluster to ensure that the queried collection can be part of the working set without disrupting database performance.

### Count operations can use more memory than expected {#count-operations}
{:.no_toc}

A [count operation][minc-count-definition] can use an index for selective conditions just like a query can, but note that it will need to scan documents if the query filter is not fully selective, or if it does not target a single continuous range of index keys (e.g., it has an `$in` clause).

Consider a collection with the following index:

    {"students": 1, "grade": 1}

The first three count operation examples that follow will need to examine documents in addition to using the index:

Example 1: 

    db.collection.find( {"students": 4, "grade": {"$in": [ 1, 2, 6 ]}} ).count()

This count operation does not target a single continuous range of index keys with the `$in` clause.

Example 2:

    db.collection.find( {"students": {"$gt": 4}, "grade": 4} ).count()

This count operation will need to examine documents in addition to using the index. Keys for `grade: 4` are not contiguous; they are separated by different `students` values because `students` occurs in the index before grade.

Example 3:

    db.collection.find( {"students": 4, "grade": 4, "age": 10} ).count()

The `{ "students": 1, "grade": 1 }` index does not include the age field, so it is not fully selective for this query.

Example 4:

    db.collection.find( {"students": 4, "grade": {"$gt": 4}} ).count()

In contrast to the first three examples above, this count operation is optimal in that it will use only the index. 

For more information, we recommend [MongoDB's documentation on counts and index use][minc-count-index-use].

### Avoid using a sort with geospatial $near queries {#avoiding-sorts-with-near-operator}
{:.no_toc}

Geospatial [$near][minc-near-operator], [$nearSphere][minc-nearSphere-operator], and [$geoNear][minc-geoNear-operator] operators automatically return results in order (sorted by distance from the point specified). Providing an additional sort with the `$near` or `$nearSphere` operator will perform more work than necessary. 

If your use case requires finding points within an area that are either not sorted or sorted by criteria other than distance from a central point, use the [$geoWithin][minc-geoWithin-operator] operator instead.

### Use the $maxDistance operator with geospatial queries {#maxDistance-operator}
{:.no_toc}

Geospatial [$near][minc-near-operator], [$nearSphere][minc-nearSphere-operator], and [$geoNear][minc-geoNear-operator] queries should take advantage of the optional [$maxDistance][minc-maxDistance-operator] operator wherever possible. By limiting the distance considered, you can avoid excess use of CPU and memory. 

Provide a `$maxDistance` value that is appropriate for your use case, both in terms of the distance to cover and the number of results that should be considered.

### Using embedded documents as _id values {#embedded-documents-as-ids}
{:.no_toc}

Embedded document _ids allow you to encode complex values that aren't
included in the default [ObjectId][minc-ObjectId]-based _ids generated by MongoDB and MongoDB drivers. However, we recommend using an ObjectId whenever possible.

If you must use embedded documents as _ids, there are important considerations to be aware of:

* The dynamic embedded document data type is less efficient than the default ObjectId data type.
* [Querying on embedded documents require an exact match][minc-embedded-docs] so order will matter when querying on an embedded document.
* Dot notation must be used to [match by specific fields in an embedded document][minc-equality-match] and indexes other than the _id index are required to query efficiently in this way.

{:.note-box}
<div markdown="1">

mLab's management portal does not support embedded document _ids when viewing single documents. 

</div>
{:.note-box}

### Regexes scan large numbers of index entries {#regex-performance}
{:.no_toc}

The degree to which regex operations benefit from indexes varies based on how the regex is composed. 

The following example uses a case-insensitive regex, which scans a large number of index entries:

    db.collection.find( {"username": {"$regex": "John", "$options": "i"}} )

We can improve the performance of the above regex operation in three different ways.

__1) Case-sensitive prefix expression__

To keep the number of index entries scanned to a minimum, you can make use of a [case-sensitive, prefix expression][minc-regex-index-use]. We make the regex case-sensitive by dropping the case insensitive modifier `i` at the end of the regex, and make the operation a prefix expression by adding a caret `^` to the beginning of the regex.

Thus, the following case-sensitive, _prefix expression_ scans a limited number of index entries:

    db.collection.find( {"username": {"$regex": "^John"}} )

__2) Storing a lowercase version of a field__

In some cases, regexes can be avoided by adding a lowercase version of the field to each document and performing an equivalency check on that field. For example: 

    {
        "username" : "John.Smith@email.com",
        "lowerUsername" : "john.smith@email.com"
    }

The addition of a lowercase field removes the need for a case-insensitive regex for the following query:

    db.collection.find( {"lowerUsername" : "john.smith@email.com"} ) 

__3) Avoid regexes entirely by creating a case insensitive index__

New in MongoDB 3.4 are [case insensitive indexes][minc-case-insensitive-indexes], which use [collation][minc-collation] to set language-specific rules regarding string comparison and letter case:

    db.collection.createIndex( {"username": 1}, {"collation": {"locale": "en", "strength": 2}} )

To use the case insensitive index, queries must specify the same collation options used during index creation:

    db.collection.find( {"username": "John.Smith@email.com"} ).collation( {"locale": "en", "strength": 2} )

This query returns "John.Smith@email.com", "john.smith@email.com", "JohN.SmitH@EmaiL.CoM" and all other letter cases.

### How to paginate efficiently {#paginating-efficiently}
{:.no_toc}

The [skip()][minc-skip-operator] and [limit()][minc-limit-operator] methods are often used together to support pagination. However, per this explanation of [skip behavior][minc-skip-behavior], MongoDB must load all skipped documents into memory. As such, the memory and CPU cost of large skip operations is equivalent to querying for __all__ skipped documents. See [https://jira.mongodb.org/browse/SERVER-13946][mjira-13946] for more detail.

Even if indexed, the following query scans 100 index keys before returning the "eleventh page" of results:

    db.books.find( {"genre": "fiction"} ).orderby( {"createdDate": 1} ).skip(100).limit(10)

Improve the performance of this operation by querying on a field that is appropriate for the list being rendered. This strategy is very useful when an app provides a "Next Page" option but does not allow users to skip to arbitrary pages.

The query above can then be amended to use the [$gt operator][minc-gt-operator] to find documents from any point within a collection without the use of skip(). 

    db.books.find( {"genre": "fiction", "createdDate": {"$gt": ISODate("2017-07-31T21:38:28.968Z")}} ).limit(10).orderby( {"createdDate": 1} )

To retrieve the first page of results, use the orderby clause but omit the filter on "createdDate". For each subsequent page, use the last value of the current page in a `$gt` (if ascending sort order) or `$lt` (if descending sort order) filter.

### Avoid map-reduce if possible {#map-reduce}
{:.no_toc}

Map-reduce can artificially constrain resources by using the JavaScript engine in a way that can prevent other database operations from acquiring the locks they need. Often map-reduce jobs can be converted to [aggregation framework operations][minc-aggregation-reference], which are less disruptive to database performance.

If map-reduce jobs cannot be converted to well-indexed aggregation pipelines, try to execute map-reduce jobs at low frequency or consider [adding an analytics node][blog-analytics-node] to the cluster for [map-reduce jobs that output inline][minc-inline-output].

Note that even indexed map-reduce and aggregation framework operations are more CPU and memory intensive than normal queries. For the best use of either of these MongoDB features, consider an mLab plan that includes multiple CPU cores.

## Index management {#index-management}

### Viewing existing indexes {#viewing-indexes}

To view existing indexes for a particular collection, follow these steps:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment with the database whose indexes you want to view.
   - If necessary, navigate to the desired database after navigating to the deployment.
1. Navigate to a collection to view its indexes.
1. Click the "Indexes" tab to display all indexes created for the collection.
![img-indexes][img-indexes]

Alternately, you can use the [`db.collection.getIndexes()`][minc-get-indexes] method via the mongo shell to view all indexes for a particular collection. 

### Creating a new index {#creating-indexes}

#### Best practices when creating indexes
{:.no_toc}

The process of creating an index can require a lot of system resources and can be long-running (hours if not days).

If uptime and performance are important for your application:

- Build the index during a low traffic time.
- Avoid simultaneous index builds (our management portal attempts to enforce this)
- Build the index in the background (our management portal does this by default; see next section).

To check on the progress of a long-running index build visit the "Tools" tab and click on the "Manage current operations" button.

{:.warning-box}
<div markdown="1">
Index builds take significantly longer when there is insufficient RAM. In particular, if the index you're building is close to or exceeds the RAM available, it could be impossible to build the index within a reasonable amount of time.
</div>
{:.warning-box}

#### Background vs. foreground index builds
{:.no_toc}

Always consider whether you want to build your indexes in the background or foreground. While building them in the foreground is faster, a foreground build blocks all other operations to the database. On a production system, you almost always want to build your indexes in the background to minimally impact your live database.

If you [build your index via the mLab management portal](#add-index-via-mlab-portal), it will always be built in the background. If you [build your index via the mongo shell][minc-index-creation] or your driver, include the `{"background": true}` option to create the index in the background. If it is not specified, the index will be created in the foreground by default.

    db.collection.createIndex( {"fieldName": 1}, {"background": true} )

#### Creating an index through the mLab management portal {#add-index-via-mlab-portal}
{:.no_toc}

Simple, compound, and geospatial indexes can all be created through the mLab management portal. To add an index for a specific collection:

1. [Log in][mlab-login] to the mLab management portal.
1. From your account's Home page, navigate to the deployment with the database where an index will be added.
   - If necessary, navigate to the desired database after navigating to the deployment.
1. Navigate to the collection where the index(es) will be added.
1. Click the "Indexes" tab.
1. Click the "Add" button to open the "Add new index" window. 
![img-addindex][img-addindex] 
1. Add your index in the editor window. 
1. Adjust the options and custom name if desired. Note that custom names are not required; it is usually best to let MongoDB auto-generate a name.
1. Click "Create in background" to build your index.

Alternately, you can use the [`db.collection.createIndex()`][minc-index-creation] method via the mongo shell to add an index to your collection. If you would like for your deployment to remain available during the index building operation, specify (`{"background": true}`). Indexes created through mLab's management portal are always built in the background.

### Killing a running index creation operation {#killing-index-creation}

It's possible you may find yourself in the position where you want to kill an in-progress index build for one or both of the following reasons:

* Accidentally created the wrong one or one that you no longer want
* Performance impact is too great

In this case, you can kill the operation but be sure to proceed with caution. Killing a running index creation operation will often lead to replica sets with members having different sets of indexes as well as other unexpected issues. 

Therefore, unless database performance has degraded to an emergency state, we strongly encourage you to allow the index build to complete and then optionally remove it once it's done building.

{:.warning-box}
<div markdown="1">
Restarting the deployment to kill an index build won't stop the index build and remove the index as you would expect. Instead, the process will start up again in an offline mode and build the index in the foreground as described in [MongoDB's documentation on interrupted index builds][minc-index-interrupted]. This can lead to a loss of high availability or possibly downtime.
</div>
{:.warning-box}

### Identifying and removing unnecessary indexes

#### Overview
{:.no_toc}

While it is very important that all queries are indexed, updating indexes slows the speed of inserts and updates. As such, unnecessary indexes may cause unnecessary use of CPU and RAM. 

This section details how to [identify redundant indexes](#identifying-redundant-indexes) and [identify indexes that aren't being used](#identifying-unused-indexes).

{:.warning-box}
<div markdown="1">
Be sure to review the checklist in the ["Removing indexes"](#removing-indexes) section below before dropping any indexes!
</div>
{:.warning-box}

#### Identifying redundant indexes
{:.no_toc}

An index may be redundant if it is:

* A [prefix][minc-prefixes] of another compound index
* Identical to another index with a similar [sort order][minc-index-sort-order] 

In summary, an index on `{"name": 1, "year": -1}` supports:

* Queries on "name"
* Sorts on `{"name": 1, "year": -1}` and `{"name": -1,"year": 1}` 

However, that index does **not** support:

* Queries on "year"
* Sorts on `{"name": -1,"year": -1}` and `{"name": 1, "year": 1}`


##### Redundant simple indexes
{:.no_toc}

__Example simple index__

    {"year": 1}

__Example redundant index of the above index__

The following index may be dropped if the above index exists:

    {"year": -1}
    
##### Redundant compound indexes
{:.no_toc}

__Example compound index__

    {"year": 1, "name": 1, "count": 1}

__Example redundant indexes of the above index__

Depending on the sort clauses applied to queries, the following indexes may be redundant with the above index:

	{"year": -1, "name": -1, "count": -1}
    {"year": 1, "name": 1}
    {"year": -1, "name": -1}
    {"year": 1}
    {"year": -1}

{:.warning-box}
<div markdown="1">
Be particularly careful if you are using unique, sparse, and/or partial indexes.
</div>
{:.warning-box}


#### Identifying unused indexes 
{:.no_toc}

Similar to redundant indexes, unused indexes impact write performance and consume valuable resources. Periodic index review and maintenance is recommended to ensure good database performance.

On MongoDB versions prior to 3.2, manual inspection and consideration is necessary to infer unused indexes.

For MongoDB version 3.2[^foot-text], we recommend using the `$indexStats` operator. Guidance on how to use this operator is available on our blog post: [Using MongoDB $indexStats to identify and remove unused indexes][blog-indexStats].

[^foot-text]: The `$indexStats` operator will be available on Sandbox and Shared plans once the fix for [SERVER-26734][mjira-26734] is available for supported versions.

#### Removing unnecessary indexes {#removing-indexes}
{:.no_toc}

##### Proceed with caution
{:.no_toc}

As with all delete operations on the database, always err on the side of caution when removing an index. For example:

* Do not drop an index if there is any uncertainty surrounding its use. 
* Accidentally removing a necessary index can result in significant performance degradation. 
* Closely monitor database performance immediately after making index changes.

In addition, here are some checks to perform before removing an unused index:

* Are there infrequent operations which require the index that you're not thinking of?
* Are there query patterns that are failing to use the index even though you intend them to be?
* Are there plans to use the index in the near future?

If after reviewing these considerations you have questions about specific indexes, email <support@mlab.com> for guidance.

##### Dropping an index through the mLab management portal
{:.no_toc}

To drop an index for a specific collection:

1. [Log in][mlab-login] to the mLab management portal. 
1. From your account's Home page, navigate to the deployment with the database where an index will be removed.
   - If necessary, navigate to the desired database after navigating to the deployment.
1. Navigate to the collection where the index(es) will be removed.
1. Click the "Indexes" tab.
1. Click the delete button (a trash can) that appears at the end of the row for the index that you want to delete.

Alternately, you can use the [`db.collection.dropIndex(<index name>)`][minc-index-removal] method via the mongo shell to drop an index from your collection. 

### Managing indexes across environments {#managing-indexes}

There are many ways to manage the process by which indexes are created and defined in your various environments and MongoDB deployments. Therefore you should carefully consider how you manage this process.

For databases that have gone into production, we recommend that you build your indexes in the background and at times that make the most sense for your app (e.g., during off-peak activity times). You can then maintain a separate script of `createIndex` calls to ensure these indexes are built in your development and staging environments as well.

If you decide to put `createIndex` calls in your code, they should be called when your application initializes. However, if you go this route you must be careful about how this fits with your architecture and your deployment processes or else you might end up with indexes being built at unplanned (and undesirable) times.



## Performance analysis {#performance-analysis}

### Key performance tools {#key-performance-tools}

*Not available for Sandbox databases*

* Use [mLab Telemetry][docs-telemetry] to view real-time and historical statistics of key MongoDB metrics.
* View all operations taking over 100 milliseconds by [streaming the database server logs][docs-logs].
* Use [mLab Slow Query Analyzer][docs-dex] to view an aggregated report of slow queries and our automated index recommendations.

### Indicators of poor performance / Assessing headroom {#performance-indicators}

We will be augmenting this portion of our documentation in the coming weeks. In the meantime, contact [support@mlab.com][mlab-support] if you would like advice in this area.
