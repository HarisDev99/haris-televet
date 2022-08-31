import { graphql } from "gatsby"

export const { postAuthor } = graphql`
    fragment postAuthor on WpPost {
        author {
            node {
                firstName
                lastName
                customAvatar {
                    avatar {
                        localFile {
                            childImageSharp {
                                fixed(height: 32, width: 32) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
