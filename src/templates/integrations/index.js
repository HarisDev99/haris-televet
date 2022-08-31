import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import PageBuilder from '../../components/pageBuilder/index'

const IntegrationsComponent = ({
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
        pageBuilder: {
            pageRows
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
            <PageBuilder
                pageRows={pageRows}
                slug={slug}
                formBuilder
            />
        </Layout>
    )
}

export default IntegrationsComponent

export const pageQuery = graphql`
    query integrationsPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            pageBuilder {
                pageRows {
                    ... on WpPage_Pagebuilder_PageRows_RowIntegrationsColumns {
                        fieldGroupName
                        integrationItemClickable
                        integrationItemPosts {
                            ... on WpIntegration {
                                title
                                slug
                                integrationPostBuilder {
                                    integrationPostLogo {
                                        title
                                        altText
                                        localFile {
                                            childImageSharp {
                                                fluid(maxWidth: 160, quality:100) {
                                                    ...GatsbyImageSharpFluid_withWebp
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowHeaderCta {
                        fieldGroupName
                        title
                        description
                        background {
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
                        ctaGroup {
                            type
                            hubspotFormId
                            calendlyUrl
                            buttonLabel
                            formTitle
                            confirmationGroup {
                                type
                                linkInternal {
                                    ... on WpPage {
                                        uri
                                    }
                                    ... on WpPage {
                                        uri
                                    }
                                }
                                linkExternal
                            }
                        }
                        headerCtaCtaButton {
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
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowHeaderHeart {
                        fieldGroupName
                        title
                        description
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowIconColumns {
                        fieldGroupName
                        columnCount
                        title
                        description
                        iconColumns {
                            title
                            description
                            icon {
                                altText
                                title
                                localFile {
                                    childImageSharp {
                                        fixed(height:44) {
                                            ...GatsbyImageSharpFixed_withWebp
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowAppDownload {
                        fieldGroupName
                        title
                        background {
                            title
                            altText
                            localFile {
                                childImageSharp {
                                    fluid(maxHeight: 584) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                        contentRows {
                            title
                            description
                            appDownloadCta {
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
                        }
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowReviews {
                        fieldGroupName
                        reviewsLayoutType
                        reviewRowList {
                            ... on WpReview {
                                reviewContent {
                                    reviewRole
                                    reviewContent
                                    reviewAuthor
                                    reviewAvatar {
                                        title
                                        altText
                                        localFile {
                                            childImageSharp {
                                                fixed(height: 64, width: 64) {
                                                    ...GatsbyImageSharpFixed_withWebp
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ... on WpPage_Pagebuilder_PageRows_RowCompliance {
                        fieldGroupName
                        title
                        logo {
                            title
                            altText
                            localFile {
                                childImageSharp {
                                    fixed(height: 48, quality:100) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                        subtitle
                        description
                        complianceCtaButton {
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
        }
    }
`