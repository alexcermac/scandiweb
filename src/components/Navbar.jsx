import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { Link, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { LOAD_CURRENCIES } from '../GraphQL/Queries'
import { flowRight as compose } from 'lodash'
import { connect } from 'react-redux'
import { handleDropDownCart, handleCurrency } from '../actions'
import DropDownCart from './DropDownCart'

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
`

const Type = styled.div`
    position: relative;
`

const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.i`
    font-size: 1.5rem;
    color: #5ECE7B;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Dropdown = styled.select`
    width: 70px;
    height: 30px;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
    border: none;
    :focus {
        outline: none;
    }
    :hover {
        cursor: pointer;
    }
`

const Cart = styled.i`
    font-size: 1.3rem;
    margin-left: 16px;
    color: #777;
    :hover {
        cursor: pointer; 
    }
`

const CartIconContainer = styled.div`
    position: relative;
    :hover {
        cursor: pointer;
    }
`

const Counter = styled.div`
    position: absolute;
    right: -10px;
    top: -5px;
    background: #1D1F22;
    border-radius: 50%;
    width: 20px;
    text-align: center;
    color: #fff;
`

const mapStateToProps = state => {
    return {
        dropDownCart: state.dropDownCart,
        products: state.products,
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDropDownCart: item => dispatch(handleDropDownCart(item)),
        handleCurrency: item => dispatch(handleCurrency(item))
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleCurrency(e) {
        this.props.handleCurrency(e.target.value)
    }

    render() {
        return (
            <Container>
                <Wrapper>
                    <Left>
                        <Type>
                            <NavLink
                                style={{
                                    textDecoration: 'none',
                                    color: '#000',
                                    padding: '16px'
                                }}
                                activeStyle={{
                                    color: "#5ECE7B",
                                    borderBottom: 'solid 2px #5ECE7B',
                                }}
                                to="/women"
                            >WOMEN</NavLink>
                        </Type>
                        <Type active={false}>
                            <NavLink
                                style={{
                                    textDecoration: 'none',
                                    color: '#000',
                                    padding: '16px'
                                }}
                                activeStyle={{
                                    color: "#5ECE7B",
                                    borderBottom: 'solid 2px #5ECE7B',
                                }}
                                to="/men"
                            >MEN</NavLink>
                        </Type>
                        <Type>
                            <NavLink
                                style={{
                                    textDecoration: 'none',
                                    color: '#000',
                                    padding: '16px'
                                }}
                                activeStyle={{
                                    color: "#5ECE7B",
                                    borderBottom: 'solid 2px #5ECE7B',
                                }}
                                to="/kids"
                            >KIDS</NavLink>
                        </Type>
                    </Left>
                    <Center>
                        <Link to="/women"><Logo className="fa fa-shopping-bag"></Logo></Link>
                    </Center>
                    <Right>
                        <Dropdown
                            defaultValue={this.props.currency}
                            onChange={this.handleCurrency.bind(this)}
                        >
                            {!this.props.data.loading && this.props.data.currencies.map(currency => {
                                return <option value={currency}>{currency}</option>
                            })}
                        </Dropdown>
                        <CartIconContainer onClick={() => this.props.handleDropDownCart()}>
                            <Cart className="fa fa-shopping-cart"/>
                            {this.props.products.length > 0 && <Counter>{this.props.products.length}</Counter>}
                        </CartIconContainer>
                        {this.props.dropDownCart && <DropDownCart/>}
                    </Right>
                </Wrapper>
            </Container>
        )
    }
}

export default compose(
    graphql(LOAD_CURRENCIES),
    connect(mapStateToProps, mapDispatchToProps)
)(Navbar)
