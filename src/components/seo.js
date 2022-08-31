import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// Banner
import defaultBanner from '../images/seo-banner.jpg'

// Fonts
import preloadFontA from "./fonts/LinearSans-Regular.woff2"
import preloadFontB from "./fonts/LinearSans-Semibold.woff2"

// Utils
import useGlobalSeo from '../hooks/useGlobalSeo'

function SEO({ 
  description, 
  lang, 
  meta, 
  title, 
  noindex, 
  slug,
  banner,
  bannerWidth = 1200,
  bannerHeight = 628,
  canonical,
  type = `website`
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            fbId
          }
        }
      }
    `
  )

  const siteUrl = process.env.GATSBY_SITE_URL || site.siteMetadata.siteUrl

  const metaDescription = description || site.siteMetadata.description
    
  const url = slug ? `${siteUrl}/${slug}` : siteUrl

  const {
    globalSeoBanner
  } = useGlobalSeo()

  const bannerLink = banner ? banner : globalSeoBanner && globalSeoBanner.localFile ? globalSeoBanner.localFile.publicURL : defaultBanner

  const bannerUrl = `${siteUrl}${bannerLink}`

  const developmentIndex = process.env.GATSBY_NO_INDEX === 'true'

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        noindex || developmentIndex ? {
          name: `robots`,
          content: `noindex`
        } : {},
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `image`,
          content: `${bannerUrl}`,
        },
        {
          property: `fb:app_id`,
          content: `${site.siteMetadata.fbId}`,
        },
        {
          property: `og:site_name`,
          content: `TeleVet`
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `${type}`,
        },
        {
          property: `og:image`,
          content: `${bannerUrl}`,
        },
        {
          property: `og:image:width`,
          content: `${bannerWidth}`,
        },
        {
          property: `og:image:height`,
          content: `${bannerHeight}`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${bannerUrl}`,
        }
      ].concat(meta)}
    >
      <link
        rel="preload"
        as="font"
        href={preloadFontA}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={preloadFontB}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {canonical &&
      <link
        rel={`canonical`}
        href={`${siteUrl}${canonical}`}
      />
      }
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
