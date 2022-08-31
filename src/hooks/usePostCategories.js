import { graphql, useStaticQuery } from 'gatsby'

const usePostCategories = () => {
    const { categories } = useStaticQuery(graphql`
        query usePostCategoriesQuery {
            categories: allWpCategory(
                filter: {
                    slug: {
                        ne: "uncategorized"
                    }
                }
            ) {
                nodes {
                    uri
                    name
                }
            }
        }
    `)

    return categories.nodes
}


export default usePostCategories