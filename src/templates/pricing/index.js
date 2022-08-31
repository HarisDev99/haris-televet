import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Compare from './compare'
import LegitScript from '../../components/legitScript'
import Cta from '../../components/pageBuilder/ctaButton'

const PricingComponent = ({
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
        pricingSections: {
            featuresTitle,
            featuresDescription,
            pricingMembershipLabel,
            pricingMembershipNotice,
            membershipTitle,
            membershipDescription,
            membershipPricing,
            membershipFeatures,
            membershipCta,
            pricingCtaTitle,
            pricingCtaDescription,
            pricingCtaButton,
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
            <Compare
                title={featuresTitle}
                description={featuresDescription}
            />
            <Intro
                title={membershipTitle}
                description={membershipDescription}
                pricing={membershipPricing}
                features={membershipFeatures}
                cta={membershipCta}
                membershipLabel={pricingMembershipLabel}
                membershipNotice={pricingMembershipNotice}
            />
            <LegitScript/>
            <Cta
                title={pricingCtaTitle}
                description={pricingCtaDescription}
                cta={pricingCtaButton}
                bgColor
            />
        </Layout>
    )
}

export default PricingComponent

export const pageQuery = graphql`
    query pricingQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            pricingSections {
                featuresTitle
                featuresDescription
                pricingMembershipLabel
                pricingMembershipNotice
                membershipTitle
                membershipDescription
                membershipPricing {
                    title
                    description
                    annual
                    monthly
                }
                membershipFeatures {
                    title
                }
                membershipCta {
                    label
                    linkExternal
                    linkInternal {
                      ... on WpPost {
                        link: uri
                      }
                      ... on WpPage {
                        link: uri
                      }
                    }
                    type
                    scopeExternal
                }
                pricingCtaTitle
                pricingCtaDescription
                pricingCtaButton {
                    label
                    linkExternal
                    linkInternal {
                      ... on WpPost {
                        uri
                      }
                      ... on WpPage {
                        uri
                      }
                    }
                    type
                    scopeExternal
                }
            }
        }
    }
`