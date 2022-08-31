import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { navigate, Link as GatsbyLink } from 'gatsby'
import axios from 'axios'

// Components
import HubspotField from '../../components/hubspotField'

export default ({
    title,
    redirect,
    ctaLabel,
    formId,
    slug
}) => {
    const defaultFields = {
        desired_practice_name: ``,
        desired_practice_city: ``,
        desired_practice_state_region: ``,
        firstname: ``,
        lastname: ``,
        email: ``,
    }

    const defaultMessage = ctaLabel

    const [ fields, setFields ] = useState(defaultFields)
    const [ message, setMessage ] = useState(defaultMessage)

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            setMessage(`Sending...`)

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
                    "pageUri": `${process.env.GATSBY_SITE_URL}/${slug}`,
                },
                "legalConsentOptions": {
                    "consent": {
                        "consentToProcess": true,
                        "text": "I agree to allow Televet to store and process my personal data.",
                    }
                },
                "skipValidation": true,
            }

            const response = await axios.post(`${process.env.GATSBY_HUBSPOT_SOURCE_URL}${formId}`, payload)

            if (response) {
                navigate(redirect)
            }

        } catch (e) {
            setMessage(`Try again later`)
            setFields(defaultFields)

            setTimeout(() => {
                setMessage(defaultMessage)
            }, 1500)
        }
    }
    return (
        <Wrapper>
            <Title className={`sm:text--lg`}>{title}</Title>
            <Form id={`register`} onSubmit={handleSubmit}>
                <HubspotField/>
                <Group>
                    <Label className={`sm:text--base required`} htmlFor={`desired_practice_name`}>{`What's the name of the practice or care team you'd like to connect with?`}</Label>
                    <Input type={`text`} name={`desired_practice_name`} id={`desired_practice_name`} value={fields.desired_practice_name} onChange={handleChange} required/>
                </Group>
                <Group>
                    <Label className={`sm:text--base`} htmlFor={`desired_practice_city`}>{`Practice city`}</Label>
                    <Input type={`text`} name={`desired_practice_city`} id={`desired_practice_city`} value={fields.desired_practice_city} onChange={handleChange}/>
                </Group>
                <Group>
                        <Label className={`sm:text--base`} htmlFor={`desired_practice_state_region`}>{`Practice state/region`}</Label>
                        <Input type={`text`} name={`desired_practice_state_region`} id={`desired_practice_state_region`} value={fields.desired_practice_state_region} onChange={handleChange}/>
                </Group>
                <Group className={`register__group--half`}>
                    <Half>
                        <Label className={`sm:text--base required`} htmlFor={`firstname`}>{`Your First name`}</Label>
                        <Input type={`text`} name={`firstname`} id={`firstname`} value={fields.firstname} onChange={handleChange} required/>
                    </Half>
                    <Half>
                        <Label className={`sm:text--base required`} htmlFor={`lastname`}>{`Your Last name`}</Label>
                        <Input type={`text`} name={`lastname`} id={`lastname`} value={fields.lastname} onChange={handleChange} required/>
                    </Half>
                </Group>
                <Group>
                    <Label className={`sm:text--base required`} htmlFor={`email`}>{`Email address -- so we can keep you posted.`}</Label>
                    <Input type={`email`} name={`email`} id={`email`} value={fields.email} onChange={handleChange} required/>
                </Group>
                <Button className={`button button--secondary sm:text--lg`} type={`submit`}>{message}</Button>
            </Form>
        </Wrapper>
    )
}

// Styled Components
const PerOwnerLink = styled.a`
    justify-content:start;
    margin-bottom:0.5rem;
`
const Wrapper = styled.div`
    padding:1.5rem;
`
const Title = styled.h2`
    margin-bottom:1.5rem;
`
const Form = styled.form`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.25rem;
    @media (min-width:768px) {
        grid-row:1;
        grid-column:2/3;
    }
`
const Group = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    &.register__group--half {
        grid-row-gap: 1.25rem;
    }
    @media (min-width:992px) {
        &.register__group--half {
            grid-template-columns:repeat(2,minmax(0,1fr));
            grid-column-gap:1rem;
        }
    }
`
const Half = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
`
const Input = styled.input`
    border:none;
    outline:0;
    height:2.5rem;
    padding:0 1rem;
    background:#fff;
    border:1px solid ${props => props.theme.color.grey[300]};
    border-radius:0.375rem;
    box-shadow:none;
    transition: all .15s;
    &:focus {
        box-shadow: 0px 0px 0px 3px ${props => props.theme.color.teal[100]};
        border-color:${props => props.theme.color.teal[300]};
    }
`
const Label = styled.label`
    &.required:after{
        content: " *";
        color:#f44336;
    }
`
const SelectWrapper = styled.div`
    position: relative;
    &:before {
        content: "";
        display:block;
        position:absolute;
        right:1rem;
        top:17.5px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid ${props => props.theme.color.grey[500]};
        z-index:1;
        pointer-events: none;
    }
`
const Select = styled.select`
    width:100%;
    border:none;
    outline:0;
    height:2.5rem;
    padding:0 2rem 0 1rem;
    border:1px solid ${props => props.theme.color.grey[300]};
    border-radius:0.375rem;
    box-shadow:none;
    transition: all .15s;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    appearance: none;
    background:#fff;
    &:focus {
        box-shadow: 0px 0px 0px 3px ${props => props.theme.color.teal[100]};
        border-color:${props => props.theme.color.teal[300]};
    }
`
const Button = styled.button`
    cursor:pointer;
    margin-top:1.25rem;
    width:100%;
    text-align:center;
    @media (min-width:992px) {
        width:fit-content;
    }
`