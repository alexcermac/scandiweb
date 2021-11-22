import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import RemovedUnderlineLink from './RemovedUnderlineLink'
import CartItemContainerDetailsAttributes from './CartItemContainerDetailsAttributes'

const Container = styled.div`
    width: 70%;
`

const Category = styled.h1`
    font-size: 30px;
    font-weight: 400;
`

const Price = styled.div`
    
`

const AttributesContainer = styled.div`
    display: flex;
`

const mapStateToProps = state => {
    return {
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

class CartItemContainerDetails extends React.Component {
    displayPrice() {
        return( 
            this.props.product.prices.map((price, index) => {
                if(price.currency === this.props.currency) {
                    return (
                        <h2 key={index}>{price.amount} {this.props.currencySymbol}</h2>
                    )
                }
                return null
            })
        )
    }

    displayAttributes() {
        const attributesArray = []
        this.props.product.options.map((option, index) => {
            attributesArray.push(
                <CartItemContainerDetailsAttributes
                    key={index}
                    option={option}
                    index={index}
                />
            )
            return option
        })
        return attributesArray
    }

    render() {
        return(
            <Container>
                <RemovedUnderlineLink
                    link={`/product/${this.props.product.id}`}
                    name={this.props.product.brand}
                />
                <Category>{this.props.product.name}</Category>
                <Price>
                    {this.displayPrice()}
                </Price>
                <AttributesContainer>
                    {this.displayAttributes()}
                </AttributesContainer>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(CartItemContainerDetails)