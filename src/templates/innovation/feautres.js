import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'

// Assets
import RemoteCare from '../../images/icons/remote-care.svg'
import Empathy from '../../images/icons/empathy.svg'
import CustomerCentric from '../../images/icons/customer-centric.svg'

const FeaturesComponent = ({
    items
}) => {
    return (
        <Sections>
            <Container>
                <Wrapper>
                    {items.map(({
                        title,
                        description
                    }, index) => (
                        <Content key={index}>
                            {index === 0 ? <RemoteCare/> : index === 1 ? <Empathy/> : <CustomerCentric/>}
                            <ItemHeader>
                                <h2 className={`sm:text--xl`}>{title}</h2>
                                <p className={`sm:text--lg`}>{description}</p>
                            </ItemHeader>
                        </Content>
                    ))}
                </Wrapper>
            </Container>
        </Sections>
    )
}

export default FeaturesComponent

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
        grid-column-gap: 3rem;
        grid-template-columns:repeat(3,minmax(0,1fr));
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