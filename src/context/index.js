import React, { useEffect, useState } from 'react'
import FullStory from 'react-fullstory'

export const globalContext = React.createContext({})

const Provider = ({
    children
}) => {
    useEffect(() => {
        const isBrowser = typeof window !== `undefined`

        if ( isBrowser ) {
            if ( window.dataLayer ) {
                window.dataLayer.push({'event': 'optimize.mount'})
            }
        }
    }, [])

    const [ state, setState ] = useState({
        headerCta: ``
    })

    return (
        <globalContext.Provider value={{
            state,
            setState: (input) => setState(input)
        }}>

            {children}
        </globalContext.Provider>
    )
}

const WrapperComponent = ({
    element
}) => {
    return (
        <Provider>
            <FullStory
                org={'TGQZZ'}
            />
            {element}
        </Provider>
    )
}

export default WrapperComponent