/**
 * @file
 * Provides integration with medium-editor-insert-plugin and the Drupal
 * media module.
 */
(function ($) {

  $.fn.mediumInsert.registerAddon('drupalmedia', {

    init : function(options) {
      this.options = $.extend(this.default, options);
      this.$el = $.fn.mediumInsert.insert.$el;
    },

    insertButton : function(buttonLabels) {
      var label = "Insert media";
      if (buttonLabels == 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-file-image-o"></i>';
      }
      if (typeof buttonLabels === 'object' && buttonLabels.embed) {
        label = buttonLabels.embed;
      }

      return '<button data-addon="drupalmedia" data-action="browse" class="medium-editor-action mediumInsert-action">' + label + '</button>';
    },

    browse : function($placeholder) {
      // Launch the media browser.
      Drupal.media.popups.mediaBrowser(function (mediaFiles) {
        // Ensure that there was at least one media file selected.
        if (mediaFiles.length < 0) {
          return;
        }

        // Grab the first of the selected media files.
        var mediaFile = mediaFiles[0];
        $.get('/medium/image/' + mediaFile.fid, function(data) {
          $.fn.mediumInsert.insert.deselect();
          $placeholder.append('<img src="' + data.path + '" />');
        });
      }, Drupal.settings.medium);

      return false;
    }

  });

}(jQuery));