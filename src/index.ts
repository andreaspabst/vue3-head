// Import necessary modules from vue
import type { App } from 'vue';
import { useHead } from './plugins/Vue3Head';

/**
 * Interface for Vue3Head
 * @interface Vue3Head
 */
interface Vue3Head {
    // Method to install the plugin
    install: (app: App) => void;
}

export class createVue3Head {
    static install(app: App) {
        // Provide useHead function to all components
        app.provide('useHead', useHead);
    }
}