<template>
  <article class="page-section the-learn-section">
    <div class="bx--grid">
      <h2>Learn with Qiskit</h2>
      <LearnCard />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class TheLearnSection extends Vue {}
</script>

<style lang="scss" scoped>
.the-learn-section {
  @include responsive-grid-bg('/images/grid/grid-left.svg', 36rem);

  background-repeat: no-repeat;
  background-position: left bottom -2px;
}
</style>
