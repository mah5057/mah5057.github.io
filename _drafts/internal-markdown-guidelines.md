---
layout: default
title:  MARKDOWN SYNTAX
date: 1000-01-03
permalink: /unpublished/markdown/
description: Add description here
minc-docversion: v3.4
---

{% comment %} LINKS {% endcomment %}
[mlab-welcome]:            https://mlab.com/welcome
[mlab-login]:              https://mlab.com/login
[pygments-lang]:           http://pygments.org/docs/lexers/
[img-sample]:              /assets/sampleimage.png  "mongolab"
[docs-languages]:          /languages
[docs-languagesnewwindow]: {{ site.url }}/languages
[docs-style]:              /unpublished/portal/#list-punctuation

# {{ page.title }}
{:.no_toc}

{% comment %} DO NOT CHANGE OR DELETE THE FOLLOWING 2 LINES {% endcomment %}
* Auto-generated Table of Contents (TOC)
{:toc}


## Markdown Syntax Weirdness {#weirdness}

For whatever reason, because Markdown is strange, or because Maruku doesn't support this/that, and so forth, there are some conventions we must follow:
   - There are times when you are writing your draft articles and even though the Jekyll server doesn't report an error after a page has been updated, you may encounter an error page or don't see any changes on your page. Sometimes refreshing the link will do the trick, other times you have to go back to your file and troubleshoot to find the root cause of the problem.
   - Sort of related to the previous point, sometimes it seems like the markdown syntax you tried doesn't do what you expect when you test it but then later you see that it does work. Weird! Can't find an explanation for this. 
   - When Jekyll encounters a conversion error (malformed content), it usually requires a restart of the server (after you've fixed the malformed content)
   - Maruku complains when placing [intra-page links](#linkthispage) in headers so please avoid it
   - Maruku complains when special characters are in headers like apostrophes - not sure if this will be a problem in the future so try to avoid special characters for now


   
## Using Markdown inside HTML
In the rare case we need to use HTML (because Markdown doesn't provide the equivalent feature), we can specify whether to allow Markdown inside the html block. It's as simple as adding `markdown="1"` to the tag. More information is provided here: <http://michelf.ca/projects/php-markdown/extra/#markdown-attr>

TYPE THIS IN YOUR MARKDOWN FILE
    
    <h4 markdown="1">This is *true* markdown text. </h4>

TO DISPLAY THIS

<h4 markdown="1">This is *true* markdown text. </h4>



## Headers {#headers}

TYPE THIS IN YOUR MARKDOWN FILE

    # One hash for h1 
    ## Two hashes for h2
    ### Three hashes for h3
    #### Four hashes for h4 
{:.no_toc} 
    
<p></p>
TO DISPLAY THIS

# One hash for h1 
{:.no_toc} 
## Two hashes for h2 
{:.no_toc} 
### Three hashes for h3 
{:.no_toc} 
#### Four hashes for h4 
{:.no_toc} 

- Add the `
{:.no_toc}` only if you want to hide the header from the TOC. For the purposes of this example only (so as to prevent our display headers from appearing in the actual TOC), we've added `
{:.no_toc}` to all lines under the "TO DISPLAY THIS" heading (visible if you look at the raw markdown file for this page).

## TOC   {#toc}

We use Maruku as our Markdown processor. Maruku has a built-in TOC generator which will pull your hashed headers into a TOC at the location you specify with the following code:

    * Auto-generated Table of Contents (TOC)
    {:toc} 

*Adding an id to the header*

You can replace the auto-generated id element by adding one in curly braces, plus the hash, to the right of your header like this:
 
    ## This is my header {#header_id}

*Excluding a header from the TOC*

If you don't want a particular header included in the TOC but you want it styled as a header, add `
{:.no_toc}` at the end of the header line. 


## URLs {#urls}

While it's possible to use inline-style linking, we are adopting reference-style linking so that we can facilitate standardization across our references (to make it easier to update URLs too).

IF YOU PLACE SOMETHING LIKE THIS AT THE TOP OF YOUR MARKDOWN FILE

    [mlab-welcome]: https://mlab.com/welcome
    [mlab-login]: https://mlab.com/login

AND THEN TYPE THIS AT THE PLACE YOU WANT THE LINK TO APPEAR

    Navigate to the [mLab Welcome Page][mlab-welcome] okay?
    You can also [log in to your account][mlab-login] to access your cluster.

THIS IS WHAT WILL BE DISPLAYED

Navigate to the [mLab Welcome Page][mlab-welcome] okay?   
You can also [log in to your account][mlab-login] to access your cluster.

### Linking to intra-portal documents 
{:.no_toc}
By default, linking to other intra-portal documents will open the page in the same window and external sites are opened in a separate tab. If for some reason you need to open an intra-portal doc in a separate tab, you must specify the link at the top of the page with a variable that will insert the full URL into the href.

IF YOU PLACE SOMETHING LIKE THIS AT THE TOP OF YOUR MARKDOWN FILE 
 
	{% raw %}	
	[docs-languages]: /languages
	[docs-languagesnewwindow]: {{ site.url }}/languages
	{% endraw %}

THEN THE FOLLOWING LINKS WILL BEHAVE DIFFERENTLY  
[Click this sentence to open the page in the same window][docs-languages]  
[Click this sentence to open the page in a new tab][docs-languagesnewwindow]

## Intra-page Links {#linkthispage}

TYPE THIS IN YOUR MARKDOWN FILE

    [Link back to URLs](#urls)

...where `(#links)` represents the id value given to a header (see the [TOC](#toc) section for info about specifying the id value) 

TO DISPLAY THIS

[Link back to URLs](#urls)

## Footnotes {#footnotes}

TYPE THIS IN YOUR MARKDOWN FILE

    This is the text where a footnote has been added [^foot-text]

AND THEN ADD THIS TO THE BOTTOM OF YOUR FILE

    [^foot-text]: This is where you type the text of the footnote itself

TO DISPLAY THIS

This is the text where a footnote has been added [^foot-text]

- We've decided to use `[^foot-FILLINAHINTHERE]` as our standard where you specify a unique value for "FILLINAHINTHERE"
- Footnotes will be automatically numbered



## Images {#images}

Image files need to be placed in the `_assets` directory. Please note that you cannot control image size with markdown so please size your image appropriately before placing it in the directory.

IF YOU PLACE SOMETHING LIKE THIS AT THE TOP OF YOUR MARKDOWN FILE

    [img-sample]: /assets/sampleimage.png  "mongolab"

AND THEN TYPE THIS AT THE LOCATION WHERE YOU WANT THE IMAGE TO APPEAR

    ![img-sample][img-sample] Sentence following the icon...

THIS IS WHAT WILL BE DISPLAYED

![img-sample][img-sample] Sentence following the icon...




## Email Links {#email}


TYPE THIS IN YOUR MARKDOWN FILE
 
    Contact us anytime at <support@mlab.com>!

TO DISPLAY THIS

Contact us anytime at <support@mlab.com>!

This method is nice because it creates gibberish in the HTML to frustrate email harvesters.




## Formatting Words {#formatting}
TYPE THIS IN YOUR MARKDOWN FILE

	*use one asterisk for italics*
	
	__use two underscores for bold__

TO DISPLAY THIS

*use one asterisk for italics*  

__use two underscores for bold__ 

QUESTION: Does Maruku support underlines? Do we even want it? It may confuse folks into thinking something is a hyperlink...



## Tables {#tables}

TYPE THIS IN YOUR MARKDOWN FILE

    First Header  | Second Header
    ------------- | -------------
    Content Cell  | Content Cell
    Content Cell  | Content Cell


TO DISPLAY THIS

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

QUESTION: Do we need more table options besides styling the default to our liking?





## Hidden comments {#comments}
TYPE THIS IN YOUR MARKDOWN FILE

    {% raw %}
    {% comment %} Comment goes between these tags {% endcomment %} 
    {% endraw %}

TO DISPLAY NOTHING!

{% comment %} Comment goes between these tags {% endcomment %}

{% comment %} 
NOTE: In order to properly display the Liquid tag syntax as a code block on this page, the raw/endraw tags had to be placed at the front and end of the code snippets.
{% endcomment %}

## Lists (ordered and unordered) {#lists}

[Click this link to see rules for list punctuation][docs-style]

TYPE THIS IN YOUR MARKDOWN FILE

    - unordered list bullet
    - unordered list bullet
    - unordered list bullet

    1. ordered list bullet 

    1. ordered list bullet
       - indented unordered list
       - indented unordered list

    1. ordered list bullet
	   1. indented ordered list
	   1. indented ordered list
	   

TO DISPLAY THIS

- unordered list bullet
- unordered list bullet
- unordered list bullet

1. ordered list bullet

1. ordered list bullet
   - indented unordered list
   - indented unordered list

1. ordered list bullet
   1. indented ordered list
   1. indented ordered list




## Definition Lists {#definitions}
TYPE THIS IN YOUR MARKDOWN FILE

    Word to be defined
    :   Definition goes here
    :   You can add a second definition


TO DISPLAY THIS

Word to be defined
:   Definition goes here
:   You can add a second definition




## Blank Lines {#blanklines}

FOR A FORCED BLANK LINE BETWEEN LINES OF NORMAL TEXT, TYPE THIS IN YOUR MARKDOWN FILE

    Line at top 
    <p></p>
    Line below forced blank line

TO DISPLAY THIS

Line at top 
<p></p>
Line below forced blank line

<h3>Forced Line breaks</h3>
On a separate but related note, Markdown requires a blank line between lines of normal (non-header, non-table, non-list) text if you need a `<br />` type line break. However, if you don't want the extra line in the markdown file, place two or more spaces after the line where the break is needed.


## Indenting lines {#indenting}

Increase the quantity of `&nbsp;` to indent further to the right

TYPE THIS IN YOUR MARKDOWN FILE
    
    &nbsp; &nbsp; &nbsp; These are the lines to be indented.  
    &nbsp; &nbsp; &nbsp; Each line must have the non-breaking spaces included.   
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This one has more non-breaking spaces than the previous.

TO DISPLAY THIS

&nbsp; &nbsp; &nbsp; These are the lines to be indented.  
&nbsp; &nbsp; &nbsp; Each line must have the non-breaking spaces included.   
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This one has more non-breaking spaces than the previous.





## Horizontal Rules {#lines}

TYPE THIS IN YOUR MARKDOWN FILE

    /-----------

(argh! code block won't work without that backslash...don't include it in the actual markdown file! )
    
TO DISPLAY THIS
 
-------------



## Including a span of code within a normal paragraph {#codespan}

TYPE THIS IN YOUR MARKDOWN FILE

    I'm going to insert `a bit of code` within my sentence

TO DISPLAY THIS
 
-------------
I'm going to insert `a bit of code` within my sentence



## Fenced code blocks with syntax highlighting {#codeblocks}

For quick code blocks (e.g., to indicate what to type at a command prompt or to show output from a shell), use indentation (4 spaces):

    This is an indented line
    This is another indented line

For "real" code blocks (e.g., you're trying to show javascript or json), we chose to use Liquid, which is another templating language (like Markdown) that Jekyll supports. In particular, it highlights syntax and allows us to either place code inline with the content or reference a file that exists in the `_includes` directory. 

The following examples show the 2 different methods using the same code snippet.

Other things to know:
   - [List of languages supported using this method - use the short name][pygments-lang]
   - Add `linenos` after the language name if you want line numbers to appear in the code block (linenos should really be avoided since they will be part of the cut-and-paste and because they number wrapped lines)

{% comment %} 
NOTE: In order to properly display the Liquid tag syntax as code blocks on this page, the raw/endraw tags had to be placed at the front and end of the code snippets.
{% endcomment %}

### Placing raw code in the file


TYPE THIS IN YOUR MARKDOWN FILE

    {% raw %}
    {% highlight javascript %}
    var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(1337, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:1337/');
    {% endhighlight %}
    {% endraw %}

TO DISPLAY THIS 

{% highlight javascript %}
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
{% endhighlight %}


### Referencing code in another file

Code fragment that lives in a file in the `_includes` folder

TYPE THIS IN YOUR MARKDOWN FILE

    {% raw %}
    {% highlight javascript linenos %}
    {% include example.js %}
    {% endhighlight %}
    {% endraw %}

TO DISPLAY THIS

{% highlight javascript linenos %}
{% include example.js %}
{% endhighlight %}




## Wish list {#wishlist}

Things I wish there was support for:

   - fenced code blocks with backticking - it's supposedly available but not sure how to implement with jekyll
   - strikethrough
   

<p></p>

[^foot-text]: This is where you type the text of the footnote itself

