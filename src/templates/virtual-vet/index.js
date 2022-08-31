import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import About from './about'
import Features from './features'
import Clinics from './clinics'
import Reviews from './reviews'
import Story from './story'
import Cta from './cta'

const VirtualVetComponent = ({
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
        virtualVetSections: {
            introTitle,
            introSubtitle,
            introDescription,
            introBackground,
            formTitle,
            formCtaLabel,
            virtualVetClinicsLogos: clinicsLogos,
            virtualVetFormHubspotId,
            virtualVetFormConfirmation,
            aboutRows,
            featuresColumns,
            storyTitle,
            storyDescription,
            storyBackground,
            ctaTitle,
            ctaDescription,
            virtualVetCtaButton,
            virtualVetFormPetOwnerCta: formPetOwnerCta,
            virtualVetReviews: reviews
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
                subtitle={introSubtitle}
                description={introDescription}
                background={introBackground}
                formTitle={formTitle}
                formCtaLabel={formCtaLabel}
                formId={virtualVetFormHubspotId}
                confirmationPage={virtualVetFormConfirmation}
                formPetOwnerCta={formPetOwnerCta}
                slug={slug}
            />
            <About
                items={aboutRows}
            />
            <Features
                items={featuresColumns}
            />
            <Clinics
                items={clinicsLogos}
            />
            <Reviews
                items={reviews.map(({ item }) => item)}
            />
            <Story
                title={storyTitle}
                description={storyDescription}
                background={storyBackground}
            />
            <Cta
                title={ctaTitle}
                description={ctaDescription}
                cta={virtualVetCtaButton}
            />
        </Layout>
    )
}

export default VirtualVetComponent

export const pageQuery = graphql`
    query virtualVetQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            virtualVetSections {
                virtualVetFormPetOwnerCta {
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
                introTitle
                introSubtitle
                introDescription
                introBackground {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 1920, quality: 65) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                formTitle
                formCtaLabel
                virtualVetFormHubspotId
                virtualVetFormConfirmation {
                    type
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                    linkExternal
                }
                featuresColumns {
                    title
                    description
                }
                aboutRows {
                    title
                    description
                    background {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 514, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                virtualVetClinicsLogos {
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
                ctaTitle
                ctaDescription
                virtualVetCtaButton {
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
                storyTitle
                storyDescription
                storyBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 514, quality:100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                virtualVetReviews {
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