import { event as FullStoryEvent, setUserVars as FullyStorySetUserVars } from 'react-fullstory'

const FormComponent = ({
    id,
    name,
    uri,
    fields
}) => {
    const fsPayload = {
        formId: id,
        formName: name,
        pageUri: uri
    }

    FullStoryEvent('Form Submit', fsPayload)

    const fsIdentifyPayload = {}

    if ( fields.email ) {
        fsIdentifyPayload.email = fields.email
    }

    if ( fields.firstname ) {
        fsIdentifyPayload.displayName = fields.firstname
    }

    if ( fields.lastname ) {
        if ( fsIdentifyPayload.displayName ) {
            fsIdentifyPayload.displayName +=  ` ${fields.lastname}`
        } else {
            fsIdentifyPayload.displayName = fields.lastname
        }
    }

    if ( Object.keys(fsIdentifyPayload).length ) {
        FullyStorySetUserVars(fsIdentifyPayload)
    }
}

export default FormComponent