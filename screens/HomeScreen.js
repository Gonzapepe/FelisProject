import React, { Component } from 'react'


// ! Components
import { StyleSheet, View } from 'react-native';
import { Container, Drawer, Text, List, Header, Content, Button, Icon, Left, Right, Body } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';
import { withNavigation } from 'react-navigation';
import io from 'socket.io-client'
// ! Styles
import styled from 'styled-components';
// ! Axios
import axios from 'axios';
import ChatButton from '../components/Chats/ChatButton';
import { isLoading } from 'expo-font';
// ! WebSocket
//import { w3cwebsocket as W3CWebSocket } from 'websocket'


class HomeScreen extends Component {
    constructor(props) {
        super(props)


        this.state = {
            name: '',
            email: '',
            mongoId: '',
            lastMessage: '',
            contacts: [],
            isLoading: true,
            avatar: '',
            token: ''
        }
    }

    async callApi(config) {
        try {
            const res = await axios.get('http://192.168.0.17:3000/home', config)
            const res2 = await axios.get('http://192.168.0.17:3000/home/contacts', config)
            console.log('DATA DE CONTACTOS: ', res2.data)
            const { email, name, _id, avatar } = res.data
            this.setState({
                name,
                email,
                mongoId: _id,
                avatar,
                isLoading: false,
                contacts: res2.data
            })



        } catch (err) {
            console.log(err)
        }


    }


    componentDidMount() {

        this.webSocket = new WebSocket('ws://192.168.0.17:3000/ws')
        this.webSocket.onopen = (event) => {
            console.log('Conectado correctamente')

        }
        const { mongoId } = this.state
        console.log(mongoId)
        if (!global.token) {
            global.token = this.props.navigation.state.params.token
        }




        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${global.token}`
            }
        }
        this.callApi(config)

        console.log('TOKEN: ', global.token)




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

    handleLastMessage(lastMessage) {
        this.setState({ lastMessage })
    }
    
    async retrieveInfo(contact) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${global.token}`
            }
        }
        try {
            const response = await axios.get(`http://192.168.0.17:3000/home/${contact._id}`, config)
            const data = response.data
            return data
        } catch (err) {
            console.log('Hubo un error: ', err)
        }
    }

    openDrawer() {
        this._drawer._root.open();
    }

    closeDrawer() {
        this._drawer._root.close();
    }

    renderHeader() {
        return (
            <>
                <Header style={{ width: '100%' }}>
                    <Left>
                        <Button transparent style={styles.button} onPress={() => this.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: 'white', fontSize: 20 }} >Just Chatting</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>
            </>
        )
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ backgroundColor: '#355C7D', height: '100%' }}>
                    <Content>
                        <Text style={{ fontSize: 50 }} >Esperando....</Text>
                    </Content>
                </View>
            )
        }

        return (
            <>
                <Drawer
                    ref={(ref) => { this._drawer = ref }}
                    content={<DrawerScreen avatar={this.state.avatar} name={this.state.name} email={this.state.email} />}
                    onClose={() => this.closeDrawer()}
                >
                    {this.renderHeader()}
                    <Container>
                        <View style={{ backgroundColor: '#355C7D', height: '100%' }}>
                            <Content>
                                <List>
                                    {
                                        this.state.contacts ?
                                            this.state.contacts.map(contacto => {
                                                
                                                 let name = ''
                                                 let email = ''
                                                 let avatar = ''

                                                 this.retrieveInfo(contacto).then(value => {
                                                     console.log('DATA: ', value)
                                                     name = value.name
                                                     email = value.email
                                                     avatar = value.avatar

                                                })
                                                return(
                                                    <ChatButton
                                                    key={contacto._id}
                                                    avatar={contacto.avatar}
                                                    name={contacto.name}
                                                    lastMessage={this.state.lastMessage}
                                                    onPress={() => {
                                                        this.props.navigation.navigate('chat',
                                                            {
                                                                socket: this.webSocket,
                                                                myID: this.state.mongoId,
                                                                mongoID: contacto._id,
                                                                handleLastMessage: this.handleLastMessage,
                                                                name,
                                                                avatar
                                                            })
                                                    }} />
                                                
                                                )
                                                })
                                            : <Text>No tienes contactos añadidos!</Text>
                                    }

                                </List>
                            </Content>

                        </View>
                    </Container>
                </Drawer>

            </>
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

export default withNavigation(HomeScreen);
