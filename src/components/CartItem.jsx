import React from 'react'
import styled from 'styled-components'
import CartItemContainer from '../components/CartItemContainer'

const Container = styled.div`
    margin-bottom: 40px;
`

const BreakLine = styled.div`
    height: 1px;
    width: 100%;
    background-color: #E5E5E5;
    margin: 20px 0;
`

class CartItem extends React.Component {
    render() {
        return(
            <Container key={this.props.index}>
                <BreakLine/>
                <CartItemContainer product={this.props.product}/>
            </Container>
        )
    }
}

export default CartItem