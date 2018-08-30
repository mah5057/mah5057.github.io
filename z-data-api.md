---
layout: default-nosearch
title: mLab Data API
permalink: /data-api/
description: Documentation for mLab RESTful Data API
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-login]:        https://mlab.com/login
[docs-drivers]:      /connecting/#drivers
[minc-operators]:    http://docs.mongodb.com/{{ page.minc-docversion }}/reference/operator/
[jquery-ajax]:       http://api.jquery.com/jQuery.ajax/
[minc-updates]:      http://docs.mongodb.com/{{ page.minc-docversion }}/core/write-operations-introduction/#write-op-update
[minc-json]:         http://docs.mongodb.com/{{ page.minc-docversion }}/reference/mongodb-extended-json/
[minc-jsondate]:     http://docs.mongodb.com/{{ page.minc-docversion }}/reference/mongodb-extended-json/#date
[curl-manual]:       http://curl.haxx.se/docs/manual.html
[w3c-codes]:         http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
[w3c-text]:          http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.7.1
[goog-datejs]:       http://code.google.com/p/datejs/wiki/APIDocumentation#toISOString


{% comment %} IMAGE LINKS {% endcomment %} 
[img-apikey]:            /assets/screenshot-apikey.png
[img-apikeydisabled]:    /assets/screenshot-apikeydisabled.png


# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Overview {#overview}

mLab databases can be accessed by applications in two ways. 

The first method---the one we __strongly__ recommend whenever possible for added performance and functionality---is to connect using one of the [available MongoDB drivers][docs-drivers]. You do not need to use our API if you use the driver.

The second method, documented in this article, is to connect via mLab's RESTful Data API. __Use this method only if you cannot connect using a MongoDB driver__.

Each mLab account comes with a Data API (disabled by default) that can be used to access the databases, collections and documents belonging to that account. The API exposes most of the operations you would find in the MongoDB driver, but offers them as a RESTful interface over HTTPS.

Furthermore, each user of an account has his own API key that can be used to access the API. Users can view or reset their API keys through the management portal and Admin users can also view or reset API keys for all users of an account.


## API Authentication {#authentication}

Each API request must pass an `apiKey` query parameter. By default, access to the Data API is disabled and must be enabled before you can obtain your API key. 

Follow these steps to enable Data API access and obtain your API key:

1. [Log in][mlab-login] to the mLab management portal. 
1. Click your username (not the account name) in the upper right-hand corner to open your account user profile.
   - If you are already in the Account Settings page, then click on the row with your username in the Account Users section. 
1. If the status is showing as "Data API Access: Disabled" in the "API Key" section, click the "Enable Data API access" button.
1. Once Data API access is enabled, your current API key will be displayed in the "API key" field.
![img-apikey][img-apikey]{:.narrow}
1. (Optional) If you want to update the current key, click the "Regenerate API key" button. 



{:.warning-box}
<div markdown="1">
Your API key will give full access to all data within the databases belonging to your mLab account. If you distribute it to untrusted individuals, they can gain access to your account and your data.

We have seen customers distribute mobile and AJAX-based web applications to their end users. Doing this will expose your account to attack. Such clients are appropriate only when you can control their distribution to just mLab account users.
</div>
{:.warning-box}


Here's an example of a complete Resource URL:

    https://api.mlab.com/api/1/databases?apiKey=2E81PUmPFI84t7UIc_5YdldAp1ruUPKye

## Base URL Path {#base-url}

All API paths listed below are relative to the following base URL path:

    Fixed portion of the Resource URL:
    https://api.mlab.com/api/1


## API Reference                           {#reference}

Please note that mLab’s Data API uses [MongoDB Extended JSON in strict mode][minc-json] to encode queries and documents.

### List databases                          {#list-databases}
To get the databases linked to the authenticated account:

    GET /databases

    Example:
    https://api.mlab.com/api/1/databases?apiKey=myAPIKey

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

To get all the databases for a cluster linked to the authenticated account:

	GET /clusters/{cluster}/databases

	Example:
	https://api.mlab.com/api/1/clusters/cluster-id/databases?apiKey=myAPIKey

    Where "cluster-id" is in the form of "rs-<cluster>" (e.g., rs-ds012345)

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

