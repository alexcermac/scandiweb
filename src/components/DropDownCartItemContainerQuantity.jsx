import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changeProductQuantity, handleCartItemsQuantity } from '../actions'

const Container = styled.div`
    width: 20%;
    height: 130px;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 16px;
        font-weight: 500;
    }
`

const Button = styled.button`
    min-width: 24px;
    height: 24px;
    border: 1px solid #1D1F22;
    background: #fff;
    font-size: 14px;
    :hover {
        cursor: pointer;
    }
`

const mapDispatchToProps = dispatch => {
    return {
        changeProductQuantity: item => dispatch(changeProductQuantity(item)),
        handleCartItemsQuantity: item => dispatch(handleCartItemsQuantity(item))
    }
}

class DropDownCartItemContainerQuantity extends React.Component{
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
        this.props.handleForceUpdate()
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

export default connect(null, mapDispatchToProps)(DropDownCartItemContainerQuantity)