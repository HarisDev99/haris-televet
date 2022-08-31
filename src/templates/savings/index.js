import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'


// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'
import Container from '../../components/container'

// Components
import Calculator from './calculator'
import Features from './features'
import Cta from '../../components/pageBuilder/ctaButton'

const SavingsCalculatorComponent = ({
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
        savingsSections: {
            calculatorIntroTitle,
            calculatorClinicFields,
            calculatorClinicTitle,
            calculatorClinicBackground,
            calculatorCostsTitle,
            calculatorCostsCta,
            calculatorCostsFields,
            calculatorSavingsFields,
            calculatorSavingsTitle,
            calculatorCtaTitle,
            calculatorCtaDescription,
            calculatorCtaButton,
            calculatorFeaturesSections,
            calculatorFeaturesTitle
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
            <Section>
                <Container
                    sm={`
                        grid-row-gap:3rem;
                    `}
                    lg={`
                        grid-row-gap:4.5rem;
                    `}
                >

                    <h1 className="sm:text--2xl lg:text--3xl" style={{ textAlign: 'center' }}>{calculatorIntroTitle}</h1>
                    <Calculator
                        clinic={{
                            title: calculatorClinicTitle,
                            fields: calculatorClinicFields,
                            background: calculatorClinicBackground
                        }}
                        costs={{
                            title: calculatorCostsTitle,
                            cta: calculatorCostsCta,
                            fields: calculatorCostsFields,
                        }}
                        savings={{
                            title: calculatorSavingsTitle,
                            fields: calculatorSavingsFields,
                        }}
                    />
                </Container>
            </Section>
            {calculatorFeaturesSections && calculatorFeaturesSections.length > 0 &&
                <Features
                    title={calculatorFeaturesTitle}
                    items={calculatorFeaturesSections}
                />
            }
            <Cta
                title={calculatorCtaTitle}
                description={calculatorCtaDescription}
                cta={calculatorCtaButton}
                bgColor
            />
        </Layout>
    )
}

export default SavingsCalculatorComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`

export const pageQuery = graphql`
    query savingsQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            savingsSections {
                calculatorFeaturesTitle
                calculatorFeaturesSections {
                    title
                    description
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
                calculatorCtaTitle
                calculatorCtaDescription
                calculatorCtaButton {
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
                calculatorIntroTitle
                calculatorClinicFields {
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
                calculatorClinicTitle
                calculatorClinicBackground {
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
                calculatorCostsCta {
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
                calculatorCostsFields {
                    label
                    tooltip {
                        enable
                        description
                    }
                }
                calculatorSavingsFields {
                    label
                    tooltip {
                        enable
                        description
                    }
                }
                calculatorCostsTitle
                calculatorSavingsTitle
            }
        }
    }
`