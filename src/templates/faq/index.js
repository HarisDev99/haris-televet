import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import Accordion from '../../components/accordion'

const FaqComponent = ({
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
        faqSections: {
            introTitle,
            faqItems
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
                        grid-row-gap:4.375rem;
                    `}
                >
                    <Title className={`sm:text--2xl lg:text--4xl`}>{introTitle}</Title>
                    <Accordion
                        items={faqItems}
                    />
                </Container>
            </Section>
        </Layout>
    )
}

export default FaqComponent

// Styled Components
const Section = styled.section`
        padding-top:5rem;
        padding-bottom:5rem;
`
const Title = styled.h1`
    text-align:center;
`

// Page Query
export const pageQuery = graphql`
    query faqQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            faqSections {
                introTitle
                faqItems {
                    title
                    description
                }
            }
        }
    }
`