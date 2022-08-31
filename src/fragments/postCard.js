import { graphql } from "gatsby"

export const { postCard } = graphql`
    fragment postCard on WpPost {
        seoInformation {
            seoDescription
        }
        id
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
`