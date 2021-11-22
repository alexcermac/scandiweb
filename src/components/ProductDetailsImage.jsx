import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
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

class ProductsDetailsImage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            option: ''
        }
    }

    render() {
        return(
            <Container
                key={this.props.index} 
                onClick={() => this.props.handleImage(this.props.imageURL)}
            >
                <Image src={this.props.imageURL} />
            </Container>
        )
    }
}

export default ProductsDetailsImage