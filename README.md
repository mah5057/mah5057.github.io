# Doc Portal Development 

### DOC PORTAL UPDATE PROCESS

__docs-dev_mongolab_com__ is the repo that should be used to make changes to the doc portal. Changes that are checked in here will be reviewed, edited and rolled out to the official production repo by the designated editor/admin (currently Christine). In other words, the official repo __docs_mongolab_com__ is hands off!

Send an email docs@objectlabs.com with your pull request, a description of your check-in, or a suggestion. Christine will triage this mailing list and work with Angela to get the change rolled out to production. If Christine does not respond to your email within 48 hours, contact her directly. 


### SETTING UP YOUR LOCAL INSTANCE OF THE DOC PORTAL DEVELOPMENT SITE (Updated 2-4-2016)

1. Navigate to the location where you want to clone the repo
1. Clone the repository ```git clone git@github.com:mongolab/docs-dev_mongolab_com.git``` 
1. Make sure you have Ruby 2.0 or higher and have RubyGems installed
   - If you have multiple ruby versions on your machine, do what you need to ensure the right version of Ruby will be used before you proceed to the remainder of the steps 
   - We recommend using `rvm` to ensure the right version of Ruby
1. Install the package manager Bundler  ```gem install bundler``` 
1. Navigate to the root level of the __docs-dev_mongolab_com__ repository
1. Run ```bundle install```
1. Run ```jekyll -v``` to confirm that your version of Jekyll is 3.4.3 or higher.
1. Installation is now complete!

### RUNNING A LOCAL INSTANCE OF THE DOC PORTAL
Assuming everything has been set up properly in the previous section, you can now start your local instance

1. From the root level of your repository, start the localhost jekyll server ```bundle exec jekyll serve --config _config-dev.yml -D``` 
      - If jekyll encounters an error that it cannot recover from, cancel the process (ctrl-c) and re-start the server
      - The ```--D``` option includes posts from the ```_drafts``` directory which contains our non-published, internal documents relevant to doc portal writing guidelines and such
      - The ```--config``` option is being utilized to apply settings specific to the local instance (i.e., diff URL variable)
      - FYI, a ```_site``` directory is created in your repo, as it is needed by Jekyll to run a local instance; it's in the .gitignore file so it will ultimately not be synced to GitHub
1. Open the site locally at http://localhost:4000
1. To open the dev version of the doc portal on your mobile device:
   1. Confirm that your device is on the same network as your local machine 
   1. Open a browser window on your mobile device with the following URL: ```http://[localmachine IP address]:4000```

### MAKING CHANGES TO CONTENT

1. Navigate to the root level of the repo
1. Make sure the __docs-dev_mongolab_com__ repo is current on all recent updates ```git pull```
1. Make your changes
1. If your local server is not already running, start it ```bundle exec jekyll serve --config _config-dev.yml -D```
1. Check your changes in the local site to confirm those are the changes you want
1. Commit/push your changes to the repo

#### When you are done, notify the doc portal admin (currently Christine) that changes have been made
 
### Handy alias for your .zshrc file

```rdp='cd $HOME/repos/docs-dev_mongolab_com && rvm use 2.0 &&  bundle exec jekyll serve --config _config-dev.yml -D```

(this assumes $HOME/repos is where you put this repo)


### KEEPING JEKYLL UP-TO-DATE
To keep Jekyll up to date in the future (to stay aligned with GitHub Pages' version) you can run the command `bundle update` from the root level of the __docs-dev_mongolab_com__ repository


### REFERENCES

- https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll
- http://jekyllrb.com/  
- http://kramdown.gettalong.org/index.html
