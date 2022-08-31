import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Features from './features'
import Rtb from './rtb'
import Benefits from './benefits'
import Reviews from './reviews'
import Compliance from '../../components/pageBuilder/compliance'
import Cta from './cta'
import Integrations from './integrations'

const ProductComponent = ({
    data: {
        page
    },
    pageContext: {
        wordpress_path: slug
    }
}) => {
    const {
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        productPageSections: {
            productIntroLogo,
            productIntroTitle,
            productIntroDescription,
            productIntroButton,
            productIntroBanner,
            productFeaturesRows,
            productRtbTitle,
            productRtbDescription,
            productRtbBackground,
            productBenefitsTitle,
            productBenefitsColumns,
            productReviewItems,
            productComplianceTitle,
            productComplianceSubtitle,
            productComplianceDescription,
            productComplianceCta,
            productComplianceLogo,
            productCtaSubtitle,
            productCtaTitle,
            productCtaButtons,
            productIntegrationsTitle,
            productIntegrationsLogos,
            productIntegrationsCta,
            productCtaPosition
        }
    } = page

    return (
        <Layout 
            pagePopup={pagePopupToggle ? {
                ...pagePopupContent,
                slug
            } : null}
        >
            <Seo 
                title={seoTitle}
                description={seoDescription}
                slug={slug}
                noindex={seoNoindex}
            />
            <Intro
                logo={productIntroLogo}
                title={productIntroTitle}
                description={productIntroDescription}
                cta={productIntroButton}
                videoBannerType={productIntroBanner.type}
                videoUrl={productIntroBanner.type === `internal` ? productIntroBanner.videoInternal.localFile.publicURL : productIntroBanner.videoExternal}
                videoPlaceholder={productIntroBanner.placeholder}
            />
            <Benefits
                title={productBenefitsTitle}
                items={productBenefitsColumns}
            />
            <Features
                items={productFeaturesRows}
            />
            <Rtb
                title={productRtbTitle}
                description={productRtbDescription}
                background={productRtbBackground}
            />
            {productCtaPosition && <Cta
                subtitle={productCtaSubtitle}
                title={productCtaTitle}
                buttons={productCtaButtons}
                border
            />}
            <Integrations
                title={productIntegrationsTitle}
                logos={productIntegrationsLogos}
                cta={productIntegrationsCta}
            />
            <Reviews
                items={productReviewItems}
            />
            <Compliance
                title={productComplianceTitle}
                logo={productComplianceLogo}
                subtitle={productComplianceSubtitle}
                description={productComplianceDescription}
                cta={productComplianceCta}
            />
            {!productCtaPosition && <Cta
                subtitle={productCtaSubtitle}
                title={productCtaTitle}
                buttons={productCtaButtons}
            />}
        </Layout>
    )
}

export default ProductComponent

export const pageQuery = graphql`
    query productPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            productPageSections {
                productCtaPosition
                productIntroLogo {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fixed(width: 450) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                }
                productIntroTitle
                productIntroDescription
                productIntroButton {
                    type
                    label
                    linkExternal
                    scopeExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                }
                productIntroBanner {
                    type
                    videoExternal
                    videoInternal {
                        localFile {
                            publicURL
                        }
                    }
                    placeholder {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    srcWebp
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                productFeaturesRows {
                    title
                    description
                    background {
                        type
                        imageStatic {
                            title
                            altText
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth:524) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                        imageAnimated {
                            mediaDetails {
                                width
                                height
                            }
                            localFile {
                                publicURL
                            }
                        }
                        video {
                            type
                            videoExternal
                            videoInternal {
                                localFile {
                                    publicURL
                                }
                            }
                        }
                        placeholder {
                            title
                            altText
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth:524) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        srcWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                        }
                    }
                }
                productRtbTitle
                productRtbDescription
                productRtbBackground {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth:800) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                productBenefitsTitle
                productBenefitsColumns {
                    title
                    description
                    icon {
                        title
                        altText
                        localFile {
                            publicURL
                            extension
                            childImageSharp {
                                fixed(height:96) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
                productReviewItems {
                    ... on WpReview {
                        reviewContent {
                            reviewRole
                            reviewContent
                            reviewAuthor
                            reviewAvatar {
                                title
                                altText
                                localFile {
                                    childImageSharp {
                                        fixed(height: 64, width: 64) {
                                            ...GatsbyImageSharpFixed_withWebp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                productComplianceTitle
                productComplianceSubtitle
                productComplianceDescription
                productComplianceLogo {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fixed(height: 48, quality:100) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                }
                productComplianceCta {
                    type
                    label
                    linkExternal
                    scopeExternal
                    linkInternal {
                        ... on WpPage {
                            link: uri
                        }
                        ... on WpPost {
                            link: uri
                        }
                    }
                }
                productCtaSubtitle
                productCtaTitle
                productCtaButtons {
                    type
                    label
                    linkExternal
                    scopeExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                }
                productIntegrationsTitle
                productIntegrationsLogos {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 160, quality:100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                productIntegrationsCta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                    linkExternal
                    scopeExternal
                }
            }
        }
    }
`