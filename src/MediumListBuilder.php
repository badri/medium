<?php

/**
 * @file
 * Contains \Drupal\medium\MediumListBuilder.
 */

namespace Drupal\medium;

use Drupal\Component\Utility\Html;
use Drupal\Core\Config\Entity\ConfigEntityListBuilder;
use Drupal\Core\Entity\EntityInterface;

/**
 * Defines a class to build a list of Medium Editor entities.
 *
 * @see \Drupal\medium\Entity\Medium
 */
class MediumListBuilder extends ConfigEntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['label'] = $this->t('Name');
    $header['description'] = $this->t('Description');
    $header['toolbar'] = $this->t('Toolbar');
    $header['delay'] = $this->t('Delay');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $medium_editor) {
    $row['label'] = $medium_editor->label();
    $row['description'] = Html::escape($medium_editor->get('description'));
    $row['toolbar'] = Html::escape(implode(', ', $medium_editor->getToolbar()));
    $row['delay'] = Html::escape($medium_editor->get('delay'));
    return $row + parent::buildRow($medium_editor);
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultOperations(EntityInterface $medium_editor) {
    $operations = parent::getDefaultOperations($medium_editor);
    $operations['duplicate'] = array(
      'title' => t('Duplicate'),
      'weight' => 15,
      'url' => $medium_editor->urlInfo('duplicate-form'),
    );
    return $operations;
  }

}
