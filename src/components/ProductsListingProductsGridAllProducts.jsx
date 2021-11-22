import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { LOAD_ALL_PRODUCTS } from '../GraphQL/Queries'
import ProductsListingProductCard from './ProductsListingProductCard'

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 103px;
`

class ProductsListingProductsGridAllProducts extends React.Component {
    displayProducts() {
        const data = this.props.data
        if(data.loading) {
            return(<div>Loading products...</div>)
        } else {
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
    }

    render() {
        return(
            <Container>
                {this.displayProducts()}
            </Container>
        )
    }
}

export default graphql(LOAD_ALL_PRODUCTS)(ProductsListingProductsGridAllProducts)