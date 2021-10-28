import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux'
import { changeProductQuantity } from '../actions'

const Wrapper = styled.div`
    display: flex;
`

const Details = styled.div`
    width: 70%;
`

const Name = styled.h1`
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: 600;
`

const Category = styled.h1`
    font-size: 30px;
    font-weight: 400;
`

const Price = styled.div`
    
`

const AttributesContainer = styled.div`
    display: flex;
`

const OptionContainer = styled.div`
    margin: 0 15px;
    padding: 0;
    p {
        text-align: center;
    }
`

const Option = styled.div`
    width: 63px;
    height: 45px;
    background: #1D1F22;
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Quantity = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 24px;
        font-weight: 500;
    }
`

const Button = styled.button`
    width: 45px;
    height: 45px;
    border: 1px solid #1D1F22;
    background: #fff;
    font-size: 30px;
    :hover {
        cursor: pointer;
    }
`

const ImageGallery = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BackBtn = styled.i`
    box-shadow: 0px 7px 40px -5px rgba(0,0,0,0.5);
    :hover {
        cursor: pointer;
    }
`

const Image = styled.img`
    width: 100%;
`

const NextBtn = styled.i`
    :hover {
        cursor: pointer;
    }
`

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeProductQuantity: item => dispatch(changeProductQuantity(item))
    }
}

class CartItemContainer extends React.Component {
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
                                return (
                                    <h2>{price.amount} {price.currency}</h2>
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
                    {product.gallery.length > 1 && <BackBtn
                        className="fa fa-chevron-left"
                        onClick={() => this.handleImageIndex("back")}
                    />}
                    <Image src={product.gallery[this.state.imageIndex]}/>
                    {product.gallery.length > 1 && <NextBtn
                        className="fa fa-chevron-right"
                        onClick={() => this.handleImageIndex("next")}
                    />}
                </ImageGallery>
            </Wrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemContainer)