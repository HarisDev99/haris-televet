import { graphql, useStaticQuery } from 'gatsby'

const use404Hook = () => {
    const { component } = useStaticQuery(graphql`
        query use404 {
            component: wpLayoutComponent(slug: {eq: "404-page"}) {
                notFoundSections {
                    title
                    description
                }
            }
        }
    `)

    return component.notFoundSections
}

export default use404Hook