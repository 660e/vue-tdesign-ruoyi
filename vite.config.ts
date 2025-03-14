import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),

    // https://tailwindcss.com/docs/installation/using-vite
    tailwindcss(),

    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/prod-api': {
        target: 'https://vue.ruoyi.vip',
        changeOrigin: true,
      },
    },
  },
});
