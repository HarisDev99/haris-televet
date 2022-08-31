import { graphql, useStaticQuery } from 'gatsby'

const CtaVariantOneHook = () => {
    const { component } = useStaticQuery(graphql`
        query useCtaVariantOne {
            component: wpLayoutComponent(slug: {eq: "call-to-action"}) {
                ctaOneSections {
                    ctaIntro
                    ctaTitle
                    ctaOneCta {
                        type
                        label
                        linkInternal {
                            ... on WpPage {
                                link: uri
                            }
                            ... on WpPost {
                                link: uri
                            }
                        }
                        linkExternal
                        scopeExternal
                    }
                }
            }
        }
    `)

    return component.ctaOneSections
}

export default CtaVariantOneHook