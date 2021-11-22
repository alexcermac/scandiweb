import React from 'react'
import styled from 'styled-components'

const Option = styled.div`
    width: 20px;
    height: 20px;
    margin: 0;
    background: ${props => props.theme.bgColor};
`

class OptionColor extends React.Component {
    render() {
        return (
            <Option 
                theme={{ bgColor: this.props.bgColor }}
            />
        )
    }
}

export default OptionColor