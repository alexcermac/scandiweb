import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.i`
    font-size: 1.5rem;
    color: #5ECE7B;
`

class NavbarCenterSide extends React.Component {
    render() {
        return(
            <Container>
                <Link to="/">
                    <Logo className="fa fa-shopping-bag" />
                </Link>
            </Container>
        )
    }
}

export default NavbarCenterSide