### List collections                          {#list-collections}
To get the collections in the specified database: 

    GET /databases/{database}/collections

    Example:
    https://api.mlab.com/api/1/databases/my-db/collections?apiKey=myAPIKey

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

 
### List documents                          {#list-documents}
To get the documents in the specified collection. If no parameters are passed, it lists all of them. Otherwise, it lists the documents in the collection matching the specified parameters:

    GET /databases/{database}/collections/{collection}

    Example listing all documents in a given collection:
    https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey

    Optional parameters
    [q=<query>][&c=true][&f=<fields>][&fo=true][&s=<order>][&sk=<skip>][&l=<limit>]

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


Optional parameters ([MongoDB reference][minc-operators]):

- `q=<query>` - restrict results by the specified JSON query
- `c=true` - return the result count for this query
- `f=<set of fields>` - specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
- `fo=true` - return a single document from the result set (same as findOne() using the mongo shell
- `s=<sort order>` - specify the order in which to sort each specified field (1- ascending; -1 - descending)
- `sk=<num results to skip>` - specify the number of results to skip in the result set; useful for paging
- `l=<limit>` - specify the limit for the number of results (default is 1000)  

Examples using these parameters:

	"q" example - return all documents with "active" field of true:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&apiKey=myAPIKey

	"c" example - return the count of documents with "active" of true:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&c=true&apiKey=myAPIKey

	"f" example (include) - return all documents but include only the "firstName" and "lastName" fields:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?f={"firstName": 1, "lastName": 1}&apiKey=myAPIKey

	"f" example (exclude) - return all documents but exclude the "notes" field:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?f={"notes": 0}&apiKey=myAPIKey

	"fo" example - return a single document matching "active" field of true:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&fo=true&apiKey=myAPIKey

	"s" example - return all documents sorted by "priority" ascending and "difficulty" descending:
	 https://api.mlab.com/api/1/databases/my-db/collections/my-coll?s={"priority": 1, "difficulty": -1}&apiKey=myAPIKey

	"sk" and "l" example - sort by "name" ascending and return 10 documents after skipping 20
	 https://api.mlab.com/api/1/databases/my-db/collections/my-coll?s={"name":1}&sk=20&l=10&apiKey=myAPIKey

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

Date example using [extended json format with ISO-8601 date format][minc-jsondate]:

	https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"date": {"$gt": {"$date": "2017-07-20T23:23:50Z"}, "$lt": {"$date": "2017-08-20T23:23:50Z"}}}&apiKey=myAPIKey

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


### Create collection {#create-collection}

To create a new collection, just start using it!  Just like using a standard driver or the shell, collections are created implicitly just by using them. As soon as you POST your first document you should see the collection appear.

### Insert document {#insert-document}

To create a new document in the specified collection:
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>

	POST /databases/{database}/collections/{collection}
	Content-Type: application/json
	Body: <JSON data>

	Example (using jQuery):

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
			  data: JSON.stringify( { "x" : 1 } ),
			  type: "POST",
			  contentType: "application/json" } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

If you POST a document that contains an `_id` field, the effect will be to overwrite any existing document with that `_id`. When your document already includes an `_id` value, think of POST like "save" or "upsert" (discussed below) rather than "create" or "insert". 

One consequence of this behavior: for a document with an `_id` specified, there is no straightforward way in the API to realize a pure "insert" — that is, an operation that refuses to modify a pre-existing document with that `_id`. POST will save over the old document; PUT will modify it. If this property is problematic for your application, consider using a field other than `_id`, with its own index to enforce uniqueness.
 
### Insert multiple documents {#insert-multidocuments}

To add multiple documents to the specified collection, specify a list of documents in the data payload:
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>

	POST /databases/{database}/collections/{collection}
	Content-Type: application/json
	Body: <JSON data>

	Example (using jQuery):

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
			  data: JSON.stringify( [ { "x" : 1 }, { "x" : 2 }, { "x" : 3 } ] ),
			  type: "POST",
			  contentType: "application/json" } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


### Update multiple documents {#update-documents}

