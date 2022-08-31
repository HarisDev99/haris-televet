import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

// Components
import { InlineWidget } from 'react-calendly'

// Utils
import handleFullStory from './fullstory/calendly'

const CalendlyComponent = ({
    url,
    slug
}) => {
    useEffect(() => {
        const isDefined = typeof window !== `undefined`

        const isCalendlyEvent = (e) => {
            return e.data.event && e.data.event.indexOf('calendly') === 0
        }

        const handleCalendlyInvitee = async (uri) => {
            try {
                const response = await axios.get(uri, {
                    headers: {
                        'Authorization': `Bearer ${process.env.GATSBY_CALENDLY_API}`
                    }
                })

                const { data } = response

                const { resource } = data

                return resource
            } catch (e) {
                console.log(e)
            }
        }

        const handleHubspotContact = async (fields) => {
            try {
                const formId = `d4274ba0-1aac-4089-8ca6-32523832c208`

                const payload = {
                    "fields": fields,
                    "context": {
                        "pageUri": `${process.env.GATSBY_SITE_URL}/${slug ? slug : ``}`,
                        "hutk": document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                    },
                    "legalConsentOptions": {
                        "consent": {
                            "consentToProcess": true,
                            "text": "I agree to allow Televet to store and process my personal data.",
                        }
                    },
                    "skipValidation": true,
                }
    
                await axios.post(`${process.env.GATSBY_HUBSPOT_SOURCE_URL}${formId}`, payload)
            } catch (e) {
                console.log(e)
            }
        }

        if ( isDefined ) {
            const handleIdentify = async (e) => {
                if ( isCalendlyEvent(e) ) {
                    const { data } = e

                    if ( data.event === `calendly.event_scheduled` ) {
                        const { uri } = data.payload.invitee

                        const calendlyInvitee = await handleCalendlyInvitee(uri)

                        if ( calendlyInvitee ) {
                            const {
                                name,
                                email
                            } = calendlyInvitee

                            handleFullStory({
                                name,
                                email,
                            })

                            // const fullName = name.split(" ")

                            // const hubspotFields = [
                            //     {
                            //         'name': 'firstname',
                            //         'value': fullName[0]
                            //     }, {
                            //         'name': 'lastname',
                            //         'value': fullName[1]
                            //     }, {
                            //         'name': 'email',
                            //         'value': email
                            //     }
                            // ]

                            // await handleHubspotContact(hubspotFields)
                        }
                    }
                }
            }

            window.addEventListener('message', handleIdentify)

            return () => {
                window.removeEventListener('message', handleIdentify)
            }
        }
    }, [ slug ])
    return (
        <Wrapper>
            <InlineWidget
                url={url}
                styles={{
                    height:``
                }}
            />
        </Wrapper>
    )
}

export default CalendlyComponent

// Styled Components
const Wrapper = styled.div`
    background-color:#fff;
    border-radius:0.375rem;
    overflow:hidden;
    height:100%;
    box-shadow: rgba(103, 117, 139, 0.15) 0px 8px 32px;
    position: relative;
    .calendly-inline-widget {
        min-height: 71rem;
        height:100%;
        iframe {
            position:absolute;
            top:0;
            left:0;
            width:100%;
        }
    }
    @media (min-width:992px) {
        max-height:initial;
        .calendly-inline-widget {
            min-height: 71rem;
        }
    }
`