import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

import useSearchInputState from './search'

const InputComponent = ({
    itemValue,
    setItemValue,
    textValue,
    setTextValue,
    min,
    max,
    sliderRef,
    prefix,
    suffix,
    decimalScale
}) => {
    const [ searchValue, setSearchValue ] = useSearchInputState(itemValue, () => {
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

        setTextValue(targetValue)
        setItemValue(targetValue)

        const domNode = sliderRef.current

        domNode.noUiSlider.set(targetValue)
    })
    
    return (
        <InputField
            as={NumberFormat}
            value={textValue}
            thousandSeparator
            prefix={prefix}
            suffix={suffix}
            onValueChange={(values) => {
                const payload = values['floatValue']

                if ( payload !== itemValue ) {
                    setTextValue(payload)
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
    box-shadow: none;
    transition: all .2s;
    &:focus {
        box-shadow: 0px 0px 0px 2px ${props => props.theme.color.primary.dark};
        outline:0;
        border:none;
    }
`