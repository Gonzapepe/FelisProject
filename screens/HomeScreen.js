import React, { Component } from 'react'


// ! Components
import {StyleSheet, View} from 'react-native';
import { Container, Drawer, Text, List,  Header, Left, Body, Right, Button, Icon } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';
import { withNavigation } from 'react-navigation';
import io from 'socket.io-client'
// ! Styles
import styled from 'styled-components';
// ! Axios
import axios from 'axios';
import ChatButton from '../components/Chats/ChatButton' ;


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        

        this.state = {
            name: '',
            email: '',
            mongoId: '',
            lastMessage: ''
        }
    }

    
    
     async componentDidMount() {
        this.socket = io(`http://192.168.0.17:3000`)
        this.mounted = true;

        const { mongoId } = this.state
        console.log(mongoId)
       
        global.token = this.props.navigation.state.params.token
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${global.token}`
            }
        }

        console.log('TOKEN: ', global.token)
        if(this.mounted) {
            
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
        }
       
           
        }
    

     componentWillUnmount() {
        this.mounted = false
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

                <View style={{backgroundColor: '#355C7D', height: '100%'}}>
                    <List>
                        <ChatButton lastMessage={this.state.lastMessage} onPress={() => {this.props.navigation.navigate('chat', { socket: this.socket, mongoID: this.mongoID, handleLastMessage: this.handleLastMessage })}} />   
                    </List>
                </View>

       
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
