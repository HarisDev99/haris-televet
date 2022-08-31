import { graphql, useStaticQuery } from 'gatsby'

export default () => {
    const { file } = useStaticQuery(graphql`
        query useReviewPlaceholder {
            file(
                relativeDirectory: {
                    eq: "review"
                },
                name: {
                    eq: "author"
                }
            ) {
                childImageSharp {
                    fixed(height: 64, width: 64) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `)

    return file
}