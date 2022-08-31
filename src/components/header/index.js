import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// Components
import Nav from './nav'
import MobileNav from './mobileNav/index'

// Hooks 
import useHeader from '../../hooks/useHeader'

const HeaderComponent = ({
    border = false
}) => {
    const [ open, setOpen ] = useState(false)

    const navOptions = useHeader()
    return (
        <Header border={border}>
            <Wrapper>
                <Logo to={`/`} aria-label={`Navigate to home page`}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 32">
                        <path d="M96.435 32l4.151-7.398L86.761 0h-8.3l17.974 32zM110.092 5.992a5.95 5.95 0 00-5.958-5.959 5.95 5.95 0 00-5.958 5.959c0 3.28 2.678 5.958 5.958 5.958h.134l.1 4.318c0 .435.569.569.77.2l3.916-7.062c0-.034.034-.067.034-.067a6.06 6.06 0 001.004-3.347z" fill="#050E5F"/>
                        <path d="M0 0h23.33v6.293h-8.267v25.105H8.3V6.293H0V0zM43.782 26.109C41.942 29.757 38.36 32 33.506 32c-6.895 0-11.749-4.787-11.749-11.648 0-6.695 4.92-11.65 11.482-11.65 6.694 0 11.313 4.888 11.313 11.85 0 .77-.033 1.34-.1 1.607H28.184c.234 2.61 2.611 4.485 5.322 4.485 2.41 0 3.716-1.037 4.753-2.677l5.523 2.142zm-5.656-8.235c-.268-2.376-2.277-4.083-4.921-4.083-2.61 0-4.72 1.975-4.987 4.084h9.908zM54.761 0v31.398h-6.56V0h6.56zM80.536 26.109C78.695 29.757 75.113 32 70.259 32c-6.895 0-11.748-4.787-11.748-11.648 0-6.695 4.92-11.65 11.48-11.65 6.695 0 11.314 4.888 11.314 11.85 0 .77-.033 1.34-.1 1.607H64.937c.235 2.61 2.611 4.485 5.322 4.485 2.41 0 3.716-1.037 4.754-2.677l5.523 2.142zm-5.624-8.235c-.268-2.376-2.276-4.083-4.92-4.083-2.611 0-4.72 1.975-4.988 4.084h9.908z" fill="#39ADC3"/><path d="M132.887 26.109C131.046 29.757 127.464 32 122.611 32c-6.895 0-11.749-4.787-11.749-11.649 0-6.694 4.92-11.648 11.481-11.648 6.695 0 11.314 4.887 11.314 11.85 0 .77-.034 1.338-.101 1.606h-16.267c.234 2.61 2.611 4.485 5.322 4.485 2.41 0 3.715-1.037 4.753-2.677l5.523 2.142zm-5.657-8.235c-.268-2.376-2.276-4.083-4.92-4.083-2.611 0-4.72 1.975-4.988 4.084h9.908zM144.636 2.745v6.493h5.623v5.39h-5.623v8.134c0 2.376 1.038 3.313 3.18 3.313.803 0 1.707-.234 2.41-.67v5.658c-.971.502-2.477.904-4.586.904-4.652 0-7.531-2.88-7.531-7.8v-9.506h-3.147V9.272h3.147V2.778h6.527v-.033z" fill="#050E5F"/>
                    </svg>
                </Logo>
                    <Nav
                        {...navOptions}
                    />
                    <MobileNav
                        open={open}
                        setOpen={setOpen}
                        {...navOptions}
                    />
            </Wrapper>
        </Header>
    )
}

export default HeaderComponent

// Styled Components
const Header = styled.header`
    width: 100%;
    position: sticky;
    top:0;
    z-index:5500000;
    background-color: #fff;
    height: 4.375rem;
    border-bottom:1px solid ${props => props.theme.color.grey[200]};
    @media (min-width:992px) {
        ${props => props.border ? `border-bottom: 1px solid ${props.theme.color.grey[200]}` : `border-bottom:none`};
        height:6.25rem;
    }
`
const Logo = styled(Link)`
    width:7rem;
`
const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    max-width:30rem;
    width: calc(100% - 3rem);
    height:100%;
    margin:0 auto;
    @media (min-width:992px) {
        width: calc(100% - 5rem);
        max-width:initial;
    }
`