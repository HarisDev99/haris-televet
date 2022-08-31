import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import ResourceCard from '../../components/resourceCard'
import PostCarousel from '../../components/postCarousel'

const GridComponent = ({
    category,
    items
}) => {
    const categoryCtaTitle = category.resourceCategorySettings.resourceCategoryGridCta ? category.resourceCategorySettings.resourceCategoryGridCta : `Want to see more ${category.name}?`
    
    const categoryCta = category.resourceCategorySettings.resourceCategoryGridCtaLabel ? category.resourceCategorySettings.resourceCategoryGridCtaLabel : `View All ${category.name}`

    return (
        <Section id={category.slug}>
                <Container>
                    <Header>
                        <h2 className={`sm:text--2xl lg:text--4xl`}>{category.name}</h2>
                    </Header>
                </Container>
                <PostCarousel
                    items={items}
                    category={category}
                    cta={{
                        title: categoryCtaTitle,
                        label: categoryCta,
                        uri: category.uri
                    }}
                    ItemComponent={ResourceCard}
                />
        </Section>
    )
}

export default GridComponent

// Styled Components
const Section = styled.section`
    position:relative;
    padding-top:4.5rem;
`
const Header = styled.header`
    margin-bottom:1.5rem;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`