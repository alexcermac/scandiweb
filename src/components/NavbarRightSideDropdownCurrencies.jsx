import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { LOAD_CURRENCIES } from '../GraphQL/Queries'
import { flowRight as compose } from 'lodash'
import { connect } from 'react-redux'
import { handleDropDownCurrencies } from '../actions'
import NavbarCurrency from './NavbarCurrency'

const Container = styled.div`
    position: relative;
    display: flex;
    width: 40px;
    height: 30px;
    margin: 0;
    :hover {
        cursor: pointer;
    }
    h3 {
        font-family: 'Raleway', sans-serif;
        font-weight: 500;
        margin: 0;
        /* :hover {
            background: #a7a7a7;
        } */
    }
`

const PrimaryCurrency = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    i {
        font-size: 15px;
    }
`

const mapStateToProps = state => {
    return {
        currencySymbol: state.currencySymbol,
        dropDownCurrencies: state.dropDownCurrencies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDropDownCurrencies: item => dispatch(handleDropDownCurrencies(item)),
    }
}

class NavbarRightSideDropdownCurrencies extends React.Component {
    displayArrow() {
        if(this.props.dropDownCurrencies) {
            return <i className="fa fa-chevron-up"/>
        } else {
            return <i className="fa fa-chevron-down"/>
        }
    }

    dispalyNavbarCurrency() {
        if(this.props.dropDownCurrencies) {
            return <NavbarCurrency loading={this.props.data.loading} />
        }
    }

    render() {
        return(
            <Container
                onClick={() => this.props.handleDropDownCurrencies()}
            >
                <PrimaryCurrency>
                    <h3>{this.props.currencySymbol}</h3>
                    {this.displayArrow()}
                </PrimaryCurrency>
                {this.dispalyNavbarCurrency()}
            </Container>
        )
    }
}

export default compose(
    graphql(LOAD_CURRENCIES),
    connect(mapStateToProps, mapDispatchToProps)
)(NavbarRightSideDropdownCurrencies)