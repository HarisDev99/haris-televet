import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import About from './about'
import Features from './feautres'
import Clinics from './clinics'
import Reviews from './reviews'
import Cta from './cta'
import Story from './story'
import CtaSplit from '../../components/pageBuilder/ctaSplit'
import SavingsCalculator from '../../components/savingsCalculator/index'
import SavingsCalcWrapper from '../../components/savingsCalculator/wrapper'

const InnovationComponent = ({
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
        innovationSections: {
            introTitle,
            introDescription,
            introBackground,
            introCtaButton,
            formTitle,
            formCtaLabel,
            innovationFormType,
            innovationFormCalendlyUrl,
            innovationFormHubspotId,
            innovationFormConfirmation,
            aboutItems,
            featuresItems,
            clinicsLogos,
            innovationReviews,
            ctaTitle,
            ctaDescription,
            innovationCta,
            storyTitle,
            storyDescription,
            storyBackground,
            innovationFormDescription,
            innovationCalculatorToggle,
            innovationCalculatorClinic,
            innovationCalculatorCosts,
            innovationCalculatorSavings,
            innovationCalculatorTitle
        },
        featuredImage
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
            <CtaSplit
                background={introBackground ? introBackground : featuredImage.node}
                introTitle={introTitle}
                introDescription={introDescription}
                introCta={introCtaButton}
                ctaTitle={formTitle}
                ctaDescription={innovationFormDescription}
                ctaGroup={{
                    type: innovationFormType,
                    label: formCtaLabel,
                    hubspotFormId: innovationFormHubspotId,
                    calendlyUrl: innovationFormCalendlyUrl,
                    confirmationPage: innovationFormConfirmation
                }}
                slug={slug}
            />
            <About
                items={aboutItems}
            />
            {innovationCalculatorToggle &&
            <SavingsCalcWrapper
                title={innovationCalculatorTitle}
            >
                <SavingsCalculator
                    clinic={{
                        title: innovationCalculatorClinic.title,
                        fields: innovationCalculatorClinic.innovationCalculatorFields,
                        background: innovationCalculatorClinic.background
                    }}
                    costs={{
                        title: innovationCalculatorCosts.title,
                        cta: innovationCalculatorCosts.cta,
                        fields: innovationCalculatorCosts.innovationCalculatorFields,
                    }}
                    savings={{
                        title: innovationCalculatorSavings.title,
                        fields: innovationCalculatorSavings.innovationCalculatorFields,
                    }}
                />
            </SavingsCalcWrapper>
            }
            <Features
                items={featuresItems}
            />
            <Clinics
                items={clinicsLogos}
            />
            <Reviews
                items={innovationReviews.map(({ item }) => item)}
            />
            <Story
                title={storyTitle}
                description={storyDescription}
                background={storyBackground}
            />
            <Cta
                title={ctaTitle}
                description={ctaDescription}
                cta={innovationCta}
            />
        </Layout>
    )
}

export default InnovationComponent

export const pageQuery = graphql`
    query innovationQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            featuredImage {
                node {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 400) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
            innovationSections {
                innovationReviews {
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
                introTitle
                introDescription
                introBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 400) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                introCtaButton {
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
                innovationFormType
                innovationFormCalendlyUrl
                formTitle
                formCtaLabel
                innovationFormHubspotId
                innovationFormDescription
                innovationFormConfirmation {
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
                aboutItems {
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
                featuresItems {
                    title
                    description
                }
                clinicsLogos {
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
                ctaTitle
                ctaDescription
                innovationCta {
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
                innovationCalculatorTitle
                innovationCalculatorToggle
                innovationCalculatorClinic {
                    title
                    background {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxHeight: 350) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    innovationCalculatorFields {
                        slider
                        toggle {
                            label
                            options {
                                label
                                tooltip {
                                    enable
                                    description
                                }
                            }
                        }
                    }
                }
                innovationCalculatorCosts {
                    title
                    cta {
                        label
                        linkExternal
                        linkInternal {
                            ... on WpPost {
                                uri
                            }
                            ... on WpPage {
                                uri
                            }
                        }
                        type
                        scopeExternal
                    } 
                    innovationCalculatorFields {
                        label
                        tooltip {
                            enable
                            description
                        }
                    }
                }
                innovationCalculatorSavings {
                    title
                    innovationCalculatorFields {
                        label
                        tooltip {
                            enable
                            description
                        }
                    }
                }
            }
        }
    }
`