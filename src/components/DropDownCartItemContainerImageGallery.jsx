import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
`

class DropDownCartItemContainerImageGallery extends React.Component{
    render() {
        return(
            <Container>
                <Image src={this.props.src}/>
            </Container>
        )
    }
}

export default DropDownCartItemContainerImageGallery