import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import NavbarLeftSide from './NavbarLeftSide'
import NavbarCenterSide from './NavbarCenterSide'
import NavbarRightSide from './NavbarRightSide'

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
`

class Navbar extends React.Component {
    render() {
        return (
            <Container>
                <Wrapper>
                    <NavbarLeftSide />
                    <NavbarCenterSide />
                    <NavbarRightSide />
                </Wrapper>
            </Container>
        )
    }
}

export default Navbar
