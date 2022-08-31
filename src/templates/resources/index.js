import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Grid from './grid'
import Intro from './intro'
import Menu from '../../components/postNav/index'
import Cta from './cta'
import Whitepaper from './whitepaper'

// Utils
import handleGroups from './handleGroups'

// Hooks
import useResourcesNav from '../../hooks/useResourcesNav'

const ResourcesComponent = ({
    data: {
        page,
        resources,
        categories,
        posts,
        blog
    },
}) => {
    const {
        slug,
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        resourcesPageSections: {
            resourcesCtaTitle,
            resourcesCtaButton,
            resourcesIntroTitle,
            resourcesIntroDescription,
            resourcesWhitePaperTitle,
            resourcesWhitePaperDescription,
            resourcesWhitePaperBackground,
            resourcesWhitePaperCta,
            resourcesFeaturedItemSubtitle,
            resourcesFeaturedItemTitle,
            resourcesFeaturedItemCta,
            resourcesFeaturedItemBackground,
            resourcesBlogToggle,
            resourcesBlogCtaLabel,
            resourcesBlogGridCta,
        }
    } = page

    const resourcesNavigationMenuItems = useResourcesNav()

    const categoryGroups = handleGroups({
        posts,
        resources,
        categories,
        blogToggle: resourcesBlogToggle,
        blog,
        blogSettings: {
            resourcesBlogCtaLabel,
            resourcesBlogGridCta
        },
        navItems: resourcesNavigationMenuItems
    })

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
                slug={`resources`}
                noindex={seoNoindex}
            />
            {categoryGroups.length > 1 && 
                <Menu
                    items={resourcesNavigationMenuItems}
                    sections={[...categoryGroups.map(({ category }) => category.id), page.id]}
                />
            }
            <Intro
                featured={{
                    subtitle: resourcesFeaturedItemSubtitle,
                    title: resourcesFeaturedItemTitle,
                    cta: resourcesFeaturedItemCta,
                    background: resourcesFeaturedItemBackground
                }}
                title={resourcesIntroTitle}
                description={resourcesIntroDescription}
            />
            <CategoryGrid>
                {categoryGroups.map(({
                    category,
                    posts
                }, index) => (
                    <Grid
                        key={index}
                        items={posts}
                        category={category}
                    />
                ))}
            </CategoryGrid>
            <Whitepaper
                title={resourcesWhitePaperTitle}
                description={resourcesWhitePaperDescription}
                cta={resourcesWhitePaperCta}
                background={resourcesWhitePaperBackground}
                slug={slug}
            />
            <Cta
                title={resourcesCtaTitle}
                cta={resourcesCtaButton}
                slug={slug}
            />
        </Layout>
    )
}

export default ResourcesComponent

const CategoryGrid = styled.div`
    padding-bottom:4.5rem;
`

export const pageQuery = graphql`
    query resourcesListPageQuery{
        page: wpPage(
            slug: {
                eq: "resources"
            }
        ) {
            slug
            id
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            resourcesPageSections {
                resourcesBlogToggle
                resourcesBlogCtaLabel
                resourcesBlogGridCta {
                    title
                    label
                }
                resourcesFeaturedItemSubtitle
                resourcesFeaturedItemTitle
                resourcesFeaturedItemCta {
                    type
                    label
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
                resourcesFeaturedItemBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fixed(width: 600, height:390, quality: 100) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                }
                resourcesIntroTitle
                resourcesIntroDescription
                resourcesCtaTitle
                resourcesCtaButton {
                    type
                    label
                    linkExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
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
                        }
                    }
                }
                resourcesWhitePaperTitle
                resourcesWhitePaperDescription
                resourcesWhitePaperBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fixed(width:365) {
                                ...GatsbyImageSharpFixed_withWebp
                            }
                        }
                    }
                }
                resourcesWhitePaperCta {
                    type
                    label
                    scopeExternal
                    linkExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                    popup {
                        title
                        description
                        hubspotFormId
                        ctaLabel
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
                            }
                            message
                        }
                    }
                }
            }
        }
        resources: allWpResource {
            group(
                field: resourceCategories___nodes___id, 
                limit: 5
            ) {
                nodes {
                    ...resourceCard
                }
                fieldValue
            }
        }
        categories: allWpResourceCategory {
            nodes {
                name
                id
                uri
                slug
                resourceCategorySettings {
                    resourceCategoryGridLayout
                    resourceCategoryCtaLabel
                    resourceCategoryGridCta
                    resourceCategoryGridCtaLabel
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
    }
`