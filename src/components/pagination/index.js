import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import Pagination from 'rc-pagination'

// Components
import Icon from './icon'

const PaginationComponent =  ({ currentPage, slug, numberOfPages, postType = `blog` }) => {
    const cur = currentPage + 1

    const link = page => {
        if (page === 1) {
            return slug ? `/${postType}/category/${slug}` : `/${postType}`
        }

        return slug ? `/${postType}/category/${slug}/page/${page}` : `/${postType}/page/${page}`
    }

    const handleChange = (current) => {
        console.log(current)
        if (current <= 0 || current >= numberOfPages + 1) return

        const handleLink = link(current)

        navigate(handleLink)
    }
    return (
        <Pagination
            current={cur}
            total={numberOfPages * 5}
            pageSize={5}
            showQuickJumper={false}
            showPrevNextJumpers
            showSizeChanger={false}
            itemRender={(current, type, element) => {
                const handleClick = () => handleChange(current)

                if (type === "page") {
                    return (
                        <Button rel={`no-follow`} className={current === cur && `active`} onClick={handleClick} aria-label={`Go to page ${current}`} title={`Go to page ${current}`}>
                            {current}
                        </Button>
                    )
                }

                if (type === "prev") {
                    return (
                        <Button rel={`no-follow`} onClick={handleClick} aria-label={`Go to previous page`} title={`Go to previous page`}>
                            <Icon />
                        </Button>
                    )
                }

                if (type === "next") {
                    return (
                        <Button rel={`no-follow`} onClick={handleClick} aria-label={`Go to next page`} title={`Go to next page`}>
                            <Icon invert />
                        </Button>
                    )
                }

                return element
            }}
            prevIcon={Icon}
            showLessItems={true}
            onChange={handleChange}
        />
    )
}

export default PaginationComponent

// Styled Components
const Button = styled.a`
    width: 100%;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
    position:relative;
    &.active,
    &:hover {
        background-color: ${props => props.theme.color.purple[100]};
        color: ${props => props.theme.color.purple[700]};
    }
`
