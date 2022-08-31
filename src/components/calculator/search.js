import { useState, useEffect, useRef } from 'react'

const useSearchInputState = (itemValue, searchHandler)  => {
    const didMountRef = useRef(false)
  
    const [ searchValue, setSearchValue ] = useState(itemValue)
  
    useEffect(() => {
        let delayDebounceFn
  
        if (didMountRef.current) {
            delayDebounceFn = setTimeout(searchHandler, 800)
        } else {
            didMountRef.current = true
        }
  
        return () => clearTimeout(delayDebounceFn)
    }, [ searchValue ])
  
    return [ searchValue, setSearchValue ]
  
}

export default useSearchInputState