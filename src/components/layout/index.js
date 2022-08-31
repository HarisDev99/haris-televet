import React, { useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'

// Global Style
import GlobalStyle from './globalStyle'

// Theme
import Theme from './theme'

// Components
import Header from '../header/index'
import Footer from '../footer/index'
import GlobalPopup from '../globalPopup/index'
import SubscriptionPopup from '../subscriptionPopup/index'
import PagePopup from '../pagePopup/index'

// Fonts
import LoadFonts from '../fonts/index'

// Hooks
import useGlobalPopup from '../../hooks/useGlobalPopup'

const LayoutComponent = ({
    children,
    footer = true,
    pagePopup,
    subscriptionPopup = false,
    location,
    headerBorder,
    ...rest
}) => {
    const curLocation = location && location.pathname
    const driftLocation = useRef(curLocation)

    useEffect(() => {
        const isBrowser = typeof window !== `undefined`

        LoadFonts()
    
        if ( isBrowser ) {
            if ( window.dataLayer ) {
                window.dataLayer.push({'event': 'optimize.pageChange'})
            }

            if ( window.drift ) {
                if ( curLocation !== driftLocation.current ) {
                    driftLocation.current = curLocation

                    window.drift.page(curLocation)
                }
            }
        }

    }, [ driftLocation, curLocation ])

    const popupSettings = useGlobalPopup()
    
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle/>
            <Header
                border={headerBorder}
                ctaLink={`register`}
                ctaLabel={`Request demo`}
            />
            <Main className={rest.className}>
                {children}
            </Main>
            {footer && <Footer/>}
            {pagePopup ?
                <PagePopup
                    settings={pagePopup}
                />
            :
                subscriptionPopup ? 
                    <SubscriptionPopup/> 
                : popupSettings && popupSettings.globalPopupVisible ? <GlobalPopup settings={popupSettings}/>
                : null
            }
        </ThemeProvider>
    )
}

export default LayoutComponent

// Styled Components
const Main = styled.main`
`