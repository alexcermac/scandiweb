import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { handleDropDownCart, handleCurrency } from '../actions'
import DropDownCart from './DropDownCart'
import NavbarRightSideDropdownCurrencies from './NavbarRightSideDropdownCurrencies'

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Cart = styled.i`
    font-size: 1.3rem;
    margin-left: 16px;
    color: #777;
    :hover {
        cursor: pointer; 
    }
`

const CartIconContainer = styled.div`
    position: relative;
    :hover {
        cursor: pointer;
    }
`

const Counter = styled.div`
    position: absolute;
    right: -10px;
    top: -5px;
    background: #1D1F22;
    border-radius: 50%;
    width: 20px;
    text-align: center;
    color: #fff;
`

const mapStateToProps = state => {
    return {
        dropDownCart: state.dropDownCart,
        cartItemsQuantity: state.cartItemsQuantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDropDownCart: item => dispatch(handleDropDownCart(item)),
        handleCurrency: item => dispatch(handleCurrency(item)),
    }
}

class NavbarRightSide extends React.Component {
    handleCurrency(e) {
        this.props.handleCurrency(e.target.value)
    }

    displayCounter() {
        if(this.props.cartItemsQuantity > 0) {
            return <Counter>{this.props.cartItemsQuantity}</Counter>
        }
    }

    displayDropDownCart() {
        if(this.props.dropDownCart) {
            return <DropDownCart/>
        }
    }

    render() {
        return(
            <Container>
                <NavbarRightSideDropdownCurrencies />
                <CartIconContainer onClick={() => this.props.handleDropDownCart()}>
                    <Cart className="fa fa-shopping-cart"/>
                    {this.displayCounter()}
                </CartIconContainer>
                {this.displayDropDownCart()}
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(NavbarRightSide)