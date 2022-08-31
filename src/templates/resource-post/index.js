import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-image'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import ResourceCard from '../../components/resourceCard'
import Form from '../../components/formBuilder'
import PostCarousel from '../../components/postCarousel'

// Utils
import parseContent from '../../utils/parseContent'

const ResourcePostComponent = ({
    data: {
        post,
        related
    },
}) => {
    const {
        title,
        featuredImage,
        content,
        publishedDate,
        modifiedDate,
        uri,
        categories,
        seoInformation,
        resourcePostSettings,
        successStoryBanner,
    } = post

    const shareUrl = encodeURI(`${process.env.GATSBY_SITE_URL || `https://televet.com`}${uri}`)
    const titleUrl = encodeURI(title.replace(/ /g, "+"))

    const socialUrl = {
        twitter: `http://twitter.com/share?text=${titleUrl}&url=${shareUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        linkedIn: `http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}/&title=${titleUrl}`
    }

    const handleShare = (e, {
        url,
        label,
        dimensions
    }) => {
        const isDefined = typeof window !== `undefined`

        e.preventDefault()

        if (isDefined) {
          window.open(url, `${label}`, `${dimensions}`)
          return false
        }
    }

    const category = categories.nodes[0]
    const categoryCtaTitle = category.resourceCategorySettings.resourceCategoryGridCta ? category.resourceCategorySettings.resourceCategoryGridCta : `Want to see more ${category.name}?`
    const categoryCta = category.resourceCategorySettings.resourceCategoryGridCtaLabel ? category.resourceCategorySettings.resourceCategoryGridCtaLabel : `View All ${category.name}`


    const banner = category.slug === `success-stories` ? successStoryBanner.node.localFile.childImageSharp.fluid : featuredImage.node.localFile.childImageSharp.fluid
    const logo = resourcePostSettings.resourcePostSuccessStoryLogo ? resourcePostSettings.resourcePostSuccessStoryLogo.localFile.childImageSharp.fluid : null


    const relatedTitle = resourcePostSettings.resourcePostRelatedTitle ? resourcePostSettings.resourcePostRelatedTitle : `More Articles Like This`

    const handleContainerClass = () => {
        if ( !logo ) return 'resource-success-full'

        return 'resource-success'
    }
    return (
        <Layout>
            <Seo
                title={seoInformation && seoInformation.seoTitle ? seoInformation.seoTitle : title}
                description={seoInformation && seoInformation.seoDescription}
                banner={banner.src}
                bannerWidth={banner.presentationWidth}
                bannerHeight={banner.presentationHeight}
                type={`article`}
                slug={uri}
                meta={[
                    {
                        property: `article:published_time`,
                        content: `${publishedDate}`
                    }, {
                        property: `article:modified_time`,
                        content: `${modifiedDate}`
                    }
                ]}
                noindex={seoInformation.seoNoindex}
            /> 
            <Section>
                <Container
                    sm={`
                        grid-row-gap:2rem;
                    `}
                    lg={`
                        grid-row-gap:0;
                        ${(category.slug === 'success-stories' && logo) ? '' : 'max-width:1400px;'}
                    `}
                >
                    <MainWrapper className={(category.slug === 'success-stories' && logo) ? 'resource-success' : ''}>
                        <BackgroundImage
                            fluid={(category.slug === 'success-stories' && logo) ? logo : banner}
                        />
                        <Wrapper>
                            {(category.slug === 'success-stories' && logo) && 
                            <BackgroundImage
                                fluid={banner}
                            />}
                            <Header>
                                <h1 className={`sm:text--3xl lg:text--4xl`}>{title}</h1>
                                <Meta className={`sm:text--lg`}>
                                    <MetaItem>
                                        {categories.nodes.map(({
                                            name,
                                            slug
                                        }, index) => (
                                            <Category key={index} to={`/resources/category/${slug}`}>{index === 0 ? `${name}` : `, ${name}`}</Category>
                                        ))}
                                    </MetaItem>
                                </Meta>
                                <Share>
                                    <ShareItem>
                                        <ShareLink 
                                            href={socialUrl.facebook} 
                                            aria-label={`Share this post on Facebook`}
                                            target={`_blank`}
                                            onClick={(e) => handleShare(e, {
                                                url: socialUrl.facebook,
                                                label: `facebook-share`,
                                                dimensions: `width=580,height=296`
                                            })}
                                        >
                                            <ShareIcon role="img" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg">
                                                <title>{`Share on Facebook`}</title>
                                                <path d="M11 0H8C6.67392 0 5.40215 0.526784 4.46447 1.46447C3.52678 2.40215 3 3.67392 3 5V8H0V12H3V20H7V12H10L11 8H7V5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4H11V0Z"></path>
                                            </ShareIcon>
                                        </ShareLink>
                                    </ShareItem>
                                    <ShareItem>
                                        <ShareLink 
                                            href={socialUrl.linkedIn}
                                            aria-label={`Share this post on Linkedin`}
                                            target={`_blank`}
                                            onClick={(e) => handleShare(e, {
                                                url: socialUrl.linkedIn,
                                                label: `linkedin-share`,
                                                dimensions: `width=490,height=530`
                                            })}
                                        >
                                            <ShareIcon role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>{`Share on LinkedIn`}</title>
                                                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"></path>
                                                <path d="M6 9H2V21H6V9Z"></path><path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"></path>
                                            </ShareIcon>
                                        </ShareLink>
                                    </ShareItem>
                                    <ShareItem>
                                        <ShareLink 
                                            href={socialUrl.twitter} 
                                            aria-label={`Share this post on Twitter`}
                                            target={`_blank`}
                                            onClick={(e) => handleShare(e, {
                                                url: socialUrl.twitter,
                                                label: `twitter-share`,
                                                dimensions: `width=580,height=296`
                                            })}
                                        >
                                            <ShareIcon role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <title>{`Share on Twitter`}</title>
                                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                                            </ShareIcon>
                                        </ShareLink>
                                    </ShareItem>
                                </Share>
                            </Header>
                            <ContentWrapper>
                                <Content>
                                    {parseContent(content)}
                                </Content>
                                {
                                    resourcePostSettings.resourcePostFooterCta.type === `internal` ?
                                        <GatsbyLink className={`button button--primary sm:text--xl`} to={resourcePostSettings.resourcePostFooterCta.linkInternal.uri}>
                                            {resourcePostSettings.resourcePostFooterCta.label}
                                        </GatsbyLink>
                                    : resourcePostSettings.resourcePostFooterCta.type === `external` ?
                                        <a href={resourcePostSettings.resourcePostFooterCta.linkExternal} className={`button button--primary sm:text--xl`} target={resourcePostSettings.resourcePostFooterCta.scopeExternal && `_blank`}>
                                            {resourcePostSettings.resourcePostFooterCta.label}
                                        </a>
                                    : resourcePostSettings.resourcePostFooterCta.type === `form` ?
                                    <CtaWrapper>
                                        <h3 className={`sm:text--2xl lg:text--4xl`}>{resourcePostSettings.resourcePostFooterCta.title}</h3>
                                        <FormWrapper>
                                            <Form
                                                id={resourcePostSettings.resourcePostFooterCta.hubspotFormId}
                                                ctaLabel={resourcePostSettings.resourcePostFooterCta.label}
                                                redirect={resourcePostSettings.resourcePostFooterCta.confirmationPage}
                                                slug={uri}
                                            />
                                        </FormWrapper>
                                    </CtaWrapper>
                                    : null
                                }
                            </ContentWrapper>
                        </Wrapper>
                    </MainWrapper>
                </Container>
                    {related.nodes.length > 0 &&
                    <Related>
                        <Container>
                            <h2 className={`sm:text--2xl lg:text--4xl`} style={{ textAlign: `center` }}>{relatedTitle}</h2>
                        </Container>
                        <PostCarousel
                            items={related.nodes}
                            cta={{
                                title: categoryCtaTitle,
                                label: categoryCta,
                                uri: category.uri,
                            }}
                            category={category}
                            ItemComponent={ResourceCard}
                        />
                    </Related>}
            </Section>
        </Layout>
    )
}

export default ResourcePostComponent

// Styled Components
const Section = styled.section`
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:2rem;
        padding-bottom:7.5rem;
    }
`
const MainWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    align-items:start;
    @media (min-width:992px) {
        grid-column-gap:3rem;
        grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);
        &.resource-success {
            grid-template-columns:minmax(0,1fr) minmax(0,3fr);
        }
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Related = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    padding-top:3rem;
    @media (min-width:992px) {
        justify-items:center;
        padding-top:6rem;
        grid-row-gap:4rem;
    }
`
const Wrapper = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    @media (min-width:992px) {
        position:relative;
        z-index:1;
    }
`
const ContentWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    a {
        text-decoration:underline;
    }
`
const Meta = styled.ul`
    display:flex;
    flex-wrap:wrap;
`
const MetaItem = styled.li`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    margin-right:0.75rem;
    &:before {
        content: '';
        display: block;
        width:4px;
        height:4px;
        background-color: ${props => props.theme.color.primary.dark};
        margin-right:0.75rem;
        border-radius:50%;
    }
    &:first-child {
        &:before {
            display:none;
        }
    }
    &:last-child {
        margin-right:0;
    }
`
const Category = styled(GatsbyLink)`
    color: ${props => props.theme.color.teal[500]};
`
const Share = styled.ul`
    display:flex;
    flex-wrap:wrap;
`
const ShareItem = styled.li`
    margin-right:1rem;
    @media(min-width:992px) {
        &:last-child {
            margin-right:0;
        }
    }
`
const ShareLink = styled.a`
    width:2.5rem;
    height:2.5rem;
    border-radius:100%;
    border:2px solid ${props => props.theme.color.grey[400]};
    background-color:transparent;
    display:flex;
    align-items:center;
    justify-content:center;
    transition: background-color .15s;
    &:hover {
        background-color:${props => props.theme.color.grey[400]};
    }
`
const ShareIcon = styled.svg`
    height:1.25rem;
    fill:${props => props.theme.color.grey[400]};
    transition: fill .15s;
    ${ShareLink}:hover & {
        fill:#fff;
    }
`
const CtaWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const FormWrapper = styled.div`

`

export const pageQuery = graphql`
    query resourceQuery($id: String!, $categories: [String]) {
        post: wpResource(
            id: {
                eq: $id
            }
        ) {
            resourcePostSettings {
                resourcePostSuccessStoryLogo {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 822, quality:100) {
                                presentationWidth
                                presentationHeight
                                src
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                resourcePostRelatedTitle
                resourceCta {
                    type
                    video {
                        type
                        videoInternal {
                            localFile {
                                publicURL
                            }
                        }
                        videoExternal
                    }
                }
                resourcePostFooterCta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                        ... on WpResource {
                            uri
                        }
                    }
                    linkExternal
                    scopeExternal
                    hubspotFormId
                    confirmationPage {
                        type
                        linkExternal
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                            ... on WpResource {
                                uri
                            }
                        }
                    }
                    title
                }
            }
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            title
            content
            slug
            uri
            author {
                node {
                    description
                    firstName
                    lastName
                    customAvatar {
                        avatar {
                            localFile {
                                childImageSharp {
                                    fixed(height: 48, width: 48) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
            formatDate: date(formatString: "MMMM Do, YYYY")
            publishedDate: date(formatString: "YYYY-MM-DDTHH:MM:SS")
            modifiedDate: modified(formatString: "YYYY-MM-DDTHH:MM:SS")
            categories: resourceCategories {
                nodes {
                    name
                    slug
                    uri
                    resourceCategorySettings {
                        resourceCategoryGridLayout
                        resourceCategoryCtaLabel
                        resourceCategoryGridCta
                        resourceCategoryGridCtaLabel
                    }
                }
            }
            featuredImage {
                node {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 540, quality:100) {
                                presentationWidth
                                presentationHeight
                                src
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
            successStoryBanner: featuredImage {
                node {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 822, quality:100) {
                                presentationWidth
                                presentationHeight
                                src
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
        related: allWpResource(
            limit: 5,
            filter: {
                resourceCategories: {
                    nodes: {
                        elemMatch: {
                            id: {
                                in: $categories
                            }
                        }
                    }
                },
                id: {
                    ne: $id
                }
            }
        ) {
            nodes {
                ...resourceCard
            }
        }
    }
`