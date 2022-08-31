import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Expect from './expect'
import Founders from './founder'
import Residence from './residence'
import Team from './team'
import News from './news'
import Cta from './cta'

const AboutComponent = ({
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
        aboutSections: {
            // Intro Section
            introTitle,
            introDescription,
            aboutIntroBackground,
            // Expectations Section
            expectationsTitle,
            expectationsDescription,
            expectationsColumns,
            // Founders Section
            foundersTitle,
            foundersDescription,
            foundersBackground,
            // Team Section
            teamTitle,
            teamDescription,
            teamSlides,
            // Residence Section
            residenceTitle,
            residenceDescription,
            residenceColumns,
            // News Section
            newsTitle,
            articleSlides
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
                title={introTitle}
                description={introDescription}
                background={aboutIntroBackground}
            />
            <Expect
                title={expectationsTitle}
                description={expectationsDescription}
                items={expectationsColumns}
            />
            <Founders
                title={foundersTitle}
                description={foundersDescription}
                background={foundersBackground}
            />
            {/* <Team
                title={teamTitle}
                description={teamDescription}
                items={teamSlides}
            /> */}
            <Residence
                title={residenceTitle}
                description={residenceDescription}
                items={residenceColumns}
            />
            <News
                title={newsTitle}
                items={articleSlides}
            />
            <Cta/>
        </Layout>
    )
}

export default AboutComponent

export const pageQuery = graphql`
    query aboutQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            aboutSections {
                aboutIntroBackground {
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
                introTitle
                introDescription
                expectationsTitle
                expectationsDescription
                expectationsColumns {
                    title
                    description
                }
                foundersTitle
                foundersDescription
                foundersBackground {
                    altText
                    title
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 560) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                teamTitle
                teamDescription
                teamSlides {
                    title
                    description
                    background {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 560, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
                residenceTitle
                residenceDescription
                residenceColumns {
                    title
                    icon {
                        title
                        altText
                        localFile {
                            childImageSharp {
                                fixed(height: 256, width: 256) {
                                    ...GatsbyImageSharpFixed_withWebp
                                }
                            }
                        }
                    }
                }
                newsTitle
                articleSlides {
                    logo {
                        title
                        altText
                        localFile {
                            publicURL
                            childImageSharp {
                                fluid(maxHeight: 64, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    title
                    date
                    link
                }

            }
        }
    }
`