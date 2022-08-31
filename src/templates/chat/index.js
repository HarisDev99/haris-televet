import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import About from './about'
import Clinics from './clinics'
import Reviews from './reviews'
import Cta from './cta'

const ChatComponent = ({
    data: {
        page,
    },
    pageContext: {
        wordpress_path: slug
    }
}) => {
    const {
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        chatSections: {
            introTitle,
            introDescription,
            introBackground,
            formTitle,
            formCtaLabel,
            chatFormHubspotId,
            chatFormConfirmation,
            aboutColumns,
            clinicsLogos,
            ctaTitle,
            ctaDescription,
            ctaLink,
            chatFormPetOwnerCta: formPetOwnerCta,
            chatReviews
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
                formTitle={formTitle}
                formCtaLabel={formCtaLabel}
                formId={chatFormHubspotId}
                confirmationPage={chatFormConfirmation}
                formPetOwnerCta={formPetOwnerCta}
                slug={slug}
            />
            <About
                items={aboutColumns}
            />
            <Clinics
                items={clinicsLogos}
            />
            <Reviews
                items={chatReviews.map(({ item }) => item)}
            />
            <Cta
                title={ctaTitle}
                description={ctaDescription}
                cta={ctaLink}
            />
        </Layout>
    )
}

export default ChatComponent

export const pageQuery = graphql`
    query chatQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            chatSections {
                chatReviews {
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
                chatFormHubspotId
                chatFormConfirmation {
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
                chatFormPetOwnerCta {
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
                aboutColumns {
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
                clinicsLogos: chatClinicsLogos {
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
                ctaLink {
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