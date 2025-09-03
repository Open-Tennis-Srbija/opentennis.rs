import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
     resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            '@components': path.resolve(__dirname, 'resources/js/Pages/components'),
            '@matches': path.resolve(__dirname, 'resources/js/Pages/matches'),
            '@pages': path.resolve(__dirname, 'resources/js/Pages'),
            '@utils': path.resolve(__dirname, 'resources/js/utils'),
            '@assets': path.resolve(__dirname, 'resources/js/assets/'),
            '@fonts': path.resolve(__dirname, 'resources/fonts/'),
            '@abstracts': path.resolve(__dirname, 'resources/css/sass/abstracts')
        },
    },
    server: {
        host: true, // This allows external access
        port: 5173,
        strictPort: true,
        hmr: {
            port: 5173,
            host: '192.168.1.147',
        },
    },
});