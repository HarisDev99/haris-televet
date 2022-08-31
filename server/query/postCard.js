const query = `
    {
        allWpPost {
            nodes {
                seoInformation {
                    seoDescription
                }
                id
                databaseId
                title
                slug
                excerpt
                date(formatString: "MMMM Do, YYYY")
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 365, quality:100) {
                                    base64
                                    aspectRatio
                                    src
                                    srcSet
                                    srcWebp
                                    srcSetWebp
                                    sizes
                                }
                            }
                        }
                    }
                }
                author {
                    node {
                        firstName
                        lastName
                        customAvatar {
                            avatar {
                                localFile {
                                    childImageSharp {
                                        fixed(height: 32, width: 32) {
                                            base64
                                            width
                                            height
                                            src
                                            srcSet
                                            srcWebp
                                            srcSetWebp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

module.exports = query