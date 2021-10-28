import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleDropDownCart } from '../actions'
import DropDownCartItemContainer from './DropDownCartItemContainer'

const Container = styled.div`
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #39374838;
    z-index: 100;
    overflow-y: scroll;
`

const WrapperContainer = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
`

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 325px;
    background: #fff;
    
`

const Title = styled.div`
    margin: 8px 16px;
    h4 {
        font-weight: 500;
    }
`

const Buttons = styled.div`
    margin-top: 35px;
    margin: 35px 17px 20px 17px;
    display: flex;
    justify-content: space-between;
`
const ViewBag = styled.button`
    width: 140px;
    height: 43px;
    border-radius: 0;
    border: 1px solid #000;
    background: #fff;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
    :hover {
        cursor: pointer;
        background: #ececec;
    }
`

const CheckOut = styled.button`
    width: 140px;
    height: 43px;
    border: none;
    background: #5ECE7B;
    color: #fff;
    font-weight: 600;
    font-family: 'Raleway', sans-serif;
    :hover {
        cursor: pointer;
        background: #46ac61;
    }
`

const TotalPrice = styled.div`
    margin: 0 17px;
    display: flex;
    justify-content: space-between;
`

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDropDownCart: item => dispatch(handleDropDownCart(item))
    }
}

class DropDownCart extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {    
        document.body.style.overflow = 'hidden';
    }
      
    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    handleForceUpdate() {
        this.forceUpdate()
    }

    displayProducts() {
        return(
            this.props.products.map((product, index) => {
                return (
                    <DropDownCartItemContainer key={index} product={product} handleForceUpdate={() => this.handleForceUpdate()}/>
                )
            })
        )
    }

    displayTotalPrice(products) {
        let totalPrice = 0
        products.map(product => {
            product.prices.map(price => {
                if(price.currency === this.props.currency) {
                    totalPrice = totalPrice + price.amount * product.quantity
                }
                
            })
        })
        return (
            <h4>{Math.round(totalPrice * 100) / 100} {this.props.currency}</h4>
        )
    }
    
    render() {
        const products = this.props.products
        
        return (
            <Container>
                <WrapperContainer>
                    <Wrapper>
                        <Title>
                            <h4><strong>My bag</strong>, {products.length > 0 ? products.length : 0} items</h4>
                        </Title>
                        { this.displayProducts() }
                        <TotalPrice>
                            <h4>Total:</h4>
                            { this.displayTotalPrice(products) }
                        </TotalPrice>
                        <Buttons>
                            <Link to="/cart" ><ViewBag>VIEW BAG</ViewBag></Link>
                            <CheckOut>CHECK OUT</CheckOut>
                        </Buttons>
                    </Wrapper>
                </WrapperContainer>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCart)