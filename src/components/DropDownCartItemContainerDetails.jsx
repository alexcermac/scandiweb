import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DropDownCartItemContainerDetailsAttributes from './DropDownCartItemContainerDetailsAttributes'

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Name = styled.h4`
    margin: 0;
    margin-bottom: 5px;
    font-weight: 300;
`

const Category = styled.h4`
    margin: 0;
    margin-bottom: 5px;
    font-weight: 300;
`

const Price = styled.div`
    margin-bottom: 20px;
    p {
        font-weight: 500;
        margin: 0;
    }
`

const AttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const mapStateToProps = state => {
    return {
        currency: state.currency,
        currencySymbol: state.currencySymbol
    }
}

class DropDownCartItemContainerDetails extends React.Component{
    displayPrice() {
        const price = this.props.product.prices.map((price, index) => {
            if(price.currency === this.props.currency) {
                return (
                    <p key={index}>{price.amount} {price.currency}</p>
                )
            }
            return null
        })
        return price
    }

    displayAttributes() {
        const attributesArray = []
        this.props.product.options.map((option, index) => {
            attributesArray.push(
                <DropDownCartItemContainerDetailsAttributes
                    key={index}   
                    option={option}
                    index={index}
                />
            )
            return option
        })
        return attributesArray
    }

    render() {
        return(
            <Container>
                <Name>{this.props.product.brand}</Name>
                <Category>{this.props.product.name}</Category>
                <Price>
                    {this.displayPrice()}
                </Price>
                <AttributesContainer>
                    {this.displayAttributes()}
                </AttributesContainer>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(DropDownCartItemContainerDetails)