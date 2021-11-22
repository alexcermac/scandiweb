import React from 'react'
import styled from 'styled-components'
import OptionColor from './OptionColor'

const Container = styled.div`
    margin-bottom: 10px;
    padding: 0;
    p {
        margin: 0;
    }
`

const Option = styled.div`
    min-width: 24px;
    max-width: 50px;
    height: 24px;
    border: 1px solid #1D1F22;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
`

class DropDownCartItemContainerDetailsAttributes extends React.Component {
    displayOption() {
        if(this.props.option.title !== "Color") {
            return(
                <p>{this.props.option.value}</p>
            )
        }
        return(
            <OptionColor bgColor={this.props.option.value.toString()} />
        )
    }

    render() {
        return(
            <Container key={this.props.index}>
                <p>{this.props.option.title}</p>
                <Option>
                    {this.displayOption()}
                </Option>
            </Container>
        )
    }
}

export default DropDownCartItemContainerDetailsAttributes