import React from 'react'
import styled from 'styled-components'
import { LOAD_ALL_PRODUCTS, LOAD_PRODUCTS } from '../GraphQL/Queries'
import { Query } from '@apollo/react-components'
import ProductsListingProductCard from './ProductsListingProductCard'

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 103px;
`

class ProductsListingProductsGrid extends React.Component {
    displayProducts(loading, data) {
        if(loading)
            return(<div>Loading products...</div>)
        return (
            data.category.products.map((product, index) => {
                return (
                    <ProductsListingProductCard
                        key={index}
                        product={product}
                    />
                )
            })
        )
    }

    chooseQuery() {
        if(this.props.category === "all")
            return LOAD_ALL_PRODUCTS
        return LOAD_PRODUCTS
    }

    chooseQueryVariables() {
        const category = {
            title: this.props.category
        }
        if(this.props.category === "all")
            return {}
        return { category }
    }

    render() {
        return(
            <Query
                query={this.chooseQuery()}
                variables={this.chooseQueryVariables()}
            >
            {({ loading, error, data }) => {
                return (
                <Container>
                    {this.displayProducts(loading, data)}
                </Container>
                )
            }}
            </Query>
        )
    }
}

export default ProductsListingProductsGrid