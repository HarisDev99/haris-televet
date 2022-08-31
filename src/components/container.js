import React from 'react'
import styled from 'styled-components'

const ContainerComponent = ({
    children,
    fullWidth,
    sm,
    md,
    lg,
    xl
}) => (
    <Wrapper
        fullWidth={fullWidth}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
    >
        {children}
    </Wrapper>
)

export default ContainerComponent

const Wrapper = styled.div`
    position:relative;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    ${props => props.fullWidth ? `
        width: 100%;
    ` : `
        max-width: 30rem;
        width: calc(100% - 3rem);
    `}
    margin:0 auto;
    ${props => props.sm};
    @media (min-width:768px) {
        ${props => props.md};
    }
    @media (min-width:992px) {
        ${props => !props.fullWidth && `max-width: 1144px;`};
        ${props => props.lg};
    }
    @media (min-width:1200px) {
        ${props => props.xl};
    }
`