import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.i`
    box-shadow: 0px 7px 40px -5px rgba(0,0,0,0.5);
    :hover {
        cursor: pointer;
    }
`

const Image = styled.img`
    width: 100%;
`

class CartItemContainerImageGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageIndex: 0
        }
    }

    handleImageIndex(direction) {
        if(direction === "left") {
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

    displayButton(direction) {
        if(this.props.product.gallery.length > 1) {
            return (
                <Button
                    className={"fa fa-chevron-" + direction}
                    onClick={() => this.handleImageIndex(direction)}
                />
            )
        }
    }

    render() {
        return(
            <Container>
                {this.displayButton("left")}
                <Image src={this.props.product.gallery[this.state.imageIndex]}/>
                {this.displayButton("right")}
            </Container>
        )
    }
}

export default CartItemContainerImageGallery