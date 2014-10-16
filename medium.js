(function ($) {

  Drupal.medium = {};
  Drupal.medium.editors = [];

  Drupal.behaviors.medium = {
    attach: function (context, settings) {
      // Hide the textarea and load the Medium editor.
      $('.editable').each(function() {
        $(this).wrap('<div class="editable-wrapper"></div>');
        $(this).parent().append('<div class="medium-editor-container">' + $(this).val() + '</div>');
        // @TODO: There's probably a better way to do this, but ¯\_(ツ)_/¯
        $(this).parent().parent().parent().find('label').hide();
        $(this).hide();
        var editor = new MediumEditor('.medium-editor-container', {
          placeholder: $(this).attr('placeholder')
        });

        $(this).parent().attr('data-editor-key', editor.id);
        Drupal.medium.editors[editor.id] = editor;

        // If the Media module is enabled, load embed support for the Medium editor.
        if (Drupal.settings.medium.media_support) {
          $('.medium-editor-container').mediumInsert({
            editor: editor,
            addons: {
              drupalmedia: {}
            }
          });
        }

      });

      // When the form is submitted, copy the Medium editor contents
      // to the related textarea.
      $('form').submit(function(event) {
        $('.editable').each(function() {
          var editorKey = $(this).parent().attr('data-editor-key');
          var editorValue = Drupal.medium.editors[editorKey].serialize();
          $(this).val(editorValue["element-0"].value);
        });
      });
    }
  };
})(jQuery);