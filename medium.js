(function ($) {
  Drupal.behaviors.medium = {
    attach: function (context, settings) {
      $('.editable').each(function() {
        $(this).wrap('<div class="editable-wrapper"></div>');
        $(this).parent().append('<div class="medium-editor-container">' + $(this).val() + '</div>');
        $(this).hide();
        var editor = new MediumEditor('.medium-editor-container', {
          placeholder: $(this).attr('placeholder')
        });
      });

      $('form').submit(function() {
        var editorValue = $(this).find('.medium-editor-container').html();
        $(this).find('.editable-wrapper .editable').val(editorValue);
        $(this).submit();
      });
    }
  };
})(jQuery);