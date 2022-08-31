import { graphql } from "gatsby"

export const { reviewAuthor } = graphql`
    fragment reviewAuthor on wordpress__wp_review {
        acf {
            review_role
            review_author
            review_content
            review_avatar {
                title
                alt_text
                localFile {
                    childImageSharp {
                        fixed(height: 64, width: 64) {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
        }
    }
`
