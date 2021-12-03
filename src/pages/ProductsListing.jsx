import React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/react-components'
import { LOAD_CATEGORIES } from '../GraphQL/Queries'
import 'font-awesome/css/font-awesome.min.css'
import ProductsListingProductsGrid from '../components/ProductsListingProductsGrid'

const Container = styled.div`
    margin-bottom: 100px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const CategoriesContainer = styled.div`
    padding: 50px 0;
    font-size: 42px;
    p {
        font-size: 2rem;
    }
`

const Category = styled.div`
    margin-right: 20px;
    :hover{
        cursor: pointer;
    }
`

class ProductsListing extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            category: "all",
            loading: true,
        }
    }

    displayCategories(loading, data) {
        // I didn't know how should I implement this category selector because it wasn't shown in the design, just the "Category name", so thats why is this improvised design like this
        const categories = [
            <Category 
                key={0}
                onClick={() => this.handleCategoryChange("all")}
            >
                All
            </Category>
        ]
        if(!loading) {
            data.categories.map((category, index) => {
                const name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
                categories.push(
                    <Category
                        key={index + 1}
                        onClick={() => this.handleCategoryChange(category.name)}
                    >
                        {name}
                    </Category>
                )
                return category
            })
        }
        return categories
    }

    handleCategoryChange(name) {
        this.setState({
            category: name
        })
    }

    render() {
        return (
            <Query query={LOAD_CATEGORIES}>
            {({ loading, error, data }) => {
                return (
                <Container>
                    <Wrapper>
                        <CategoriesContainer>
                            {this.displayCategories(loading, data)}
                        </CategoriesContainer>
                        <ProductsListingProductsGrid category={this.state.category}/>
                    </Wrapper>
                </Container>
                )
            }}
            </Query>
        )
    }
}

export default ProductsListing
