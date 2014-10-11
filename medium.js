(function ($) {
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
      });

      // When the form is submitted, copy the Medium editor contents
      // to the related textarea.
      $('form').submit(function(event) {
        var editorValue = $(this).find('.medium-editor-container').html();
        $(this).find('.editable-wrapper .editable').val(editorValue);
      });
    }
  };
})(jQuery);