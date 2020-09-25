import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'

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

                    <TouchableOpacity onPress={this.HandlePress} style={styles.buttonSend}>
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
    buttonSend: {
        flex: 0.3,

    }

})

export default ChatScreen