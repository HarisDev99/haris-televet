import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import About from './about'
import Reviews from './reviews'
import Cta from './cta'
import Integrations from './integrations'
import AppDownload from '../../components/pageBuilder/appDownload'
import Solutions from '../../components/pageBuilder/solutionsColumns'
import Clinics from './clinics'
import SupportCta from '../../components/pageBuilder/ctaSupport'

const HomeComponent = ({
    data: {
        page
    },
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
        homeSections: {
            // Review
            homeReviewItems,
            // Intro Section
            homeIntroSubtitle,
            introTitle,
            introDescription,
            homeIntroCtaGroup,
            introBackground,
            homeIntroReviewWidget,
            homeIntroCalculator,
            // About Section
            aboutTitle,
            aboutDescription,
            homeAboutCta,
            aboutTabOne,
            aboutTabTwo,
            aboutTabThree,
            // Integrations Section
            integrationsTitle,
            integrationsLogos,
            homeIntegrationsCta,
            // Integrations Sections
            appDownloadTitle,
            appDownloadBackground,
            homeAppDownloadRows,
            // Solutions Section
            homeSolutionsTitle,
            homeSolutionsColumns,
            homeSolutionsButtons,
            // Clinics Section
            homeClinicsTitle,
            homeClinicsLogos,
            homeSupportCtaTitle,
            homeSupportCtaDescription,
            homeSupportCtaButtons,
            homeSupportCtaBackground,
        }
    } = page

    return (
        <Layout
            pagePopup={pagePopupToggle ? {
                ...pagePopupContent,
                slug: ``
            } : null}
        >
            <Seo
                title={seoTitle}
                description={seoDescription}
                noindex={seoNoindex}
            />
            <Intro
                subtitle={homeIntroSubtitle}
                title={introTitle}
                description={introDescription}
                ctaGroup={homeIntroCtaGroup}
                background={introBackground}
                reviews={homeIntroReviewWidget.toggle ? homeIntroReviewWidget : null}
                calculator={homeIntroCalculator}
            />
            <Integrations
                title={integrationsTitle}
                logos={integrationsLogos}
                cta={homeIntegrationsCta}
            />
            <Solutions
                title={homeSolutionsTitle}
                items={homeSolutionsColumns}
                buttons={homeSolutionsButtons}
            />
            <About
                title={aboutTitle}
                description={aboutDescription}
                cta={homeAboutCta}
                items={[
                    aboutTabOne,
                    aboutTabTwo,
                    aboutTabThree,
                ]}
            />
            <AppDownload
                title={appDownloadTitle}
                background={appDownloadBackground}
                rows={homeAppDownloadRows.map((item) => {
                    return {
                        ...item,
                        appDownloadCta: {
                            ...item.appDownloadCta,
                            button: `arrow`
                        }
                    }
                })}
            />
            <Clinics
                title={homeClinicsTitle}
                logos={homeClinicsLogos}
            />
            <Reviews
                items={homeReviewItems}
            />
            <SupportCta
                title={homeSupportCtaTitle}
                description={homeSupportCtaDescription}
                background={homeSupportCtaBackground}
                ctaGroup={homeSupportCtaButtons}
            />
            <Cta />
        </Layout>
    )
}

export default HomeComponent

export const pageQuery = graphql`
    query homeQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            homeSections {
                homeIntroCalculator {
                    title
                    disclaimer
                    fields {
                        label
                    }
                    cta {
                        type
                        scopeExternal
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                        }
                        linkExternal
                        label
                    }
                }
                homeSupportCtaTitle
                homeSupportCtaDescription
                homeSupportCtaButtons {
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
                }
                homeSupportCtaBackground {
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
                homeIntroReviewWidget {
                    toggle
                    title
                    items {
                        item {
                            ... on WpReview {
                                reviewContent {
                                    reviewContent
                                }
                            }
                        }
                    }
                }
                homeClinicsTitle
                homeClinicsLogos {
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
                homeSolutionsTitle
                homeSolutionsColumns {
                    title
                    description
                    icon {
                        title
                        altText
                        localFile {
                            publicURL
                        }
                    }
                    cta {
                        type
                        linkExternal
                        scopeExternal
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
                homeSolutionsButtons {
                    type
                    label
                    linkExternal
                    scopeExternal
                    linkInternal {
                        ... on WpPage {
                            uri
                        }
                        ... on WpPost {
                            uri
                        }
                    }
                }
                homeComplianceItems {
                    title
                    description
                    icon {
                        title
                        altText
                        localFile {
                            publicURL
                        }
                    }
                }
                homeReviewItems {
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
                appDownloadTitle
                appDownloadBackground {
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
                homeAppDownloadRows {
                    title
                    description
                    appDownloadCta: homeAppDownloadCta {
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
                integrationsTitle
                integrationsLogos: homeIntegrationsLogos {
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
                homeIntegrationsCta {
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
                homeIntroSubtitle
                introTitle
                introDescription
                homeIntroCtaGroup {
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
                introBackground {
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
                aboutTitle
                aboutDescription
                homeAboutCta {
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
                aboutTabOne {
                    tabTitle
                    tabDescription
                    tabBackground {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 648, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    tabIcon {
                        title
                        altText
                        localFile {
                            publicURL
                        }
                    }
                }
                aboutTabTwo {
                    tabTitle
                    tabDescription
                    tabBackground {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 648, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    tabIcon {
                        title
                        altText
                        localFile {
                            publicURL
                        }
                    }
                }
                aboutTabThree {
                    tabTitle
                    tabDescription
                    tabBackground {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 648, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    tabIcon {
                        title
                        altText
                        localFile {
                            publicURL
                        }
                    }
                }

                featuresTitle
                featuresDescription
                homeFeaturesCta {
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
                featuresColumnOne {
                    columnTitle
                    columnDescription
                }
                featuresColumnTwo {
                    columnTitle
                    columnDescription
                }
                featuresColumnThree {
                    columnTitle
                    columnDescription
                }
            }
        }
    }
`