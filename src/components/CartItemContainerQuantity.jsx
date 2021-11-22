import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changeProductQuantity, handleCartItemsQuantity } from '../actions'

const Container = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 24px;
        font-weight: 500;
    }
`

const Button = styled.button`
    width: 45px;
    height: 45px;
    border: 1px solid #1D1F22;
    background: #fff;
    font-size: 30px;
    :hover {
        cursor: pointer;
    }
`

const mapDispatchToProps = (dispatch) => {
    return {
        changeProductQuantity: item => dispatch(changeProductQuantity(item)),
        handleCartItemsQuantity: item => dispatch(handleCartItemsQuantity(item))
    }
}

class CartItemContainerQuantity extends React.Component {
    handleQuantity(product, quantityDirection) {
        const info = {
            id: product.id,
            options: product.options,
            quantityDirection: quantityDirection
        }
        this.props.changeProductQuantity(info)
        if(quantityDirection === "add") {
            this.props.handleCartItemsQuantity("add")
        } else {
            this.props.handleCartItemsQuantity("remove")
        }
        this.forceUpdate()
    }

    render() {
        return(
            <Container>
                <Button onClick={() => this.handleQuantity(this.props.product, "add")}>+</Button>
                <p>{this.props.product.quantity}</p>
                <Button onClick={() => this.handleQuantity(this.props.product, "remove")}>-</Button>
            </Container>
        )
    }
}

export default connect(null, mapDispatchToProps)(CartItemContainerQuantity)