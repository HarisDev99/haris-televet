import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import styled from 'styled-components'

// Components
import Slider from './slider'
import Input from './input'
import fullStoryCalc from '../../components/fullstory/calculator'

// Fields
import {
    fields,
    defaultState
} from './fields'

const ItemComponent = ({
    options,
    index,
    inputValues,
    setInputValues,
}) => {
    const initialValue = useMemo(() => {
        return inputValues[index]
    }, [ inputValues, index ])

    const [ itemValue, setItemValue ] = useState( initialValue )
    const [ textValue , setTextValue ] = useState( initialValue )

    const sliderRef = useRef(null)

    const {
        title,
        description,
        range,
        prefix,
        suffix,
        format,
        pipsFormat,
        decimalScale
    } = options

    const min = range['min'][0]
    const max = range['max'][0]

    useEffect(() => {
        if ( inputValues[index] !== itemValue ) {
            setInputValues({
                ...inputValues,
                [index]: itemValue
            })
        }    
    }, [ inputValues, setInputValues, itemValue, index ])

    return (
            <Item>
                <Header>
                    <Title className={`sm:text--xl lg:text--2xl`}>{title}</Title>
                    {description && <Description>{description}</Description>}
                </Header>
                <Input
                    itemValue={itemValue}
                    setItemValue={setItemValue}
                    textValue={textValue}
                    setTextValue={setTextValue}
                    min={min}
                    max={max}
                    sliderRef={sliderRef}
                    suffix={suffix}
                    prefix={prefix}
                    decimalScale={decimalScale}
                />
                <Slider
                    range={range}
                    format={format}
                    suffix={suffix}
                    prefix={prefix}
                    pipsFormat={pipsFormat}
                    itemValue={itemValue}
                    setItemValue={setItemValue}
                    setTextValue={setTextValue}
                    sliderRef={sliderRef}
                />
            </Item>
    )
}

const CalculatorComponent = ({
    items,
    label
}) => {
    const initialItems = defaultState
    const fieldList = fields.map((item, index) => {
        return {
            ...items[index],
            ...item
        }
    })

    const [ inputValues, setInputValues ] = useState(initialItems)

    const handleSavingsCalc = useCallback(() => {
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const revenue = inputValues[0]
        const employees = inputValues[1]
        const curFee = inputValues[2] / 100
        const desiredFee = inputValues[3] / 100

        const currentExpense = ( (revenue * employees) * curFee ) * 12
        const desiredExpense = ( (revenue * employees) * desiredFee ) * 12

        let difference = currentExpense - desiredExpense

        if ( difference <= 0 ) difference = 0

        difference =  Math.round( difference )

        const savings = numberWithCommas( difference )

        return  {
            raw: difference,
            formatted: savings,
        }
    }, [ inputValues ])
    
    const [ show, setShow ] = useState(false)
    const previousState = useRef()
    const answerRef = useRef(null)

    useEffect(() => {
        const isDefined = typeof window !== `undefined`

        if ( !isDefined ) return () => {}

        const domNode = answerRef.current

        let startState = defaultState
        if ( previousState.current ) startState = previousState.current

        startState = JSON.stringify(startState)
        const curState = JSON.stringify(inputValues)

        const stateChanged = startState !== curState

        if ( show && stateChanged ) {
            const payload = {
                revenue: inputValues[0],
                employees: inputValues[1],
                currentFee: inputValues[2] / 100,
                desiredFee: inputValues[3] / 100,
                savings: handleSavingsCalc().raw
            }
            
            previousState.current = inputValues

            fullStoryCalc({
                payload
            })
        }

        let observer = new IntersectionObserver((entries) => {
            for ( const entry of entries ) {
                if ( entry.isIntersecting ) {
                    !show && setShow(true)
                } else {
                    show && setShow(false)
                }
            }
        }, {
            threshold: 0.5
        })

        observer.observe(domNode)

        return () => {
            observer.disconnect()
        }

    }, [ show, setShow, inputValues, handleSavingsCalc, previousState ])
    return (
        <Wrapper>
            <ItemsWrapper>
                {fieldList.map((options, index) => {
                    return (
                        <ItemComponent
                            key={index}
                            options={options}
                            index={index}
                            inputValues={inputValues}
                            setInputValues={setInputValues}
                        />
                    )
                })}
            </ItemsWrapper>
            <Answer ref={answerRef}>
                <AnswerTitle>{`$${handleSavingsCalc().formatted}`}</AnswerTitle>
                <AnswerDescription>{label}</AnswerDescription>
            </Answer>
        </Wrapper>
    )
}

export default CalculatorComponent

// Styled Components
const Answer = styled.div`
    background-color:${props => props.theme.color.primary.dark};
    color:#fff;
    padding:2rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    align-content: center;
    text-align:center;
    @media (min-width:992px) {
        min-height:300px;
    }
`
const AnswerTitle = styled.span`
    font-weight:bold;
    font-size:2rem;
    @media (min-width:992px) {
        font-size:5rem;
    }
`
const AnswerDescription = styled.span`
    color:#fff;
`
const Item = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    padding:3rem 1.5rem;
    &:nth-child(even) {
        background-color:${props => props.theme.color.grey[50]};
        input {
            background-color:${props => props.theme.color.grey[200]};
        }
    }
`
const Header = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    text-align:left;
`
const Title = styled.span`
    font-weight:bold;
`
const Description = styled.span`

`
const ItemsWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0;
`
const Wrapper = styled.div`
    max-width:800px;
    margin:0 auto;
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0rem;
    background-color:#fff;
    border-radius:0.5rem;
    overflow:hidden;
    box-shadow: rgb(103 117 139 / 17%) 0px 8px 32px;
`