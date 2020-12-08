<template>
  <article class="app-card">
    <div
      class="app-card__image"
      :lazy-background="image"
    />
    <div class="app-card__content">
      <header class="app-card__header">
        <h3 class="app-card__title">
          {{ title }}
        </h3>
        <div v-if="to" class="app-card__tags">
          <cv-tag
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            kind="purple"
          />
        </div>
      </header>
      <div class="app-card__description">
        <slot />
      </div>
      <AppCta
        v-if="to"
        v-bind="ctaLink"
        kind="ghost"
      />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

/**
 * Card component.
 * 
 * A card is a flexible content container that includes an image, a title and a
 * description.
 * 
 * Optionally, a card can also include a list of tags and a CTA button.
 */
@Component
export default class AppCard extends Vue {
  /**
   * Card image's URL.
   */
  @Prop(String) image!: string

  /**
   * Card title.
   */
  @Prop(String) title!: string

  /**
   * List of tags.
   */
  @Prop(Array) tags!: string[]

  /**
   * CTA button's target URL.
   */
  @Prop(String) to!: string

  /**
   * CTA button's label.
   */
  @Prop(String) ctaLabel!: string

  ctaLink = {
    url: this.to,
    label: this.ctaLabel
  }
}
</script>

<style lang="scss" scoped>
@import '~carbon-components/scss/globals/scss/typography';

.app-card {
  min-height: 13rem;
  width: 100%;
  background-color: $cool-gray-10;
  color: $cool-gray-80;
  display: flex;

  @include mq($until: medium) {
    height: auto;
    flex-direction: column;
  }

  &__image {
    flex: 0 0 14rem;
    background-color: $cool-gray-80;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    overflow: hidden;

    @include mq($from: medium, $until: large) {
      flex: 0 0 13rem;
    }

    @include mq($until: medium) {
      height: 13rem;
      width: auto;
    }
  }

  &__content {
    padding: $spacing-05 $spacing-05 $spacing-05 $spacing-07;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @include mq($until: large) {
      flex-direction: column;
    }
  }

  &__title {
    flex: 1;
    @include type-style('productive-heading-02');
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    flex: 0;
    justify-content: flex-end;
    margin-left: $spacing-06;

    @include mq($until: large) {
      justify-content: flex-start;
      margin-top: $spacing-03;
      margin-left: 0;
    }

    .bx--tag--purple {
      background-color: $purple-70;
      color: $white;
    }

    .bx--tag:first-child {
      margin-left: 0;
    }
  }

  &__description {
    @include type-style('body-long-01');
    margin-top: $layout-02;
    margin-bottom: $layout-02;
  }
}
</style>
