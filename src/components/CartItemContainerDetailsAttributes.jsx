import React from 'react'
import styled from 'styled-components'
import OptionColor from './OptionColor'

const Container = styled.div`
    margin: 0 15px;
    padding: 0;
    p {
        text-align: center;
    }
`

const Option = styled.div`
    width: 63px;
    height: 45px;
    background: #1D1F22;
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

class CartItemContainerDetailsAttributes extends React.Component {
    render() {
        return (
            <Container key={this.props.index}>
                 <p>{this.props.option.title}</p>
                 <Option>
                     {this.props.option.title !== "Color" ? <p>{this.props.option.value}</p>
                     : <OptionColor
                         bgColor={this.props.option.value.toString()}
                     />
                     }
                 </Option>
             </Container>
        )
    }
}

export default CartItemContainerDetailsAttributes