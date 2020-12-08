/// <reference path="types/index.d.ts" />

import path from 'path'
import fs from 'fs'
import consola from 'consola'

import markdownIt from 'markdown-it'
import miLinkAttributes from 'markdown-it-link-attributes'
import miAnchor from 'markdown-it-anchor'
import uslug from 'uslug'
import Mode from 'frontmatter-markdown-loader/mode'

import { NuxtConfig } from '@nuxt/types'
import pkg from './package.json'
import fetchEvents from './hooks/update-events'

const {
  NODE_ENV,
  ENABLE_ANALYTICS,
  GENERATE_CONTENT,
  AIRTABLE_API_KEY
} = process.env

const IS_PRODUCTION = NODE_ENV === 'production'

const md = markdownIt({
  linkify: true,
  html: true
})

md.use(miLinkAttributes, {
  pattern: /^https?:/,
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
})

md.use(miAnchor, {
  slugify (id: any) { return uslug(id) }
})

const config: NuxtConfig = {
  mode: 'universal',
  env: {
    analyticsScriptUrl: IS_PRODUCTION
      ? 'https://cloud.ibm.com/analytics/build/bluemix-analytics.min.js'
      : 'https://dev.console.test.cloud.ibm.com/analytics/build/bluemix-analytics.min.js',
    analyticsKey: IS_PRODUCTION
      ? 'ffdYLviQze3kzomaINXNk6NwpY9LlXcw'
      : 'zbHWEXPUfXm0K6C7HbegwB5ewDEC8o1H'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/static/css/fonts.css'
  ],

  /*
  ** Content
  */
  content: {
    dir: 'new-content'
  },

  /*
  ** Plugins to load before mounting the App.
  */
  plugins: [
    '~/plugins/router-hooks.ts',
    '~/plugins/carbon.ts',
    '~/plugins/deep-load.ts',
    { src: '~/plugins/hotjar.ts', mode: 'client' },
    ...optional(
      IS_PRODUCTION || ENABLE_ANALYTICS,
      { src: '~/plugins/segment-analytics.ts', mode: 'client' } as const
    )
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxt/content',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-lazy-load'
  ],

  components: true,

  styleResources: {
    /*
    ** Do not include styles! Only variables, mixins and functions.
    */
    scss: [
      './assets/scss/mq.scss',
      './assets/scss/mixins.scss',
      './assets/scss/carbon/community-theme.scss'
    ]
  },

  /*
  ** Migrating from Nuxt 2.8.x to 2.9.y
  ** https://typescript.nuxtjs.org/migration.html
  */
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    babel: {
      /**
       * core-js@3 required for Storybook integration with Nuxt < 2.14.0.
       * https://storybook.nuxtjs.org/setup
       * Required dependencies: @babel/runtime-corejs3, core-js@3
       */
      presets () {
        return [
          ['@nuxt/babel-preset-app', { corejs: { version: 3 } }]
        ]
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.module = config.module || { rules: [] }
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'content'),
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS, Mode.VUE_COMPONENT, Mode.HTML],
          vue: {
            root: 'content'
          },
          markdown: (body: any) => {
            return md.render(body)
          }
        }
      })
    },

    // TODO: Workaround for dealing with. Remove once its solved:
    // https://github.com/nuxt/nuxt.js/issues/3877
    splitChunks: {
      layouts: true
    }
  },

  generate: {
    routes: (function () {
      const events = getContentUrls('events')
      const learnPages = getContentUrls('learn')

      return [...events, ...learnPages]

      function getContentUrls (contentRoot: string): string[] {
        return fs.readdirSync(path.resolve(__dirname, 'content', contentRoot))
          .filter(isContentAndNotReadme)
          .map(toContentUrl(contentRoot))
      }

      function isContentAndNotReadme (filename: string): boolean {
        return path.extname(filename) === '.md' &&
               path.parse(filename).name.toUpperCase() !== 'README'
      }

      function toContentUrl (contentRoot: string): (s: string) => string {
        return (filename: string): string => {
          return `/${contentRoot}/${path.parse(filename).name}`
        }
      }
    })()
  },

  hooks: {
    build: {
      async before () {
        if (!IS_PRODUCTION && !GENERATE_CONTENT) {
          console.warn('Skipping content generation. Set GENERATE_CONTENT to enable it.')
          return
        }
        await generateContent()
      }
    }
  }
}

function optional<T> (test: any, ...plugins: T[]): T[] {
  return test ? plugins : []
}

async function generateContent () {
  if (AIRTABLE_API_KEY) {
    consola.info('Generating community event previews')
    await fetchEvents(AIRTABLE_API_KEY, './content/events')
  } else {
    consola.warn('Cannot generate events: missing AIRTABLE_API_KEY environment variable')
  }
}

export default config
