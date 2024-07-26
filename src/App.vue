<template>
  <div class="container mt-5">
    <h1>Vue 3 Head Plugin</h1>
    <p>Vue 3 Head Plugin is a Vue 3 plugin that allows you to manage your document head tags with ease. It provides an API for adding, removing, and updating meta tags, link tags, styles, scripts, and more.</p>

    <h2>Example Usage</h2>
    <p>Check the document head tags to see the changes made by the plugin.</p>
    <input type="text" v-model="newTitle" class="form-control mb-3" placeholder="Enter new title">
    <p>Currently the title should be {{newTitle}}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "./plugins/Vue3Head";

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
