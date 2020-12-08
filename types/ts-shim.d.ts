/**
 * Required for Storybook imports of `*.vue` modules from `*.stories.ts` files.
 */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
