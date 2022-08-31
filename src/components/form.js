import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { navigate } from 'gatsby'
import axios from 'axios'

// Components
import HubspotField from '../../components/hubspotField'

export default ({
    fields,
    message,
}) => {
    const defaultFields = {
        email: ``,
        // First Person
        one_firstname: ``,
        one_lastname: ``,
        one_email: ``,
        one_phone: ``,
        // Second Person
        two_firstname: ``,
        two_lastname: ``,
        two_email: ``,
        two_phone: ``,
        // Third Person
        three_firstname: ``,
        three_lastname: ``,
        three_email: ``,
        three_phone: ``
    }

    const defaultMessage = cta_label

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

            const options = {
                payload: {
                    formId: `${process.env.GATSBY_HUBSPOT_VET_REFERRAL_ID}`,
                    formFields: {
                        referral_email: fields.email,
                        group: [
                            {
                                firstname: fields.one_firstname,
                                lastname: fields.one_lastname,
                                email: fields.one_email,
                                phone: fields.one_phone,
                            }, {
                                firstname: fields.two_firstname,
                                lastname: fields.two_lastname,
                                email: fields.two_email,
                                phone: fields.two_phone,
                            }, {
                                firstname: fields.three_firstname,
                                lastname: fields.three_lastname,
                                email: fields.three_email,
                                phone: fields.three_phone,
                            }
                        ]
                    }
                }
            }

            // Set brief timeout to allow for request to be sent to server
            setTimeout(() => {
                navigate(`/${redirect}`) 
            }, 300)

            await axios.post(`${process.env.GATSBY_HUBSPOT_VET_REFERRAL_SERVER}`, options)
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
            <Form onSubmit={handleSubmit}>
                <HubspotField/>
                <Group>
                    <Label className={`sm:text--base required`} htmlFor={`email`}>{`Your email`}</Label>
                    <Input type={`email`} name={`email`} id={`email`} value={fields.email} onChange={handleChange} required/>
                </Group>
                <TitleGroup>
                    <Title className={`sm:text--xl`}>{`First Friend`}</Title>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`one_firstname`}>{`First name`}</Label>
                            <Input type={`text`} name={`one_firstname`} id={`one_firstname`} value={fields.one_firstname} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`one_lastname`}>{`Last name`}</Label>
                            <Input type={`text`} name={`one_lastname`} id={`one_lastname`} value={fields.one_lastname} onChange={handleChange} required/>
                        </Half>
                    </Group>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`one_email`}>{`Email`}</Label>
                            <Input type={`email`} name={`one_email`} id={`one_email`} value={fields.one_email} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base`} htmlFor={`one_phone`}>{`Phone number`}</Label>
                            <Input as={NumberFormat} format="(###) ###-####" mask={`_`} type={`tel`} name={`one_phone`} id={`one_phone`} value={fields.one_phone} onChange={handleChange}/>
                        </Half>
                    </Group>
                </TitleGroup>
                <TitleGroup>
                    <Title className={`sm:text--xl`}>{`Second Friend`}</Title>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`two_firstname`}>{`First name`}</Label>
                            <Input type={`text`} name={`two_firstname`} id={`two_firstname`} value={fields.two_firstname} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`two_lastname`}>{`Last name`}</Label>
                            <Input type={`text`} name={`two_lastname`} id={`two_lastname`} value={fields.two_lastname} onChange={handleChange} required/>
                        </Half>
                    </Group>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`two_email`}>{`Email`}</Label>
                            <Input type={`email`} name={`two_email`} id={`two_email`} value={fields.two_email} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base`} htmlFor={`two_phone`}>{`Phone number`}</Label>
                            <Input as={NumberFormat} format="(###) ###-####" mask={`_`} type={`tel`} name={`two_phone`} id={`two_phone`} value={fields.two_phone} onChange={handleChange}/>
                        </Half>
                    </Group>
                </TitleGroup>
                <TitleGroup>
                    <Title className={`sm:text--xl`}>{`Third Friend`}</Title>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`three_firstname`}>{`First name`}</Label>
                            <Input type={`text`} name={`three_firstname`} id={`three_firstname`} value={fields.three_firstname} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`three_lastname`}>{`Last name`}</Label>
                            <Input type={`text`} name={`three_lastname`} id={`three_lastname`} value={fields.three_lastname} onChange={handleChange} required/>
                        </Half>
                    </Group>
                    <Group className={`register__group--half`}>
                        <Half>
                            <Label className={`sm:text--base required`} htmlFor={`three_email`}>{`Email`}</Label>
                            <Input type={`email`} name={`three_email`} id={`three_email`} value={fields.three_email} onChange={handleChange} required/>
                        </Half>
                        <Half>
                            <Label className={`sm:text--base`} htmlFor={`three_phone`}>{`Phone number`}</Label>
                            <Input as={NumberFormat} format="(###) ###-####" mask={`_`} type={`tel`} name={`three_phone`} id={`three_phone`} value={fields.three_phone} onChange={handleChange}/>
                        </Half>
                    </Group>
                </TitleGroup>
                <Button className={`button button--secondary sm:text--lg`} type={`submit`}>{message}</Button>
            </Form>
        </Wrapper>
    )
}

export const TextField = ({
    size: `full`
}) => (

)

// Styled Components
const Wrapper = styled.div`
`
const Title = styled.span`
    line-height:1;
    font-weight:bold;
`
const Form = styled.form`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    @media (min-width:768px) {
        grid-row:1;
        grid-column:2/3;
    }
`
const TitleGroup = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.55rem;
    border-top:1px solid ${props => props.theme.color.grey[300]};
    padding-top:1.5rem;
`
const Group = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    &.register__group--half {
        grid-row-gap: 1.5rem;
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
const Button = styled.button`
    cursor:pointer;
    margin-top:1.25rem;
    width:100%;
    text-align:center;
    @media (min-width:992px) {
        width:fit-content;
    }
`