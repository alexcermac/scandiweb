import React from 'react'
import styled from 'styled-components'
import NavbarLeftSideLink from './NavbarLeftSideLink'

const Container = styled.div`
    flex: 1;
    display: flex;
`

const links = ["women", "men", "kids"]

class NavbarLeftSide extends React.Component {
    render() {
        return(
            <Container>
                {links.map((link, index) => {
                    return(
                        <NavbarLeftSideLink
                            key={index}
                            link={link}
                        />
                    )
                })}
            </Container>
        )
    }
}

export default NavbarLeftSide