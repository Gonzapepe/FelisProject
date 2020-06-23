import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import firebase, { auth, firestore } from '../firebase/config'


const Body = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
`

const BodyText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`



class HomeScreen extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            displayName: ''
        }
    }

   
    render() {


        return (
            <Body>
                <BodyText> HomeScreen  </BodyText>
                <View>
                    <Text> Hola Mundo </Text>
                </View>
            </Body>
        )
    }
}


export default HomeScreen