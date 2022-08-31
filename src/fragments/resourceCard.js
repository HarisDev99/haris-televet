import { graphql } from "gatsby"

export const { resourceCard } = graphql`
    fragment resourceCard on WpResource {
        seoInformation {
            seoDescription
        }
        title
        excerpt
        uri
        resourcePostSettings {
            resourceCta {
                type
                linkExternal
                scopeExternal
            }
            resourcePostGridBanner {
                altText
                title
                localFile {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 400, quality:100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
        featuredImage {
            node {
                title
                altText
                localFile {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 400, quality:100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`
