import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Cta from '../../components/pageBuilder/ctaButton'
import Clinics from '../../components/pageBuilder/clinics'
import IconColumns from '../../components/pageBuilder/iconColumns'

const IntegrationPostComponent = ({
    data: {
        post
    },
    pageContext: {
        wordpress_path: slug
    }
}) => {
    const {
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        integrationPostBuilder: {
            integrationPostLogo,
            integrationPostIntroTitle,
            integrationPostIntroDescription,
            integrationPostIntroCta,
            integrationPostFeaturesTitle,
            integrationPostFeaturesColumns,
            integrationPostFeaturesColumnCount,
            integrationPostClinicsTitle,
            integrationPostClinicsLogos,
            integrationPostCtaTitle,
            integrationPostCtaDescription,
            integrationPostCtaCta,
        },
    } = post

    return (
        <Layout>
            <Seo
                title={seoTitle}
                description={seoDescription}
                slug={slug}
                noindex={seoNoindex}
            />
            <Intro
                logo={integrationPostLogo}
                title={integrationPostIntroTitle}
                description={integrationPostIntroDescription}
                cta={integrationPostIntroCta}
            />
            <IconColumns
                title={integrationPostFeaturesTitle}
                columns={integrationPostFeaturesColumns}
                columnCount={integrationPostFeaturesColumnCount}
                bgColor
            />
            <Clinics
                title={integrationPostClinicsTitle}
                logos={integrationPostClinicsLogos}
            />
            <Cta
                title={integrationPostCtaTitle}
                description={integrationPostCtaDescription}
                cta={integrationPostCtaCta}
                bgColor
            />
        </Layout>
    )
}

export default IntegrationPostComponent

export const pageQuery = graphql`
    query integrationPost($id: String!) {
        post: wpIntegration(id: { eq: $id }) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            integrationPostBuilder {
                integrationPostLogo {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 250, quality:100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                integrationPostIntroTitle
                integrationPostIntroDescription
                integrationPostIntroCta {
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
                integrationPostFeaturesTitle
                integrationPostFeaturesColumnCount
                integrationPostFeaturesColumns {
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
                    title
                    description
                }
                integrationPostClinicsTitle
                integrationPostClinicsLogos {
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
                integrationPostCtaTitle
                integrationPostCtaDescription
                integrationPostCtaCta {
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
    }
`