import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from '../../components/pageBuilder/headerCta'

const WhitepaperComponent = ({
    data: {
        page
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
        sections: {
            whitepaperIntroTitle,
            whitepaperIntroDescription,
            whitepaperIntroCtaButton,
            whitepaperIntroBackground,
            whitepaperIntroCtaGroup,
        }
    } = page

    return (
        <Layout 
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
            <Intro
                title={whitepaperIntroTitle}
                description={whitepaperIntroDescription}
                background={whitepaperIntroBackground}
                ctaGroup={whitepaperIntroCtaGroup}
                headerCta={whitepaperIntroCtaButton}
                slug={slug}
                formBuilder
            />
        </Layout>
    )
}

export default WhitepaperComponent

export const pageQuery = graphql`
    query whitepaperPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            sections: whitepaperSections {
                whitepaperIntroTitle
                whitepaperIntroDescription
                whitepaperIntroCtaButton {
                    type
                    label
                    scopeExternal
                    linkExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                }
                whitepaperIntroBackground {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 1920, quality: 65) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                whitepaperIntroCtaGroup {
                    type
                    hubspotFormId
                    calendlyUrl
                    buttonLabel
                    formTitle
                    confirmationGroup {
                        type
                        linkExternal
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                        }
                    }
                }
            }
        }
    }
`