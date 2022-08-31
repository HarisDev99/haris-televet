import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Solutions from '../../components/pageBuilder/solutionsColumns'
import Features from './features'
import Reviews from './reviews'
import SupportCta from '../../components/pageBuilder/ctaSupport'

const SolutionsComponent = ({
    data: {
        page,
    },
}) => {
    const {
        slug,
        seoInformation: {
            seoTitle,
            seoDescription,
            seoNoindex
        },
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        solutionsSections: {
            solutionsIntroSubtitle,
            solutionsIntroTitle,
            solutionsIntroDescription,
            solutionsIntroBackground,
            solutionsSolutionsTitle,
            solutionsSolutionsColumns,
            solutionsFeaturesColumns,
            solutionsReviewsItems,
            solutionsSupportTitle,
            solutionsSupportDescription,
            solutionsSupportCtaGroup,
            solutionsSupportBackground,
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
                noindex={seoNoindex}
            />
            <Intro
                subtitle={solutionsIntroSubtitle}
                title={solutionsIntroTitle}
                description={solutionsIntroDescription}
                background={solutionsIntroBackground}
            />
            <Solutions
                items={solutionsSolutionsColumns}
                title={solutionsSolutionsTitle}
            />
            {solutionsFeaturesColumns && solutionsFeaturesColumns.length > 0 &&
                <Features
                    items={solutionsFeaturesColumns}
                />
            }
            <SupportCta
                title={solutionsSupportTitle}
                description={solutionsSupportDescription}
                background={solutionsSupportBackground}
                ctaGroup={solutionsSupportCtaGroup}
            />
            {solutionsReviewsItems && solutionsReviewsItems.length > 0 &&
                <Reviews
                    items={solutionsReviewsItems}
                />
            }
        </Layout>
    )
}

export default SolutionsComponent

export const pageQuery = graphql`
    query solutionsPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            solutionsSections {
                solutionsIntroSubtitle
                solutionsIntroTitle
                solutionsIntroDescription
                solutionsIntroBackground {
                    title
                    altText
                    localFile {
                        childImageSharp {
                            fluid(maxHeight: 468, quality:100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                solutionsSolutionsTitle
                solutionsSolutionsColumns {
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
                solutionsFeaturesColumns {
                    title
                    description
                    cta {
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
                    background {
                        title
                        altText
                        localFile {
                            extension
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 558, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                solutionsReviewsItems {
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
                solutionsSupportTitle
                solutionsSupportDescription
                solutionsSupportCtaGroup {
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
                solutionsSupportBackground {
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
            }
        }
    }
`
