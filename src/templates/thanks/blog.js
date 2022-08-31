import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'

// Components
import ResourceCard from '../../components/resourceCard'
import PostCarousel from '../../components/postCarousel'

const BlogComponent = ({
    settings,
    title
}) => {
    return (
        <Section>
            <Container>
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title ? title : `Recent Blog Articles`}</h2>
                </Header>
            </Container>
            <PostCarousel
                items={settings.posts}
                category={settings.category}
                cta={{
                    title: settings.category.resourceCategorySettings.resourceCategoryGridCta,
                    label: settings.category.resourceCategorySettings.resourceCategoryGridCtaLabel,
                    uri: settings.category.uri
                }}
                ItemComponent={ResourceCard}
            />
        </Section>
    )
}

export default BlogComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Header = styled.header`
    text-align:center;
    margin-bottom:3rem;
`