<p align="center">
  <a href="https://qiskit.org/">
    <img alt="Qiskit" src="https://qiskit.org/images/qiskit-logo.png" width="70" />
  </a>
</p>
<h1 align="center">
  Qiskit's website
</h1>

<h3 align="center">
  ⚛️ 💻
</h3>

<h3 align="center">
  ⚠️ IMPORTANT UPDATE
</h3>

We renamed the `master` branch to `main` and GitHub is displaying a notice for the contributors visiting the repository. However, this is not compatible with the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) we follow in the team. If you are contributing to qiskit.org, chances are that you have a fork of this project and your `origin` remote is pointing to it. The [Qiskit/qiskit.org](https://github.com/Qiskit/qiskit.org) repository should be your `upstream` remote and so, the instructions provided by GitHub should be directed towards your `upstream` remote:

```
git branch -m master main
git fetch upstream
git branch -u upstream/main main
```

<h3 align="center">
  Welcome to Quantum
</h3>
<p align="center">
  Qiskit is an open-source quantum computing software development framework for leveraging today's quantum processors in research, education, and business.
</p>
<p align="center">
  <a href="https://github.com/Qiskit/qiskit.org/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="Qiskit.org is released under the Apache 2.0 License." />
  </a>
  <a href="https://github.com/Qiskit/qiskit.org/actions">
    <img src="https://github.com/Qiskit/qiskit.org/workflows/build%20and%20deploy/badge.svg?branch=main" alt="Current GitHub Action build status." />
  </a>
  <a href="https://github.com/Qiskit/qiskit.org/blob/main/CONTRIBUTING.rst">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=qiskit">
    <img src="https://img.shields.io/twitter/follow/qiskit.svg?label=Follow%20@qiskit" alt="Follow @qiskit" />
  </a>
</p>

<h3 align="center">
  <a href="https://qiskit.org/">Home page</a>
  <span> · </span>
  <a href="https://qiskit.org/learn/">Learn</a>
  <span> · </span>
  <a href="https://qiskit.org/documentation/">Documentation</a>
  <span> · </span>
  <a href="https://qiskit.org/advocates/">Advocates</a>
  <span> · </span>
  Support: <a href="http://ibm.co/joinqiskitslack">Slack</a>
</h3>

## What’s In This Document

- [What’s In This Document](#whats-in-this-document)
- [⚡️ Live](#️-live)
- [💻 Technology Used](#-technology-used)
- [🚀 Get Up and Running](#-get-up-and-running)
- [🏭 Content Generation](#-content-generation)
- [🎚️Other environment flags](#️other-environment-flags)
  - [Enable analytics](#enable-analytics)
- [🧐 Directory structure](#-directory-structure)
- [✏️ How to Contribute](#️-how-to-contribute)
- [🛠 Available Scripts](#-available-scripts)
- [🗓 Open backlog](#-open-backlog)
- [👩‍💻 Maintainers](#-maintainers)

## ⚡️ Live
[Go to Qiskit.org's website](https://qiskit.org/)

## 💻 Technology Used

Qiskit.org is a pre-rendering SPA using [Nuxt.js](https://nuxtjs.org/).

A **pre-rendering SPA** is a single page application that generates a static markup (HTML) at build time. The user, when entering the web, receives HTML (as if it were a static web) but in the meantime, JS files belonging to the SPA are loaded “hydrating” the web until it's completely dynamic.

**[Nuxt.js](https://nuxtjs.org/)** is the biggest framework on top of **[Vue.js](https://vuejs.org/)** to generate *universal* SPAs. Universal or "isomorphic" apps can be pre-rendering or SSR. Since so far we don't need server functions, our website is just pre-rendering.

We create and run unit tests using [Jest](https://jestjs.io/), ensure avoiding syntax errors using [ESLint](https://eslint.org/) and automate all these previous tools and deployment using [Travis](https://travis-ci.org/).

With this technology we want to **achieve**:
- Separation between content edition and development concerns.
- Use a component-based framework like Vue that allow us to reuse part of the UI code in different parts of the application.
- Fast initial page load.
- Index content on Search Engines.
- Test JS unit functions.
- Avoid syntax errors.
- Continuous integration pipeline.

## 🚀 Get Up and Running


1. **Download this repository and go to its folder**

    ```shell
    git clone git@github.com:Qiskit/qiskit.org.git && cd qiskit.org
    ```

2. **Install dependencies**

    ```shell
     npm install
     ```

3. **Run a local server with hot reload at [localhost:3000](localhost:3000)**

    ```shell
    npm run dev
    ```
## 🏭 Content Generation

qiskit.org integrates with the tools used by the IBM Quantum Community Team and generates some content based on 3rd party APIs such as Airtable. Part of this content is prefetched during building time. While developing, it is disabled by default. If you want enable content generation, you must set the environment variable `GENERATE_CONTENT`. For instance:

```shell
GENERATE_CONTENT=1 npm run dev
```

Notice that, for communicating with the team tools, API keys may be required. It is the case of dealing with Airtable for the generation of the event index. If you think you should have access to these tables, talk to the Event Squad in the Community Team, get your developer API key and set the `AIRTABLE_API_KEY` environment variable to this value:

```shell
GENERATE_CONTENT=1 AIRTABLE_API_KEY=<your airtable api key> npm run dev
```

## 🎚️Other environment flags

### Enable analytics

In production, the user can authorize us to gather analytics so we can identify
trends and improve our user experience. In development, analytics are disabled
by default. To enable, set the `ENABLE_ANALYTICS` environment variable.

## 🧐 Directory structure

    qiskit.org/
    ├─ app/
    ├─ assets/
    ├─ components/
    ├─ constants/
    ├─ content/
    ├─ deploy/
    ├─ hooks/
    ├─ layouts/
    ├─ mixins/
    ├─ new-content/
    ├─ pages/
    ├─ plugins/
    ├─ static/
    ├─ store/
    ├─ tests/
    ├─ types/
    ├─ nuxt.config.js
    ├─ ... other third-parties configuration files like ESLint, Jest or Travis

-  **`app/`**: Global scripts.

    Currently only contains `router.ScrollBehavior.js` for controlling the behavior of the scroll when navigating.

-  **`assets/`**: Un-compiled Sass files.

    More information: [NuxtJS documentation on the _assets_ directory](https://nuxtjs.org/docs/2.x/directory-structure/assets)

-  **`components/`**: Vue.js components.

    More information: [NuxtJS documentation on the _components_ directory](https://nuxtjs.org/docs/2.x/directory-structure/components)

-  **`constants/`**: Shared constants.

-  **`content/`**: Content Markdown and JSON files included via the [`generate` property](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#routes).

    The files are organized in folders matching the website's information architecture.

-  **`deploy/`**: Deployment configuration.

-  **`hooks/`**: Shared hook functions.

-  **`layouts/`**: Nuxt layout components.

    More information: [NuxtJS documentation on the _layouts_ directory](https://nuxtjs.org/docs/2.x/directory-structure/layouts)

- **`mixins/`**: Shared Vue.js mixins.

- **`new-content/`**: Content Markdown files included via `@nuxtjs/content`.

    This directory would usually be named `content`, but that name was already in use in our project.

    More information: [NuxtJS documentation on the _content_ directory](https://nuxtjs.org/docs/2.x/directory-structure/content)

- **`pages/`**: The base application views and routes.

    More information: [NuxtJS documentation on the _pages_ directory](https://nuxtjs.org/docs/2.x/directory-structure/pages)

- **`plugins/`**: JavaScript plugins that run before instantiating the root Vue.js application.

    More information: [NuxtJS documentation on the _pages_ directory](https://nuxtjs.org/docs/2.x/directory-structure/plugins)

- **`static/`**: Files that will be automatically served by Nuxt and will be accessible through the project root URL.

    More information: [NuxtJS documentation on the _static_ directory](https://nuxtjs.org/docs/2.x/directory-structure/static)

- **`store/`**: Vuex store files.

    More information: [NuxtJS documentation on the _store_ directory](https://nuxtjs.org/docs/2.x/directory-structure/store)

- **`tests/`**: Jest unit tests.

- **`types/`**: Additional types for non-typed libraries or global definitions.

- **`nuxt.config.js`**: Main NuxtJS configuration.

    More information: [NuxtJS documentation on the _nuxt.config_ file](https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config)

## ✏️ How to Contribute

Contributions are always welcome, no matter how large or small. Before contributing, please read the [contributing guide](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).

## 🛠 Available Scripts

Run a local server enabling inspector agent:
```shell
  npm run dev-debug
```

Run unit tests made with [Jest](https://jestjs.io/):
```shell
  npm run test
```

Build static version ready for production, output will be generated inside a new folder called `dist`:
```shell
  npm run build
```

Run a local server on the website's production built. Make sure you ran `npm run build` first:
```shell
  npm run start
```

Find syntax errors. We use [ESLint](https://eslint.org/):
```shell
  npm run lint
```

Autofix linter:
```shell
  npm run fix-lint
```

## 🗓 Open backlog

You can see our backlog [here](https://github.com/Qiskit/qiskit.org/projects/2).

## 👩‍💻 Maintainers

In alphabetical order:

<table>
<tr>
<td align="center"><a href="https://github.com/abdonrd"><img src="https://avatars3.githubusercontent.com/u/1007051?s=460&u=c56ec45cdd107902cc332c6c90a18a9701b4c4d7&v=4" width="120px;" alt="Abdón Rodríguez"/><br /><sub><b>Abdón Rodríguez</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Aabdonrd" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=abdonrd" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/eddybrando"><img src="https://avatars2.githubusercontent.com/u/22047320?s=460&u=58f460132271f2ea45d270841f3821eb46c4bb5e&v=4" width="120px;" alt="Eddybrando Vásquez"/><br /><sub><b>Eddybrando Vásquez</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Aeddybrando" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=eddybrando" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/korgan00"><img src="https://avatars1.githubusercontent.com/u/4138279?s=400&v=4" width="120px;" alt="Gregorio Iniesta"/><br /><sub><b>Gregorio Iniesta</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Akorgan00" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=korgan00" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/lerongil"><img src="https://avatars3.githubusercontent.com/u/9096989?s=460&v=4" width="120px;" alt="Leron Gil"/><br /><sub><b>Leron Gil</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Alerongil" title="Bug reports">🐛</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
</tr>
<tr>
<td align="center"><a href="https://github.com/techtolentino"><img src="https://avatars2.githubusercontent.com/u/6276074?s=460&v=4" width="120px;" alt="Randy Tolentino"/><br /><sub><b>Randy Tolentino</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Atechtolentino" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=techtolentino" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/JRussellHuffman"><img src="https://avatars1.githubusercontent.com/u/7633881?s=460&u=8c1e462d7fdb0f899ee02f70a4990e693b96226f&v=4" width="120px;" alt="Randy Tolentino"/><br /><sub><b>Russell Huffman</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3AJRussellHuffman" title="Design">🎨</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/delapuente"><img src="https://avatars1.githubusercontent.com/u/757942?s=460&v=4" width="120px;" alt="Salvador de la Puente"/><br /><sub><b>Salvador de la Puente</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Adelapuente" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=delapuente" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
<td align="center"><a href="https://github.com/y4izus"><img src="https://avatars2.githubusercontent.com/u/17231966?s=460&v=4" width="120px;" alt="Yaiza García"/><br /><sub><b>Yaiza García</b></sub></a><br /><a href="https://github.com/qiskit/qiskit.org/issues?q=author%3Ay4izus" title="Bug reports">🐛</a><a href="https://github.com/qiskit/qiskit.org/commits?author=y4izus" title="Code">💻</a><a href="https://join.slack.com/t/qiskit/shared_invite/enQtODQ2NTIyOTgwMTQ3LTI0NzM2NzkzZjJhNDgzZjY5MTQzNDY3MGNiZGQzNTNkZTE4Nzg1MjMwMmFjY2UwZTgyNDlmYWQwYmZjMjE1ZTM" title="Answering Questions on Slack">💬</a></td>
</tr>
</table>
