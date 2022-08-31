import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from './intro'
import Beliefs from './beliefs'
import Positions from './positions'
import Cta from './cta'

const CareersComponent = ({
    data: {
        page,
        bamboo
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
        pagePopupSettings: {
            pagePopupToggle,
            pagePopupContent,
        },
        careerSections: {
            // Intro Section
            introTitle,
            introDescription,
            // Beliefs Section
            beliefsTitle,
            beliefsDescription,
            beliefsColumns,
            // Positions Sections
            positionsTitle,
            unavailable,
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
            />
            <Beliefs
                title={beliefsTitle}
                description={beliefsDescription}
                items={beliefsColumns}
            />
            <Positions
                title={positionsTitle}
                items={[
                    ...bamboo.nodes
                ]}
                email={unavailable}
            />
            <Cta/>
        </Layout>
    )
}

export default CareersComponent

export const pageQuery = graphql`
    query careersQuery($databaseId: Int!) {
        bamboo: allBambooCareer {
            nodes {
                careerContent {
                    type
                    title
                    link
                    location {
                        city
                        state
                    }
                }
            }
        }
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            careerSections {
                introTitle
                introDescription
                beliefsTitle
                beliefsDescription
                beliefsColumns {
                    title
                    description
                }
                positionsTitle
                unavailable
            }
        }
    }
`