import React, { useEffect, useRef, useState } from 'react'

const LazyComponent = ({
    children
}) => {
    const [ show, setShow ] = useState(false)

    const wrapper = useRef(null)

    useEffect(() => {
        const domNode = wrapper.current

        let observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShow(true)
            }
        }, {
            threshold: 1
        })

        observer.observe(domNode)

        return () => {
            observer.disconnect()
        }
    }, [ wrapper ])

    return (
        <React.Fragment>
            <div ref={wrapper}></div>
            {show ? children : null}
        </React.Fragment>
    )
}

export default LazyComponent