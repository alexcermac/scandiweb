import React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import { addItemInCart, handleCartItemsQuantity } from '../actions'
import ProductDetailsDetailsAttributes from './ProductDetailsDetailsAttributes'
import ProductDetailsDetailsPrice from './ProductDetailsDetailsPrice'

const Container = styled.div`
    padding: 0 20px;
`

const Title = styled.h3`
    font-size: 30px;
    font-weight: 600;
    margin: 8px 0;
`

const Category = styled.h3`
    font-size: 30px;
    font-weight: 400;
    margin: 8px 0;
`

const AddToCart = styled.button`
    width: 100%;
    background: #5ECE7B;
    border: none;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 16px 0;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
    :hover {
        cursor: pointer;
        background: #46ac61;
    }
`

const AddToCartInactive = styled.button`
    width: 100%;
    background: #808080;
    border: none;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 16px 0;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
`

const Description = styled.div`

`

const mapStateToProps = state => {
    return {
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItemInCart: item => dispatch(addItemInCart(item)),
        handleCartItemsQuantity: item => dispatch(handleCartItemsQuantity(item))
    }
}

class ProductsDetailsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: [],
            error: false
        }

        this.handleOptions = this.handleOptions.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleOptions(newOptions) {
        this.setState({
            option: newOptions
        })
    }

    handleError(err) {
        this.setState({
            error: err
        })
    }

    displayAttributes() {
        if(this.props.product.attributes.length > 0) {
            return(
                <ProductDetailsDetailsAttributes
                    product={this.props.product}
                    options={this.state.option}
                    error={this.state.error}
                    handleOptions={this.handleOptions}
                    handleError={this.handleError}
                />
            )
        }
        return <></>
    }

    handleAddToCart() {
        if(this.state.option.length < this.props.product.attributes.length) {
            this.setState({
                error: true
            })
        } else {
            const product = this.props.product
            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category,
                prices: product.prices,
                options: this.state.option,
                gallery: product.gallery,
                brand: product.brand,
                quantity: 1
            }
            this.props.handleCartItemsQuantity("add")
            this.props.addItemInCart(newProduct)
            this.setState({
                option: []
            })
        }
    }

    displayAddToCart() {
        if(this.props.product.inStock) {
            return (
                <AddToCart onClick={() => this.handleAddToCart()}>
                    ADD TO CART
                </AddToCart>
            )
        } else {
            return (
                <AddToCartInactive>
                    OUT OF STOCK
                </AddToCartInactive>
            )
        }
    }

    render() {
        return (
            <Container>
                <Title>{this.props.product.brand}</Title>
                <Category>{this.props.product.name}</Category>
                {this.displayAttributes()}
                <ProductDetailsDetailsPrice prices={this.props.product.prices}/>
                {this.displayAddToCart()} 
                <Description>
                    {parse(this.props.product.description)}   
                </Description>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(ProductsDetailsDetails)