To update one or more documents in the specified collection, use a PUT request with a replacement document or update modifiers in the body ([MongoDB reference][minc-updates]):

	PUT /databases/{database}/collections/{collection}
	Content-Type: application/json
	Body: <JSON data>

	Example setting "x" to 3 in the document with "_id" = 1234 (using jQuery):

	$.ajax( { url: 'https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey&q={"_id":1234}',
			  data: JSON.stringify( { "$set" : { "x" : 3 } } ),
			  type: "PUT",
			  contentType: "application/json" } );

	Optional parameters:
	[q=<query>][&m=true][&u=true]

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

Optional parameters:

- `q=<query>` - only update document(s) matching the specified JSON query
- `m=true` - update all documents collection or query (if specified). By default only one document is modified
- `u=true` - "upsert": insert the document defined in the request body if none match the specified query

So, you can think of PUT like "update"; with `u=true` added, it becomes "update or insert", or "upsert" for short.

### Delete/replace multiple documents {#delete-documents}

To replace the contents of some or all of a collection, use a PUT request with a replacement list of documents in the body. An optional query in the `q` parameter can be used to replace a subset of the collection. Specifying an empty list in the body is equivalent to deleting the documents matching the query.
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>

	PUT /databases/{database}/collections/{collection}
	Content-Type: application/json
	Body: <JSON data>

	Example (using jQuery):

	$.ajax( { url: 'https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey',
			  data: JSON.stringify( [ { "x" : 1 }, { "x" : 2 }, { "x" : 3 } ] ),
			  type: "PUT",
			  contentType: "application/json" } );

	Optional parameters:
	[q=<query>]

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


Optional parameters:

- `q=<query>` - only replace the document(s) matching the specified JSON query


### View, update or delete a single document {#view-edit-delete-document}

Returns the document with the specified `_id`:

	GET /databases/{database}/collections/{collection}/{_id}

	Example:
	https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey 

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

 
Modifies the document matching the specified `_id`. If no document matching the specified `_id` already exists, it creates a new document. The data payload should contain a replacement document or update modifiers ([MongoDB reference][minc-updates]):
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>

	PUT /databases/{database}/collections/{collection}/{_id}
	Content-Type: application/json 
	Body: <JSON data>

	Example replace the matching document with { "x" : 2 } (using jQuery): 

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey",
			  data: JSON.stringify( { "x" : 2 } ),
			  type: "PUT",
			  contentType: "application/json" } );

	Example setting "y" to 5 in the matching document without affecting other fields (using jQuery): 

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey",
			  data: JSON.stringify( { "$set" : { "y" : 5 } } ),
			  type: "PUT",
			  contentType: "application/json" } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


Deletes the document with the specified `_id`:
<h5 markdown="1">[cURL reference][curl-manual], [jQuery reference][jquery-ajax] </h5>

	DELETE /databases/{database}/collections/{collection}/{_id}

	Example (using cURL): 
	curl -X DELETE 'https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey

	Example (using jQuery):

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey",
			  type: "DELETE",
			  async: true,
			  timeout: 300000,
			  success: function (data) { },
			  error: function (xhr, status, err) { } } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>


### Run database and collection-level commands {#commands}

To run a MongoDB database command, send a POST request to the runCommand endpoint. Only certain MongoDB commands are exposed through the Data API. If there are other commands you need to run, you can always use the mongo shell or a standard MongoDB driver instead. The available commands are:

- `getLastError`
- `getPrevError`
- `ping`
- `profile`
- `repairDatabase`
- `resetError`
- `whatsmyuri`
- `aggregate`
- `convertToCapped`
- `distinct`
- `findAndModify`
- `geoNear`
- `reIndex`
- `collStats`
- `dbStats`

<p></p>
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>
	POST /databases/{database}/runCommand
	Content-Type: application/json
	Body: <JSON data>

	Example (using jQuery):
	The following returns a list of distinct values for 'account' in the 'users' collection matching {"active": true}.

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/runCommand?apiKey=myAPIKey",
			  data: JSON.stringify( {"distinct": "users","key": "account","query": {"active":true}} ),
			  type: "POST",
			  contentType: "application/json",
			  success: function(msg) {
				   alert( msg );
			  } } )

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

 
## HTML Status Codes {#html-codes}

