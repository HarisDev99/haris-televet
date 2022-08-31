import React, { useState } from 'react'
import axios from 'axios'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const SearchComponent = ({
    isLoading,
    setLoading,
    results,
    setResults,
    prevQuery,
    setPrevQuery,
    category,
    setOpen
}) => {
    const [ query, setQuery ] = useState(``)

    const data = useStaticQuery(graphql`
        query PostSearchIndexQuery {
            localSearchPosts {
                publicStoreURL
                internal {
                    contentDigest
                }
            }
        }
    `)

    const contentDigest = data.localSearchPosts.internal.contentDigest

    const storeUrl = data.localSearchPosts.publicStoreURL

    const getStore = async () => {
        try {
            let store
            store = sessionStorage.getItem(contentDigest)
    
            if ( !store ) {
                const response = await axios.get(storeUrl)

                store = response.data
    
                sessionStorage.setItem(contentDigest, JSON.stringify(store))
            } else {
                store = JSON.parse(store)
            }
    
            return store
        } catch (e) {}
    }

    const handleHover = async () => {
        let store
        store = sessionStorage.getItem(contentDigest)

        if ( !store ) {
            const response = await axios.get(storeUrl)

            store = response.data

            sessionStorage.setItem(contentDigest, JSON.stringify(store))
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        if ( prevQuery === query ) return

        try {
            setLoading(true)

            const store = await getStore()

            let searchQuery

            category ? searchQuery = `
                query wpPostSearch {
                    posts(
                        where: { 
                            search: "${query}",
                            categoryId: ${category}
                        }
                    ) {
                        nodes {
                            id
                        }
                    }
                }
            `
            : searchQuery = `
                query wpPostSearch {
                    posts(
                        where: { 
                            search: "${query}",
                        }
                    ) {
                        nodes {
                            id
                        }
                    }
                }
            `

            const options = {
                url: `https://${process.env.GATSBY_SOURCE_URL}graphql`,
                method: `post`,
                data: {
                    query: searchQuery
                }
            }

            const response = await axios(options)

            const postNodes = response.data.data.posts.nodes

            if ( !postNodes.length ) {
                setLoading(false)
                setResults([])
                setPrevQuery(query)
                setOpen(false)
            }

            const payload = []

            postNodes.forEach(({ id }) => store[id] && payload.push(store[id]))

            setResults(payload)
            setLoading(false)
            setPrevQuery(query)
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SearchForm onSubmit={handleSearch}>
            <SearchInput 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onMouseEnter={handleHover} 
                required
            />
            <SearchButton type="submit">
                {isLoading ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 80 80">
                        <path fill="currentColor" d="M40 72C22.4 72 8 57.6 8 40S22.4 8 40 8s32 14.4 32 32c0 1.1-.9 2-2 2s-2-.9-2-2c0-15.4-12.6-28-28-28S12 24.6 12 40s12.6 28 28 28c1.1 0 2 .9 2 2s-.9 2-2 2z">
                            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="0.6s" repeatCount="indefinite"/>
                        </path>
                    </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                }
            </SearchButton>
        </SearchForm>
    )
}

export default SearchComponent

const SearchForm = styled.form`
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(0,3rem);
    border-radius:0.25rem;
    background-color:${props => props.theme.color.grey[100]};
    padding:1.5rem;
`

const SearchInput = styled.input`
    background-color:#fff;
    border-radius:0;
    border-bottom-left-radius:0.25rem;
    border-top-left-radius:0.25rem;
    height:2.5rem;
    width:100%;
    padding:0 0.75rem;
    &:focus {
        outline:0;
        border:none;
    }
`
const SearchButton = styled.button`
    height:2.5rem;
    padding:0.75rem;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${props => props.theme.color.teal[400]};
    color:#fff;
    border-radius:0;
    border-bottom-right-radius:0.25rem;
    border-top-right-radius:0.25rem;
    cursor:pointer;
`