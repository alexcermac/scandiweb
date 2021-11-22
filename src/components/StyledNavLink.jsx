import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const LS = {};

LS.StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: #000;
    padding: 16px;
`

class StyledNavLink extends React.Component {
    render() {
        return(
            <LS.StyledNavLink 
                to={{ pathname: this.props.to }} 
                activeStyle={{
                    color: "#5ECE7B",
                    borderBottom: 'solid 2px #5ECE7B',
                }}
            >
                {this.props.children.toUpperCase()}
            </LS.StyledNavLink>
        )
    }
}

export default StyledNavLink