# Summary

The Medium module provides a WYSIWYG editor for WYSIWYG API. Eventually, it may do other things.
The editing interface is similar to that of Medium.com.

# Requirements

* [Libraries API](https://www.drupal.org/project/libraries)
* [WYSIWYG API](https://www.drupal.org/project/wysiwyg)
* [jQuery Update](https://www.drupal.org/project/jquery_update) -- only if you want the Media module integration. You need to use jQuery 1.9.x.

# Installation

* Download the module and put it in sites/all/modules (or another valid module path).
* Download the [medium editor library](https://github.com/daviferreira/medium-editor/archive/2.1.0.zip) and put it in sites/all/libraries/mediumeditor
* Download the [medium editor insert library](https://github.com/orthes/medium-editor-insert-plugin/archive/0.3.2.zip) and extract it to sites/all/libraries/medium-editor-insert-plugin

## Drush Make

If you're using Drush Make to manage your Drupal files, you can add these lines
to download the required Javascript libraries instead of doing it manually.

    ; Libraries
    libraries[mediumeditor][download][type] = "file"
    libraries[mediumeditor][download][url] = "https://github.com/daviferreira/medium-editor/archive/2.1.0.zip"
    libraries[mediumeditor][destination] = "libraries"
    
    libraries[medium-editor-insert-plugin][download][type] = "file"
    libraries[medium-editor-insert-plugin][download][url] = "https://github.com/orthes/medium-editor-insert-plugin/archive/0.3.2.zip"
    libraries[medium-editor-insert-plugin][destination] = "libraries"

# Contact

Current maintainers:
* Cameron Eagans (cweagans) - http://drupal.org/user/404732

This project has been sponsored by:
* Young Writers Project
  A civil, creative space for youths to write, share meaningful feedback and
  work with mentors and artists in informal learning groups.
