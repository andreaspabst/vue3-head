// src/plugins/Vue3Head.ts

// Import necessary modules from vue
import {ref, onMounted, onUnmounted} from 'vue';
import type { Ref } from 'vue'
import type { App } from 'vue';

/**
 * Interface for Vue3Head
 * @interface Vue3Head
 */
interface Vue3Head {
    // Method to install the plugin
    install: (app: App) => void;
}

/**
 * Interface for HeadOptions
 * @interface HeadOptions
 */
interface HeadOptions {
    title?: string;
    meta?: Array<{ name: string; content: string }>;
    link?: Array<{ rel: string; href: string }>;
    og?: Array<{ property: string; content: string }>;
    twitter?: Array<{ name: string; content: string }>;
}

/**
 * Function to handle meta elements
 * @param tag - The tag name
 * @param attr - The attribute name
 * @param value - The attribute value
 * @param content - The content of the element
 */
function handleMetaElement(
    tag: string,
    attr: string,
    value: string,
    content: string
): void {
    const element = document.querySelector(`${tag}[${attr}="${value}"]`) as HTMLMetaElement;
    if (element) {
        element.content = content;
    } else {
        const newElement = document.createElement(tag) as HTMLMetaElement;
        newElement.setAttribute(attr, value);
        newElement.content = content;
        document.head.appendChild(newElement);
    }
}

/**
 * Function to handle link elements
 * @param tag - The tag name
 * @param attr - The attribute name
 * @param value - The attribute value
 * @param href - The href of the link element
 */
function handleLinkElement(
    tag: string,
    attr: string,
    value: string,
    href: string
): void {
    const element = document.querySelector(`${tag}[${attr}="${value}"]`) as HTMLLinkElement;
    if (element) {
        element.href = href;
    } else {
        const newElement = document.createElement(tag) as HTMLLinkElement;
        newElement.setAttribute(attr, value);
        newElement.href = href;
        document.head.appendChild(newElement);
    }
}

/**
 * Function to use head options
 * @param options - The head options
 */
export function useHead(options: HeadOptions): void {
    const title = ref<string>(document.title);

    onMounted(() => {

        if (options.title) {
            document.title = options.title;
        }

        // description
        if (options.meta) {
            options.meta.forEach((meta) => {
                handleMetaElement('meta', 'name', meta.name, meta.content);
            });
        }

        // link
        if (options.link) {
            options.link.forEach((link) => {
                handleLinkElement('link', 'rel', link.rel, link.href);
            });
        }

        // og
        if (options.og) {
            options.og.forEach((og) => {
                handleMetaElement('meta', 'property', og.property, og.content);
            });
        }

        // twitter
        if (options.twitter) {
            options.twitter.forEach((twitter) => {
                handleMetaElement('meta', 'name', twitter.name, twitter.content);
            });
        }

    });

    onUnmounted(() => {
        document.title = title.value;
        // Reset other properties as needed
    });
}

/**
 * Function to create Vue3Head
 * @returns Vue3Head
 */
export function createVue3Head(): Vue3Head {
    return {
        install(app: App) {
            // Here you can add the logic to install your plugin
        }
    }
}