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
import CtaButton from '../../components/pageBuilder/ctaButton'

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
        pimsPageSections: {
            pimsIntroLogo,
            pimsIntroTitle,
            pimsIntroDescription,
            pimsIntroButton,
            pimsIntroBanner,
            pimsFeaturesRows,
            pimsRtbTitle,
            pimsRtbDescription,
            pimsRtbBackground,
            pimsBenefitsTitle,
            pimsBenefitsColumns,
            pimsReviewItems,
            pimsComplianceTitle,
            pimsComplianceSubtitle,
            pimsComplianceDescription,
            pimsComplianceCta,
            pimsComplianceLogo,
            pimsCtaSubtitle,
            pimsCtaTitle,
            pimsCtaButtons,
            pimsIntegrationsTitle,
            pimsIntegrationsLogos,
            pimsIntegrationsCta,
            pimsCtaOneTitle,
            pimsCtaOneDescription,
            pimsCtaOneCtaGroup,
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
                logo={pimsIntroLogo}
                title={pimsIntroTitle}
                description={pimsIntroDescription}
                cta={pimsIntroButton}
                videoBannerType={pimsIntroBanner.type}
                videoUrl={pimsIntroBanner.type === `internal` ? pimsIntroBanner.videoInternal.localFile.publicURL : pimsIntroBanner.videoExternal}
                videoPlaceholder={pimsIntroBanner.placeholder}
            />
            <Rtb
                title={pimsRtbTitle}
                description={pimsRtbDescription}
                background={pimsRtbBackground}
            />
            <Integrations
                title={pimsIntegrationsTitle}
                logos={pimsIntegrationsLogos}
                cta={pimsIntegrationsCta}
            />
            <Features
                items={pimsFeaturesRows}
            />
            <CtaButton
                title={pimsCtaOneTitle}
                description={pimsCtaOneDescription}
                cta={pimsCtaOneCtaGroup}
                bgColor
            />
            <Benefits
                title={pimsBenefitsTitle}
                items={pimsBenefitsColumns}
            />
            <Reviews
                items={pimsReviewItems}
            />
            <Cta
                subtitle={pimsCtaSubtitle}
                title={pimsCtaTitle}
                buttons={pimsCtaButtons}
            />
            <Compliance
                title={pimsComplianceTitle}
                logo={pimsComplianceLogo}
                subtitle={pimsComplianceSubtitle}
                description={pimsComplianceDescription}
                cta={pimsComplianceCta}
            />
        </Layout>
    )
}

export default ProductComponent

export const pageQuery = graphql`
    query pimsPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
           pimsPageSections {
                pimsCtaOneTitle
                pimsCtaOneDescription
                pimsCtaOneCtaGroup {
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
                pimsIntroLogo {
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
                pimsIntroTitle
                pimsIntroDescription
                pimsIntroButton {
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
                pimsIntroBanner {
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
                                }
                            }
                        }
                    }
                }
                pimsFeaturesRows {
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
                pimsRtbTitle
                pimsRtbDescription
                pimsRtbBackground {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth:800) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                pimsBenefitsTitle
                pimsBenefitsColumns {
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
                pimsReviewItems {
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
                pimsComplianceTitle
                pimsComplianceSubtitle
                pimsComplianceDescription
                pimsComplianceLogo {
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
                pimsComplianceCta {
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
                pimsCtaSubtitle
                pimsCtaTitle
                pimsCtaButtons {
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
                pimsIntegrationsTitle
                pimsIntegrationsLogos {
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
                pimsIntegrationsCta {
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