(function($) {

  searchResultsUL = null;
  liSelected = null;

  var debounce = function(fn) {
    var timeout;
    var slice = Array.prototype.slice;

    return function() {
      var args = slice.call(arguments),
          ctx = this;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        fn.apply(ctx, args);
      }, 100);
    };
  };

  // parse a date in yyyy-mm-dd format
  var parseDate = function(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  };

  var LunrSearch = (function() {
    function LunrSearch(elem, options) {
      this.$elem = elem;
      this.$results = $(options.results);
      this.indexDataUrl = options.indexUrl;
      this.template = this.compileTemplate($(options.template));
      this.titleMsg = options.titleMsg;
      this.emptyMsg = options.emptyMsg;
      this.$overlayDiv = $(options.overlayDiv);
      this.$searchForm = $(options.searchForm);
      this.$searchDiv = $(options.searchDiv);
      this.onAfterResultShow = options.onAfterResultShow;

      this.initialize();
    }

    LunrSearch.prototype.initialize = function() {
      var self = this;

      this.loadIndexData(function(data) {
        self.entries = $.map(data.docs, self.createEntry);
        self.index = lunr.Index.load(data.index);
        self.populateSearchFromQuery();
        self.bindKeypress();
        self.disableEnterKeypress();
      });
    };

    // compile search results template
    LunrSearch.prototype.compileTemplate = function($template) {
      var template = $template.text();
      Mustache.parse(template);
      return function (view, partials) {
        return Mustache.render(template, view, partials);
      };
    };

    // load the search index data
    LunrSearch.prototype.loadIndexData = function(callback) {
      $.getJSON(this.indexDataUrl, callback);
    };

    LunrSearch.prototype.createEntry = function(raw, index) {
      var entry = $.extend({
        id: index + 1
      }, raw);

      // include pub date for posts
      if (raw.date) {
        $.extend(entry, {
          date: parseDate(raw.date),
          pubdate: function() {
            // HTML5 pubdate
            return dateFormat(parseDate(raw.date), 'yyyy-mm-dd');
          },
          displaydate: function() {
            // only for posts (e.g. Oct 12, 2012)
            return dateFormat(parseDate(raw.date), 'mmm dd, yyyy');
          }
        });
      }

      return entry;
    };

    LunrSearch.prototype.bindKeypress = function() {
      var self = this;
      var oldValue = this.$elem.val();


      // search as user types
      this.$elem.bind('keyup', debounce(function(e) {
        if(e.which !== 40 && e.which !== 38 && e.which !== 13) {
          var newValue = self.$elem.val();
          if (newValue !== oldValue) {
            self.search(newValue);
          }

          oldValue = newValue;
          searchResultsUL = $('ul[class=search-results-ul] li');
          liSelected = null;
        }
      }));

      // click search result with 'enter' key, up and down selector keys
      this.$elem.bind('keydown', function(e) {
        if(e.which === 13) {
          if(liSelected) {
            liSelected.find("a")[0].click();
          }
        }
     	if(e.which === 40) {
          if(liSelected) {
            liSelected.removeClass('search-results-select');
			liSelected.find("span").remove();
            next = liSelected.next();
            if(next.length > 0) {
              liSelected = next.addClass('search-results-select');
			  liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
            } else {
              liSelected = searchResultsUL.eq(0).addClass('search-results-select');
              liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
            }
          } else {
            liSelected = searchResultsUL.eq(0).addClass('search-results-select');
			liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
          }
        } else if (e.which === 38) {
          if (liSelected) {
            liSelected.removeClass('search-results-select');
			liSelected.find("span").remove();
              next = liSelected.prev();
                if (next.length > 0) {
                  liSelected = next.addClass('search-results-select');
                  liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
                } else {
                  liSelected = searchResultsUL.last().addClass('search-results-select');
                  liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
                }
          } else {
            liSelected = searchResultsUL.last().addClass('search-results-select');
            liSelected.prepend('<span class="result-icon"><i class="fa fa-angle-right"></i></span>');
          }
        }
      })
    };

    // Disable default behavior for 'Enter' on the search input, otherwise it will attempt to render a new page
    LunrSearch.prototype.disableEnterKeypress = function() {
        var self = this;
    	this.$searchForm.keypress(function(e){
      		if ( e.which == 13 ) {
              e.preventDefault();
      		}
    	});
    };

    LunrSearch.prototype.search = function(query) {
      var entries = this.entries;

      if (query.length < 1) {
        this.$results.hide().empty();
        this.$overlayDiv.hide();
        // reset search box back to normal
        this.$searchForm.width(230);
        this.$searchForm.css("background", "#f5f5f5");
        this.$searchForm.css("border-right", "none");
		this.$searchDiv.removeAttr("style");
        searchResultsUL = null;
        liSelected = null;
      } else {
        var results = $.map(this.index.search(query), function(result) {
          return $.grep(entries, function(entry) {
			var matchTerms = query.split(" ").join("|");
			matchTermsRegex = new RegExp(matchTerms, 'gi');
			var excerpt = entry.description;
			excerpt = excerpt.replace(matchTermsRegex, function(matched) {return '<strong>' + matched + '</strong>'});
			entry.excerpt = excerpt
			return entry.id === parseInt(result.ref, 10); })[0];
        });

        this.displayResults(results);
        this.onAfterResultShow();
      }
    };

    var bindExitClick = function(results, overlay, searchForm, searchDiv) {
      overlay.click(function(e) {
        results.hide().empty();
        searchForm.width(230);
        searchForm.css("background", "#f5f5f5");
        searchForm.css("border-right", "none");
        searchForm.val('');
        searchDiv.removeAttr("style");
        searchResultsUL = null;
        liSelected = null;
        overlay.hide();
      });
    }

    LunrSearch.prototype.displayResults = function(entries) {
      var $results = this.$results;
      var $overlayDiv = this.$overlayDiv;

      $results.empty();
      $results.scrollTop(0);

      if (entries.length === 0) {
        $results.append( this.emptyMsg );
      } else {
        if (this.titleMsg && 0 !== this.titleMsg.length) {
          $results.append( this.titleMsg );
        }
        $results.append(this.template({entries: entries}));
      }

      this.$searchDiv.width(this.$results.width());
      this.$searchDiv.height(this.$results.height() + this.$searchForm.height())
	  this.$searchDiv.css("-webkit-box-shadow", "6px 6px 107px 6px rgba(0,0,0,0.75)");
	  this.$searchDiv.css("-moz-box-shadow", "6px 6px 107px 6px rgba(0,0,0,0.75)");
      this.$searchDiv.css("box-shadow", "6px 6px 107px 6px rgba(0,0,0,0.75)");
      this.$searchForm.width(this.$results.width() - 44);
      this.$searchForm.css("background-color", "white");
      this.$searchForm.css("border-right", "1px solid #e0e0e0");
      this.$results.css("border-top", "none");

      $overlayDiv.show();
      // click out of search results
      bindExitClick($results, $overlayDiv, this.$searchForm, this.$searchDiv);
      $results.show();
    };

    // Populate the search input with 'q' querystring parameter if set
    LunrSearch.prototype.populateSearchFromQuery = function() {
      var uri = new URI(window.location.search.toString());
      var queryString = uri.search(true);

      if (queryString.hasOwnProperty('q')) {
        this.$elem.val(queryString.q);
        this.search(queryString.q.toString());
      }
    };

    return LunrSearch;
  })();

  $.fn.lunrSearch = function(options) {
    // apply default options
    options = $.extend({}, $.fn.lunrSearch.defaults, options);

    // create search object
    new LunrSearch(this, options);

    return this;
  };

  $.fn.lunrSearch.defaults = {
    indexUrl  : '/js/index.json',           // url for the .json file containing search index data
    results   : '#search-results',          // selector for containing search results element
    template  : '#search-results-template', // selector for Mustache.js template
    titleMsg  : '<h1>Search results<h1>',   // message attached in front of results
    emptyMsg  : '<p>Nothing found.</p>',    // shown message if search returns no results
    onAfterResultShow: function() {}        // a hook to process the page after the search results have been shown
  };
})(jQuery);
