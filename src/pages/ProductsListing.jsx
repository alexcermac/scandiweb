import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { LOAD_PRODUCTS } from '../GraphQL/Queries'
import { flowRight as compose } from 'lodash'
import { connect } from 'react-redux'
import 'font-awesome/css/font-awesome.min.css'

const Container = styled.div`
    margin-bottom: 100px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const Category = styled.div`
    padding: 50px 0;
    font-size: 42px;
    display: flex;
    align-items: center;
    p {
        font-size: 2rem;
    }
`

const Dropdown = styled.select`
    width: 100px;
    height: 30px;
    font-size: 18px;
    margin-left: 30px;
    font-family: 'Raleway', sans-serif;
    border: 2px solid #777;
    border-radius: 10px;
    :focus {
        outline: none;
    }
`

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 103px;
`

const ProductCard = styled.div`
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

const ImgContainer = styled.div`
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

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    margin: 0;
    padding: 2px 0;
    color: ${props => props.theme.color};
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

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

class ProductsListing extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            forWho: props.forWho,
            category: "all",
            loading: true,
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.forWho !== prevProps.forWho) {
            this.setState({
                forWho: this.props.forWho
            })
        }
    }

    displayProducts() {
        const data = this.props.data
        let products

        if(data.loading) {
            return(<div>Loading products...</div>)
        } else {
            if(this.state.category === "all") {
                products = data.category.products
            } else {
                products = data.category.products.filter(product => product.category === this.state.category)
            }
        }
        return (
            products.map((product) => {
                return (
                    <ProductCard key={product.id}>
                        <ImgContainer>
                            {product.inStock && <Cart className="fa fa-shopping-cart"></Cart>}
                            {!product.inStock && <OutOfStock>
                                <h2>OUT OF STOCK</h2>
                            </OutOfStock>}
                            {product.inStock ? <Link to={`/product/${product.id}`}>
                                <ProductImg
                                    src={product.gallery[0]}
                                    theme={{
                                        opacity: product.inStock ? "1" : "0.5",
                                    }}
                                />
                            </Link>
                            : <ProductImg
                                src={product.gallery[0]}
                                theme={{
                                    opacity: product.inStock ? "1" : "0.5",
                                }}
                            />}
                        </ImgContainer>
                        {product.inStock ? <Link to={`/product/${product.id}`}>
                            <Name
                                theme={{
                                    color: product.inStock ? "#000" : "#8D8F9A"
                                }}
                            >{product.name}</Name>
                        </Link>
                        : <Name
                            theme={{
                                color: product.inStock ? "#000" : "#8D8F9A",
                                decoration: product.inStock ? "underline" : "none",
                            }}
                        >{product.name}</Name>
                        }
                        <Price
                            theme={{
                                color: product.inStock ? "#000" : "#8D8F9A"
                            }}
                        >
                            {product.prices.map(price => {
                                if(price.currency === this.props.currency) {
                                    return (
                                        <p>{price.amount} {price.currency}</p>
                                    )
                                }
                            })}
                        </Price>
                    </ProductCard>
                )
            })
        )
    }

    handleCategoryChange(e) {
        this.setState({ category: e.target.value })
    }

    render() {
        return (
            <Container>
                <Wrapper>
                    <Category>
                        <p>Select category: </p>
                        <Dropdown
                            defaultValue="all"
                            onChange={this.handleCategoryChange.bind(this)}
                        >
                            <option value="all">All</option>
                            <option value="clothes">Clothes</option>
                            <option value="tech">Tech</option>
                        </Dropdown>
                    </Category>
                    <ProductsGrid>
                        { this.displayProducts() }
                    </ProductsGrid>
                </Wrapper>
            </Container>
        )
    }
}

export default compose(
    graphql(LOAD_PRODUCTS),
    connect(mapStateToProps)
)(ProductsListing)