The API commonly returns the following codes. For further reference, see [W3C's documentation][w3c-codes].

200 - OK
: Returned whenever a resource is listed, viewed, updated or deleted

201 - Created 
: Returned whenever a resource is created (instead of code 200)
: Note: in version 1 of the API (i.e., resource paths beginning with `/api/1`), all successful operations return code 200, even when new resources have been created. However, future API versions will use this 201 code as described.

400 - Bad Request 
: Returned whenever a request cannot be fulfilled because of an error with the input  

401 - Unauthorized  
: Returned either when no user credentials could be found or the credentials found are not authorized to perform the requested action

403 - Forbidden  
: Returned whenever the server is refusing access to a resource, usually because the user does not have permissions to it

404 - Not Found  
: Returned whenever the resource being requested does not exist

405 - Method Not Allowed  
: Returned whenever the HTTP method (e.g. GET or POST) is not supported for the resource being requested

## UTF-8 Characters {#utf-8}

The API does support UTF-8 characters. As per the [HTTP spec][w3c-text], you need to be sure to explicitly set the character set you are using in the Content-Type header. The default character set (ISO-8859-1) is not very i18n friendly.

Here's an example of posting special characters using the UTF-8 character set.
<h5 markdown="1">[jQuery reference][jquery-ajax] </h5>

	POST /databases/{database}/collections/{collection}
	Content-Type: application/json;charset=utf-8
	Body: <JSON data>

	Example (using jQuery):

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
			  data: JSON.stringify( { "Iñtërnâtiônàlizætiøn" : true } ),
			  type: "POST",
			  contentType: "application/json;charset=utf-8" } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

 
## Frequently Asked Questions (FAQ) {#faq}

### Q. How do I insert a date in a REST call? 
{:.no_toc}

Dates for use in MongoDB documents can be constructed as ISO UTC strings with special `$date` key. The field might look like:

    {"myDate": {"$date": "2010-07-20T23:23:50Z"}}

So, a "book" document with a published_date might look like:

	{"bookTitle": "How to insert dates", 
	 "publishedDate": {"$date": "2010-07-20T23:23:50Z"}, 
	 "authorName": "Robert"}

If you're open to using a JavaScript Library, try DateJS. There's a [Google resource][goog-datejs] that describes the methods of the DateSJ Date class, particularly the toISOString method. Here's an example:

	$.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey", 
			  data: JSON.stringify({"lat": 41.23, "long": 2.23, "time": {"$date": new Date().toISOString()}}), 
			  type: "POST", 
			  contentType: "application/json" } );

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

### Q. Does the Data API support MongoDB's aggregation framework?
{:.no_toc}

Yes. You can use the `aggregate` command through the `runCommand` endpoint.

That said, as noted in the above [Overview](#overview), we strongly recommend connecting directly to your database using a standard MongoDB driver if possible. 

### Q. I cannot update a document using the mLab API from an AngularJS application 
{:.no_toc}

*The contents of this section are gratefully borrowed from the experience of one of our beloved mLab customers.*

You're using the mLab API from your AngularJS application, and inserts, gets, and deletes are working with no issues using the `$.ajax()` function. However, updating an existing document is not working.

It turns out things work a little differently for the HTTP PUT verb, which is used to perform updates through the API. You can't just supply type: "PUT" to the `$.ajax()` function — you have to use a different function altogether.

The code below performs a document update to the "party" document with id `$scope.id` using angularjs:


    $http.put('https://api.mlab.com/api/1/databases/YOUR_DB/collections/THE_PARTY_COLLECTION/'; + 
               $scope.id + '?apiKey=YOUR_MLAB_API_KEY',
		  { 'Address': $scope.party.Address,
			'Date': $scope.party.Date,
			'Link': $scope.party.Link,
			'Photo': $scope.party.Photo
		  }).success(function (data, status, headers, config) {
					   $scope.refreshGrid();
					   $scope.id = '';
					   $scope.party = {}
					   $scope.SaveButton = "Add";
		  }).error(function (data, status, headers, config) { alert(status) });

<h6>&nbsp; &nbsp; &nbsp;Your API key, including any clients from which your API key can be recovered, should not be distributed to non-administrators.</h6>

 


 
