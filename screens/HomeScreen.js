import React, { Component } from 'react'


// ! Components
import {StyleSheet} from 'react-native';
import { Container, Drawer, Text, List, ListItem, Switch, Card, Content, Header, Left, Body, Right, Button, Icon } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';
import { withNavigation } from 'react-navigation';
import io from 'socket.io-client'
// ! Styles
import styled from 'styled-components';
// ! Axios
import axios from 'axios';
import { View } from 'react-native-ui-lib';

const styles = StyleSheet.create({
    button: {
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class HomeScreen extends Component {
    constructor(props) {
        super(props)

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
                    <Button style={{color: 'black', flex: 1}} onPress={() => {this.props.navigation.navigate('chat')}}>
                        <Text>Chat</Text>
                    </Button>
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
