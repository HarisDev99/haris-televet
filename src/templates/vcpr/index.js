import React from 'react'
import { graphql } from 'gatsby'

// Layout Components
import Layout from '../../components/layout/index'
import Seo from '../../components/seo'

// Components
import Intro from '../../components/pageBuilder/headerHeart'
import Table from './table'

const VcprComponent = ({
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
            vcprIntroTitle,
            vcprIntroDescription,
            vcprTableItems
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
                title={vcprIntroTitle}
                description={vcprIntroDescription}
            />
            <Table
                items={vcprTableItems}
            />
        </Layout>
    )
}

export default VcprComponent

export const pageQuery = graphql`
    query vcprPageQuery($databaseId: Int!) {
        page: wpPage(databaseId: {eq: $databaseId}) {
            seoInformation {
                seoTitle
                seoDescription
                seoNoindex
            }
            ...pagePopupSettings
            sections: vcprSections {
                vcprIntroTitle
                vcprIntroDescription
                vcprTableItems {
                    state
                    practiceAct
                    inPerson
                    scope
                    location
                    summary
                }
            }
        }
    }
`