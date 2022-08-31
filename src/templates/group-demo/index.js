import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Steps from './steps'
import Partners from './partners'
import Cta from '../../components/pageBuilder/ctaButton'
import Groups from './groups'

const GroupDemoComponent = ({
    pageContext: {
        wordpress_path: slug
    },
    data: {
        page
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
        groupDemoSections: {
            groupDemoIntroSubtitle,
            groupDemoIntroTitle,
            groupDemoIntroDescription,
            groupDemoIntroCta,
            groupDemoIntroBackground,
            groupDemoAboutTitle,
            groupDemoAboutDescription,
            groupDemoAboutCta,
            groupDemoPartnersTitle,
            groupDemoPartnersLogos,
            groupDemoPartnersCta,
            groupDemoFooterSubtitle,
            groupDemoFooterTitle,
            groupDemoFooterCta,
            groupDemoGroupsColumns
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
                subtitle={groupDemoIntroSubtitle}
                title={groupDemoIntroTitle}
                description={groupDemoIntroDescription}
                cta={groupDemoIntroCta}
                background={groupDemoIntroBackground}
            />
            <Steps
                title={groupDemoAboutTitle}
                description={groupDemoAboutDescription}
                cta={groupDemoAboutCta}
            />
            <Groups
                items={groupDemoGroupsColumns}
            />
            <Partners
                title={groupDemoPartnersTitle}
                logos={groupDemoPartnersLogos}
                cta={groupDemoPartnersCta}
            />
            <Cta
                title={groupDemoFooterSubtitle}
                description={groupDemoFooterTitle}
                cta={groupDemoFooterCta}
            />
        </Layout>
    )
}

export default GroupDemoComponent
    
export const pageQuery = graphql`
    query groupDemoQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            groupDemoSections {
                groupDemoIntroSubtitle
                groupDemoIntroTitle
                groupDemoIntroDescription
                groupDemoIntroCta {
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
                groupDemoIntroBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid (maxHeight: 468) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                groupDemoAboutTitle
                groupDemoAboutDescription
                groupDemoAboutCta {
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
                groupDemoGroupsColumns {
                    title
                    description
                    cta {
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
                    background {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid (maxHeight: 468) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                groupDemoPartnersTitle
                groupDemoPartnersLogos {
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
                groupDemoPartnersCta {
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
                groupDemoFooterSubtitle
                groupDemoFooterTitle
                groupDemoFooterCta {
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
`