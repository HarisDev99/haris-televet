import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'
import Container from '../../components/container'

// Component
import Intro from '../../components/pageBuilder/headerHeart'
import Calculator from '../../components/calculator/index'
import Cta from '../../components/pageBuilder/ctaButton'

const FeeSavingsComponent = ({
    data: {
        page
    },
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
        feeSavingsPage,
        slug
    } = page

    const {
        feeSavingsIntroTitle,
        feeSavingsIntroDescription,
        feeSavingsCalcFields,
        feeSavingsCalcDescription,
        feeSavingsCtaSubtitle,
        feeSavingsCtaDescription,
        feeSavingsCtaGroup,
    } = feeSavingsPage
    
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
                title={feeSavingsIntroTitle}
                description={feeSavingsIntroDescription}
            />
            <CalculatorSection>
                <Container>
                    <Calculator
                        items={feeSavingsCalcFields}
                        label={feeSavingsCalcDescription}
                    />
                </Container>
            </CalculatorSection>
            <Cta
                title={feeSavingsCtaSubtitle}
                description={feeSavingsCtaDescription}
                cta={feeSavingsCtaGroup}
                bgColor
            />
        </Layout>
    )
}

export default FeeSavingsComponent

// Styled Component
const CalculatorSection = styled.section`
    padding-top:4.5rem;
    padding-bottom:4.5rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`

export const pageQuery = graphql`
    query feeSavingsQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            slug
            ...pagePopupSettings
            feeSavingsPage {
                feeSavingsIntroTitle
                feeSavingsIntroDescription
                feeSavingsCalcFields {
                    title
                    description
                }
                feeSavingsCalcDescription
                feeSavingsCtaSubtitle
                feeSavingsCtaDescription
                feeSavingsCtaGroup {
                    type
                    label
                    linkExternal
                    scopeExternal
                    linkInternal {
                        ... on WpPost {
                            uri
                        }
                        ... on WpPage {
                            uri
                        }
                    }
                }
            }
        }
    }
`