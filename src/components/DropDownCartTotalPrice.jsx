import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
    margin: 0 17px;
    display: flex;
    justify-content: space-between;
`

const mapStateToProps = state => {
    return {
        products: state.products,
        cartItemsQuantity: state.cartItemsQuantity,
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

class DropDownCartTotalPrice extends React.Component {
    displayTotalPrice() {
        let totalPrice = 0
        this.props.products.map(product => {
            product.prices.map(price => {
                if(price.currency === this.props.currency) {
                    totalPrice = totalPrice + price.amount * product.quantity
                }
                return price
            })
            return product
        })
        totalPrice = Math.round(totalPrice * 100) / 100
        return totalPrice
    }

    render() {
        return(
            <Container>
                <h4>Total:</h4>
                <h4>{this.displayTotalPrice()} {this.props.currencySymbol}</h4>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(DropDownCartTotalPrice)