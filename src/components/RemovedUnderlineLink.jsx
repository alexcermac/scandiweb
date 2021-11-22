import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LS = {};

LS.RemovedUnderlineLink = styled(Link)`
    text-decoration: none;
`

const Name = styled.h1`
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: 600;
    color: black;
    text-decoration: none;
`

class RemovedUnderlineLink extends React.Component {
    render(){
        return(
            <LS.RemovedUnderlineLink to={{ pathname: this.props.link }}>
                <Name>{this.props.name}</Name>
            </LS.RemovedUnderlineLink>
        )
    }
}

export default RemovedUnderlineLink