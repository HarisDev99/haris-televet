import React, { useState } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import {
    navigate,
} from 'gatsby'
import axios from 'axios'
import classNames from 'classnames'

// Utils
import parseContent from '../../utils/parseContent'
import handleFullStory from '../fullstory/form'

// Components
import HubspotField from '../../components/hubspotField'

// Hooks
import useHubspotForm from '../../hooks/useHubspotForm'

const CheckboxContainer = ({
    options,
    required,
    name,
    handleGroupChange
}) => {
    const initialState = {}

    options.forEach(({
        value
    }) => {
        initialState[value] = false
    })

    const [valid, setValid] = useState(required ? false : true)
    const [checkedItems, setCheckedItems] = useState(initialState)

    const handleChange = (e) => {
        const item = e.target.value

        const newState = {
            ...checkedItems,
            [item]: e.target.checked
        }

        setCheckedItems(newState)

        const parentState = Object.keys(newState).filter((item) => newState[item] === true).join(`;`)

        if (required) {
            setValid(parentState)
        }

        handleGroupChange({
            [name]: parentState ? parentState : ``
        })
    }

    return (
        <>
            {required && <input type={`text`} className={`sm:d-none`} name={name} value={valid ? `true` : ``} required />}
            {options.map(({
                label,
                value
            }, index) => {
                const fieldName = `${name}-${value}`

                return (
                    <CheckGroup key={index}>
                        <label htmlFor={fieldName}>{label}</label>
                        <input value={value} name={fieldName} id={fieldName} type={`checkbox`} onChange={handleChange} />
                    </CheckGroup>
                )
            })}
        </>
    )
}

const FormField = ({
    field,
    state,
    handleChange,
    handleGroupChange,
}) => {
    const groupType = field.type

    if (groupType === `text`) {
        const {
            richText
        } = field
        return (
            <RichContent className={`form_column-full`}>
                {parseContent(richText.content)}
            </RichContent>
        )
    }

    const {
        label,
        name,
        required,
        fieldType,
        options,
        hidden
    } = field.fields

    if (hidden) return null

    const labelClass = classNames(
        'sm:text--base',
        {
            'required': required
        }
    )

    switch (fieldType) {
        case `text`:
            // Since hubspot doesn't natively support type=tel, we have to parse out the special fields
            if (name.includes(`phone`)) {
                return (
                    <Group>
                        <Label className={labelClass} htmlFor={name}>{label}</Label>
                        <Input as={NumberFormat} format="(###) ###-####" mask={`_`} type={`tel`} name={name} id={name} value={state[name]} onChange={handleChange} required={required} />
                    </Group>
                )
            }

            if (name.includes(`email`)) {
                return (
                    <Group>
                        <Label className={labelClass} htmlFor={name}>{label}</Label>
                        <Input type={`email`} name={name} id={name} value={state[name]} onChange={handleChange} required={required} />
                    </Group>
                )
            }

            return (
                <Group>
                    <Label className={labelClass} htmlFor={name}>{label}</Label>
                    <Input type={`text`} name={name} id={name} value={state[name]} onChange={handleChange} required={required} />
                </Group>
            )
        case `number`:
            return (
                <Group>
                    <Label className={labelClass} htmlFor={name}>{label}</Label>
                    <Input type={`number`} name={name} id={name} value={state[name]} onChange={handleChange} required={required} />
                </Group>
            )
        case `select`:
            return (
                <Group>
                    <Label className={labelClass} htmlFor={name}>{label}</Label>
                    <SelectWrapper>
                        <Select name={name} id={name} value={state[name]} onChange={handleChange} required={required}>
                            <option value={``}>{``}</option>
                            {options.map(({
                                label,
                                value
                            }, index) => (
                                <option key={index} value={value}>{label}</option>
                            ))}
                        </Select>
                    </SelectWrapper>
                </Group>
            )
        case `booleancheckbox`:
            return (
                <CheckGroup className={`form_column-full`}>
                    <label className={labelClass} htmlFor={name}>{label}</label>
                    <input type={`checkbox`} name={name} id={name} onChange={handleChange} checked={state[name]} required={required} />
                </CheckGroup>
            )
        case `checkbox`:
            return (
                <Group className={`form_column-full`}>
                    <Label className={labelClass} htmlFor={name}>{label}</Label>
                    <Message className={`sm:text--sm`}>{`(Check all that Apply)`}</Message>
                    <CheckboxContainer
                        options={options}
                        required={required}
                        name={name}
                        handleGroupChange={handleGroupChange}
                    />
                </Group>
            )
        case `textarea`:
            return (
                <Group className={`form_column-full`}>
                    <Label className={labelClass} htmlFor={name}>{label}</Label>
                    <Textarea rows={`4`} name={name} id={name} value={state[name]} onChange={handleChange} required={required} />
                </Group>
            )
        default:
            return null
    }
}

