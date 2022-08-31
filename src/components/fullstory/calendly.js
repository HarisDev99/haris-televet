import { event as FullStoryEvent, setUserVars as FullyStorySetUserVars } from 'react-fullstory'

const CalendlyComponent = ({
    name,
    email,
}) => {
    FullStoryEvent('Calendly Schedule')

    const fsIdentifyPayload = {}

    if (name) fsIdentifyPayload.displayName = name
    if (email) fsIdentifyPayload.email = email

    if ( Object.keys(fsIdentifyPayload).length ) {
        FullyStorySetUserVars(fsIdentifyPayload)
    }
}

export default CalendlyComponent