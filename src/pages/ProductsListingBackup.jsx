import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { LOAD_PRODUCTS } from '../GraphQL/Queries'
import 'font-awesome/css/font-awesome.min.css'

const Container = styled.div`
    margin-bottom: 100px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const Category = styled.div`
    padding: 80px 0;
    font-size: 42px;
`

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 103px;
`

const ProductCard = styled.div`
    /* background-color: #777; */
    /* height: 444px; */
    padding: 16px;
    
    :hover{
        box-shadow: 0px 7px 23px 1px rgba(0,0,0,0.4);
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

const ImgContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
`

const ProductImg = styled.img`
    width: 100%;
    /* width: 300px; */
    height: 350px;
    object-fit: cover;
    margin-bottom: 24px;
`

const Name = styled.h4`
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding: 2px 0;
    :hover {
        text-decoration: underline;
    }
`

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    margin: 0;
    padding: 2px 0;
`

const Cart = styled.i`
    position: absolute;
    right: 5%;
    bottom: -20px;
    font-size: 2rem;
    color: #fff;
    background: #5ECE7B;
    padding: 10px;
    border-radius: 50%;
    transition: .1s;
    :hover {
        cursor: pointer;
        font-size: 2.5rem;   
    }
`

class ProductsListing extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            forWho: props.forWho,
            category: "all",
            loading: true,
            products: []
        }
    }

    componentDidMount() {
        this.getData()
        console.log("products: ", this.state.products);
    }

    componentDidUpdate(prevProps) {
        if(this.props.forWho !== prevProps.forWho) {
            this.setState({
                forWho: this.props.forWho
            })
        }
        console.log("products from componentDidUpdate: ", this.state.products);
        console.log("category: ", this.state.category);
    }

    getData() {
        const data = this.props.data
        console.log("data: ", this.props.data);
        
        if(!data.loading) {
            console.log("in !data.loading");
            this.setState({
                products: this.props.data.category.products
            })
        }
    }

    /*displayProducts() {
        const data = this.props.data

        if(data.loading || this.state.products.length === 0) {
            return(<div>Loading products...</div>)
        } else {
            return(
                // data.category.products.map((product) => {
                this.state.products.map((product) => {
                    console.log("product: ", product);
                    return (
                        <ProductCard key={product.id}>
                            <ImgContainer>
                                <Cart className="fa fa-shopping-cart"></Cart>
                                <Link to={`/product/${product.id}`}>
                                    <ProductImg src={product.gallery[0]}/>
                                </Link>
                            </ImgContainer>
                            <Link to={`/product/${product.id}`}>
                                <Name>{product.name}</Name>
                            </Link>
                            <Price>{product.prices[0].amount} USD</Price>
                        </ProductCard>
                    )
                })
            )
        }
    }*/

    handleCategoryChange(e) {
        this.setState({ category: e.target.value })
    }

    render() {
        if(!this.props.data.loading) console.log(this.props.data.category.products);
        return (
            <Container>
                <div>
                    <select
                        defaultValue="All"
                        onChange={this.handleCategoryChange.bind(this)}
                    >
                        <option value="clothes">All</option>
                        <option value="clothes">Clothes</option>
                        <option value="tech">Tech</option>
                    </select>
                </div>
                <Wrapper>
                    <Category>{this.state.forWho}</Category>
                    <ProductsGrid>
                        {/* { this.displayProducts() } */}
                        {this.state.products.lenght !== 0 ? 
                            this.state.products.map((product) => {
                                console.log("product: ", product.name);
                                return (
                                    <ProductCard key={product.id}>
                                        <ImgContainer>
                                            <Cart className="fa fa-shopping-cart"></Cart>
                                            <Link to={`/product/${product.id}`}>
                                                <ProductImg src={product.gallery[0]}/>
                                            </Link>
                                        </ImgContainer>
                                        <Link to={`/product/${product.id}`}>
                                            <Name>{product.name}</Name>
                                        </Link>
                                        <Price>{product.prices[0].amount} USD</Price>
                                    </ProductCard>
                                )
                            })
                            :
                            <div>No products available :(</div>
                        }
                    </ProductsGrid>
                </Wrapper>
            </Container>
        )
    }
}

export default graphql(LOAD_PRODUCTS)(ProductsListing)
