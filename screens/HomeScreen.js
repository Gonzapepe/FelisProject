import React, { Component } from 'react'


// ! Components
import {StyleSheet, View} from 'react-native';
import { Container, Drawer, Text, List,  Header, Content, Button, Icon } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';
import { withNavigation } from 'react-navigation';
import io from 'socket.io-client'
// ! Styles
import styled from 'styled-components';
// ! Axios
import axios from 'axios';
import ChatButton from '../components/Chats/ChatButton' ;
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
            contacts: []
        }
    }

    async callApi(config) {
        try {
            const res = await axios.get('http://192.168.0.17:3000/home', config)
            const { email, name, _id } = res.data.data
            this.setState({
                name,
                email,
                mongoId: _id
            })
            
        } catch (err) {
            console.log(err)
        }

        try {
            const res2 = await axios.get('http://192.168.0.17:3000/home/contacts', config)
            console.log('DATA DE CONTACTOS: ', res2.data)
            this.setState({ contacts: res2.data })
            
        } catch (err) {
            console.log(err)
        }
    }
    
    
     componentDidMount() {
        //this.socket = io(`http://192.168.0.17:3000`)
        this.webSocket = new WebSocket('ws://192.168.0.17:3000/ws')
        this.webSocket.onopen = (event)  => {
            console.log('Conectado correctamente')
            
        }
        const { mongoId } = this.state
        console.log(mongoId)
        if(!global.token) {
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

    openDrawer(){
        this._drawer._root.open();
    }

    closeDrawer(){
        this._drawer._root.close();
    }

    renderHeader(){
        return(
            <>
                <Header style={{ width: 100 }}>
                        <Button  transparent style={styles.button} onPress={() => this.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                </Header>
            </>
        )
    }

    render(){
        return (
            <>
            <Drawer
                ref={(ref) => {this._drawer = ref}}
                content={ <DrawerScreen/> }
                onClose={() => this.closeDrawer()}
            >
            {this.renderHeader()}
                <Container>
                <View style={{backgroundColor: '#355C7D', height: '100%'}}>
                    <Content>
                    <List>
                        {
                            this.state.contacts ?
                            this.state.contacts.map( contacto => 
                            <ChatButton 
                            key={contacto._id}
                            avatar={contacto.avatar}
                            name={contacto.name}
                            lastMessage={this.state.lastMessage} 
                            onPress={() => {this.props.navigation.navigate('chat', {  socket: this.webSocket, myID: this.state.mongoId, mongoID: contacto._id, handleLastMessage: this.handleLastMessage })}} />)
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
