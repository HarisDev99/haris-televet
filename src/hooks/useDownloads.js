import { graphql, useStaticQuery } from 'gatsby'

const DownloadsHook = () => {
    const { component } = useStaticQuery(graphql`
        query useDownloads {
            component: wpLayoutComponent(slug: {eq: "app-downloads"}) {
                appDownloadSections {
                    pets {
                        app_store: appStore
                        play_store: playStore
                    }
                    vets {
                        app_store: appStore
                        play_store: playStore
                    }
                }
            }
        }
    `)

    return component.appDownloadSections
}

export default DownloadsHook