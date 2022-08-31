import { graphql } from "gatsby"

export const { resourceBlogCard } = graphql`
    fragment resourceBlogCard on WpPost {
        seoInformation {
            seoDescription
        }
        title
        excerpt
        uri
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
