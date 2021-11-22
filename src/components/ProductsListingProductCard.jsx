import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductsListingProductCardImageContainer from './ProductsListingProductCardImageContainer'

const Container = styled.div`
    position: relative;
    padding: 16px;
    :hover{
        box-shadow: 0px 7px 23px 1px rgba(0,0,0,0.35);
        transition: .3s;
    }
    :hover i {
        display: initial;
    }
    i {
        display: none;
    }
    a {
        color: #000;
        text-decoration: none;
    }
`

const Name = styled.h4`
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding: 2px 0;
    color: ${props => props.theme.color};
    :hover {
        text-decoration: ${props => props.theme.decoration};
    }
`

const PriceContainer = styled.div`
    margin: 0;
    padding: 2px 0;
    color: ${props => props.theme.color};
`

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    margin: 0;
`

const mapStateToProps = state => {
    return {
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

class ProductsListingProductCard extends React.Component {
    displayPrice(product) {
        return (
            product.prices.map((price, index) => {
                if(price.currency === this.props.currency) {
                    return (
                        <Price key={index}>
                            {price.amount} {this.props.currencySymbol}
                        </Price>
                    )
                }
                return null
            })
        )
    }

    render() {
        const product = this.props.product
        return(
            <Container key={product.id}>
                <ProductsListingProductCardImageContainer product={product} />
                <Link to={`/product/${product.id}`}>
                    <Name
                        theme={{
                            color: product.inStock ? "#000" : "#8D8F9A"
                        }}
                    >
                        {product.brand} {product.name}
                    </Name>
                </Link>
                <PriceContainer
                    theme={{
                        color: product.inStock ? "#000" : "#8D8F9A"
                    }}
                >
                    {this.displayPrice(product)}
                </PriceContainer>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(ProductsListingProductCard)