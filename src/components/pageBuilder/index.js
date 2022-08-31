import React from 'react'

// Components
import HeaderCta from './headerCta'
import HeaderHeart from './headerHeart'
import IconColumns from './iconColumns'
import AppDownload from './appDownload'
import Reviews from './reviews'
import Compliance from './compliance'
import IntegrationColumns from './integrationColumns'

const PageBuilderComponent = ({
    pageRows,
    slug,
    formBuilder
}) => {
    return (
        pageRows.map((row, index) => {
            const template = row.fieldGroupName.split(`PageRows_`)[1]
    
            switch(template) {
                case `RowHeaderCta`:
                    return (
                        <HeaderCta
                            key={index}
                            title={row.title}
                            description={row.description}
                            background={row.background}
                            ctaGroup={row.ctaGroup}
                            headerCta={row.headerCtaCtaButton}
                            slug={slug}
                            formBuilder={formBuilder}
                        />
                    )
                case `RowHeaderHeart`:
                    return (
                        <HeaderHeart
                            key={index}
                            title={row.title}
                            description={row.description}
                        />
                    )
                case `RowIconColumns`:
                    return (
                        <IconColumns
                            key={index}
                            title={row.title}
                            description={row.description}
                            columnCount={row.columnCount}
                            columns={row.iconColumns}
                        />
                    )
                case `RowAppDownload`:
                    return (
                        <AppDownload
                            key={index}
                            title={row.title}
                            background={row.background}
                            rows={row.contentRows}
                        />
                    )
                case `RowReviews`:
                    return (
                        <Reviews
                            key={index}
                            type={row.reviewsLayoutType}
                            items={row.reviewRowList.map(({ reviewContent }) => reviewContent)}
                        />
                    )
                case `RowCompliance`:
                    return (
                        <Compliance
                            key={index}
                            title={row.title}
                            description={row.description}
                            subtitle={row.subtitle}
                            logo={row.logo}
                            cta={row.complianceCtaButton}
                        />
                    )
                case `RowIntegrationsColumns`:
                    return (
                        <IntegrationColumns
                            key={index}
                            posts={row.integrationItemPosts}
                            clickable={row.integrationItemClickable}
                        />
                    )
                default:
                    return null
            }
        })
    )
}

export default PageBuilderComponent