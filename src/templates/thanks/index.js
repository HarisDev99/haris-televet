import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import Blog from './blog'

const ThanksComponent = ({
    data: {
        page,
        posts,
        blog,
        resources
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
        thanksSections: {
            introTitle,
            introDescription,
            introSubtitle,
            aboutTitle,
            aboutDescription,
            introThanksCta,
            thanksBlogTitle
        }
    } = page

    const {
        resourcesBlogCtaLabel,
        resourcesBlogGridCta
    } = resources.resourcesPageSections

    const blogSettings = {
        resourcesBlogCtaLabel,
        resourcesBlogGridCta
    }

    const blogGroup = {
        posts: posts.nodes,
        category: {
            id: blog.id,
            name: blog.name,
            uri: blog.uri,
            slug: blog.slug,
            resourceCategorySettings: {
                resourceCategoryGridCta: blogSettings.resourcesBlogGridCta.title ? blogSettings.resourcesBlogGridCta.title : "Want to see more Blog articles?",
                resourceCategoryGridCtaLabel: blogSettings.resourcesBlogGridCta.label ? blogSettings.resourcesBlogGridCta.label : "View All Blog Articles",
                resourceCategoryCtaLabel: blogSettings.resourcesBlogCtaLabel ? blogSettings.resourcesBlogCtaLabel : "Discover More"
            }
        },
    }

    return (
        <Layout
            footer={false}
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
                <Container fullWidth
                    sm={`
                        grid-row-gap:3rem;
                    `}
                    lg={`
                        height:100%;
                        grid-template-columns:repeat(2, minmax(0,1fr));
                        padding: 0 calc(50% - 570px);
                        grid-column-gap:8rem;
                        align-items:center;
                    `}
                >
                    <Wrapper className={`confirmation__wrapper--primary`}>
                        <Header>
                            <h1 className={`sm:text--3xl lg:text--5xl`}>
                                {introTitle}
                                <Subtitle>{introSubtitle}</Subtitle>
                            </h1>
                            <p className={`sm:text--lg`}>
                                {introDescription}
                            </p>
                            {introThanksCta.type === `internal` ?
                                <Button as={GatsbyLink} className={`button button--secondary sm:text--lg`} to={introThanksCta.linkInternal.link}>
                                    {introThanksCta.label}
                                </Button>
                            :
                                <Button className={`button button--secondary sm:text--lg`} href={introThanksCta.linkExternal} target={introThanksCta.scopeExternal && `_blank`}>
                                    {introThanksCta.label}
                                </Button>
                            }
                        </Header>
                    </Wrapper>
                    <Wrapper className={`confirmation__wrapper--secondary`}>
                        <Content>
                            <h2 className={`lg:text--4xl`}>{aboutTitle}</h2>
                            <Description className={`sm:text--lg`}>
                                {aboutDescription}
                            </Description>
                        </Content>
                    </Wrapper>
                </Container>
            </Section>
            <Blog
                title={thanksBlogTitle}
                settings={blogGroup}
            />
        </Layout>
    )
}

export default ThanksComponent

// Styled Components
const Section = styled.section`
    display: flex;
    align-items: center;
    background-color:${props => props.theme.color.grey[50]};
    padding-top:6.25rem;
    @media (min-width:992px) {
        min-height:100vh;
        background: linear-gradient(90deg, #fff 50%, ${props => props.theme.color.grey[50]} 50%);
    }
`
const Wrapper = styled.div`
    padding:0 1.5rem;
    &.confirmation__wrapper--secondary {
        background-color:#fff;
    }
    @media (min-width:992px) {
        padding:1.25rem 1.5rem 7.5rem 1.5rem;
        &.confirmation__wrapper--secondary {
            background-color:transparent;
            grid-column:1/2;
            grid-row:1;
        }
        &.confirmation__wrapper--primary {
            max-width:100%;
            grid-column:2/3;
            grid-row:1;
        }
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    text-align:center;
    justify-items:center;
    margin: 0 auto;
    width: 100%;
    max-width: 30rem;
    @media (min-width:992px) {
        max-width:initial;
    }
`
const Subtitle = styled.span`
    display:block;
    margin-top:1.25rem;
    @media (min-width:992px) {
        margin-top:0.875rem;
        font-size:2.875rem;
        line-height: 1.4;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    text-align:center;
    margin: 0 auto;
    width: 100%;
    max-width: 30rem;
    padding:2.5rem 0;
    @media (min-width:992px) {
        grid-row-gap:3rem;
        text-align:left;
        max-width:initial;
        padding:0;
    }
`
const Description = styled.p`
    @media (min-width:992px) {
        max-width:22.5rem;
    }
`
const Button = styled.a`
    width:100%;
    @media (min-width:992px) {
        width:max-content;
        margin-top:1rem;
    }
`

export const pageQuery = graphql`
    query thanksQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            thanksSections {
                thanksBlogTitle
                introTitle
                introDescription
                introSubtitle
                aboutTitle
                aboutDescription
                introThanksCta {
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
        blog: wpPage(
            slug: {
                eq: "blog"
            }
        ) {
            id
            name: title
            uri
            slug
        }
        resources: wpPage(
            slug: {
                eq: "resources"
            }
        ) {
            resourcesPageSections {
                resourcesBlogToggle
                resourcesBlogCtaLabel
                resourcesBlogGridCta {
                    title
                    label
                }
            }
        }
        posts: allWpPost(
            limit: 5
        ) {
            nodes {
                ...resourceBlogCard
            }
        }
    }
`