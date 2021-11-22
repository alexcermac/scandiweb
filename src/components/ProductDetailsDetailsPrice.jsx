import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

class ProductDetailsDetailsPrice extends React.Component {
    displayPrice() {
        return (
            this.props.prices.map((price, index) => {
                if(price.currency === this.props.currency) {
                    return (
                        <p key={index}>{price.amount} {this.props.currencySymbol}</p>
                    )
                }
                return null
            })
        )
    }

    render() {
        return(
            <>
                <h3>PRICE: {this.displayPrice()}
                </h3>
            </>
        )
    }
}

export default connect(mapStateToProps)(ProductDetailsDetailsPrice)