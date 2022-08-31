import { graphql, useStaticQuery } from 'gatsby'

const FooterHook = () => {
    const { component } = useStaticQuery(graphql`
        query useSiteFooter {
            component: wpLayoutComponent(slug: {eq: "footer"}) {
                footerSettings {
                    columns {
                        type
                        title
                        description
                        menu {
                            linkExternal
                            linkInternal {
                                ... on WpPost {
                                    link: uri
                                }
                                ... on WpPage {
                                    link: uri
                                }
                            }
                            scopeExternal
                            type
                            label
                        }
                        formId
                    }
                    legal {
                        terms {
                            ... on WpPage {
                                link: uri
                            }
                        }
                        privacy {
                            ... on WpPage {
                                link: uri
                            }
                        }
                        notice
                    }
                    social {
                        twitter
                        facebook
                        linkedin
                    }
                }
            }
        }
    `)

    return component.footerSettings
}

export default FooterHook