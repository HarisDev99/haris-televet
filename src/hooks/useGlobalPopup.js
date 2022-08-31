import { graphql, useStaticQuery } from 'gatsby'

const GlobalPopupHook = () => {
    const { component } = useStaticQuery(graphql`
        query useGlobalPopup {
            component: wpLayoutComponent(slug: {eq: "global-popup"}) {
                globalPopupComponent {
                    globalPopupVisible
                    globalPopupTitle
                    globalPopupDescription
                    globalPopupBackground {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth:800) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    globalPopupCta {
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
                    }
                }
            }
        }
    `)

    return component.globalPopupComponent
}

export default GlobalPopupHook