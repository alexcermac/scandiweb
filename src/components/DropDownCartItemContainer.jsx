import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux'
import { changeProductQuantity } from '../actions'

const Wrapper = styled.div`
    display: flex;
    margin: 0 17px 40px 17px;
`

const Details = styled.div`
    width: 50%;
`

const Name = styled.h4`
    margin: 0;
    margin-bottom: 5px;
    font-weight: 300;
`

const Category = styled.h4`
    margin: 0;
    font-weight: 300;
`

const Price = styled.div`
    p {
        font-weight: 500;
    }
`

const AttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const OptionContainer = styled.div`
    margin-bottom: 10px;
    padding: 0;
    p {
        margin: 0;
    }
`

const Option = styled.div`
    min-width: 24px;
    max-width: 50px;
    height: 24px;
    border: 1px solid #1D1F22;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Quantity = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 16px;
        font-weight: 500;
    }
`

const Button = styled.button`
    min-width: 24px;
    height: 24px;
    border: 1px solid #1D1F22;
    background: #fff;
    font-size: 14px;
    :hover {
        cursor: pointer;
    }
`

const ImageGallery = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
`

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeProductQuantity: item => dispatch(changeProductQuantity(item))
    }
}

class DropDownCartItemContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageIndex: 0
        }
    }

    handleQuantity(product, quantityDirection) {
        const info = {
            id: product.id,
            options: product.options,
            quantityDirection: quantityDirection
        }
        this.props.changeProductQuantity(info)
        this.forceUpdate()
        this.props.handleForceUpdate()
    }

    handleImageIndex(direction) {
        if(direction === "back") {
            if(this.state.imageIndex === 0) {
                this.setState({
                    imageIndex: this.props.product.gallery.length - 1
                })
            } else {
                this.setState({
                    imageIndex: this.state.imageIndex - 1
                })
            }
        } else {
            if(this.state.imageIndex === this.props.product.gallery.length - 1) {
                this.setState({
                    imageIndex: 0
                })
            } else {
                this.setState({
                    imageIndex: this.state.imageIndex + 1
                })
            }
        }
    }

    render() {
        const product = this.props.product
        return (
            <Wrapper>
                <Details>
                    <Name>{product.name}</Name>
                    <Category>{product.category}</Category>
                    <Price>
                        {product.prices.map(price => {
                            if(price.currency === this.props.currency) {
                                console.log("dada la fel currency");
                                return (
                                    <p>{price.amount} {price.currency}</p>
                                )
                            }
                        })}
                    </Price>
                    <AttributesContainer>
                        {product.options.map((option, index) => {
                            return (
                                <OptionContainer key={index}>
                                    <p>{option.title}</p>
                                    <Option>
                                        {option.title !== "Color" ? <p>{option.value}</p>
                                        : <div style={{ backgroundColor: option.value.toString(), width: "20px", height: "20px", margin: 0 }}></div>
                                        }
                                    </Option>
                                </OptionContainer>
                            )
                        })}
                    </AttributesContainer>
                </Details>
                <Quantity>
                    <Button onClick={() => this.handleQuantity(product, "plus")}>+</Button>
                    <p>{product.quantity}</p>
                    <Button onClick={() => this.handleQuantity(product, "minus")}>-</Button>
                </Quantity>
                <ImageGallery>
                    <Image src={product.gallery[this.state.imageIndex]}/>
                </ImageGallery>
            </Wrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownCartItemContainer)