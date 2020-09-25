import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import axios from 'axios'
import io from 'socket.io-client'

export default class HomeScreen extends React.Component{

    constructor(){
        super()

        this.state = {
            name: '',
            email: '',
            socket: '',
            mongoId: ''
        }
    }

     componentDidMount() {
         
        const { mongoId } = this.state
        console.log(mongoId)
       

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${this.props.navigation.state.params.token}`
            }
        }
        axios.get('http://192.168.0.17:3000/home', config)
            .then(res => res.data)
            .then(res => JSON.stringify(res.data))
            .then(response => JSON.parse(response))
            .then(response => this.setState({ name: response.name, email: response.email, mongoId: response._id }, () => {
                this.socket = io(`http://192.168.0.17:3000`)
                this.socket.emit('sendId', this.state.mongoId)
                console.log('Desde el callback de setState: ', this.state.mongoId)
            }))
            .catch(err => console.log(err))
        
            console.log('afuera del callback: ', this.state.mongoId)
        }
    render(){
        return(
            <View style={styles.body}>
                <Text> {this.state.name} </Text>
                <Text> {this.state.email} </Text>
               <Button onPress={ () => this.props.navigation.navigate('chat', { socket: this.socket, mongoID: this.state.mongoId, token: this.props.navigation.state.params.token }) } title='chat' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: "column",
        justifyContent: 'center'
    }
})