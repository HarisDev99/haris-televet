import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Layout Components
import Container from '../../container'

const FooterBottomComponent = ({
    terms,
    privacy,
    twitter,
    facebook,
    linkedin,
    notice,
}) => {
    const year = new Date().getFullYear()
    return (
        <React.Fragment>
        <Bottom>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:1.125rem;
                `}
            >
                <Wrapper>
                    <TermsWrapper className={`sm:text--sm`}>
                        <span>
                            {`Copyright ${year} TeleVet. All rights reserved.`}
                        </span>
                        <GatsbyLink className={`link--underline`} to={terms}>{`Terms`}</GatsbyLink>
                        <GatsbyLink className={`link--underline`} to={privacy}>{`Privacy`}</GatsbyLink>
                    </TermsWrapper>
                    <SocialWrapper>
                        <GatsbyLink to={privacy} className={`sm:text--sm link--underline`}>{`Don't sell my data`}</GatsbyLink>
                        <Social>
                            <SocialItem>
                                <Link href={twitter} aria-label={`Visit us on Twitter`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17 1.634a6.965 6.965 0 01-2.002.549A3.502 3.502 0 0016.53.255a7.03 7.03 0 01-2.216.847 3.488 3.488 0 00-5.942 3.18A9.9 9.9 0 011.184.636 3.461 3.461 0 00.713 2.39c0 1.21.616 2.278 1.55 2.902a3.488 3.488 0 01-1.579-.437v.043a3.49 3.49 0 002.797 3.42c-.292.078-.6.122-.919.122-.225 0-.443-.022-.656-.065a3.49 3.49 0 003.257 2.422 6.996 6.996 0 01-4.331 1.49c-.282 0-.559-.016-.832-.047a9.857 9.857 0 005.346 1.569c6.415 0 9.921-5.314 9.921-9.922l-.011-.451A6.964 6.964 0 0017 1.634z"/>
                                    </svg>
                                </Link>
                            </SocialItem>
                            <SocialItem>
                                <Link href={facebook} aria-label={`Visit us on Facebook`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.499 16V8.702h2.496l.375-2.845H5.499V4.041c0-.823.232-1.384 1.437-1.384l1.535-.001V.111A21.21 21.21 0 006.234 0c-2.214 0-3.73 1.326-3.73 3.76v2.097H0v2.845h2.504V16h2.995z"/>
                                </svg>
                                </Link>
                            </SocialItem>
                            <SocialItem>
                                <Link href={linkedin} aria-label={`Visit us on Instagram`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M12.667 0H3.333A3.334 3.334 0 000 3.333v9.334A3.334 3.334 0 003.333 16h9.334A3.333 3.333 0 0016 12.667V3.333A3.333 3.333 0 0012.667 0zM5.333 12.667h-2V5.333h2v7.334zm-1-8.179a1.172 1.172 0 01-1.166-1.176c0-.65.522-1.176 1.166-1.176.644 0 1.167.527 1.167 1.176 0 .65-.522 1.176-1.167 1.176zm9 8.179h-2V8.93c0-2.246-2.666-2.076-2.666 0v3.736h-2V5.333h2V6.51c.93-1.724 4.666-1.851 4.666 1.65v4.507z"/>
                                    </svg>
                                </Link>
                            </SocialItem>
                        </Social>
                    </SocialWrapper>
                </Wrapper>
                {notice && 
                    <Notice className={`sm:text--sm`}>
                        {notice}
                    </Notice>
                }
            </Container>
        </Bottom>
        </React.Fragment>
    )
}

export default FooterBottomComponent

// Styled Components
const Bottom = styled.div`
    background-color:#fff;
    padding-top:2rem;
    padding-bottom:2rem;
    @media (min-width:992px) {
        padding-top:1.125rem;
        padding-bottom:1.125rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    height:100%;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,max-content));
        align-items:center;
        justify-content:space-between;
    }
`
const TermsWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,max-content));
        grid-column-gap:1rem;
    }
`
const SocialWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.75rem;
    align-items:center;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,max-content));
        grid-column-gap:2rem;
    }
`
const Social = styled.ul`
    display:grid;
    grid-template-columns:repeat(3, minmax(0,max-content));
    grid-column-gap:2rem;
    align-items: center;
`
const SocialItem = styled.li`
`
const Link = styled.a`
    fill:${props => props.theme.color.primary.dark};
`
const Notice = styled.span`
    text-align:left;
    border-top: 1px solid ${props => props.theme.color.grey[200]};
    padding-top:2rem;
    @media (min-width:992px) {
        text-align:center;
        padding-top:1.125rem;
    }
`