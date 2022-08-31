import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Reviews from './reviews'

const VetReferComponent = ({
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
        vetReferralSections: {
            introTitle,
            introDescription,
            introBackground,
            vetReferralHubspotFormId,
            formCtaLabel,
            aboutSections,
            reviewsTitle,
            confirmationPage,
            vetReferralReviews
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
                title={introTitle}
                description={introDescription}
                background={introBackground}
                formId={vetReferralHubspotFormId}
                cta_label={formCtaLabel}
                confirmation_page={confirmationPage}
                items={aboutSections}
                slug={slug}
            />
            <Reviews
                title={reviewsTitle}
                items={vetReferralReviews.map(({ item }) => item)}
            />
        </Layout>
    )
}

export default VetReferComponent

export const pageQuery = graphql`
    query vetReferralQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            vetReferralSections {
                introTitle
                introDescription
                introBackground {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 1144, quality: 100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                vetReferralHubspotFormId
                formCtaLabel
                aboutSections {
                    title
                    description
                }
                reviewsTitle
                confirmationPage {
                    ... on WpPage {
                        uri
                    }
                }
                vetReferralReviews {
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
            }
        }
    }
`