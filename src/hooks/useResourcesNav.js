import { useStaticQuery, graphql } from 'gatsby'

const useResourceNav = () => {
    const { page } = useStaticQuery(graphql`
        query resourcesNavQuery {
            page: wpPage(
                slug: {
                    eq: "resources"
                }
            ) {
                resourcesPageSections {
                    resourcesNavigationMenuItems {
                        type
                        label
                        linkExternal
                        scopeExternal
                        linkInternal {
                            ... on WpPage {
                                uri
                                slug
                                id
                            }
                            ... on WpPost {
                                uri
                                slug
                                id
                            }
                            ... on WpResource {
                                uri
                                slug
                                id
                            }
                        }
                        category {
                            ... on WpResourceCategory {
                                id
                                slug
                                name
                                uri
                            }
                        }
                    }
                }
            }
        }

    `)

    return page.resourcesPageSections.resourcesNavigationMenuItems
}

export default useResourceNav