import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'
import Container from '../../components/container'

// Components
import Intro from './intro'
import Form from './form'

const HillsComponent = ({
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
        basicCtaSections: {
            // Intro Section
            introTitle,
            introDescription,
            // Form Section
            formTitle,
            formCtaLabel,
            hillsCtaConfirmation,
            hubspotFormId
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
            />
            <Section>
                <Container>
                    <Wrapper>
                        <Form
                            title={formTitle}
                            cta_label={formCtaLabel}
                            redirect={hillsCtaConfirmation}
                            id={hubspotFormId}
                            slug={slug}
                        />
                    </Wrapper>
                </Container>
            </Section>
        </Layout>
    )
}

export default HillsComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:6.25rem;
        padding-bottom:6.25rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0, 1fr);
    grid-row-gap:1.5rem;
    width:100%;
    max-width: 50.5rem;
    margin:0 auto;
    @media (min-width:992px) {
        grid-row-gap:2rem;
    }
`

export const pageQuery = graphql`
    query hillsQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            basicCtaSections {
                introTitle
                introDescription
                formTitle
                formCtaLabel
                hubspotFormId
                hillsCtaConfirmation {
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
            }
        }
    }
`