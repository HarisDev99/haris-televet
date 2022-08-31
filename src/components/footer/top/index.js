import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../container'

// Components
import Menu from './menu'
import Form from '../../subscribe'

const FooterTopComponent = ({
    columns
}) => {
    return (
    <Container>
        <Wrapper>
            {columns.map(({
                title,
                type,
                menu,
                description,
                formId
            }, index) => (
                <Column key={index}>    
                    <h3 className={`sm:text--lg`}>{title}</h3>
                    {description && <p className={`sm:text--lg`}>{description}</p>}
                    {type === `menu` ?
                        <Menu
                            items={menu}
                        />
                    : type === `subscription` ?
                        <Form
                            id={formId}
                        />
                    : null
                    }
                </Column>
            ))}
        </Wrapper>
    </Container>
    )
}

export default FooterTopComponent

// Styled Components
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:repeat(2, minmax(0,1fr));
    grid-row-gap:3rem;
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,10.5rem)) minmax(0,2.5fr);
        grid-column-gap:4.5rem;
        align-items: start;
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Column = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    &:last-child {
        grid-row:1;
        grid-column:1/3;
    }
    @media (min-width:992px) {
        grid-row-gap:2rem;
        &:last-child {
            grid-row:auto;
            grid-column:auto;
        }
    }
`