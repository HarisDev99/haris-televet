import React, { useRef, useMemo, useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import styled from 'styled-components'

import useFullStorySavings from '../fullstory/savings'

// Components
import Toggle from '../toggle'
import InputField from './input'
import SliderField from './slider'

// Utils
import {
    numberWithCommas
} from '../../utils/number'

// Components
import TableComponent from './table'

const FieldComponent = (props) => {
    const {
        component: Component,
    } = props

    return <Component 
                {...props}
            />
}

const FieldGroup = (props) => {
    const [ textValue, setTextValue ] = useState(props.value)

    return (
        <FieldRow>
            <FieldComponent 
                {...props}
                textValue={textValue}
                setTextValue={setTextValue}
                component={InputField}
            />
            <FieldComponent
                {...props}
                textValue={textValue}
                setTextValue={setTextValue}
                component={SliderField}
            />
        </FieldRow>
    )
}


const Calculator = ({
    costs,
    savings,
    clinic
}) => {
    const targetItem = {
        start: 1,
        format: {
            to: value => {
                return Math.round(value)
            },
            from: value => value
        },
        decimalScale: 0,
        range: {
            'min': [ 1, 1 ],
            '25%': [ 25, 1 ],
            '50%': [ 50, 1 ],
            '75%': [ 75, 1 ],
            'max': [ 100, 1 ]
        },
    }

    const [ active, setActive ] = useState(0)

    const [ calcState, setCalcState ] = useState( targetItem.start )

    const sliderRef = useRef(null)

    const calcFields = useMemo(() => {
        const vetCount = calcState

        const appointmentCount = vetCount * 5760
        const revenue = appointmentCount * 125
        const hours = (appointmentCount * 30) / 60
        const curFee = revenue * 0.03
        const newFee = revenue * (active ? 0.01 : 0.03)

        return {
            appointmentCount: `${numberWithCommas(appointmentCount)}`,
            revenue: `$${numberWithCommas(revenue)}`,
            hours: `${numberWithCommas(hours)}`,
            curFee: `$${numberWithCommas(curFee)}`,
            newFee: `$${numberWithCommas(newFee)}`,
        }
    }, [ calcState, active ])

    useFullStorySavings({
        calcValues: calcFields,
        currentValue: calcState,
        initialValue: targetItem.start 
    })

    const costsItems = useMemo(() => {
        const fields = costs.fields.map(({
            label: title,
            tooltip,
        }, index) => {
            const {
                appointmentCount,
                revenue,
                curFee,
            } = calcFields

            let value
            let label
            
            switch (index) {
                case 0:
                    value = appointmentCount
                    label = `Appointments`
                    break
                case 1:
                    value = revenue
                    break
                case 2:
                    value = curFee
                    break
                case 3:
                    value = 'Too high'
                    break
                default:
                    break
            }

            return {
                title, 
                description: tooltip.enable ? tooltip.description : ``,
                value,
                label,
            }
        })

        return fields
    }, [ costs, calcFields ])

    const savingsItems = useMemo(() => {
        const fields = savings.fields.map(({
            label: title,
            tooltip,
        }, index) => {
            const {
                hours,
                newFee
            } = calcFields

            let value
            let label
            
            switch (index) {
                case 0:
                    value = hours
                    label = `Hours`
                    break
                case 1:
                    value = newFee
                    break
                default:
                    break
            }

            return {
                title, 
                description: tooltip.enable ? tooltip.description : ``,
                value,
                label
            }
        })

        return fields
    }, [ savings, calcFields ])

    const options = {
        sliderRef: sliderRef,
        value: calcState,
        setValue: setCalcState,
        ...targetItem,
        min: targetItem.range['min'][0],
        max: targetItem.range['max'][0]
    }
    return (
        <Wrapper>
            <Left>
            <PaddedWrapper>
                <Title className="sm:text--xl lg:text--2xl">{clinic.title}</Title>
                <Form>
                    <FormRow>
                    <Label>{clinic.fields.slider}</Label>
                    <FieldGroup {...options}/>
                    </FormRow>
                    <FormRow>
                        <Label>{clinic.fields.toggle.label}</Label>
                        <Toggle
                            active={active}
                            setActive={setActive}
                            items={clinic.fields.toggle.options}
                        />
                    </FormRow>                  
                </Form>
            </PaddedWrapper>
                <Background fluid={clinic.background.localFile.childImageSharp.fluid} alt={clinic.background.alt_text || clinic.background.title}/>
            </Left>
            <Right>
                <PaddedWrapper>
                    <ButtonHeader>
                        <Title className="sm:text--xl lg:text--2xl">{costs.title}</Title>
                        {!costs.cta ? null
                        : costs.cta.type === `internal` ? 
                            <GatsbyLink to={costs.cta.linkInternal.uri} className={`button button--secondary sm:text--sm`}>
                                {costs.cta.label}
                            </GatsbyLink>
                        : costs.cta.type === `external` ?
                            <a href={costs.cta.linkExternal} target={costs.cta.scopeExternal && `_blank`} className={`button button--secondary sm:text--sm`}>
                                {costs.cta.label}
                            </a>
                        : null}
                    </ButtonHeader>
                    <TableComponent
                        items={costsItems}
                    />
                </PaddedWrapper>
                <Bottom>
                    <PaddedWrapper>
                        <Title className="sm:text--xl lg:text--2xl" style={{
                            color: '#fff'
                        }}>{savings.title}</Title>
                        <TableComponent
                            alt
                            items={savingsItems}
                        />
                    </PaddedWrapper>
                </Bottom>
            </Right>
        </Wrapper>
    )
}


export default Calculator

const Wrapper = styled.div`
    background:#fff;
    border-radius:1rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    max-width:56rem;
    width:100%;
    margin:0 auto;
    align-items: start;
    box-shadow: 0px 6px 24px rgb(103 117 139 / 15%);
    align-content: start;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,1fr));
    }
`
const ButtonHeader = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    & > .button {
        padding:0.25rem 0.65rem;
        margin-top:0.5rem;
    }
    & > h2 {
        margin-bottom:0;
        width:100%;
    }
    
    margin-bottom:1rem;
    justify-content:center;
    @media (min-width:992px) {
        margin-bottom:2rem;
        flex-wrap:no-wrap;
        & > .button {
            padding:0.5rem 0.65rem;
            margin-left:auto;
            margin-top:auto;
        }
        & > h2 {
            width:auto;
        }
    }
`
const Title = styled.h2`
    line-height:1.25;
    margin-bottom:1rem;
    text-align:center;
    @media (min-width:992px) {
        margin-bottom:2rem;
        text-align:left;
    }
`
const PaddedWrapper = styled.div`
    padding:1.5rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    align-content: start;
    @media (min-width:992px) {
        padding:2rem;
    }
`
const Left = styled.div`
    height:100%;
    display:grid;
`
const Right = styled.div`
    height:100%;
    background-color:${props => props.theme.color.teal[50]};
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    @media (min-width:992px) {
        border-radius: 0 1rem 1rem 0;
    }
`
const Bottom = styled.div`
    background-color:${props => props.theme.color.primary.dark};
    min-height:4rem;
    border-radius: 0 0 1rem 1rem;
    margin-top: auto;
    @media (min-width:992px) {
        border-radius: 0 0 1rem 0;
    }
`
const Form = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    @media (min-width:992px) {
        grid-row-gap:3rem;
    }
`
const Label = styled.span`
    margin-bottom:1.5rem;
    display:block;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`
const FieldRow = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    align-items:center;
    @media (min-width:992px) {
        grid-template-columns:minmax(0, 8rem) minmax(0,1fr);
        grid-column-gap:2rem;
    }
`
const FormRow = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
`
const Background = styled(GatsbyImage)`
    max-width: 350px;
    margin-left: auto;
    display: block;
    width: 100%;
    margin-top:auto;
`