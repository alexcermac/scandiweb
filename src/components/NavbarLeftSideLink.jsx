import React from 'react'
import styled from 'styled-components'
import StyledNavLink from './StyledNavLink'

const Container = styled.div`
    position: relative;
`

class NavbarLeftSideLink extends React.Component {
    render() {
        const link = this.props.link
        return(
            <Container>
                <StyledNavLink to={"/" + link}>
                    {link}
                </StyledNavLink>
            </Container>
        )
    }
}

export default NavbarLeftSideLink