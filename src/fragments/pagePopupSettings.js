import { graphql } from "gatsby"

export const { postAuthor } = graphql`
    fragment pagePopupSettings on WpPage {
        pagePopupSettings {
            pagePopupToggle
            pagePopupContent {
                type
                title
                description
                backgroundColumn {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth:800) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                background {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth:800) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                cta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                    linkExternal
                    scopeExternal
                    hubspotFormId
                    formToggle
                    formLabel
                    confirmationPage {
                        type
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                        }
                        linkExternal
                    }
                }
                displaySettings {
                    delay
                    type
                }
            }
        }
    }
`