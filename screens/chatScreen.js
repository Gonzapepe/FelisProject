import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components'

import io from 'socket.io-client'
import MeMessage from './../components/meMessage'

const windowWidth = Dimensions.get('window').width


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

    componentDidMount() {
        //Cambiar la ip para el uso propio local
        this.socket = io(`http://192.168.100.14:3000`)
        this.socket.on('messagesChat', message => {
            this.setState({ sentMessages: [...this.state.sentMessages, message] })
        })
    }


    HandlePress = () => {
        this.socket.emit('messagesChat', this.state.message)
        this.setState({ message: '' })
    }

    render() {

        const chatMessages = this.state.sentMessages.map(chatMessage => <MeMessage key={chatMessage} text={chatMessage} />)

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.top} ><Text>Nombre de grupo/Persona</Text></View>
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
                        <Text> Send </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 0.5,
        borderBottomColor: 'black',
        borderWidth: 1,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: 'blue',

    },
    bodyMessages: {
        flex: 2,
        backgroundColor: 'blue'
    },
    bodyChat: {
        flex: 5,
        backgroundColor: 'red',

    },
    inputMessage: {
        flex: 0.7
    },
    bottonSend: {
        flex: 0.3,

    }

})

export default ChatScreen