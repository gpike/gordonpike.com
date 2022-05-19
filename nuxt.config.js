import common from './utils/common'

const site = common.readYaml('./content', 'siteconfig.yml')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: site.title,
    htmlAttrs: {
      lang: 'en-US',
      // class: 'bg-black',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: site.description },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:site_name', content: site.og_site_name },
      { property: 'og:image:width', content: site.og_image_width },
      { property: 'og:image:height', content: site.og_image_height },
      { name: 'twitter:site', content: site.twitter_site },
      { name: 'twitter:card', content: site.twitter_card },
      {
        hid: 'keywords',
        property: 'keywords',
        content: site.keywords,
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        hid: 'gtm-script1',
        src: 'https://www.googletagmanager.com/ns.html?id=GTM-5N4C3WT',
        defer: true,
      },
      {
        hid: 'gtm-script2',
        innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5N4C3WT');
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      {
        hid: 'google-adsense',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6802417804193475',
        crossorigin: 'anonymous',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway&family=Roboto&family=Roboto+Slab&display=swap',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'G-8X2MMD1JDV',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  sitemap: {
    hostname: 'https://gordonpike.com',
    gzip: true,
    exclude: ['/secret', '/admin/**'],
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        Object.entries(document).forEach(([key, value]) => {
          const _key = `case_insensitive__${key}`

          // Strings
          if (!document[_key] && typeof value === 'string') {
            document[_key] = value.toLocaleLowerCase()
          }

          // Arrays
          if (!document[_key] && Array.isArray(value)) {
            document[_key] = value.map((val) => {
              if (typeof val === 'string') {
                return val.toLocaleLowerCase()
              }
              return val
            })
          }
        })
      }
    },
  },
}
