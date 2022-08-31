import { event as FullStoryEvent } from 'react-fullstory'
import { useEffect } from 'react'

const useFullStorySavings = ({
    calcValues,
    currentValue,
    initialValue
}) => {
    useEffect(() => {
        if ( initialValue !== currentValue ) {
            const {
                appointmentCount,
                revenue,
                hours
            } = calcValues
    
            const payload = {
                appointmentCount,
                revenue,
                hours
            }

            FullStoryEvent('Savings Calculator', payload)
        }
    }, [ calcValues, currentValue, initialValue ])
}

export default useFullStorySavings