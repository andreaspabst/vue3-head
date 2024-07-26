# vue3-head
Manage the head section of your page with ease. Set title, meta description etc. easily by using this Vue 3 Plugin

[![Vue JS Seminar](https://www.vuejs-seminar.de/img/VuejsSeminar/logo_color.png "Vue JS Seminar")](https://www.vuejs-seminar.de/)

## Why is there a package?

Typically the `<head>` section of your app is outside of your Vue JS app.
This makes it hard to manage the head section of your app with Vue JS.
Use this package to embed or change the head section of your app with ease.

Things you can do with this package:
- Set the title of your page
- Set the meta description of your page
- Set the meta keywords of your page
- Set the meta author of your page
- Set the meta robots of your page
- Set the meta viewport of your page
- Set the meta charset of your page
- Set the meta http-equiv of your page
- Set the meta og:[**] of your page
- Set the meta twitter:[**] of your page
- Set the link canonical of your page
- Set the link alternate of your page
- Set the link icon of your page
- Set the link stylesheet of your page
- Set the link dns-prefetch of your page
- Set the link preconnect of your page
- Set the link prerender of your page

etc.

## Installation

Run npm or yarn installation of the vue3-head package:

### yarn
```bash
$ yarn add vue3-head
```

### npm
```bash
$ npm install vue3-head
```

### Set Up your Vue Application

```vue
// App.vue

import { createApp } from 'vue'
import App from './App.vue'
import { createVue3Head from 'vue3-head';

const app = createApp(App)
const head = createVue3Head()
app.use(head)

app.mount('#app')
```


## Usage

### Basic Usage (JSON+LD as Slot)

```vue
<script setup>
import { useHead } from 'vue3-head'

useHead({
    title: 'Your website',
    //...
})
</script>
```

## Examples

### Mixing reactivity and strings

```vue
<script setup>
import { ref } from "vue";
import { useHead } from "vue3-head";

const newTitle = ref("Vue 3 Head Plugin");
const newDescription = ref("Vue 3 Head Plugin is a Vue 3 plugin that allows you to manage your document head tags with ease.");
const theCanonical = ref("https://example.com");
const theUrl = ref("https://example.com");
const favicon = ref("https://example.com/favicon.ico");
const newViewport = ref("width=device-width, initial-scale=2");

useHead({
  title: newTitle.value,
  meta: [
    { name: "description", content: newDescription.value },
    { name: "keywords", content: "Vue 3, Head, Plugin" },
    { name: "viewport", content: newViewport.value },
  ],
  link: [
    { rel: "icon", href: favicon.value },
    { rel: "canonical", href: theCanonical.value },
  ],
  og: [
    { property: "og:title", content: newTitle.value },
    { property: "og:description", content: newDescription.value },
    { property: "og:url", content: theUrl.value },
  ],
});
</script>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | String | | The title of the page |
| meta | Array | | An array of meta tags |
| link | Array | | An array of link tags |
| og | Array | | An array of Open Graph tags |
| twitter | Array | | An array of Twitter tags |


## Resources

- [📺 IT Pabst YouTube](https://www.youtube.com/channel/UC2qIzllaHNtseSXwj18r-7w)
- [Vue JS Seminars and Coaching](https://www.vuejs-seminar.de/)
- [Vue JS 3 JSON LD Plugin](https://www.vuejs-seminar.de/packages/vue3-json-ld)
- [Vue JS 3 Head Plugin](https://www.vuejs-seminar.de/packages/vue3-head)
- [Laravel Seminars and Coaching](https://www.laravel-seminar.de/)
- [Andreas Pabst](https://www.andreaspabst.com)