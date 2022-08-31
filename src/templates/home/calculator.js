import React, { useRef, useMemo, useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

import useFullStorySavings from '../../components/fullstory/savings'

// Components
import InputField from './input'
import SliderField from './slider'

// Utils
import {
    numberWithCommas
} from '../../utils/number'

// Components

const FieldComponent = (props) => {
    const {
        component: Component,
    } = props

    return <Component 
                {...props}
            />
}

const Calculator = ({
    cta,
    title,
    disclaimer,
    fields
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

    const [ sliding, setSliding ] = useState(false)
    const [ calcState, setCalcState ] = useState( targetItem.start )
    const [ textValue, setTextValue ] = useState(calcState)

    const sliderRef = useRef(null)

    const calcFields = useMemo(() => {
        const vetCount = calcState

        const appointmentCount = vetCount * 5760
        const revenue = appointmentCount * 125
        const hours = (appointmentCount * 30) / 60
        const curFee = revenue * 0.03
        const newFee = revenue * 0.01

        return {
            appointmentCount: `${numberWithCommas(appointmentCount)}`,
            revenue: `$${numberWithCommas(revenue)}`,
            hours: `${numberWithCommas(hours)}`,
            curFee: `$${numberWithCommas(curFee)}`,
            newFee: `$${numberWithCommas(newFee)}`,
        }
    }, [ calcState ])

    useFullStorySavings({
        calcValues: calcFields,
        currentValue: calcState,
        initialValue: targetItem.start 
    })

    const options = {
        sliderRef: sliderRef,
        value: calcState,
        setValue: setCalcState,
        ...targetItem,
        min: targetItem.range['min'][0],
        max: targetItem.range['max'][0],
        sliding,
        setSliding
    }

    return (
        <Wrapper>
            <Top>
                <PaddedWrapper>
                    <Title className="sm:text--lg" style={{ textAlign: 'center' }}>{title}</Title>
                    <CalcWrapper>
                        <CalcFieldWrapper>
                            <CalcFieldLabel>{fields[0].label}</CalcFieldLabel>
                            <FieldComponent 
                                {...options}
                                textValue={textValue}
                                setTextValue={setTextValue}
                                component={InputField}
                            />
                        </CalcFieldWrapper>
                        <CalcFieldWrapper className="input-field">
                            <CalcFieldLabel>{fields[1].label}</CalcFieldLabel>
                            <CalcFieldValue>{calcFields.curFee}</CalcFieldValue>
                        </CalcFieldWrapper>
                    </CalcWrapper>
                </PaddedWrapper>
                <SliderWrapper>
                    <FieldComponent
                        {...options}
                        textValue={textValue}
                        setTextValue={setTextValue}
                        component={SliderField}
                    />
                </SliderWrapper>
            </Top>
            <Bottom>
                <BottomWrapper>
                    <div>{disclaimer}</div>
                    {!cta ? null
                    : cta.type === `internal` ? 
                        <GatsbyLink to={cta.linkInternal.uri} className={`button button--secondary sm:text--sm`}>
                            {cta.label}
                        </GatsbyLink>
                    : cta.type === `external` ?
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--secondary sm:text--sm`}>
                            {cta.label}
                        </a>
                    : null}
                </BottomWrapper>
            </Bottom>
        </Wrapper>
    )
}


export default Calculator

const Wrapper = styled.div`
    border-radius:1rem;
    box-shadow: 0px 6px 24px rgb(103 117 139 / 15%);
    background-color:#fff;
    overflow:hidden;
`
const PaddedWrapper = styled.div`
    padding:2rem;
`
const Top = styled.div`
    margin-bottom:2rem;
`
const Bottom = styled.div`
    background-color:${props => props.theme.color.teal[50]};
`
const BottomWrapper = styled.div`
    padding:2rem;
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    justify-content:center;
    & > div {
        margin-bottom:1rem;
        width:100%;
        text-align:center;
    }
    & .button {
        padding:0.5rem 1rem;
    }
    @media (min-width:992px) {
        flex-wrap:nowrap;
        justify-content:start;
        & .button {
            white-space: nowrap;
            margin-left:2rem;
        }
        & > div {
            margin-bottom:0;
            width:auto;
            text-align:left;
        }
    }
`
const CalcWrapper = styled.div`
    display:flex;
    align-items:start;
    justify-content:space-between;
    justify-items:center;
    flex-wrap:wrap;
    @media (min-width:1200px) {
        justify-items:start;
    }
`
const Title = styled.h2`
    text-align:center;
    margin-bottom:2rem;
`
const CalcFieldWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    justify-items:center;
    width:100%;
    margin-bottom:1rem;
    &:last-child {
        margin-bottom:0;
    }
    @media (min-width:1200px) {
        width:auto;
        justify-items:unset;
        &.input-field {
            text-align:right;
        }
    }
`
const CalcFieldLabel = styled.span`

`
const CalcFieldValue = styled.span`
    font-weight:bold;
    line-height:1;
    font-size:1.5rem;
    @media (min-width:992px) {
        height:3rem;
        font-size:2.5rem;
    }
`
const SliderWrapper = styled.div`
    width:100%;
    padding:0 1rem;
    margin-top:1rem;
`