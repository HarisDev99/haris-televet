import { graphql, useStaticQuery } from 'gatsby'

const useHeader =  () => {
    const { component } = useStaticQuery(graphql`
        query useSiteHeader {
            component: wpLayoutComponent(slug: {eq: "header"}) {
                headerSettings {
                    menuMain {
                        type
                        icon
                        label
                        linkInternal {
                            ... on WpPost {
                                link: uri
                            }
                            ... on WpPage {
                                link: uri
                            }
                        }
                        linkExternal
                        scopeExternal
                        globalDropdownColums {
                            links {
                                type
                                label
                                linkInternal {
                                    ... on WpPost {
                                        link: uri
                                    }
                                    ... on WpPage {
                                        link: uri
                                    }
                                    ... on WpIntegration {
                                        link: uri
                                    }
                                }
                                linkExternal
                                scopeExternal
                            }
                            footer {
                                type
                                label
                                linkInternal {
                                    ... on WpPost {
                                        link: uri
                                    }
                                    ... on WpPage {
                                        link: uri
                                    }
                                    ... on WpIntegration {
                                        link: uri
                                    }
                                }
                                linkExternal
                                scopeExternal
                            }
                            background {
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 150) {
                                            ...GatsbyImageSharpFluid_withWebp
                                        }
                                    }
                                }
                            }
                        }
                        dropdown {
                            type
                            label
                            linkInternal {
                                ... on WpPost {
                                    link: uri
                                }
                                ... on WpPage {
                                    link: uri
                                }
                            }
                            linkExternal
                            scopeExternal
                        }
                        iconColumns {
                            image {
                                localFile {
                                    publicURL
                                }
                            }
                            type
                            label
                            description
                            linkInternal {
                                ... on WpPost {
                                    link: uri
                                }
                                ... on WpPage {
                                    link: uri
                                }
                            }
                            linkExternal
                            scopeExternal
                        }
                        imageColumns {
                            image {
                                title
                                altText
                                localFile {
                                    childImageSharp {
                                        resize(width: 190) {
                                            src
                                        }
                                    }
                                    publicURL
                                }
                            }
                            type
                            label
                            description
                            linkInternal {
                                ... on WpPost {
                                    link: uri
                                }
                                ... on WpPage {
                                    link: uri
                                }
                            }
                            linkExternal
                            scopeExternal
                        }
                        logoColumns {
                            image {
                                title
                                altText
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 168) {
                                            ...GatsbyImageSharpFluid_withWebp
                                        }
                                    }
                                }
                            }
                            type
                            label
                            linkInternal {
                                ... on WpPost {
                                    link: uri
                                }
                                ... on WpPage {
                                    link: uri
                                }
                            }
                            linkExternal
                            scopeExternal
                        }
                    }
                    menuCta {
                        type
                        label
                        linkInternal {
                            ... on WpPost {
                                link: uri
                            }
                            ... on WpPage {
                                link: uri
                            }
                        }
                        linkExternal
                        scopeExternal
                        splitId
                        splitToggle
                        splitVariants {
                            label
                        }
                    }
                }
            }
        }
    `)

    return component.headerSettings
}

export default useHeader