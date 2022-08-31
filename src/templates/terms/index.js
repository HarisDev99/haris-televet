import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

// Utils
import parseContent from '../../utils/parseContent'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'
import Container from '../../components/container'

// Components
import Intro from './intro'

const TermsComponent = ({
    pageContext: {
        title,
        wordpress_path: slug
    },
    data: {
        page
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
        legalSections: {
            content,
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
                title={title}
            />
            <Section>
                <Container>
                    <Wrapper>
                        {parseContent(content)}
                    </Wrapper>
                </Container>
            </Section>
        </Layout>
    )
}

export default TermsComponent

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
    max-width:35rem;
    margin:0 auto;
    width:100%;
    @media (min-width:992px) {
        grid-row-gap:2rem;
    }
`

export const pageQuery = graphql`
    query termsQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            legalSections {
                content
            }
        }
    }
`