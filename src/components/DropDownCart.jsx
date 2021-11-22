import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleDropDownCart } from '../actions'
import DropDownCartItemContainer from './DropDownCartItemContainer'
import DropDownCartTitle from './DropDownCartTitle'
import DropDownCartTotalPrice from './DropDownCartTotalPrice'

const Container = styled.div`
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #39374838;
    z-index: 100;
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
    max-height: 85vh;
    overflow-y: auto;
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
    container = React.createRef();

    componentDidMount() {    
        document.addEventListener("mousedown", this.handleClickOutside);
        document.body.style.overflow = 'hidden';
    }
      
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.body.style.overflow = 'unset';
    }

    handleClickOutside = (event) => {
        if (
          this.container.current &&
          !this.container.current.contains(event.target)
        ) {
            this.props.handleDropDownCart()
        }
    }

    handleForceUpdate() {
        this.forceUpdate()
    }

    displayProducts() {
        return(
            this.props.products.map((product, index) => {
                return (
                    <DropDownCartItemContainer
                        key={index} 
                        product={product} 
                        handleForceUpdate={() => this.handleForceUpdate()}
                    />
                )
            })
        )
    }
    
    render() {
        const products = this.props.products
        
        return (
            <Container>
                <WrapperContainer className="container" ref={this.container}>
                    <Wrapper>
                        <DropDownCartTitle productsLength={products.length}/>
                        {this.displayProducts()}
                        <DropDownCartTotalPrice />
                        <Buttons>
                            <Link to="/cart" >
                                <ViewBag>VIEW BAG</ViewBag>
                            </Link>
                            <CheckOut>CHECK OUT</CheckOut>
                        </Buttons>
                    </Wrapper>
                </WrapperContainer>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCart)