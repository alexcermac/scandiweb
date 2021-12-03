import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { LOAD_CURRENCIES } from '../GraphQL/Queries'
import { Query } from '@apollo/react-components'
import { connect } from 'react-redux'
import { handleCurrency, handleDropDownCurrencies } from '../actions'
import currenciesArray from '../data/currenciesArray' // this is needed just for finding the symbols of every currency from graphql

const Container = styled.div`
    position: absolute;
    width: 110px;
    top: 40px;
    left: -20px;
    padding: 0;
    background: white;
    z-index: 1;
    box-shadow: 1px 8px 40px -10px rgba(0,0,0,0.35);
`

const Currency = styled.div`
    display: flex;
    padding: 10px 20px;
    h3:first-child {
        margin: 0;
        margin-right: 7px;
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
    }
    :hover{
        background: #bebebe;
    }
`

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleCurrency: item => dispatch(handleCurrency(item)),
        handleDropDownCurrencies: item => dispatch(handleDropDownCurrencies(item)),
    }
}

class NavbarCurrency extends React.Component {
    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
          this.container.current &&
          !this.container.current.contains(event.target)
        ) {
            this.props.handleDropDownCurrencies()
        }
    };

    findSymbol(currency) {
        const symbol = currenciesArray.map(currencyObject => {
            if(currencyObject.currencyCode === currency) {
                return currencyObject.symbol
            }
            return null
        })
        return symbol
    }

    handleCurrency(currency) {
        const symbol = this.findSymbol(currency)
        this.props.handleCurrency({ currency: currency, symbol: symbol })
    }

    displayCurrencies(loading, data) {
        const currArray = []
        if(!loading) {
            data.currencies.map((currency, index) => {
                currArray.push(
                    <Currency
                        key={index}
                        onClick={() => this.handleCurrency(currency)}
                    >
                        <h3>{this.findSymbol(currency)}</h3>
                        <h3>{currency}</h3>
                    </Currency>
                )
                return currency
            })
        }
        return currArray
    }

    render() {
        return (
            <Query query={LOAD_CURRENCIES}>
            {({ loading, error, data }) => {
                return(
                <Container className="container" ref={this.container}>
                    {this.displayCurrencies(loading, data)}
                </Container>
                )
            }}
            </Query>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(NavbarCurrency)