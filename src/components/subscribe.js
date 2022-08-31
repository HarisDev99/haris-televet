import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import axios from 'axios'

// Components
import HubspotField from './hubspotField'

// Hooks
import useHubspotForm from '../hooks/useHubspotForm'

// Utils
import handleFullStory from './fullstory/form'

const SubscribeComponent = ({
    id,
    slug,
    confirmationPage = {
        type: ``
    },
    buttonFull,
    callback = () => {}
}) => {
    const formNode = useHubspotForm({
        id
    })
    const defaultFields = {
        email: ``
    }

    const [ fields, setFields ] = useState(defaultFields)
    const [ loading, setLoading ] = useState(false)

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleConfirmation = () => {
        switch (confirmationPage.type) {
            case `internal`:
                navigate(confirmationPage.linkInternal.uri)
                break
            case `external`:
                window.location = confirmationPage.linkExternal
                break
            default: 
                setFields({
                    ...fields,
                    email: `Subscribed!`
                })

                setLoading(false)

                setTimeout(() => {
                    setFields(defaultFields)
                }, [ 1500 ])

                callback()
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            setLoading(true)
            setFields({
                ...fields,
                email: `Subscribing...`
            })

            const formFields = []
    
            Object.keys(fields).forEach((field) => {
                formFields.push({
                    "name": field,
                    "value": fields[field]
                })
            })
    
            const payload = {
                "fields": formFields,
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

            const response = await axios.post(`${process.env.GATSBY_HUBSPOT_SOURCE_URL}${id}`, payload)

            if (response) {
                handleFullStory({
                    id,
                    name: formNode.name,
                    uri: `${process.env.GATSBY_SITE_URL}/${slug ? slug : ``}`,
                    fields: fields
                })

                handleConfirmation()
            }

        } catch (e) {
            setTimeout(() => {
                setFields({
                    ...fields,
                    email: `Try again later`
                })

                setLoading(false)

                setTimeout(() => {
                    setFields(defaultFields)
                }, [ 1500 ])
            }, [ 1000 ])
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <HubspotField/>
            <Input type={`email`} name={`email`} value={fields.email} onChange={handleChange} placeholder={`Enter email`} className={`sm:text--lg`} required aria-label={`Enter your email address`}/>
            {buttonFull ?
                <ButtonFull className={`button`} aria-label={`Subscribe to TeleVet's newsletter`} disabled={loading}>
                    {loading ? 
                        `Subscribing`
                        :
                        `Subscribe`
                    }
                </ButtonFull>
            :
                <Button className={`button`} aria-label={`Subscribe to TeleVet's newsletter`}>
                    {loading ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 80 80">
                            <path fill="#fff" d="M40 72C22.4 72 8 57.6 8 40S22.4 8 40 8s32 14.4 32 32c0 1.1-.9 2-2 2s-2-.9-2-2c0-15.4-12.6-28-28-28S12 24.6 12 40s12.6 28 28 28c1.1 0 2 .9 2 2s-.9 2-2 2z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="0.6s" repeatCount="indefinite"/>
                            </path>
                        </svg>
                    :
                        <svg width="18" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"/></svg>
                    }
                </Button>
            }
        </Form>
    )
}

export default SubscribeComponent

// Styled Components
const Form = styled.form`
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(0,max-content);
    grid-column-gap:0.375rem;
    background-color:#fff;
    border-radius:2.75rem;
    padding:0.375rem;
    height:3.75rem;
    align-items:center;
    max-width:27rem;
    width:100%;
`
const Input = styled.input`
    background-color:transparent;
    outline:0;
    border:none;
    padding:1rem;
    height:3rem;
    border-radius:2.75rem;
    color:${props => props.theme.color.grey[500]};
    &::placeholder {
        color:${props => props.theme.color.grey[500]};
    }
`
const Button = styled.button`
    background-color:${props => props.theme.color.primary.dark};
    outline:0;
    border:none;
    height:3rem;
    width:3rem;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items:center;
    cursor:pointer;
`
const ButtonFull = styled.button`
    background-color:${props => props.theme.color.primary.dark};
    outline:0;
    border:none;
    height:3rem;
    width:7.5rem;
    border-radius: 2.75rem;
    display: flex;
    justify-content: center;
    align-items:center;
    cursor:pointer;
`