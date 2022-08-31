import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Menu from './menu'
import Intro from '../../components/pageBuilder/headerCtaShapeBg'
import Calendly from '../../components/pageBuilder/headerCta'
import Trial from './trial'
import Faq from '../../components/pageBuilder/faq'


const CovidComponent = ({
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
        coronaSections: {
            covidMenuItems,
            covidIntroSubtitle,
            covidIntroTitle,
            covidIntroDescription,
            covidIntroCta,
            covidIntroBackground,
            covidCalendarTitle,
            covidCalendarDescription,
            covidCalendarLink,
            covidCalendarBackground,
            covidTrialTitle,
            covidTrialDescription,
            covidTrialCta,
            covidFaqTitle,
            covidFaqItems,
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
            <Menu
                items={covidMenuItems}
            />
            <Intro
                sectionId={covidMenuItems[0].id}
                subtitle={covidIntroSubtitle}
                title={covidIntroTitle}
                description={covidIntroDescription}
                cta={covidIntroCta}
                background={covidIntroBackground}
            />
            <Calendly
                sectionId={covidMenuItems[1].id}
                title={covidCalendarTitle}
                description={covidCalendarDescription}
                background={covidCalendarBackground}
                ctaGroup={{
                    type: `calendly`,
                    calendlyUrl: covidCalendarLink

                }}
                headerCta={{
                    type: null
                }}
                slug={slug}
            />
            <Trial
                sectionId={covidMenuItems[2].id}
                title={covidTrialTitle}
                description={covidTrialDescription}
                formTitle={covidTrialCta.title}
                formId={covidTrialCta.hubspotFormId}
                ctaLabel={covidTrialCta.ctaLabel}
                redirect={covidTrialCta.confirmationPage}
                slug={slug}
            />
            <Faq
                sectionId={covidMenuItems[3].id}
                title={covidFaqTitle}
                items={covidFaqItems}
            />
        </Layout>
    )
}

export default CovidComponent

export const pageQuery = graphql`
    query covidQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            coronaSections {
                covidMenuItems {
                    label
                    id
                }
                covidIntroSubtitle
                covidIntroTitle
                covidIntroDescription
                covidIntroCta {
                    type
                    label
                    linkExternal
                    linkInternal {
                        ... on WpPage {
                            link: uri
                        }
                        ... on WpPost {
                            link: uri
                        }
                    }
                    scopeExternal
                }
                covidIntroBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxHeight: 466) {
                                ...GatsbyImageSharpFluid_withWebp_noBase64
                            }
                        }
                    }
                }
                covidCalendarTitle
                covidCalendarDescription
                covidCalendarLink
                covidCalendarBackground {
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
                covidTrialTitle
                covidTrialDescription
                covidTrialCta {
                    title
                    ctaLabel
                    hubspotFormId
                    confirmationPage {
                        type
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                        }
                        linkExternal
                    }
                }
                covidFaqTitle
                covidFaqItems {
                    title
                    description
                }
            }
        }
    }
`