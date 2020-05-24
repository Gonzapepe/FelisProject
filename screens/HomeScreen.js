import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const Body = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const BodyText = styled.Text`
    font-size: 20px;
    font-weight: bold;
`

class HomeScreen extends Component {


    render() {
        return(
            <Body>
                <BodyText> HomeScreen </BodyText>
            </Body>
        )
    }
}

export default HomeScreen