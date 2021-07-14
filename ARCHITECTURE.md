# Qiskit.org architecture overview

Technical overview of how the code is structured and how it all comes together.

## Table of contents

- [Vue.js components](#vuejs-components)
- [Vuex store](#vuex-store)
- [Design system](#design-system)
- [CSS](#css)
- [Markdown content](#markdown-content)
- [Testing](#testing)
- [Third-party integrations](#third-party-integrations)

## Vue.js components

We write our components as [single file components](https://vuejs.org/v2/guide/single-file-components.html).

The **script section** is written in [class-style syntax](https://class-component.vuejs.org/) with TypeScript and uses decorators provided by [**vue-property-decorator**](https://github.com/kaorun343/vue-property-decorator).

The **style section** is written in SCSS.

Here is an example of a component called `AppCard.vue`:

```vue
<template>
  <div class="app-card">
    <h3 class="app-card__title" v-text="title" />
    <p class="app-card__description" v-text="description" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class AppCard extends Vue {
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: String, required: true }) description!: string
}
</script>

<style lang="scss" scoped>
@import '~carbon-components/scss/globals/scss/typography';

.app-card {
  background-color: $cool-gray-10;

  &__title {
    @include type-style('productive-heading-02');
  }

  &__description {
    @include type-style('body-long-01');
  }
}
</style>
```

## Vuex store

We divide our store into [modules](https://vuex.vuejs.org/guide/modules.html).

To avoid unnecessary boilerplate, we commit _mutations_ directly from Vue.js components and only create _actions_ to dispatch if:

- we need to commit multiple mutations,
- we can reduce complexity by reusing mutations, or
- we need to perform asynchronous operations.

## Design system

Our design is based on the [Carbon Design System](https://www.carbondesignsystem.com/), which is integrated in `/plugins/carbon.ts`.

## CSS

We write our CSS in SCSS and employ [BEM's naming convention](https://getbem.com/).

Global and reusable styles are stored in `assets/scss`.

- `assets/scss/blocks/copy.scss` defines the typography styles
- `assets/scss/layout.scss` contains core layout definitions
- `assets/scss/mixins.scss` contains the mixins
- `assets/scss/mq.scss` defines the layout breakpoints

## Markdown content

We use Markdown files to add content and have two different approaches for this:

- content (old)
- new-content (new)

These approaches currently coexist but we aim to replace the former with the latter.

### content (old)

The old approach takes the Markdown files inside the `content` directory and generates a route for each one, as configured in `nuxt.config.ts` in the [**generate** property](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#routes).

For each route, the content gets extracted from the corresponding Markdown file and the page is generated using `pages/<path>/_slug.vue` as a template.

To load the Front Matter attributes, we use [frontmatter-markdown-loader](https://github.com/hmsk/frontmatter-markdown-loader).

### new-content (new)

The new approach leverages the [**@nuxt/content** module](https://content.nuxtjs.org/), parsing the Markdown files inside the `new-content` directory and making their content fetchable via the `$content` instance.

## Testing

We test our codebase with static and unit tests. These are integrated into our CI/CD pipeline, preventing code changes containing non-passing tests to be integrated into our main branch.

### Static tests

We use [TypeScript](https://www.typescriptlang.org/) and [ESLint](https://eslint.org/) to validate our JavaScript code.

### Unit tests

We write unit tests with Jest to target critical behavior and functionality.

Changes to one of the following must include new or update existing tests:

- hooks
- plugins
- store

## Third-party integrations

### Airtable

We fetch content from [Airtable](https://airtable.com/) before the NuxtJS build starts, as configured in the **hooks** property in `nuxt.config.ts`.

This content is then stored in JSON files and those files are later fetched via Vuex actions.

### Hotjar

We use Hotjar for analytics and integrate it by loading the plugin in `/plugins/hotjar.ts`.

### IBM Cloud Analytics

We use IBM Cloud Analytics for analytics and integrate it by loading the plugin in `/plugins/segment-analytics` when on production or when we enable analytics via an environment flag, as configured in the **plugins** property in `nuxt.config.ts`.
