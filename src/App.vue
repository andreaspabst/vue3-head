<template>
  <div class="container mt-5">
    <h1>Vue 3 Head Plugin</h1>
    <p>Vue 3 Head Plugin is a Vue 3 plugin that allows you to manage your document head tags with ease. It provides an API for adding, removing, and updating meta tags, link tags, styles, scripts, and more.</p>

    <h2>Example Usage</h2>
    <p>Check the document head tags to see the changes made by the plugin.</p>
    <input type="text" v-model="newTitle" class="form-control mb-3" placeholder="Enter new title">
    <input type="text" v-model="newDescription" class="form-control mb-3" placeholder="Enter new description">
    <p>Currently the title should be <strong>{{newTitle}}</strong> and the description should be <strong>{{newDescription}}</strong>.</p>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useHead, setTitle } from "./plugins/Vue3Head";

const newTitle = ref("Vue 3 Head Plugin");
const newDescription = ref("Vue 3 Head Plugin is a Vue 3 plugin that allows you to manage your document head tags with ease.");
const theCanonical = ref("https://example.com");
const theUrl = ref("https://example.com");
const favicon = ref("https://example.com/favicon.ico");
const newViewport = ref("width=device-width, initial-scale=2");

onMounted(() => {
  setTitle("Welcome");
})

/*useHead({
  title: newTitle, // this will update the title tag
  meta: [
    { name: "description", content: newDescription.value }, // newDescription won't update the meta tag
    { name: "keywords", content: "Vue 3, Head, Plugin" },
    { name: "viewport", content: newViewport.value },
  ],
  link: [
    {rel: "icon", href: favicon.value},
    {rel: "canonical", href: theCanonical.value},
    {rel: "preload", href: "https://www.funnerix.com/js/widget_loader.js?v=2.0", as: "script"},
    {rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", integrity: "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH", crossorigin: "anonymous"},
  ],
  og: [
    {property: "og:title", content: newTitle.value},
    {property: "og:description", content: newDescription.value},
    {property: "og:url", content: theUrl.value},
  ],
  styles: [
    "body { background-color: #f0f0f0; }",
  ],
  scripts: [
    { src: "https://www.funnerix.com/js/widget_loader.js?v=2.0", defer: true },
    'console.log("Hello from Vue 3 Head Plugin")',
  ],
});*/
</script>
