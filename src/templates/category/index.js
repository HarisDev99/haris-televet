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
import Sidebar from '../../components/postSidebar'
import {
    LoadingGroup
} from '../../components/postCard/loading'
import Menu from '../../components/postNav/index'

// Hooks
import useResourcesNav from '../../hooks/useResourcesNav'

const CategoryComponent = ({
    pageContext,
    data: {
        blog,
        category,
        posts: {
            nodes: postList
        },
    }
}) => {
    const {
        pageNumber,
        numberOfPages,
    } = pageContext

    const pageTitle = `${category.name} Archives ${pageNumber > 0 ? `- Page ${pageNumber + 1} of ${numberOfPages} ` : ``}- TeleVet Blog`

    const [ isLoading, setLoading ] = useState(false)
    const [ prevQuery, setPrevQuery ] = useState(``)
    const [ results, setResults ] = useState(postList)

    const resourcesNavigationMenuItems = useResourcesNav()

    return (
        <Layout>
            <Seo
                title={pageTitle}
                description={category.description && category.description}
                canonical={pageNumber > 0 && `/blog/${category.slug}/page/${pageNumber + 1}`}
                slug={`blog/category/${category.slug}`}
                type={`article`}
            />
            <Menu
                items={resourcesNavigationMenuItems}
                currentId={blog.id}
            />
            <Section>
                <Container>
                    <PageTitle className={`sm:text--3xl lg:text--5xl`}>{category.name}</PageTitle>
                </Container>
                <BlogContainer>
                    <Sidebar
                        setResults={setResults}
                        isLoading={isLoading}
                        setLoading={setLoading}
                        prevQuery={prevQuery}
                        setPrevQuery={setPrevQuery}
                        category={category.databaseId}
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
                                    slug={category.slug}
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

export default CategoryComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:3rem;
        padding-bottom:6rem;
    }
`
const BlogContainer = styled.div`
    display:grid;
    grid-row-gap:3rem;
    width:100%;
    padding-left:1.5rem;
    padding-right:1.5rem;
    margin:0 auto;
    max-width: 33rem;
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
const PageTitle = styled.h1`
    text-align:center;
    margin-bottom:1.5rem;
    @media (min-width:992px) {
        margin-bottom:3rem;
    }
`
const ErrorTitle = styled.h6`
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
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

export const pageQuery = graphql`
    query categoryQuery($skip: Int!, $limit: Int!, $id: String!) {
        blog: wpPage(
            slug: {
                eq: "blog"
            }
        ) {
            id
        }
        category: wpCategory(
            id: {
                eq: $id
            }
        ) {
            name
            slug
            description
            databaseId
        }
        posts: allWpPost(
            sort: { 
                fields: date, 
                order: DESC
            }
            skip: $skip
            limit: $limit
            filter: {
                categories: {
                    nodes: {
                        elemMatch: {
                            id: {
                                eq: $id
                            }
                        }
                    }
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