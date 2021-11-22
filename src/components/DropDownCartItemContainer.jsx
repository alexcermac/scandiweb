import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux'
import DropDownCartItemContainerImageGallery from './DropDownCartItemContainerImageGallery'
import DropDownCartItemContainerQuantity from './DropDownCartItemContainerQuantity'
import DropDownCartItemContainerDetails from './DropDownCartItemContainerDetails'

const Wrapper = styled.div`
    display: flex;
    margin: 0 17px 40px 17px;
`

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

class DropDownCartItemContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageIndex: 0
        }
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
                <DropDownCartItemContainerDetails product={product}/>
                <DropDownCartItemContainerQuantity
                    product={product}
                    handleForceUpdate={this.props.handleForceUpdate}
                />
                <DropDownCartItemContainerImageGallery src={product.gallery[this.state.imageIndex]} />
            </Wrapper>
        )
    }
}

export default connect(mapStateToProps)(DropDownCartItemContainer)