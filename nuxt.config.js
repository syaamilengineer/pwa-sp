import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/axios',
    '@/plugins/vee-validate',
    '@/plugins/localStorage'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-material-design-icons'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === 'production'
        ? ''
        : process.env.NODE_ENV === 'staging'
        ? 'http://188.166.190.42:3000/api'
        : 'http://localhost:3000/api',
    https: process.env.NODE_ENV === 'production'
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Manifest for PWA
   */
  manifest: {
    name: 'Syaamil Pay',
    short_name: 'Syaamil Pay Lite',
    description: 'Syaamil Pay Lite Version for Mobile',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#00D8A6',
    theme_color: '#027be3',
    icons: [
      {
        src: '/v.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/v.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/v.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/v.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/v.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: '/v.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }
}
