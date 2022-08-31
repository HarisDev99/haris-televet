import { graphql, useStaticQuery } from 'gatsby'

export default () => {
    const { allFile } = useStaticQuery(graphql`
        query useClinicPlaceholder {
            allFile(
                filter: {
                    relativeDirectory: {
                        eq: "clinics"
                    }
                }
            ) {
                nodes {
                    childImageSharp {
                        fluid(maxWidth: 91, quality:100) {
                            ...GatsbyImageSharpFluid_withWebp_noBase64
                        }
                    }
                }
            }
        }
    `)

    return allFile.nodes
}