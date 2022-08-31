import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Search from './search'

// Hooks
import usePostCategories from '../../hooks/usePostCategories'

const SidebarComponent = ({
    isLoading,
    setLoading,
    results,
    setResults,
    prevQuery,
    setPrevQuery,
    category
}) => {
    const categories = usePostCategories()
    
    const [ isOpen, setOpen ] = useState(false)
    return (
        <Wrapper className={isOpen ? `active` : ``}>
            <Toggle onClick={() => setOpen(!isOpen)} >
                {`Filter`}
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6z"/>
                </svg>
            </Toggle>
            <Spacer></Spacer>
            <WrapperInner>
                <Search
                    setResults={setResults}
                    isLoading={isLoading}
                    setLoading={setLoading}
                    prevQuery={prevQuery}
                    setPrevQuery={setPrevQuery}
                    category={category}
                    setOpen={setOpen}
                />
                <CategoryWrapper>
                    <CategoryTitle className={`sm:text--xl`}>{`Topics`}</CategoryTitle>
                    <List>
                        {categories.map(({
                            uri,
                            name
                        }, index) => (
                            <li key={index}>
                                <Link to={uri}>{name}</Link>
                            </li>
                        ))}
                    </List>
                </CategoryWrapper>
            </WrapperInner>
        </Wrapper>
    )
}

export default SidebarComponent

const Toggle = styled.button`
    background-color:${props => props.theme.color.teal[400]};
    color:#fff;
    padding:0.5rem 1rem;
    font-weight:bold;
    cursor:pointer;
    display:flex;
    align-items:center;
    border-radius:0.25rem;
    margin:0 auto;
    svg {
        margin-left:0.45rem;
        height:0.35rem;
        position:relative;
        top:1px;
        transition: all .15s;
        .active & {
            transform:rotate(-180deg);
        }
    }
    @media (min-width:992px) {
        display:none;
    }
`
const Wrapper = styled.div`
`
const CategoryWrapper = styled.div`
    padding:1.5rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`
const CategoryTitle = styled.h3`

`
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    a {
        &:hover {
            text-decoration:underline;
        }
    }
`
const Spacer = styled.div`
    height:0rem;
    transition: all .15s;
    .active & {
        height:1.5rem;
    }
    @media (min-width:992px) {
        display:none;
    }
`
const WrapperInner = styled.div`
    border-radius:0.25rem;
    overflow:hidden;
    background-color:${props => props.theme.color.grey[50]};
    max-height:0;
    transition: all .15s;
    opacity:0;
    .active & {
        max-height:1000px;
        opacity:1;
    }
    @media (min-width:992px) {
        max-height:initial;
        opacity:1;
    }
`