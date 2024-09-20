import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'node:url'
import tailwindcss from 'tailwindcss'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,

  app: {
    head: {
      titleTemplate: 'ACLAS ',
      title: 'ACLAS',
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      }],
    },
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
    '@layouts/styles/index.scss',
    'vue-toastification/dist/index.css',  // Add toast styles
  ],

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  plugins: [
    '@/plugins/vuetify/index.js',
    '@/plugins/iconify/index.js',
    '~/plugins/ckeditor.js',
    '~/plugins/toast.js',  // Add toast plugin
    '@/plugins/toast-utils',
     '~/plugins/primevue.js'
  ],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
  },

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
        },
      },
    },
  },

  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
      },
    },

    build: {
      chunkSizeWarningLimit: 5000,
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './**/*.vue',
      ],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        },
      }),
    ],
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@pinia/nuxt',
    "@nuxtjs/i18n",
    "@vite-pwa/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    '@primevue/nuxt-module'
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'ar', iso: 'ar-AR', name: 'العربية', file: 'ar.json', dir: 'rtl' }
    ],
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    langDir: 'locales/',
    lazy: true,
    vueI18n: './i18n/i18n.config.ts'
  },

  compatibilityDate: '2024-09-13',
})
