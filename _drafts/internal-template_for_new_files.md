---
layout: default
title: TEMPLATE FOR NEW FILES
date: 1000-01-01
permalink: /unpublished/template/
description: Add description here
minc-docversion: v3.4
---

{% comment %} When an article is ready to be moved to the 'articles' directory
1. Remove the date field above
2. Update the permalink -->  /onewordlink/
3. Remove this entire comment section
{% endcomment %}

<!-- Doc Portal Links -->
[docs-plans]:        /plans

<!-- mlab.com Links -->
[mlab-login]:        https://mlab.com/login

<!-- Non-mLab Links -->
[minc-home]:         http://www.mongdb.com
[minc-docs]:         https://docs.mongodb.com/manual/

{% comment %} LINKS {% endcomment %}

{% comment %} Replace this line with your markdown-style links. Use the links above for commonly used links.{% endcomment %}

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated TOC 
{:toc}


## Sub-Topic {#subtopicid_for_toc}

Add text here


### Sub-sub-Topic {#subsubtopicid_for_toc}

Add more information here


#### Sub-sub-sub-Topic 
{:.no_toc}

And even more info here. Notice the `
{:.no_toc}` in the header, that prevents the header from showing up in the TOC

