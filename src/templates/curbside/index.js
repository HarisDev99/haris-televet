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
import Subscribe from '../../components/pageBuilder/ctaButton'

const CurbsideComponent = ({
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
        curbsideSections: {
            // Intro Section
            introSubtitle,
            introTitle,
            introDescription,
            introBackground,
            curbsideIntroCta,
            // Features Section
            curbsideFeatureList,
            // Compliance Section
            complianceTitle,
            complianceLogo,
            complianceSubtitle,
            complianceDescription,
            curbsideComplianceCta,
            curbsideReview,
            // Subscribe Section
            subscribeTitle,
            subscribeSubtitle,
            curbsideSubscribeCta
        }
    } = page

    const {
        reviewContent: {
            reviewAuthor,
            reviewRole,
            reviewContent,
            reviewAvatar
        }
    } = curbsideReview

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
                cta={curbsideIntroCta}
                background={introBackground}
            />
            <Features
                items={curbsideFeatureList}
            />
            <Subscribe
                title={subscribeSubtitle}
                description={subscribeTitle}
                cta={curbsideSubscribeCta}
                bgColor
            />
            <Reviews
                name={reviewAuthor}
                role={reviewRole}
                description={reviewContent}
                background={reviewAvatar}
            />
            <Compliance
                title={complianceTitle}
                logo={complianceLogo}
                subtitle={complianceSubtitle}
                description={complianceDescription}
                cta={curbsideComplianceCta}
            />
            <Cta/>
        </Layout>
    )
}

export default CurbsideComponent
 
export const pageQuery = graphql`
    query curbsideQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            curbsideSections {
                subscribeTitle
                subscribeSubtitle
                curbsideSubscribeCta {
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
                curbsideReview {
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
                curbsideIntroCta {
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
                curbsideFeatureList {
                    title
                    description
                    background {
                        title
                        altText
                        localFile {
                            extension
                            publicURL
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
                curbsideComplianceCta {
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