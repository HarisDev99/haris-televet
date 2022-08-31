import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import Pagination from '../../components/pagination'
import PostCard from '../../components/postCard/index'
import Menu from '../../components/postNav/index'
import Sidebar from '../../components/postSidebar'

import {
    LoadingGroup
} from '../../components/postCard/loading'

// Hooks
import useResourcesNav from '../../hooks/useResourcesNav'

const BlogComponent = ({
    pageContext,
    data: {
        posts: {
            nodes: postList
        },
        featured,
        settings,
    }
}) => {
    const {
        pageNumber,
        numberOfPages,
    } = pageContext

    const {
        seoInformation,
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
    } = settings

    const resourcesNavigationMenuItems = useResourcesNav()

    const [ isLoading, setLoading ] = useState(false)
    const [ prevQuery, setPrevQuery ] = useState(``)
    const [ results, setResults ] = useState(postList)

    return (
        <Layout 
            pagePopup={pagePopupToggle ? {
                ...pagePopupContent,
                slug: `blog`
            } : null}
        >
            <Seo
                title={seoInformation.seoTitle}
                description={seoInformation.seoDescription}
                canonical={`/blog/page/${pageNumber + 1}`}
                slug={`blog`}
                type={`article`}
                noindex={seoInformation.seoNoindex}
            />
            <Menu
                items={resourcesNavigationMenuItems}
                currentId={settings.id}
            />
            <Section>
                <Container>
                    <PageTitle className={`sm:text--3xl lg:text--5xl`}>{`Latest blog posts`}</PageTitle>
                </Container>
                <BlogContainer>
                    <Sidebar
                        setResults={setResults}
                        isLoading={isLoading}
                        setLoading={setLoading}
                        prevQuery={prevQuery}
                        setPrevQuery={setPrevQuery}
                    />
                    <GridContainer>
                    {isLoading ?
                        <List>
                            <LoadingGroup/>
                        </List>
                    :
                        results.length ?
                            <>
                                <List>
                                    {!prevQuery && pageNumber === 0 && featured && 
                                        <PostCard
                                            featured
                                            item={featured}
                                        />
                                    }
                                    {results.map((item, index) => (
                                        <PostCard
                                            key={index}
                                            item={item}
                                        />
                                    ))}
                                </List>
                                {!prevQuery && numberOfPages > 1 && <Pagination
                                    currentPage={pageNumber}
                                    numberOfPages={numberOfPages}
                                />}
                            </>
                        :
                            <ErrorTitle className={`sm:text--2xl`}>No results found.</ErrorTitle>
                    }
                    </GridContainer>
                </BlogContainer>
            </Section>
        </Layout>
    )
}

export default BlogComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        min-height:50vh;
        padding-top:3rem;
        padding-bottom:6rem;
    }
`
const PageTitle = styled.h1`
    text-align:center;
    margin-bottom:1.5rem;
    @media (min-width:992px) {
        margin-bottom:3rem;
    }
`
const BlogContainer = styled.div`
    display:grid;
    grid-row-gap:3rem;
    width:100%;
    padding-left:1.5rem;
    padding-right:1.5rem;
    margin:0 auto;
    max-width: 30rem;
    @media (min-width:992px) {
        grid-column-gap:3rem;
        grid-template-columns:minmax(0,1fr) minmax(0,4fr);
        max-width:1400px;
    }
`
const GridContainer = styled.div`
    display:grid;
    grid-row-gap:3rem;
    width:100%;
    @media (min-width:992px) {
        grid-row-gap:4.5rem;
    }
`
const List = styled.div`
    display:grid;
    align-items:start;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,1fr));
        grid-column-gap:3rem;
        grid-row-gap:3rem;
    }
`
const ErrorTitle = styled.h6`
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`
export const pageQuery = graphql`
    query blogQuery($skip: Int!, $limit: Int!, $featured: String!) {
        settings: wpPage(
            slug: {
                eq: "blog"
            }
        ) {
            id
            seoInformation {
                seoDescription
                seoTitle
                seoNoindex
            }
            ...pagePopupSettings
        }
        featured: wpPost(
            id: {
                eq: $featured
            }
        ) {
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
                            fluid(maxWidth: 770, quality:100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
            author {
                node {
                    firstName
                    lastName
                    customAvatar {
                        avatar {
                            localFile {
                                childImageSharp {
                                    fixed(height: 32, width: 32) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        posts: allWpPost(
            sort: { 
                fields: date, 
                order: DESC 
            }
            skip: $skip
            limit: $limit
            filter: {
                id: {
                    ne: $featured
                }
            }
        ) {
            nodes {
                ...postCard
            }
        }
    }
`