import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 8px 16px;
    h4 {
        font-weight: 500;
    }
`

class DropDownCart_Title extends React.Component {
    displayItemsQuantity() {
        if(this.props.productsLength > 0)
            return this.props.productsLength
        return 0
    }
    render() {
        return(
            <Container>
                <h4><strong>My bag</strong>, {this.displayItemsQuantity()} items</h4>
            </Container>
        )
    }
}

export default DropDownCart_Title