import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'

import { Icon, Button } from 'native-base';
import { Avatar } from 'react-native-paper';

import MeMessage from './../components/meMessage'
import { v4 } from 'uuid'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${global.token}`
    }
}

class ChatScreen extends React.Component {


    constructor() {
        super()
        this.state = {
            message: '',
            fromId: '',
            towardId: '',
            sentMessages: [],
            avatar: '',
            name: ''
        }
    }

    async callApi() {
        
        if(this.props.navigation.state.params.mongoID) {
            const res = await axios.get(`http://192.168.0.17:3000/home/${this.props.navigation.state.params.mongoID}`, config)


            console.log('INFORMACION DE USUARIO: ', res.data)
            
            this.setState({
                name: res.data.name,
                avatar: res.data.avatar,
                towardId: this.props.navigation.state.params.mongoID,
                fromId: this.props.navigation.state.params.myID

            })
        }
    }

     componentDidMount() {
        
        //Cambiar la ip para el uso propio local
        this.socket = this.props.navigation.state.params.socket
        
        this.callApi()
      
        this.socket.onmessage = (event) => {
            const msg = JSON.parse(event.data)

            console.log('parsed messages: ', msg)
    }

    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
            this.callApi()
        }
    )

    }

    componentWillUnmount() {
        this.willFocusSubscription.remove()
     }


    HandlePress = () => {
        const { message } = this.state
        const msg = {
            type: 'message',
            text: message,
            id: this.state.fromId,
            date: Date.now()
        }
        this.socket.send(JSON.stringify(msg))
        this.setState({ message: '' })
       // axios.get(`http://192.168.0.17:3000/chat/${this.state.fromId}/${this.state.towardId}`, config)

    }

    render() {

        const chatMessages = this.state.sentMessages.map(message => <MeMessage key={v4()} text={message} />)

        return (
            <View style={{height: '100%', position: 'relative'}}>
                <View style={styles.top} >
                    <Button transparent onPress={ () => this.props.navigation.goBack() }>
                    <Icon 
                                type='FontAwesome'
                                name="angle-left"
                                style={{marginRight: 30, color: 'white', fontSize: 32}}
                    />
                    </Button>
                    <Avatar.Image 
                        source={{
                            uri: `http://192.168.0.17:3000/${this.state.avatar}`
                        }}
                        size={50}
                        style={{marginLeft: 10,}}
                    />
                    <Text style={styles.nombre}>{this.state.name}</Text>
                </View>
                <View style={styles.embeddingView}>
                <ScrollView style={styles.bodyChat} >
                    { chatMessages }
                </ScrollView>

                <KeyboardAvoidingView style={styles.bodyMessages} behavior='height'>
                   

                    
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Messages'
                        onChangeText={message => this.setState({ message })}
                        value={this.state.message}
                        onsubmitEditing={this.HandlePress}
                        multiline={true}
                    />

                    <TouchableOpacity onPress={this.HandlePress} style={styles.bottonSend}>
                        <Icon 
                                name="paper-plane"
                                color
                        />
                    </TouchableOpacity>
                

                </KeyboardAvoidingView >
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 0.1,
        position: 'relative',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        backgroundColor: '#355C7D',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    nombre: {
        color: 'white',
        fontSize: 18,
        width: '50%',
        marginLeft: 20,
    },

    bodyMessages: {
        width: '100%',
        maxHeight: '80%',
        flexDirection: 'row',
        backgroundColor: '#355C7D',
        
    },
    embeddingView: {
        flex: 0.9
    },
    bodyChat: {
        flex: 5,
        backgroundColor: '#355C7D',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },

    inputMessage: {
        flexDirection: 'row',
        width: '80%',
        padding: 5,
        flex: 1,
        marginLeft: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginRight: 10,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    bottonSend: {
        width: '20%',
        borderRadius: 20,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        flex: 0.2,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20


    }

})

export default ChatScreen