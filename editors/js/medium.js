(function ($) {

  Drupal.wysiwyg.editor.attach.medium = function(context, params, settings) {
    var $field = $('#' + params.field);
    // If we've already set up the editor, just reactivate it.
    if ($field.attr('medium') == 'true') {
      $field.parent().find('.medium-editor-container').show();
      $field.parent().parent().parent().find('label').hide();
      $field.hide();
    }
    // ...otherwise, set up the editor.
    else {
      $field.wrap('<div class="editable-wrapper" />');
      $field.parent().append('<div class="medium-editor-container">' + $field.val() + '</div>');
      $field.parent().parent().parent().find('label').hide();
      $field.hide();
      $field.attr('medium', 'true');
      var editor = new MediumEditor($field.parent().find('.medium-editor-container'));
      Drupal.wysiwyg.instances[params.field].editorInstance = editor;

      // If the Media module is enabled, load embed support for the Medium editor.
      if (Drupal.settings.medium.media_support) {
        $field.parent().find('.medium-editor-container').mediumInsert({
          editor: editor,
          addons: {
            drupalmedia: {}
          }
        });
      }
    }
  };

  Drupal.wysiwyg.editor.detach.medium = function (context, params, settings) {
    // If we're detaching one specific editor instance.
    if (typeof params != 'undefined') {
      var $field = $('#' + params.field);
      $field.val(Drupal.wysiwyg.instances[params.field].getContent());
      $field.parent().find('.medium-editor-container').hide();
      $field.parent().parent().parent().find('label').show();
      $field.show();
    }
    // If we're detaching *every* editor instance, we don't care about
    // hiding the editors. We just want the content in the appropriate field.
    else {
      $.each(Drupal.wysiwyg.instances, function(key, value) {
        value.dumpContentToField();
      });
    }
  };

  Drupal.wysiwyg.editor.instance.medium = {
    insert: function(content) {
      var $field = $('#' + this.field);
      $field.parent().find('.medium-editor-container').append(content);
    },

    setContent: function(content) {
      var $field = $('#' + this.field);
      $field.parent().find('.medium-editor-container').html(content);
    },

    getContent: function() {
      var editorValue = this.getInstance().serialize();
      return editorValue['element-0'].value;
    },

    dumpContentToField: function() {
      var $field = $('#' + this.field);
      $field.val(this.getContent());
      return true;
    },

    getInstance: function () {
      if (typeof this.editorInstance != 'undefined') {
        return this.editorInstance;
      }
      return null;
    }
  };

})(jQuery);
