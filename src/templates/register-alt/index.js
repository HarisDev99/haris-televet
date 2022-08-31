import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Component
import CtaSplit from '../../components/pageBuilder/ctaSplit'

const RegisterAltComponent = ({
    data: {
        page,
    },
    pageContext: {
        wordpress_path: slug
    }
}) => {
    const {
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        registerAltSections: {
            registerAltIntroBackground,
            registerAltIntroTitle,
            registerAltIntroDescription,
            registerAltIntroCta,
            registerAltCtaTitle,
            registerAltCtaDescription,
            registerAltCtaCta,
        }
    } = page

    return (
        <Layout
            footer={false}
            pagePopup={pagePopupToggle ? {
                ...pagePopupContent,
                slug
            } : null}
        >
            <Seo 
                title={seoTitle}
                description={seoDescription}
                slug={slug}
                noindex={seoNoindex}
            />
            <CtaSplit
                background={registerAltIntroBackground}
                introTitle={registerAltIntroTitle}
                introDescription={registerAltIntroDescription}
                introCta={registerAltIntroCta}
                ctaTitle={registerAltCtaTitle}
                ctaDescription={registerAltCtaDescription}
                ctaGroup={registerAltCtaCta}
                slug={slug}
            />
        </Layout>
    )
}

export default RegisterAltComponent

// Page Query
export const pageQuery = graphql`
    query registerAltQuery($databaseId: Int!) {
        page: wpPage(databaseId: { eq: $databaseId } ) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            registerAltSections {
                registerAltIntroBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 400, maxHeight: 400) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                registerAltIntroTitle
                registerAltIntroDescription
                registerAltIntroCta {
                    type
                    label
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                        ... on WpResource {
                            uri
                        }
                    }
                    linkExternal
                    scopeExternal
                }
                registerAltCtaTitle
                registerAltCtaDescription
                registerAltCtaCta {
                    type
                    label
                    hubspotFormId
                    calendlyUrl
                    confirmationPage {
                        type
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                            ... on WpResource {
                                uri
                            }
                        }
                        linkExternal
                    }
                }
            }
        }
    }
`