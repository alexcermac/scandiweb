import React from 'react'
import styled from 'styled-components'
import OptionColor from './OptionColor'

const Container = styled.div`

`

const OptionsList = styled.div`
    display: flex;
    margin: 0;
`

const Option = styled.div`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.color};
    padding: ${props => props.theme.padding};
    border: 1px solid black;
    margin-right: 12px;
    :hover {
        cursor: pointer;
    }
    p {
        font-family: sans-serif;
        font-weight: 400;
        margin: 0;
    }
`

class ProductDetailsDetailsAttributesAttributeContainer extends React.Component {
    displayOptions(attribute, title) {
        return(
            attribute.map((option, index) => {
                let selected = false
                for(let i = 0; i < this.props.options.length; i++) {
                    if(this.props.options[i].title === title && this.props.options[i].value === option.value){
                        selected = true
                    }
                }
                return(
                    <Option 
                        key={index} 
                        onClick={() => this.props.handleOption(title, option.value, selected)}
                        theme={{
                            padding: title === "Color" ? "5px" : "13px 27px",
                            background: selected ? "#1D1F22" : "white",
                            color: selected ? "white" : "black",
                        }}
                    >
                        {title !== "Color" ? <p>{option.value}</p>
                        : <OptionColor
                            bgColor={option.value.toString()}
                        />
                        }
                    </Option>
                )
            })
        )
    }

    render() {
        return(
            <Container>
                <h3>{this.props.attribute.name.toUpperCase()}:</h3>
                <OptionsList>
                    {this.displayOptions(this.props.attribute.items, this.props.attribute.name)}
                </OptionsList>
            </Container>
        )
    }
}

export default ProductDetailsDetailsAttributesAttributeContainer