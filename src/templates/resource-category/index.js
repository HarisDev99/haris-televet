import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Container from '../../components/container'
import Pagination from '../../components/pagination'
import ResourceCard from '../../components/resourceCard'
import PostCard from '../../components/postCard/index'
import Nav from '../../components/postNav/index'

// Utils
import parseContent from '../../utils/parseContent'

// Hooks
import useResourcesNav from '../../hooks/useResourcesNav'

const ResourceTypeWrapper = ({
    category,
    children,
    posts,
}) => {

    const templateType = category.resourceCategorySettings.resourceCategoryTemplate

    switch ( templateType ) {
        case `full`:
            return (
                <>
                <Header>
                    <Container>
                        <HeaderLabel className={`sm:text--xl`}>{category.name}</HeaderLabel>
                        <HeaderSubtitle className={`sm:text--3xl lg:text--5xl`}>{category.resourceCategorySettings.resourceCategoryTitle}</HeaderSubtitle>
                        <Description>
                            {parseContent(category.resourceCategorySettings.resourceCategoryDescription)}
                        </Description>
                    </Container>
                </Header>
                <Container>
                    <ResourcesWrapper>
                        {children}
                    </ResourcesWrapper>
                </Container>
                <BlogPostWrapper>
                    <Container>
                        <BlogPostTitle className={`sm:text--2xl lg:text--3xl`}>{`Get More Helpful Articles on our Blog`}</BlogPostTitle>
                        <List>
                            {posts.map((item, index) => (
                                <PostCard
                                    key={index}
                                    item={item}
                                />
                            ))}
                        </List>
                    </Container>
                </BlogPostWrapper>
                </>
            )
        case `default`:
        default: 
            return (
                <Container>
                    <ResourcesWrapper>
                        <PageTitle className={`sm:text--3xl lg:text--5xl`}>{category.name}</PageTitle>
                        {children}
                    </ResourcesWrapper>
                </Container>
            )
    }
}

const ResourceCategoryComponent = ({
    pageContext,
    data: {
        category,
        resources: {
            nodes: postList
        },
        posts,
    }
}) => {

    const resourcesNavigationMenuItems = useResourcesNav()

    const {
        pageNumber,
        numberOfPages,
    } = pageContext

    const pageTitle = `${category.name} Archives ${pageNumber > 0 ? `- Page ${pageNumber + 1} of ${numberOfPages} ` : ``}- TeleVet Resources`

    return (
        <Layout>
            <Seo
                title={pageTitle}
                description={category.description && category.description}
                canonical={pageNumber > 0 && `/resources/${category.slug}/page/${pageNumber + 1}`}
                slug={`resources/category/${category.slug}`}
                type={`article`}
            />
            <Nav
                items={resourcesNavigationMenuItems}
                currentId={category.id}
            />
            <Section>
                <ResourceTypeWrapper
                    category={category}
                    posts={posts.nodes}
                >
                    {postList && postList.length > 0 ?
                        <List>
                            {postList.map(({
                                title,
                                resourcePostSettings,
                                featuredImage,
                                uri,
                            }, index) => {
                                    return (
                                        <ResourceCard
                                            key={index}
                                            title={title}
                                            category={category}
                                            resourcePostSettings={resourcePostSettings}
                                            uri={uri}
                                            featuredImage={featuredImage}
                                        />
                                    )
                                })}
                        </List> 
                    : 
                        <p className={`sm:text--lg`}>{`No posts found under this category.`}</p>
                    }
                    {numberOfPages > 1 && <Pagination
                        currentPage={pageNumber}
                        numberOfPages={numberOfPages}
                        slug={category.slug}
                    />}
                </ResourceTypeWrapper>
            </Section>
        </Layout>
    )
}

export default ResourceCategoryComponent

// Styled Components
const Section = styled.section`
`
const ResourcesWrapper = styled.div`
    padding-top:3rem;
    padding-bottom:3rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
        grid-row-gap:4.5rem;
    }
`
const BlogPostWrapper = styled.div`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3rem;
    padding-bottom:3rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const PageTitle = styled.h1`
    text-align:center;
`
const HeaderLabel = styled.h1`
    color:${props => props.theme.color.purple[500]};
`
const HeaderSubtitle = styled.p`
    font-weight:bold;
    max-width:48rem;
`
const Description = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    max-width:40rem;
    margin-top:1rem;
    @media (min-width:992px) {
        margin-top:1rem;
    }
`
const Header = styled.header`
    width:100%;
    background-color:${props => props.theme.color.teal[50]};
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:4.5rem;
        padding-bottom:4.5rem;
    }
`
const BlogPostTitle = styled.h2`
    text-align:center;
    margin-bottom:1.5rem;
    @media (min-width:992px) {
        margin-bottom:3rem;
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
    query resourceCategoryQuery($skip: Int!, $limit: Int!, $id: String!) {
        category: wpResourceCategory(
            id: {
                eq: $id
            }
        ) {
            name
            slug
            description
            id
            resourceCategorySettings{
                resourceCategoryGridLayout
                resourceCategoryCtaLabel
                resourceCategoryTitle
                resourceCategoryDescription
                resourceCategoryTemplate
            }
        }
        resources: allWpResource(
            sort: { 
                fields: date, 
                order: DESC
            }
            skip: $skip
            limit: $limit
            filter: {
                resourceCategories: {
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
                ...resourceCard
            }
        }
        posts: allWpPost(
            sort: { 
                fields: date, 
                order: DESC
            },
            limit: 3
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