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
//        console.log($(this).find('.editable-wrapper .editable'));
//        return false;
      });
//      $(this).parent('form').submit(function() {
//        var contentObject = editor.serialize();
//        $(this).find('textarea').val(contentObject['element-0'].value());
//        alert(contentObject['element-0'].value());
//      });
    }
  };
})(jQuery);