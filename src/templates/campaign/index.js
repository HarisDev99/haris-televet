import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import About from './about'
import Reviews from './reviews'
import Cta from './cta'
import Intro from './intro'

const CampaignComponent = ({
    data: {
        page,
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
        campaignSections: {
            campaignIntroTitle,
            campaignIntroDescription,
            campaignIntroBackground,
            campaignIntroCtaButton,
            campaignAboutItems,
            campaignReviews,
            campaignCtaTitle,
            campaignCtaDescription,
            campaignCta,
        },
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
                title={campaignIntroTitle}
                description={campaignIntroDescription}
                background={campaignIntroBackground}
                cta={campaignIntroCtaButton}
            />
            <About
                items={campaignAboutItems}
            />
            <Cta
                title={campaignCtaTitle}
                description={campaignCtaDescription}
                cta={campaignCta}
            />
            <Reviews
                items={campaignReviews.map(({ item }) => item)}
            />
        </Layout>
    )
}

export default CampaignComponent

export const pageQuery = graphql`
    query campaignQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            campaignSections {
                campaignReviews {
                    item {
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
                }
                campaignIntroTitle
                campaignIntroDescription
                campaignIntroBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 549) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                campaignIntroCtaButton {
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
                campaignAboutItems {
                    title
                    description
                    background {
                        localFile {
                            extension
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 514, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    cta {
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
                campaignCtaTitle
                campaignCtaDescription
                campaignCta {
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