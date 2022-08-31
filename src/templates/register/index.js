import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import Review from './review'
import Cta from './cta'
import Blog from './blog'

// Utils
import parseContent from '../../utils/parseContent'

const RegisterComponent = ({
    data: {
        page,
        posts
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
        registerSections: {
            introSubtitle,
            introTitle,
            registerIntroDescription,
            registerReview,
            registerCtaTitle,
            registerCtaHeaderCta,
            registerCtaContainer,
            registerBlogToggle,
            registerBlogTitle,
        }
    } = page

    const {
        reviewContent: {
            reviewAuthor,
            reviewRole,
            reviewContent,
            reviewAvatar
        }
    } = registerReview

    return (
        <Layout
            footer={false}
            headerBorder
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
                        grid-template-columns:repeat(2, minmax(0,1fr));
                        padding: 0 calc(50% - 640px);
                        grid-column-gap:8rem;
                        align-items:start;
                    `}
                >
                    <Wrapper className={`register__wrapper--primary`}>
                        <Header>
                            <Subtitle className={`sm:text--lg`}>{introSubtitle}</Subtitle>
                            <h1 className={`sm:text--4xl`}>{introTitle}</h1>
                            {registerIntroDescription && <Content>
                                {parseContent(registerIntroDescription)}
                            </Content>}
                        </Header>
                        <Review
                            display={`sm:d-none lg:d-grid`}
                            name={reviewAuthor}
                            role={reviewRole}
                            description={reviewContent}
                            background={reviewAvatar}

                        />
                    </Wrapper>
                    <Wrapper className={`register__wrapper--primary register__wrapper--calendly`}>
                        <Cta
                            headerCta={registerCtaHeaderCta}
                            title={registerCtaTitle}
                            primaryCta={registerCtaContainer}
                            slug={slug}
                        />
                    </Wrapper>
                    <Wrapper className={`sm-d-block lg:d-none register__wrapper--secondary`}>
                        <Review
                            display={`sm:d-grid lg:d-none`}
                            name={reviewAuthor}
                            role={reviewRole}
                            description={reviewContent}
                            background={reviewAvatar}
                        />
                    </Wrapper>
                </Container>
            </Section>
            {registerBlogToggle && 
                <Blog
                title={registerBlogTitle}
                items={posts.nodes}
                />
            }
        </Layout>
    )
}

export default RegisterComponent

// Styled Components
const Section = styled.section`
    min-height:100vh;
    background-color:${props => props.theme.color.grey[50]};
    padding-top:6.25rem;
    @media (min-width:992px) {
        background: linear-gradient(90deg, #fff 50%, ${props => props.theme.color.grey[50]} 50%);
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Wrapper = styled.div`
    padding:0 1.5rem;
    &.register__wrapper--primary {
        margin:0 auto;
        width:100%;
        max-width:30rem;
    }
    &.register__wrapper--calendly {
        height:100%;
    }
    &.register__wrapper--secondary {
        background-color:#fff;
    }
    @media (min-width:992px) {
        padding:1.25rem 1.5rem 7.5rem 1.5rem;
        &.register__wrapper--secondary {
            background-color:transparent;
        }
        &.register__wrapper--primary {
            max-width:100%;
        }
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    text-align:center;
    @media (min-width:992px) {
        grid-row-gap:1rem;
        text-align:left;
    }
`
const Subtitle = styled.div`
    @media (min-width:992px) {
        color:${props => props.theme.color.grey[500]};
    }
`

// Page Query
export const pageQuery = graphql`
    query registerQuery($databaseId: Int!) {
        page: wpPage(databaseId: { eq: $databaseId } ) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            registerSections {
                introSubtitle
                introTitle
                registerIntroDescription
                registerCtaHeaderCta {
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
                registerCtaTitle
                registerCtaContainer {
                    type
                    hubspotFormId
                    ctaLabel
                    calendlyUrl
                    confirmationPage {
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
                registerBlogToggle
                registerBlogTitle
                registerReview {
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
        posts: allWpPost(limit: 3, sort: {fields: date, order: DESC}) {
            nodes {
                seoInformation {
                    seoDescription
                }
                title
                slug
                excerpt
                date(formatString: "MMMM Do, YYYY")
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 365, quality:100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                ...postAuthor
            }
        }
    }
`