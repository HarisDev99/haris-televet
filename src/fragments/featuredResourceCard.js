import { graphql } from "gatsby"

export const { featuredResourceCard } = graphql`
    fragment featuredResourceCard on WpResource {
        seoInformation {
            seoDescription
        }
        title
        excerpt
        uri
        resourcePostSettings {
            resourcePostFeaturedBanner {
                title
                altText
                localFile {
                    childImageSharp {
                        fixed(width: 600, height:390, quality: 100) {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
            resourceCta {
                type
                linkExternal
                scopeExternal
                video {
                    type
                    videoInternal {
                        localFile {
                            publicURL
                        }
                    }
                    videoExternal
                }
            }
        }
        resourceCategories {
            nodes {
                slug
            }
        }
        featuredImage {
            node {
                title
                altText
                localFile {
                    childImageSharp {
                        fixed(width: 600, height:390) {
                            ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
        }
    }
`
