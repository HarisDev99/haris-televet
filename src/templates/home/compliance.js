import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

// Assets

export default ({
    items
}) => {
    return (
        <Sections>
            <Container>
                <Wrapper>
                    {items.map(({
                        title,
                        description,
                        icon
                    }, index) => (
                        <Content key={index}>
                            <Icon src={icon.localFile.publicURL} alt={icon.title || icon.altText}/>
                            <ItemHeader>
                                <h2 className={`sm:text--xl lg:text--2xl`}>{title}</h2>
                                <ContentWrapper>
                                    {parseContent(description)}
                                </ContentWrapper>
                            </ItemHeader>
                        </Content>
                    ))}
                </Wrapper>
            </Container>
        </Sections>
    )
}

// Styled Components
const Sections = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-column-gap: 4.5rem;
        grid-template-columns:repeat(2,minmax(0,1fr));
    }
`
const ItemHeader = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    justify-items:center;
    @media (min-width:992px) {
        justify-items:start;
        align-items:start;
        grid-template-columns:minmax(0, max-content) minmax(0,1fr);
        grid-column-gap:1.5rem;
    }
`
const ContentWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Icon = styled.img`
    width: 4rem;
`