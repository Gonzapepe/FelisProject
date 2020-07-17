import React, { Component } from 'react'
import { View, Text ,Button} from 'react-native'
import styled from 'styled-components'
import axios from 'axios'


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
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            displayName: '',
            token: ''
        }
    }

    async componentDidMount() {

        console.log(this.props.navigation.state.params.token)
        const { token } = this.props.navigation.state.params

        const config = {
            headers: {
                'x-auth-token': token
            }

        }

        await axios.get('http://192.168.100.14/home', config)
    }


    render() {


        return (
            <Body>
                <Button onPress={ () => this.props.navigation.navigate('chat') } title='Chat' ></Button>
            </Body>
        )
    }
}


export default HomeScreen