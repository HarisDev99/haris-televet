import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import PostCard from '../../components/postCard'

// Utils
import parseContent from '../../utils/parseContent'

const PostComponent = ({
    data: {
        post,
        related,
        settings
    },
}) => {
    const {
        title,
        featuredImage,
        content,
        author,
        formatDate,
        publishedDate,
        modifiedDate,
        slug,
        categories,
        seoInformation,
        postSettings,
    } = post

    const {
        contentSettings
    } = settings

    const shareUrl = encodeURI(`${process.env.GATSBY_SITE_URL || `https://televet.com`}/blog/${slug}`)
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

    const banner = featuredImage.node.localFile.childImageSharp.fluid

    return (
        <Layout>
            <Seo
                title={seoInformation && seoInformation.seoTitle ? seoInformation.seoTitle : title}
                description={seoInformation && seoInformation.seoDescription}
                banner={banner.src}
                bannerWidth={banner.presentationWidth}
                bannerHeight={banner.presentationHeight}
                type={`article`}
                slug={`blog/${slug}`}
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
                    sm={`grid-row-gap:2rem;`}
                    lg={`grid-row-gap:0;`}
                >
                    <Background>
                        <BackgroundImage
                            style={{
                                position: ``
                            }}
                            fluid={banner}
                        />
                    </Background>
                    <Wrapper>
                        <Header>
                            <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                            <Meta className={`sm:text--lg`}>
                                <MetaItem>{`By `}{author.node.firstName ? `${author.node.firstName}${author.node.lastName ? ` ${author.node.lastName}` : ``}` : `Anonymous`}</MetaItem>
                                <MetaItem>{formatDate}</MetaItem>
                                <MetaItem>
                                    {categories.nodes.map(({
                                        name,
                                        slug
                                    }, index) => (
                                        <Category key={index} to={`/blog/category/${slug}`}>{index === 0 ? `${name}` : `, ${name}`}</Category>
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
                        <Content>
                            {parseContent(content)}
                        </Content>
                        {postSettings.postCta ?
                            postSettings.postCta[0].type === `internal` ?
                                <GatsbyLink className={`button button--primary sm:text--xl`} to={postSettings.postCta[0].linkInternal.link}>
                                    {postSettings.postCta[0].label}
                                </GatsbyLink>
                            : postSettings.postCta[0].type === `external` ?
                                <a href={postSettings.postCta[0].linkExternal} className={`button button--primary sm:text--xl`} target={postSettings.postCta[0].scopeExternal && `_blank`}>
                                    {postSettings.postCta[0].label}
                                </a>
                            :
                                null
                        :
                            null
                        }
                        <Footer>
                            <Author rel={`author`}>
                                <AuthorHeader>
                                    {author.node.customAvatar.avatar && <Avatar alt={`Avatar`} fixed={author.node.customAvatar.avatar.localFile.childImageSharp.fixed}/>}
                                    <AuthorName className={`sm:text--lg`}>{`Written by `}{author.node.firstName ? `${author.node.firstName}${author.node.lastName ? ` ${author.node.lastName}` : ``}` : `Anonymous`}</AuthorName>
                                </AuthorHeader>
                                {author.node.description && <AuthorBio className={`sm:text--lg`}>{author.node.description}</AuthorBio>}
                            </Author>
                            {contentSettings.footerCta[0].type === `internal` ?
                                <GatsbyLink className={`button--icon button--arrow sm:text--lg`} to={contentSettings.footerCta[0].linkInternal.link}>
                                    {contentSettings.footerCta[0].label}
                                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                                    </svg>
                                </GatsbyLink>
                            :
                                <a href={contentSettings.footerCta[0].linkExternal} className={`button--icon button--arrow sm:text--lg`}>
                                    {contentSettings.footerCta[0].label}
                                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                                    </svg>
                                </a>
                            }
                        </Footer>
                    </Wrapper>
                    {related.nodes.length > 0 &&
                    <Related>
                        <h2 className={`sm:text--2xl lg:text--4xl`}>{`More Articles Like This`}</h2>
                        <RelatedGrid>
                            {related.nodes.map((item, index) => (
                                <PostCard
                                    item={item}
                                    key={index}
                                />
                            ))}
                        </RelatedGrid>
                    </Related>}
                </Container>
            </Section>
        </Layout>
    )
}

export default PostComponent

// Styled Components
const Section = styled.section`
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-bottom:7.5rem;
    }
`
const Related = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    @media (min-width:992px) {
        justify-items:center;
        padding-top:6rem;
        grid-row-gap:4rem;
    }
`
const RelatedGrid = styled.div`
    display:grid;
    align-items:start;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,1fr));
        grid-column-gap:2.25rem;
        grid-row-gap:2.25rem;
    }
`
const Footer = styled.div`
    border-top:1px solid ${props => props.theme.color.grey[300]};
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    padding-top:2rem;
    justify-items: start;
`
const Header = styled.header`
    display: grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
`
const Wrapper = styled.div`
    max-width:52rem;
    width:100%;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    @media (min-width:992px) {
        position:relative;
        z-index:1;
        margin-top:-10rem;
        padding:2rem 2rem 0 2rem;
        background-color:#fff;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    a {
        text-decoration:underline;
    }
`
const Background = styled.div`
    position:relative;
    width:100%;
    padding-top:52.63%;
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
const Author = styled.address`
    margin-top:auto;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
`
const AuthorHeader = styled.div`
    display:grid;
    grid-template-columns:minmax(0, 3rem) minmax(0,1fr);
    grid-column-gap:1rem;
    align-items:center;
`
const AuthorName = styled.span`
`
const AuthorBio = styled.p`
    width:100%;
    margin-top:1rem;
    font-style:italic;
`
const Avatar = styled(GatsbyImage)`
    border-radius:50%;
    margin-right:1rem;
`

export const pageQuery = graphql`
    query postQuery($id: String!, $categories: [String]) {
        settings: wpPage(
            slug: {
                eq: "blog"
            }
        ) {
            contentSettings {
                footerCta {
                    label
                    linkExternal
                    linkInternal {
                      ... on WpPost {
                        link: uri
                      }
                      ... on WpPage {
                        link: uri
                      }
                    }
                    type
                }
            }
        }
        post: wpPost(
            id: {
                eq: $id
            }
        ) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            postSettings {
                postCta {
                    label
                    linkExternal
                    linkInternal {
                      ... on WpPost {
                        link: uri
                      }
                      ... on WpPage {
                        link: uri
                      }
                    }
                    type
                    scopeExternal
                }
            }
            title
            content
            slug
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
            categories {
                nodes {
                    name
                    slug
                }
            }
            featuredImage {
                node {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 1200, maxHeight: 627, quality:100) {
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
        related: allWpPost(
            limit: 3,
            filter: {
                categories: {
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