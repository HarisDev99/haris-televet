import { graphql } from "gatsby"

export const { reviewDetails } = graphql`
    fragment reviewDetails on WpReview {
        reviewContent {
            reviewRole
            reviewContent
            reviewAuthor
            reviewAvatar {
                title
                altText
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
