import { event as FullStoryEvent } from 'react-fullstory'

const FeeSavingsCalcComponent = ({
    payload
}) => {
    FullStoryEvent('Fee Savings Calculator', payload)
}

export default FeeSavingsCalcComponent