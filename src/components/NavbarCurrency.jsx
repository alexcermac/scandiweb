import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { graphql } from 'react-apollo'
import { LOAD_CURRENCIES } from '../GraphQL/Queries'
import { flowRight as compose } from 'lodash'
import { connect } from 'react-redux'
import { handleCurrency, handleDropDownCurrencies } from '../actions'
import currenciesArray from '../data/currenciesArray'

const Container = styled.div`
    position: absolute;
    top: 40px;
    left: -20px;
    padding: 20px 20px 0 20px;
    background: white;
    z-index: 1;
    box-shadow: 1px 8px 40px -10px rgba(0,0,0,0.35);
`

const Currency = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0;
    margin-bottom: 20px;
    h3 {
        margin: 0;
        margin-right: 7px;
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
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

    render() {
        return (
            <Container className="container" ref={this.container}>
                {!this.props.data.loading && this.props.data.currencies.map((currency, index) => {
                    return (
                        <Currency
                            key={index}
                            onClick={() => this.handleCurrency(currency)}
                        >
                            <h3>{this.findSymbol(currency)}</h3>
                            <h3>{currency}</h3>
                        </Currency>
                    )
                })}
            </Container>
        )
    }
}

export default compose(
    graphql(LOAD_CURRENCIES),
    connect(mapStateToProps, mapDispatchToProps)
)(NavbarCurrency)