const path = require(`path`)
const { paginate } = require('gatsby-awesome-pagination')

// Create Page
const createBlog = require('./server/createBlog')
const createPosts = require('./server/createPosts')
const createCategories = require('./server/createCategories')
const createIntegrations = require('./server/createIntegrations')
const createResourcePosts = require('./server/createResourcePosts')
const createResourceCategories = require('./server/createResourceCategories')

// Create Node
const createBamboo = require('./server/createBamboo')
const createHubspotFormNode = require('./server/createHubspotFormNode')

// Create Node Field
const createPageTemplateField = require('./server/createPageTemplateField')

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const bambooDefs = `
        """
        Bamboo Career Node
        """
        type BambooCareer implements Node @dontInfer {
            careerContent: CareerContent
        }
    
        """
        Career Content
        """
        type CareerContent @dontInfer {
            title: String
            link: String
            type: [String]
            location: Location
        }
    
        """
        Location information
        """
        type Location implements Node @dontInfer {
            city: String
            state: String
        }
    `
    createTypes(bambooDefs)

    const PageTemplateDefs = `
        """
        Page Template
        """
        type WpPage implements Node {
            localTemplate: String
            pageBuilderTemp: String
        }
    `
    createTypes(PageTemplateDefs)
}

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        WpPage: {
            uri: {
                resolve: (source, args, context, info) => {
                    if ( !source.uri ) {
                        return info.originalResolver(
                          {
                            ...source,
                            uri: `/`
                          },
                          args,
                          context,
                          info
                        )
                    } else {
                        return info.originalResolver(source, args, context, info)
                    }
                }
            }
        }
    }

    createResolvers(resolvers)
}

exports.sourceNodes = async ({
    createNodeId,
    createContentDigest,
    actions: { createNode },
}) => {
    try {
        // Create Bamboo Careers Node
        await createBamboo({
            createNode,
            createNodeId,
            createContentDigest
        })

        // Create Hubspot Form Nodes
        await createHubspotFormNode({
            createNode,
            createNodeId,
            createContentDigest
        })
    } catch (e) {
        console.log(e)
    }
}

exports.onCreateNode = async ({
    node,
    actions: { createNodeField },
}) => {
    if (node.internal.type === `WpPage`) {
        await createPageTemplateField({
            node,
            createNodeField,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    try {
        const { createPage } = actions

        const pageQuery = await graphql(`
            query pageQuery {
                pages: allWpPage {
                    nodes {
                        id
                        link
                        slug
                        uri
                        title
                        databaseId
                        localTemplate
                    }
                }
            }
        `)

        pageQuery.data.pages.nodes.forEach(({
            id,
            uri,
            title,
            databaseId,
            localTemplate
        }) => {
            if (!localTemplate) return

            const options = {
                path: uri,
                component: path.resolve(`src/templates/${localTemplate}/index.js`),
                context: {
                    title,
                    id,
                    databaseId,
                    wordpress_path: uri.substring(1),
                }
            }

            createPage(options)
        })

        const blogSettingsQuery = await graphql(`
            query blogSettingsQuery {
                settings: wpPage(
                    slug: {
                        eq: "blog"
                    }
                ) {
                    contentSettings {
                        featuredPost {
                            ... on WpPost {
                                id
                            }
                        }
                    }
                }
            }
        `)

        const featured = blogSettingsQuery.data.settings.contentSettings.featuredPost

        // Query all posts
        const postQuery = await graphql(`
            query postQuery {
                posts: allWpPost(
                    sort: { 
                        fields: date, 
                        order: DESC 
                    }
                ) {
                    nodes {
                        title
                        id
                        slug
                        categories {
                            nodes {
                                id
                            }
                        }
                    }
                }
            }
        `)
        
        const postList = postQuery.data.posts.nodes

        // Query all categories
        const categoryQuery = await graphql(`
            query categoryQuery {
                categories: allWpCategory {
                    nodes {
                        id
                        slug
                        posts {
                            nodes {
                                id
                            }
                        }
                    }
                }
            }
        `)

        const categoryList = categoryQuery.data.categories.nodes

        const integrationQuery = await graphql(`
            query integrationQuery {
                integrations: allWpIntegration {
                    nodes {
                        id
                        slug
                    }
                }
            }
        `)

        const integrationList = integrationQuery.data.integrations.nodes

        // Create single integration posts
        createIntegrations({
            createPage,
            items: integrationList
        })


        // Create blog listings with pagination
        createBlog({
            paginate,
            createPage,
            featured,
            items: postList
        })

        // Create single blog posts
        createPosts({
            createPage,
            items: postList
        })

        // Create category pages
        createCategories({
            paginate,
            createPage,
            items: categoryList
        })

        // Query all resources
        const resourceQuery = await graphql(`
            query resourceQuery {
                resources: allWpResource(
                    sort: { 
                        fields: date, 
                        order: DESC 
                    }
                ) {
                    nodes {
                        title
                        id
                        slug
                        resourcePostSettings {
                            resourceCta {
                                type
                            }
                        }
                        resourceCategories {
                            nodes {
                                id
                            }
                        }
                    }
                }
            }
        `)
        
        const resources = resourceQuery.data.resources.nodes

        createResourcePosts({
            createPage,
            items: resources.filter((item) => {
                // We do not want to create pages for external resources
                return item.resourcePostSettings.resourceCta.type !== `external` 
            })
        })

        // Query all categories
        const resourceCategoryQuery = await graphql(`
            query resourceCategoryQuery {
                categories: allWpResourceCategory {
                    nodes {
                        id
                        slug
                        resources {
                            nodes {
                                id
                            }
                        }
                    }
                }
            }
        `)

        const resourceCategoryList = resourceCategoryQuery.data.categories.nodes

        createResourceCategories({
            paginate,
            createPage,
            items: resourceCategoryList
        })

        createPage({
            path: `/resources`,
            component: path.resolve(`src/templates/resources/index.js`),
        })
    } catch (e) {
        console.log(e)
    }
}

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            fallback: {
                path: require.resolve('path-browserify'),
            },
        },
    })
}