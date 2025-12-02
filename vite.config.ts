import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
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
      globs: ['src/components/*/index.vue', 'src/components/*.vue'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),

    // https://www.npmjs.com/package/vite-svg-loader
    svgLoader({
      defaultImport: 'url',
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
