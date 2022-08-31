import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Features from './features'
import Compliance from './compliance'
import Reviews from './reviews'
import Cta from './cta'

const FeaturesComponent = ({
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
        featuresSections: {
            // Intro Section
            introSubtitle,
            introTitle,
            introDescription,
            introBackground,
            featuresIntroCta,
            // Features Section
            featureList,
            // Compliance Section
            complianceTitle,
            complianceLogo,
            complianceSubtitle,
            complianceDescription,
            featuresComplianceCta,
            featuresReview
        }
    } = page

    const {
        reviewContent: {
            reviewAuthor,
            reviewRole,
            reviewContent,
            reviewAvatar
        }
    } = featuresReview

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
                subtitle={introSubtitle}
                title={introTitle}
                description={introDescription}
                cta={featuresIntroCta}
                background={introBackground}
            />
            <Features
                items={featureList}
            />
            <Compliance
                title={complianceTitle}
                logo={complianceLogo}
                subtitle={complianceSubtitle}
                description={complianceDescription}
                cta={featuresComplianceCta}
            />
            <Reviews
                name={reviewAuthor}
                role={reviewRole}
                description={reviewContent}
                background={reviewAvatar}
            />
            <Cta/>
        </Layout>
    )
}

export default FeaturesComponent

export const pageQuery = graphql`
    query featuresQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            featuresSections {
                featuresReview {
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
                introSubtitle
                introTitle
                introDescription
                featuresIntroCta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            link: uri
                        }
                        ... on WpPost {
                            link: uri
                        }
                    }
                    linkExternal
                    scopeExternal
                }
                introBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxHeight: 466) {
                                ...GatsbyImageSharpFluid_withWebp_noBase64
                            }
                        }
                    }
                }
                featureList {
                    title
                    description
                    background {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 558, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                complianceTitle
                complianceLogo {
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
                complianceSubtitle
                complianceDescription
                featuresComplianceCta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            link: uri
                        }
                        ... on WpPost {
                            link: uri
                        }
                    }
                    linkExternal
                    scopeExternal
                }
            }
        }
    }
`