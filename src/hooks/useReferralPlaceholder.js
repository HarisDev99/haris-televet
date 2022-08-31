import { graphql, useStaticQuery } from 'gatsby'

export default () => {
    const { file } = useStaticQuery(graphql`
        query useReferralPlaceholder {
            file(
                relativeDirectory: {
                    eq: "vet-referral"
                },
                name: {
                    eq: "banner"
                }
            ) {
                childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                }
            }
        }
    `)

    return file
}