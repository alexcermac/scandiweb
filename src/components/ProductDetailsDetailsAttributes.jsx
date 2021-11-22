import React from 'react'
import styled from 'styled-components'
import ProductDetailsDetailsAttributesAttributeContainer from './ProductDetailsDetailsAttributesAttributeContainer'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Error = styled.div`
    background-color: #ff5d5d;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 10px;
    margin: 15px 0;
`

class ProductDetailsDetailsAttributes extends React.Component {
    constructor(props) {
        super(props)
        this.handleOption = this.handleOption.bind(this)
    }
    displayError() {
        if(this.props.error) {
            return <Error>Please select an option for all attributes</Error>
        }
    }

    handleOption(title, value, selected) {
        if(!selected) {
            let newOptions = this.props.options
            let found = false
            if(this.props.options.length === 0) {
                newOptions.push({
                    title: title,
                    value: value
                })
            } else {
                newOptions.map(option => {
                    if(option.title === title) {
                        option.value = value
                        found = true
                    }  
                    return option
                })
                if(!found) {
                    newOptions.push({
                        title: title,
                        value: value
                    })
                }
            }
            this.props.handleOptions(newOptions)
            if(this.props.options.length === this.props.product.attributes.length) {
                this.props.handleError(false)
            }
        }
    }

    displayAttributes() {
        const attributesArray = []
        this.props.product.attributes.map((attribute, index) => {
            attributesArray.push(
                <ProductDetailsDetailsAttributesAttributeContainer
                    key={index}
                    attribute={attribute}
                    options={this.props.options}
                    handleOption={this.handleOption}
                />
            )
            return attribute
        })
        return attributesArray
    }

    render() {
        return(
            <Container>
                {this.displayError()}
                {this.displayAttributes()}
            </Container>
        )
    }
}

export default ProductDetailsDetailsAttributes