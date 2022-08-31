import React, { useEffect } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

import useSearchInputState from '../../components/calculator/search'

const InputComponent = ({
    min,
    max,
    prefix,
    suffix,
    decimalScale,
    setValue,
    textValue,
    setTextValue,
    value,
    sliderRef,
}) => {
    const [ searchValue, setSearchValue ] = useSearchInputState(textValue, () => {
        let targetValue = searchValue

        if ( typeof targetValue !== `number` ) {
            targetValue = 0
        }

        if ( targetValue > max ) {
            targetValue = max
        }

        if ( targetValue < min ) {
            targetValue = min
        }

        setValue(targetValue)
        sliderRef.current.noUiSlider.set(targetValue)
    })

    useEffect(() => {
        setTextValue(value)
    }, [ value, setTextValue ])

    return (
        <InputField
            as={NumberFormat}
            value={textValue}
            thousandSeparator
            prefix={prefix}
            suffix={suffix}
            onValueChange={(values) => {
                const payload = values['floatValue']

                setTextValue(payload)

                if (payload !== value) {
                    setSearchValue(payload)
                }
            }}
            decimalScale={decimalScale}
        />
    )
}

export default InputComponent

// Styled Components
const InputField = styled.input`
    background-color:${props => props.theme.color.grey[100]};
    display:flex;
    height:3rem;
    padding:0 1rem;
    transition: all .2s;
    max-width:150px;
    box-shadow: 0px 0px 0px 1px ${props => props.theme.color.grey[300]};
    border-radius:0.325rem;
    &:focus {
        box-shadow: 0px 0px 0px 2px ${props => props.theme.color.primary.dark};
        outline:0;
        border:none;
    }
`