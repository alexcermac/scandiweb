import React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/react-components'
import { LOAD_PRODUCT_DETAILS } from '../GraphQL/Queries'
import ProductsDetailsImage from '../components/ProductDetailsImage'
import ProductDetailsPrimaryImage from '../components/ProductDetailsPrimaryImage'
import ProductsDetailsDetails from '../components/ProductDetailsDetails'

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

class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            primaryImage: "",
        }
        this.handleImage = this.handleImage.bind(this)
    }

    handleImage(url) {
        this.setState({
            primaryImage: url
        })
    }

    displayGallery(data) {
        return(
            data.product.gallery.map((imageURL, index) => {
                return(
                    <ProductsDetailsImage
                        key={index}
                        imageURL={imageURL}
                        index={index}
                        handleImage={this.handleImage}
                    />
                )
            })
        )
    }

    render() {
        const id = this.props.match.params.id
        return (
            <Query query={LOAD_PRODUCT_DETAILS} variables={{ id }}>
            {({ loading, error, data }) => {
                if(loading) return <h3>Loading...</h3>
                return (
                <Container>
                    <Wrapper>
                        <Gallery>
                            {this.displayGallery(data)}
                        </Gallery>
                        <ProductDetailsPrimaryImage
                            primaryImage={this.state.primaryImage}
                            product={data.product}
                        />
                        <ProductsDetailsDetails
                            product={data.product}
                        />
                    </Wrapper>
                </Container>
                )
            }}
            </Query>
        )
    }
}

// export default graphql(LOAD_PRODUCT_DETAILS, {
//     options: (props) => {
//         return {
//             variables: {
//                 id: props.match.params.id
//             }
//         }
//     }
// })(ProductDetails)
export default ProductDetails
