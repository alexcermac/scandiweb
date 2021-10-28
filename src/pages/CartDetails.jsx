import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { handleDropDownCart } from '../actions'
import CartItemContainer from '../components/CartItemContainer'

const Container = styled.div`

`

const Wrapper = styled.div`
    width: 1200px;
    margin: 0 auto;
`

const Title = styled.h1`
    margin: 80px 0;
`

const CartItem = styled.div`
    margin-bottom: 40px;
`

const BreakLine = styled.div`
    height: 1px;
    width: 100%;
    background-color: #E5E5E5;
    margin: 20px 0;
`

const mapStateToProps = state => {
    return { 
        products: state.products,
        dropDownCart: state.dropDownCart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDropDownCart: item => dispatch(handleDropDownCart(item))
    }
}

class CartDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.dropDownCart) {
            this.props.handleDropDownCart()
        }
    }

    displayProducts() {
        return(
            this.props.products.map((product, index) => {
                return (
                    <CartItem key={index}>
                        <BreakLine/>
                        <CartItemContainer product={product}/>
                    </CartItem>
                )
            })
        )
    }
    
    render() {
        return (
            <Container>
                <Wrapper>
                    <Title>CART</Title>
                    { this.displayProducts() }
                </Wrapper>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails)