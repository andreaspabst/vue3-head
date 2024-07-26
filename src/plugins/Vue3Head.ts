// src/plugins/Vue3Head.ts

// Import necessary modules from vue
import {ref, onMounted, onUnmounted, watch} from 'vue';
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

interface HeadOptions {
    title?: string;
    meta?: Array<{ name: string; content: string }>;
    link?: Array<{ rel: string; href: string }>;
    og?: Array<{ property: string; content: string }>;
    twitter?: Array<{ name: string; content: string }>;
}

export function useHead(options: HeadOptions): void {
    const title = ref<string>(document.title);

    onMounted(() => {

        if (options.title) {
            document.title = options.title;
        }

        // description
        if (options.meta) {
            options.meta.forEach((meta) => {
                const metaTag = document.querySelector(`meta[name="${meta.name}"]`) as HTMLMetaElement;
                if (metaTag) {
                    metaTag.content = meta.content;
                    return;
                } else {
                    const metaTag = document.createElement('meta');
                    metaTag.name = meta.name;
                    metaTag.content = meta.content;
                    document.head.appendChild(metaTag);
                }
            });
        }

        // link
        if (options.link) {
            options.link.forEach((link) => {
                // is there already an element with the same settings?
                const linkTag = document.querySelector(`link[rel="${link.rel}"]`) as HTMLLinkElement;
                if (linkTag) {
                    // change its values
                    linkTag.rel = link.rel;
                    linkTag.href = link.href;
                } else {
                    const newLinkTag = document.createElement('link');
                    newLinkTag.rel = link.rel;
                    newLinkTag.href = link.href;
                    document.head.appendChild(newLinkTag);
                }
            });
        }

        // og
        if (options.og) {
            options.og.forEach((og) => {
                const ogTag = document.querySelector(`meta[property="${og.property}"]`) as HTMLMetaElement;
                if (ogTag) {
                    ogTag.content = og.content;
                    return;
                } else {
                    const ogTag = document.createElement('meta');
                    ogTag.setAttribute('property', og.property);
                    ogTag.content = og.content;
                    document.head.appendChild(ogTag);
                }
            });
        }

        // twitter
        if (options.twitter) {
            options.twitter.forEach((twitter) => {
                const twitterTag = document.querySelector(`meta[name="${twitter.name}"]`) as HTMLMetaElement;
                if (twitterTag) {
                    twitterTag.content = twitter.content;
                    return;
                } else {
                    const twitterTag = document.createElement('meta');
                    twitterTag.name = twitter.name;
                    twitterTag.content = twitter.content;
                    document.head.appendChild(twitterTag);
                }
            });
        }

    });

    onUnmounted(() => {
        document.title = title.value;
        // Reset other properties as needed
    });
}

export function createVue3Head(): Vue3Head {
    return {
        install(app: App) {
            // Here you can add the logic to install your plugin
        }
    }
}