<?php
/**
 * @file
 * Editor integration functions for Medium editor.
 */

/**
 * Implements hook_editor().
 */
function medium_medium_editor() {
  $editor['medium'] = array(
    'title' => 'Medium',
    'vendor url' => 'https://github.com/daviferreira/medium-editor',
    'download url' => 'https://github.com/daviferreira/medium-editor/releases',
    'themes callback' => 'medium_themes',
    'library path' => wysiwyg_get_path('mediumeditor'),
    'load callback' => 'medium_load',
    'libraries' => array(
      'src' => array(
        'title' => 'Source',
        'files' => array('dist/js/medium-editor.min.js'),
      ),
    ),
    'version callback' => 'medium_get_package_version',
    'settings callback' => 'medium_settings',
    'settings form callback' => 'medium_settings_form',
    'plugin callback' => 'medium_plugins',
    'plugin settings callback' => 'medium_plugin_settings',
    'versions' => array(
      '1.9.0' => array(
        'js files' => array('medium.js'),
        'css files' => array('medium.css'),
      ),
    ),
  );
  return $editor;
}

/**
 * Determine available editor themes or check/reset a given one.
 *
 * @editor array
 *   A processed hook_editor() array of editor properties.
 * @profile object
 *   A wysiwyg editor profile.
 *
 * @return array
 *   An array of theme names. The first returned name should be the default
 *   theme name.
 */
function medium_themes($editor, $profile) {
  return array('default', 'bootstrap');
}

/**
 * Perform additional actions upon loading this editor.
 *
 * @editor array
 *   A processed hook_editor() array of editor properties.
 * @library string
 *   The internal library name (array key) to use.
 */
function medium_load($editor, $library) {
  drupal_add_css($editor['library path'] . '/dist/css/medium-editor.min.css');
  drupal_add_css($editor['library path'] . '/dist/css/themes/bootstrap.css');
}

/**
 * Plugins. Semi-implementation of hook_wysiwyg_plugin().
 */
function medium_plugins($editor) {
  $info = array(
    'default' => array(
      'buttons' => array(),
      'internal' => TRUE,
    ),
  );

  if (module_exists('media')) {
    $info['default']['buttons'] = array(
      'media' => t('Media'),
    );
  }

  return $info;
}

/**
 * Settings for plugins.
 */
function medium_plugin_settings() {
  return;
}

/**
 * Implements hook_form().
 */
function medium_settings_form(&$form, &$form_state) {
  $profile = $form_state['wysiwyg_profile'];
  $settings = $profile->settings;
}

/**
 * Return runtime editor settings for a given wysiwyg profile.
 *
 * @editor array
 *   A processed hook_editor() array of editor properties.
 * @config array
 *   An array containing wysiwyg editor profile settings.
 * @theme string
 *   The name of a theme/GUI/skin to use.
 *
 * @return array
 *   A settings array to be populated in
 *   Drupal.settings.wysiwyg.configs.{editor}
 */
function medium_settings($editor, $config, $theme) {
  $settings = array();
  return $settings;
}
