import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config';

const libConfig = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/plugins/Vue3Head.ts'),
            name: 'Vue3Head',
            fileName: 'vue3-head',
        },
        rollupOptions: {
            external: ['vue'],
            output: { globals: { vue: 'Vue' } },
        },
    },
});

export default mergeConfig(baseConfig, libConfig);