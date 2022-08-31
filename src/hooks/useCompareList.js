import { graphql, useStaticQuery } from 'gatsby'

const CompareListHook = () => {
    const { component } = useStaticQuery(graphql`
        query useCompareList {
            component: wpLayoutComponent(slug: {eq: "app-features"}) {
                appFeaturesList {
                    compareList {
                        title
                    }
                }
            }
        }
    `)

    return component.appFeaturesList.compareList
}

export default CompareListHook