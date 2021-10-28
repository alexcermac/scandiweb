import React from 'react'
import { match } from 'react-router'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { LOAD_PRODUCT_DETAILS } from '../GraphQL/Queries'
import { delay, flowRight as compose, lowerFirst } from 'lodash'
import { connect } from 'react-redux'
import { addItemInCart, handleDropDownCart } from '../actions'

const Container = styled.div`
    margin-top: 82px;
    margin-bottom: 100px;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
`

const Gallery = styled.div`

`

const ImageContainer = styled.div`
    width: 100%;
    margin-bottom: 30px;
    :hover{
        cursor: pointer;
    }
`

const Image = styled.img`
    width: 70%;
    max-height: 100px;
    object-fit: cover;
    background-color: #777;
`

const PrimaryImageContainer = styled.div`
    width: 90%;
`

const PrimaryImage = styled.img`
    width: 100%;
    max-height: 650px;
    object-fit: scale-down;
`

const Details = styled.div`
    padding: 0 20px;
`

const Title = styled.h3`
    font-size: 30px;
    font-weight: 600;
    margin: 8px 0;
`

const Category = styled.h3`
    font-size: 30px;
    font-weight: 400;
    margin: 8px 0;
`

const AttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const OptionsList = styled.div`
    display: flex;
    margin: 0;
`

const Option = styled.div`
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

const OptionSelected = styled.div`
    padding: ${props => props.theme.padding};
    border: 1px solid black;
    margin-right: 12px;
    p {
        font-family: sans-serif;
        font-weight: 400;
        margin: 0;
    }
    background-color: #1D1F22;
    color: white;
`

const Error = styled.div`
    background-color: #ff5d5d;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 10px;
    margin: 15px 0;
`

const PriceContainer = styled.div`

`

const AddToCart = styled.button`
    width: 100%;
    background: #5ECE7B;
    border: none;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 16px 0;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
    :hover {
        cursor: pointer;
        background: #46ac61;
    }
`

const Description = styled.div`

`

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItemInCart: item => dispatch(addItemInCart(item)),
        handleDropDownCart: item => dispatch(handleDropDownCart(item)),
    }
}

class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            primaryImage: "",
            option: [],
            error: false
        }
    }
    
    displayProductDetails() {
        const data = this.props.data

        if(data.loading) {
            return(<div>Loading product...</div>)
        } else {
            const description = new DOMParser().parseFromString(data.product.description, "text/xml")

            return(
                <div>
                    <h3>{data.product.name}</h3>
                    <p>{description.firstChild.innerHTML}</p>
                </div>
            )
        }
    }

    handleImage(url) {
        this.setState({
            primaryImage: url
        })
    }

    handleOption(title, value, optionIndex) {
        let newOptions = this.state.option
        let found = false
        if(this.state.option.length === 0) {
            newOptions.push({
                title: title,
                value: value
            })
        } else {
            newOptions.map((option, index) => {
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
        this.setState({
            option: newOptions
        })
        if(this.state.option.length === this.props.data.product.attributes.length) {
            this.setState({
                error: false
            })
        }
    }

    displayGallery() {
        const data = this.props.data
        return(
            data.product.gallery.map((imageURL, index) => {
                return(
                    <ImageContainer key={index} onClick={() => this.handleImage(imageURL)}>
                        <Image src={imageURL} />
                    </ImageContainer>
                )
            })
        )
    }

    displayOptions(attribute, title) {
        return(
            attribute.map((option, index) => {
                let selected = false
                for(let i = 0; i < this.state.option.length; i++) {
                    if(this.state.option[i].title === title && this.state.option[i].value === option.value){
                        selected = true
                    }
                }
                if(selected) {
                    return(
                        <OptionSelected
                            key={index}
                            //onClick={() => this.handleOption(title, option.value, index)}
                            theme={{ 
                                padding: title === "Color" ? "5px" : "13px 27px",
                            }}
                        >
                            {title !== "Color" ? <p>{option.value}</p>
                            : <div style={{ backgroundColor: option.value, width: "20px", height: "20px", margin: 0 }}></div>
                            }
                        </OptionSelected>
                    )
                } else {
                    return(
                        <Option 
                            key={index} 
                            onClick={() => this.handleOption(title, option.value, index)}
                            theme={{ 
                                padding: title === "Color" ? "5px" : "13px 27px",
                            }}
                        >
                            {title !== "Color" ? <p>{option.value}</p>
                            : <div style={{ backgroundColor: option.value.toString(), width: "20px", height: "20px", margin: 0 }}></div>
                            }
                        </Option>
                    )
                }
            })
        )
    }

    handleAddToCart() {
        if(this.state.option.length < this.props.data.product.attributes.length) {
            this.setState({
                error: true
            })
        } else {
            const product = this.props.data.product
            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category,
                prices: product.prices,
                options: this.state.option,
                gallery: product.gallery,
                quantity: 1
            }
            this.props.addItemInCart(newProduct)
            this.props.history.push("/cart")
        }
    }

    render() {
        const data = this.props.data

        return (
            <>
            {!data.loading && 
                <Container>
                    <Wrapper>
                        <Gallery>
                            {this.displayGallery()}
                        </Gallery>
                        <PrimaryImageContainer>
                            <PrimaryImage 
                                src={this.state.primaryImage ? this.state.primaryImage : this.props.data.product.gallery[0]}
                            />
                        </PrimaryImageContainer>
                        <Details>
                            <Title>{data.product.name}</Title>
                            <Category>{data.product.category}</Category>
                            {data.product.attributes.length > 0 ?
                            <AttributesContainer>
                                {this.state.error && 
                                    <Error>Please select an option for all attributes</Error>
                                }
                                {data.product.attributes.map(attribute => {
                                    return (
                                        <>
                                            <h3>{attribute.name.toUpperCase()}:</h3>
                                            <OptionsList>
                                                { this.displayOptions(attribute.items, attribute.name) }
                                            </OptionsList>
                                        </>
                                    )
                                })}
                            </AttributesContainer>
                            : <></>
                            }
                            <PriceContainer>
                            <h3>PRICE: {data.product.prices.map(price => {
                                if(price.currency === this.props.currency) {
                                    return (
                                        <p>{price.amount} {price.currency}</p>
                                    )
                                }
                                })}
                            </h3>
                            </PriceContainer>
                            <AddToCart onClick={() => this.handleAddToCart()}>
                                ADD TO CART
                            </AddToCart>
                            {/* <Description> */}
                                {data.product.description[0] !== '\\' ?
                                <td dangerouslySetInnerHTML={{__html: data.product.description}} />
                                : <Description>
                                    {data.product.description}
                                </Description>
                                }
                            {/* </Description> */}
                        </Details>
                    </Wrapper>
                </Container>}
            </>
        )
    }
}

export default compose(
    graphql(LOAD_PRODUCT_DETAILS, {
        options: (props) => {
            return {
                variables: {
                    id: props.match.params.id
                }
            }
        }
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductDetails)
