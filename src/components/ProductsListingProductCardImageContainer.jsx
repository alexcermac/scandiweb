import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addItemInCart, handleCartItemsQuantity } from '../actions'

const Container = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
`

const ProductImg = styled.img`
    width: 100%;
    height: 350px;
    object-fit: cover;
    margin-bottom: 24px;
    opacity: ${props => props.theme.opacity};
`

const OutOfStock = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    h2 {
        font-weight: 400;
    }
`

const Cart = styled.i`
    position: absolute;
    right: 5%;
    bottom: 0px;
    font-size: 2rem;
    color: #fff;
    background: #5ECE7B;
    padding: 10px;
    border-radius: 50%;
    transition: .1s;
`

const mapDispatchToProps = dispatch => {
    return {
        addItemInCart: item => dispatch(addItemInCart(item)),
        handleCartItemsQuantity: item => dispatch(handleCartItemsQuantity(item))
    }
}

class ProductsListingProductCardImageContainer extends React.Component {
    handleAddToCart(product) {
        const options = []
        product.attributes.map(option => {
            options.push({
                title: option.name,
                value: option.items[0].value
            })
            return option
        })
        const newProduct = {
            id: product.id,
            name: product.name,
            category: product.category,
            prices: product.prices,
            options: options,
            gallery: product.gallery,
            brand: product.brand,
            quantity: 1
        }
        this.props.handleCartItemsQuantity("add")
        this.props.addItemInCart(newProduct)
    }

    displayCartIcon(product) {
        if(product.inStock) {
            return(
                <Cart onClick={() => this.handleAddToCart(product)} className="fa fa-shopping-cart"></Cart>
            )
        }
    }

    displayOutOfStock(product) {
        if(!product.inStock) {
            return (
                <OutOfStock>
                    <h2>OUT OF STOCK</h2>
                </OutOfStock>
            )
        }
    }

    render() {
        const product = this.props.product
        return(
            <Container>
                {this.displayCartIcon(product)}
                {this.displayOutOfStock(product)}
                <Link to={`/product/${product.id}`}>
                    <ProductImg
                        src={product.gallery[0]}
                        theme={{
                            opacity: product.inStock ? "1" : "0.5",
                        }}
                    />
                </Link>
            </Container>
        )
    }
}

export default connect(null, mapDispatchToProps)(ProductsListingProductCardImageContainer)