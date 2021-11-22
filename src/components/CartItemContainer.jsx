import React from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import CartItemContainerDetails from './CartItemContainerDetails'
import CartItemContainerQuantity from './CartItemContainerQuantity'
import CartItemContainerImageGallery from './CartItemContainerImageGallery'

const Wrapper = styled.div`
    display: flex;
`

class CartItemContainer extends React.Component {
    render() {
        const product = this.props.product
        return (
            <Wrapper>
                <CartItemContainerDetails product={product} />
                <CartItemContainerQuantity product={product} />
                <CartItemContainerImageGallery product={product} />
            </Wrapper>
        )
    }
}

export default CartItemContainer