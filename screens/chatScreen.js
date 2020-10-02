import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'

import { Icon } from 'native-base';
import { Avatar } from 'react-native-paper';

import io from 'socket.io-client'
import MeMessage from './../components/meMessage'



class ChatScreen extends React.Component {


    constructor() {
        super()
        this.state = {
            message: '',
            fromId: '',
            towardId: '',
            sentMessages: []
        }
    }

    randomNumber() {
        return Math.floor( 100000 + Math.random() * 999999)
    }

    componentDidMount() {
        //Cambiar la ip para el uso propio local
        this.socket = this.props.navigation.state.params.socket
        this.socket.on('messagesChat', message => {
            this.setState({ sentMessages: [...this.state.sentMessages, message] })

            console.log('desde adentro de componentDidMount', this.socket.id)
        })

         this.setState({ fromId:  this.props.navigation.state.params.mongoID })
         console.log('FROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM ID', this.state.fromId)
    }


    HandlePress = () => {
        const { message } = this.state
        this.socket.emit('messagesChat', message)
        this.setState({ message: '' })

    }

    render() {

        const chatMessages = this.state.sentMessages.map(message => <MeMessage key={message} text={message} />)

        return (
            <View style={{height: '100%'}}>
                <View style={styles.top} >
                    <Icon 
                                name="return-left"
                                color
                                style={{marginRight: 30}}
                    />
                    <Avatar.Image 
                        source={{
                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                        }}
                        size={50}
                        style={{marginLeft: 10,}}
                    />
                    <Text style={styles.nombre}>Juan Doe</Text>
                </View>
                <View style={styles.bodyChat} >
                    { chatMessages }
                </View>

                <KeyboardAvoidingView style={styles.bodyMessages}>
                   

                    
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
        )
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 0.5,
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
        flexDirection: 'row',
        backgroundColor: '#355C7D',
        
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