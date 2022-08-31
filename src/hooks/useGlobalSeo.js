import { graphql, useStaticQuery } from 'gatsby'

const GlobalSeoHook = () => {
    const { component } = useStaticQuery(graphql`
        query useGlobalSeo {
            component: wpLayoutComponent(slug: {eq: "global-seo-settings"}) {
                globalSeoSettings {
                    globalSeoBanner {
                        localFile {
                            publicURL
                        }
                    }
                }
            }
        }
    `)

    return component.globalSeoSettings
}

export default GlobalSeoHook