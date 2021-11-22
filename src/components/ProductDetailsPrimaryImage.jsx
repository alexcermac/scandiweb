import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
`

const PrimaryImage = styled.img`
    width: 100%;
    max-height: 650px;
    object-fit: scale-down;
`

class ProductDetailsPrimaryImage extends React.Component {
    handleSrc() {
        if(this.props.primaryImage) {
            return this.props.primaryImage
        }
        return this.props.product.gallery[0]
    }

    render() {
        return(
            <Container>
                <PrimaryImage
                    src={this.handleSrc()}
                />
            </Container>
        )
    }
}

export default ProductDetailsPrimaryImage