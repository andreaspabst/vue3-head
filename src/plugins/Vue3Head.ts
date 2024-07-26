// src/plugins/Vue3Head.ts

// Import necessary modules from vue
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import type { App, Ref } from 'vue';

/**
 * Interface for Vue3Head
 * @interface Vue3Head
 */
interface Vue3Head {
    // Method to install the plugin
    install: (app: App) => void;
}

/**
 * Interface for Script
 */
interface Script {
    src: string;
    defer?: boolean;
}

/**
 * Interface for HeadOptions
 * @interface HeadOptions
 */
interface HeadOptions {
    title?: string;
    meta?: Array<{ name: string; content: string|Ref; httpEquiv?: string; charset?: string }>;
    link?: Array<{ rel: string; href: string; integrity?: string; as?: string }>;
    og?: Array<{ property: string; content: string }>;
    twitter?: Array<{ name: string; content: string }>;
    styles?: Array<string>;
    scripts?: Array<string | Script>;
}

/**
 * Function to handle meta elements
 * @param tag - The tag name
 * @param attr - The attribute name
 * @param value - The attribute value
 * @param content - The content of the element
 * @param httpEquiv - The http-equiv attribute
 * @param charset - The charset attribute
 */
function handleMetaElement(
    tag: string,
    attr: string,
    value: string,
    content: string|Ref,
    httpEquiv?: string,
    charset?: string
): void {
    const element = document.querySelector(`${tag}[${attr}="${value}"]`) as HTMLMetaElement;
    if (element) {
        if (typeof content === "string") {
            element.content = content;
        } else {
            element.content = content.value;
        }
    } else {
        const newElement = document.createElement(tag) as HTMLMetaElement;
        newElement.setAttribute(attr, value);
        if (typeof content === "string") {
            newElement.content = content;
        } else {
            newElement.content = content.value;
            if(httpEquiv) {
                newElement.httpEquiv = httpEquiv;
            }
            if(charset) {
                newElement.setAttribute('charset', charset);
            }
            watch(content, () => {
                newElement.content = content.value;
            });
        }
        document.head.appendChild(newElement);
    }
}

/**
 * Function to handle link elements
 * @param tag - The tag name
 * @param attr - The attribute name
 * @param value - The attribute value
 * @param href - The href of the link element
 * @param integrity - The integrity of the link element
 * @param as - The as attribute of the link element
 */
function handleLinkElement(
    tag: string,
    attr: string,
    value: string,
    href: string,
    integrity?: string,
    as?: string
): void {
    const element = document.querySelector(`${tag}[${attr}="${value}"]`) as HTMLLinkElement;
    if (element) {
        element.href = href;
    } else {
        const newElement = document.createElement(tag) as HTMLLinkElement;
        newElement.setAttribute(attr, value);
        newElement.href = href;
        if (as) {
            newElement.as = as;
        }
        if (integrity) {
            newElement.integrity = integrity;
        }
        document.head.appendChild(newElement);
    }
}

/**
 * Function to handle script elements
 * @param scripts - The array of scripts
 */
function handleScriptElements(scripts: Array<string | Script>): void {
    scripts.forEach((script) => {
        if (typeof script === 'string') {
            const element = document.createElement('script');
            element.innerHTML = script;
            document.head.appendChild(element);
        } else if (typeof script === 'object') {
            const element = document.createElement('script');
            element.src = (script as Script).src;
            if ((script as Script).defer) {
                element.defer = true;
            }
            document.head.appendChild(element);
        }
    });
}

/**
 * Function to remove elements from the head on unmount
 * @param tagType
 * @param attr
 * @param elements
 */
function removeElements(tagType: string, attr: string, elements: Array<any>) {
    elements.forEach((element) => {
        let selector = `${tagType}[${attr}="${element[attr]}"]`;
        if (tagType === 'script' && typeof element === 'object') {
            selector = `script[src="${element.src}"]`;
        }
        const domElement = document.querySelector(selector);
        if (domElement) {
            domElement.remove();
        }
    });
}

/**
 * Function to use head options
 * @param options - The head options
 */
export function useHead(options: HeadOptions): void {
    const title = ref<string>(document.title);

    // Make sure options will be reactive
    const reactiveOptions = reactive(options);

    const updateHead = () => {

        if (reactiveOptions.title) {
            document.title = reactiveOptions.title;
        }

        // description
        if (reactiveOptions.meta) {
            reactiveOptions.meta.forEach((meta) => {
                handleMetaElement('meta', 'name', meta.name, meta.content);
            });
        }

        // link
        if (reactiveOptions.link) {
            reactiveOptions.link.forEach((link) => {
                handleLinkElement('link', 'rel', link.rel, link.href, link.integrity, link.as);
            });
        }

        // og
        if (reactiveOptions.og) {
            reactiveOptions.og.forEach((og) => {
                handleMetaElement('meta', 'property', og.property, og.content);
            });
        }

        // twitter
        if (reactiveOptions.twitter) {
            reactiveOptions.twitter.forEach((twitter) => {
                handleMetaElement('meta', 'name', twitter.name, twitter.content);
            });
        }

        // styles
        if (reactiveOptions.styles) {
            reactiveOptions.styles.forEach((style) => {
                const element = document.createElement('style');
                element.innerHTML = style;
                document.head.appendChild(element);
            });
        }

        // scripts
        if (reactiveOptions.scripts) {
            handleScriptElements(reactiveOptions.scripts);
        }
    };

    onMounted(updateHead);

    // Watch for changes in options and update head tags accordingly
    watch(reactiveOptions, updateHead, { deep: true });

    onUnmounted(() => {
        document.title = title.value;

        if (reactiveOptions.meta) {
            removeElements('meta', 'name', reactiveOptions.meta);
        }

        if (reactiveOptions.link) {
            removeElements('link', 'rel', reactiveOptions.link);
        }

        if (reactiveOptions.og) {
            removeElements('meta', 'property', reactiveOptions.og);
        }

        if (reactiveOptions.twitter) {
            removeElements('meta', 'name', reactiveOptions.twitter);
        }

        if (reactiveOptions.styles) {
            removeElements('style', '', reactiveOptions.styles);
        }

        if (reactiveOptions.scripts) {
            removeElements('script', 'src', reactiveOptions.scripts);
        }
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