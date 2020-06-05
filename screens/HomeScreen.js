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


        const db = firebase.firestore()
        const user = auth.currentUser
        const dbData = db.collection('users').doc(`${user.uid}`)

        // Encontrar una solucion para usar las promeas de .then()
         dbData.get().then((doc) => {
            if (doc.exists) {
                const userEmail = doc.data().email
                const userName = doc.data().displayName

                this.setState({
                    email: userEmail,
                    displayName: userName
                })

            } else {
                console.log('Ese documento no existe')
            }
        }).catch(err => console.log('Hubo un error: ', err))
        return (
            <Body>
                <BodyText> HomeScreen  </BodyText>
                <View>
                    <Text>HOLA</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.displayName}</Text>
                </View>
            </Body>
        )
    }
}


export default HomeScreen