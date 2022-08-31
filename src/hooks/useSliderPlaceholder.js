import { graphql, useStaticQuery } from 'gatsby'

export default () => {
    const { allFile } = useStaticQuery(graphql`
        query useSliderPlaceholder {
            allFile(
                filter: {
                    relativeDirectory: {
                        eq: "bg"
                    }
                }
                limit: 3
            ) {
                nodes {
                    childImageSharp {
                        fluid(maxWidth: 658) {
                            ...GatsbyImageSharpFluid_withWebp_noBase64
                        }
                    }
                }
            }
        }
    `)

    return allFile.nodes
}