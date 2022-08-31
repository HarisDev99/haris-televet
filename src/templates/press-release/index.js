import React from "react"
import { graphql } from "gatsby"

// Layout Components
import Layout from "../../components/layout/index"
import Seo from "../../components/seo"

// Components
import Intro from "./intro"
import Column from "./column"
import CtaColumn from "./ctaColumn"
import Footer from "./footer"

const SolutionsComponent = ({ data: { page } }) => {
  const {
    slug,
    seoInformation: { seoTitle, seoDescription, seoNoindex },
    pagePopupSettings: { pagePopupToggle, pagePopupContent },
    pressReleaseTemplate,
  } = page

  return (
    <Layout
      pagePopup={
        pagePopupToggle
          ? {
              ...pagePopupContent,
              slug,
            }
          : null
      }
    >
      <Seo title={seoTitle} description={seoDescription} noindex={seoNoindex} />
      <Intro
        banners={
          pressReleaseTemplate?.banners?.length &&
          pressReleaseTemplate?.banners.map(
            banner => banner?.image?.localFile?.childImageSharp?.fluid
          )
        }
      />
      <Column
        align="left"
        title={pressReleaseTemplate?.introColumns[0]?.title}
        description={pressReleaseTemplate?.introColumns[0]?.description}
        bannerType={pressReleaseTemplate?.introColumns[0]?.type}
        bannerSrc={pressReleaseTemplate?.introColumns[0]?.video}
        bannerPlaceholder={
          pressReleaseTemplate?.introColumns[0].image?.localFile
            ?.childImageSharp?.fluid
        }
        bannerCaption={pressReleaseTemplate?.introColumns[0]?.videoCaption}
      />
      <Column
        align="right"
        title={pressReleaseTemplate?.introColumns[1]?.title}
        description={pressReleaseTemplate?.introColumns[1]?.description}
        bannerType={pressReleaseTemplate?.introColumns[1]?.type}
        bannerSrc={pressReleaseTemplate?.introColumns[1]?.video}
        bannerPlaceholder={
          pressReleaseTemplate?.introColumns[1]?.image?.localFile
            .childImageSharp?.fluid
        }
        bannerCaption={pressReleaseTemplate?.introColumns[1]?.videoCaption}
      />
      <CtaColumn
        title={pressReleaseTemplate?.cta?.title}
        ctaLink={pressReleaseTemplate?.cta?.link}
        ctaLabel={pressReleaseTemplate?.cta?.label}
      />
      <Column
        align="left"
        title={pressReleaseTemplate?.detailsColumns[0]?.title}
        description={pressReleaseTemplate?.detailsColumns[0]?.description}
        bannerType={pressReleaseTemplate?.detailsColumns[0].type}
        bannerSrc={pressReleaseTemplate?.detailsColumns[0].video}
        bannerPlaceholder={
          pressReleaseTemplate?.detailsColumns[0]?.image?.localFile
            ?.childImageSharp?.fluid
        }
        bannerGif={pressReleaseTemplate.detailsColumns[0]?.gif?.localFile?.url}
        bannerContain="contain"
      />
      <Column
        align="right"
        title={pressReleaseTemplate?.detailsColumns[1]?.title}
        description={pressReleaseTemplate?.detailsColumns[1]?.description}
        bannerType={pressReleaseTemplate?.detailsColumns[1]?.type}
        bannerSrc={pressReleaseTemplate?.detailsColumns[1]?.video}
        bannerPlaceholder={
          pressReleaseTemplate?.detailsColumns[1]?.image?.localFile
            ?.childImageSharp?.fluid
        }
        bannerGif={pressReleaseTemplate.detailsColumns[1]?.gif?.localFile?.url}
      />
      <Footer
        title={pressReleaseTemplate?.footer?.title}
        description={pressReleaseTemplate?.footer?.description}
        links={pressReleaseTemplate?.footer?.links}
        ctaSubtitle={pressReleaseTemplate?.footer?.ctaSubtitle}
        ctaTitle={pressReleaseTemplate?.footer?.ctaTitle}
        ctaLink={pressReleaseTemplate?.footer?.ctaLink}
        ctaLabel={pressReleaseTemplate?.footer?.ctaLabel}
      />
    </Layout>
  )
}

export default SolutionsComponent

export const pageQuery = graphql`
  query pressReleasePageQueryPageQuery($databaseId: Int!) {
    page: wpPage(databaseId: { eq: $databaseId }) {
      seoInformation {
        seoTitle
        seoDescription
        seoNoindex
      }
      ...pagePopupSettings
      pressReleaseTemplate {
        banners: pressReleaseBanners {
          image {
            localFile {
              childImageSharp {
                fluid(maxHeight: 468, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        introColumns: pressReleaseIntroColumns {
          video
          type
          title
          description
          videoCaption
          image {
            localFile {
              childImageSharp {
                fluid(maxHeight: 468, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        cta: pressReleaseCta {
          title
          link
          label
        }
        detailsColumns: pressReleaseDetailsColumns {
          description
          title
          type
          video
          gif {
            localFile {
              url
            }
          }
          image {
            localFile {
              childImageSharp {
                fluid(maxHeight: 468, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        footer: pressReleaseFooter {
          title
          description
          ctaTitle
          ctaSubtitle
          ctaLink
          ctaLabel
          links: pressReleaseLinks {
            link
            label
          }
        }
      }
    }
  }
`
