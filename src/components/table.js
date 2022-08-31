import React from 'react'
import styled from 'styled-components'

// Components
const Icon = () => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" height="14" width="12" viewBox="0 0 14 12"><path fillRule="evenodd" clipRule="evenodd" d="M13.614.21a1 1 0 01.175 1.404l-7.774 10a1 1 0 01-1.477.112l-4.225-4a1 1 0 111.375-1.452l3.424 3.242L12.21.386a1 1 0 011.404-.175z" fill="#050E5F"/></svg>
)

const TableComponent = ({
    items,
    features
}) => {
    return (
        <Table className={`sm:text--xs lg:text--lg`}>
            <Header>
                <Row>
                    <Title>{`Feature`}</Title>
                    {items && items.map(({
                        name
                    }, index) => (
                        <Title key={index}>{name}</Title>
                    ))}
                    <Title>
                        <Logo>
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 32">
                                <path d="M96.435 32l4.151-7.398L86.761 0h-8.3l17.974 32zM110.092 5.992a5.95 5.95 0 00-5.958-5.959 5.95 5.95 0 00-5.958 5.959c0 3.28 2.678 5.958 5.958 5.958h.134l.1 4.318c0 .435.569.569.77.2l3.916-7.062c0-.034.034-.067.034-.067a6.06 6.06 0 001.004-3.347z" fill="#050E5F"/>
                                <path d="M0 0h23.33v6.293h-8.267v25.105H8.3V6.293H0V0zM43.782 26.109C41.942 29.757 38.36 32 33.506 32c-6.895 0-11.749-4.787-11.749-11.648 0-6.695 4.92-11.65 11.482-11.65 6.694 0 11.313 4.888 11.313 11.85 0 .77-.033 1.34-.1 1.607H28.184c.234 2.61 2.611 4.485 5.322 4.485 2.41 0 3.716-1.037 4.753-2.677l5.523 2.142zm-5.656-8.235c-.268-2.376-2.277-4.083-4.921-4.083-2.61 0-4.72 1.975-4.987 4.084h9.908zM54.761 0v31.398h-6.56V0h6.56zM80.536 26.109C78.695 29.757 75.113 32 70.259 32c-6.895 0-11.748-4.787-11.748-11.648 0-6.695 4.92-11.65 11.48-11.65 6.695 0 11.314 4.888 11.314 11.85 0 .77-.033 1.34-.1 1.607H64.937c.235 2.61 2.611 4.485 5.322 4.485 2.41 0 3.716-1.037 4.754-2.677l5.523 2.142zm-5.624-8.235c-.268-2.376-2.276-4.083-4.92-4.083-2.611 0-4.72 1.975-4.988 4.084h9.908z" fill="#39ADC3"/><path d="M132.887 26.109C131.046 29.757 127.464 32 122.611 32c-6.895 0-11.749-4.787-11.749-11.649 0-6.694 4.92-11.648 11.481-11.648 6.695 0 11.314 4.887 11.314 11.85 0 .77-.034 1.338-.101 1.606h-16.267c.234 2.61 2.611 4.485 5.322 4.485 2.41 0 3.715-1.037 4.753-2.677l5.523 2.142zm-5.657-8.235c-.268-2.376-2.276-4.083-4.92-4.083-2.611 0-4.72 1.975-4.988 4.084h9.908zM144.636 2.745v6.493h5.623v5.39h-5.623v8.134c0 2.376 1.038 3.313 3.18 3.313.803 0 1.707-.234 2.41-.67v5.658c-.971.502-2.477.904-4.586.904-4.652 0-7.531-2.88-7.531-7.8v-9.506h-3.147V9.272h3.147V2.778h6.527v-.033z" fill="#050E5F"/>
                            </svg>
                        </Logo>
                    </Title>
                </Row>
            </Header>
            <Body>
                {features.map(({
                    title
                }, index) => (
                    <Row key={index}>
                        <Item>{title}</Item>
                        {items && items.map(({
                            includedFeatures
                        }, newIndex) => includedFeatures.includes(index) ? <Item key={newIndex}><Icon/></Item> : <Item key={newIndex}>{``}</Item>
                        )}
                        <Item><Icon/></Item>
                    </Row>
                ))}
            </Body>
        </Table>
    )
}

export default TableComponent

// Styled Components
const Table = styled.table`
    border-spacing: 0;
    width:100%;
    table-layout: fixed;
`
const Header = styled.thead`
`
const Body = styled.tbody`
`
const Title = styled.th`
    border-bottom:1px solid ${props => props.theme.color.grey[300]};
    padding:0.5rem;
    text-align:center;
    line-height:1.25;
    &:first-child {
        text-align:left;
    }
    @media (min-width:992px) {
        padding:1rem;
        &:first-child {
            padding-left:3.5rem;
        }
    }
`
const Row = styled.tr`
    &:nth-child(even) {
        background-color:${props => props.theme.color.grey[50]};
    }
`
const Item = styled.td`
    border-bottom:1px solid ${props => props.theme.color.grey[200]};
    padding:0.5rem;
    text-align:center;
    &:first-child {
        max-width:7rem;
        text-align:left;
    }
    @media (min-width:992px) {
        padding:1rem 0;
        &:first-child {
            max-width:22rem;
            padding-left:3.5rem;
        }
    }
`
const Logo = styled.div`
    width:3.125rem;
    display: inline-block;
    @media (min-width:992px) {
        width:7rem;
    }
`