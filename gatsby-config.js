require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const postCardQuery = require('./server/query/postCard')

module.exports = {
  siteMetadata: {
    title: `TeleVet: Veterinary Telemedicine Solutions for Pets`,
    description: `Simplified veterinary telemedicine for pets. Provide care, generate revenue, conserve time. VCPR compliant, seamlessly integrate with your current PIMS.`,
    author: `@getTeleVet`,
    siteUrl: `${process.env.GATSBY_SITE_URL || `https://televet.com`}`,
    banner: `src/images/televet-banner.png`,
    fbId: `1971203419872995`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Televet`,
        short_name: `Televet`,
        description: `Veterinary Telemedicine Solutions for Pets`,
        start_url: `/`,
        background_color: `#292F39`,
        theme_color: `#0065FF`,
        display: `standalone`,
        lang: `en`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://televet.espercreations.com/graphql',
        schema: {
          requestConcurrency: 25,
          perPage: 25,
        },
        debug: {
          graphql: {
            onlyReportCriticalErrors: true,
          },
        },
        html: {
          imageMaxWidth: 800,
          fallbackImageMaxWidth: 800,
          imageQuality: 100,
        },
        develop: {
          nodeUpdateInterval: 600000,
        },
        type: {
          Comment: {
            exclude: true
          },
          WebStoriesExperimentsSettings: {
            exclude: true
          },
          WebStoriesSettings: {
            exclude: true
          }
        },
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/
        }
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true,
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://televet.com',
        sitemap: 'https://televet.com/sitemap.xml',
        policy: [{
          userAgent: '*',
          disallow: [
            '/wp-content/plugins/',
            '/wp-admin/',
            '/*blog?tag='
          ]
        }]
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WRW425V",
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-108859752-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        pageTransitionDelay: 0,
        defer: false,
        optimizeId: "OPT-5ZDL9WZ",
      },
    },
    {
      resolve: 'gatsby-plugin-drift',
      options: {
        appId: 'u7sawtvb6m4v',
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '275472343571096',
      },
    },
    {
      resolve: "gatsby-plugin-hubspot",
      options: {
        trackingCode: "6145055",
        respectDNT: false,
        productionOnly: false,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'posts',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: postCardQuery,
        ref: 'id',
        normalizer: ({ data }) =>
          data.allWpPost.nodes.map((node) => ({
            id: node.id,
            featuredImage: node.featuredImage,
            seoInformation: node.seoInformation,
            title: node.title,
            slug: node.slug,
            excerpt: node.excerpt,
            date: node.date,
            author: node.author
          })),
      },
    },
  ],
}