const FormBuilderComponent = ({
    formNode,
    id,
    ctaLabel,
    redirect,
    slug,
    successCallback = () => { }
}) => {
    // Handle Redirect URL  
    const redirectUrl = redirect.type === `external` ? redirect.linkExternal : redirect.type === `internal` ? redirect.linkInternal.uri : null

    const { formFields, submitText } = formNode

    const initialFieldState = {}

    formFields.forEach(({
        fields
    }) => {
        if (!fields) return
        const {
            name,
            fieldType,
            selectedOptions
        } = fields

        if (fieldType === `booleancheckbox` && selectedOptions.length > 0) {
            return initialFieldState[name] = selectedOptions[0]
        }

        return initialFieldState[name] = ``
    })

    const [fieldState, setFieldState] = useState(initialFieldState)

    const initialMessage = ctaLabel ? ctaLabel : submitText
    const [message, setMessage] = useState(initialMessage)

    const loading = message !== initialMessage

    const handleChange = (e) => {

        // If is checkbox, return true/false
        if (e.target.type === `checkbox`) {
            return setFieldState({
                ...fieldState,
                [e.target.name]: e.target.checked
            })
        }

        setFieldState({
            ...fieldState,
            [e.target.name]: e.target.value
        })

    }

    const handleGroupChange = (fieldObject) => {
        setFieldState({
            ...fieldState,
            ...fieldObject
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            setMessage(`Sending...`)

            const formFields = []

            Object.keys(fieldState).forEach((field) => {
                formFields.push({
                    "name": field,
                    "value": fieldState[field]
                })
            })

            const payload = {
                "fields": formFields,
                "context": {
                    "pageUri": `${process.env.GATSBY_SITE_URL}/${slug}`,
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
                    uri: `${process.env.GATSBY_SITE_URL}/${slug}`,
                    fields: fieldState
                })

                if (redirectUrl) {
                    if (redirect.type === `internal`) {
                        navigate(redirectUrl)
                    } else {
                        window.location = redirectUrl

                        setMessage(`Success!`)
                        setFieldState(initialFieldState)

                        setTimeout(() => {
                            setMessage(initialMessage)
                        }, 1500)
                    }
                }

                successCallback(true)
            }

        } catch (e) {
            setMessage(`Try again later`)
            setFieldState(initialFieldState)

            setTimeout(() => {
                setMessage(initialMessage)
            }, 1500)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <HubspotField />
            {formFields.map((field, index) => {
                return (
                    <FormField
                        key={index}
                        field={field}
                        state={fieldState}
                        handleChange={handleChange}
                        handleGroupChange={handleGroupChange}
                    />
                )
            })}
            <ButtonContainer>
                <Button className={`button button--secondary sm:text--lg`} type={`submit`} disabled={loading}>{message}</Button>
            </ButtonContainer>
        </Form>
    )
}

const FormWrapper = ({
    id,
    ctaLabel,
    redirect,
    slug,
    successCallback = () => { }
}) => {
    const formNode = useHubspotForm({
        id
    })

    if (!formNode) return null

    const { formFields } = formNode

    if (!formFields || formFields.length === 0) return null

    let targetRedirect = redirect;
    if (formNode && formNode.redirect) {
        targetRedirect = {
            type: 'external',
            linkExternal: formNode.redirect,
        }
    }

    let targetSlug = slug;

    if (!slug) {
        if (typeof window !== 'undefined') {
            targetSlug = window.location.pathname;
        }
    }

    return (
        <FormBuilderComponent
            formNode={formNode}
            ctaLabel={ctaLabel}
            redirect={targetRedirect}
            slug={targetSlug}
            successCallback={successCallback}
            id={id}
        />
    )
}

export default FormWrapper

// Styled Components
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    text-align:left;
    width:100%;
    margin: -1.5rem 0 0 0;
    & > * {
        min-width:100%;
        margin: 1.5rem 0 0 0;
    }
    @media (min-width:992px) {
        margin: -1.5rem 0 0 -1.5rem;
        width: calc(100% + 1.5rem);
        & > * {
            flex-grow: 1;
            min-width: calc(50% - 1.5rem);
            margin: 1.5rem 0 0 1.5rem;
        }
        & > *.form_column-full {
            min-width:100%;
        }
    }
`
const Group = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    align-content: space-between;
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
const Textarea = styled.textarea`
    border:none;
    outline:0;
    padding:1rem;
    background:#fff;
    font-size:1rem;
    color:${props => props.theme.color.primary.dark};
    border:1px solid ${props => props.theme.color.grey[300]};
    font-family:inherit;
    border-radius:0.375rem;
    box-shadow:none;
    transition: all .15s;
    &:focus {
        box-shadow: 0px 0px 0px 3px ${props => props.theme.color.teal[100]};
        border-color:${props => props.theme.color.teal[300]};
    }
`
const Message = styled.div`
    color:${props => props.theme.color.grey[600]};
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
const ButtonContainer = styled.div`
    width:100%;
`
const Button = styled.button`
    cursor:pointer;
    margin-top:1.25rem;
    width:100%;
    text-align:center;
    display: block;
    @media (min-width:992px) {
        width:fit-content;
    }
`
const CheckGroup = styled.div`
    display:grid;
    grid-template-columns:repeat(2,minmax(0, max-content));
    align-items:start;
    grid-column-gap:1rem;
    input, label {
        display:flex;
    }
    input {
        position:relative;
        top:7px; 
        grid-column:1/2;
    }
    label {
        width:fit-content;
        grid-row:1;
        grid-column:2/3;
    }
    @media (min-width:992px) {
        align-items:center;
        input {
            top:0;
        }
    }
`
const RichContent = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`