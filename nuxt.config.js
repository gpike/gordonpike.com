export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.gordonpike.com',
      siteName: 'Gordon Pike',
      siteDescription: 'The personal website of Gordon Pike.',
      language: 'en', // prefer more explicit language codes like `en-AU` over `en`
      signupUrl:
        'https://cdn.forms-content.sg-form.com/e9506151-d546-11ec-accf-32fb5df42af2',
    },
  },
  content: {
    documentDriven: {
      layoutFallbacks: ['theme'],
      globals: {
        theme: {
          layout: 'default',
        },
      },
    },
  },
  app: {
    cdnURL: '/',
    htmlAttrs: {
      lang: 'en',
    },
    head: {
      script: [
        {
          hid: 'gtmHead',
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5N4C3WT');`,
        },
      ],
      __dangerouslyDisableSanitizers: ['noscript'],
      noscript: [
        {
          hid: 'gtmBody',
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N4C3WT"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          body: true,
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
  },
})
