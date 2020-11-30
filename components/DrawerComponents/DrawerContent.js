import React, { Component } from 'react';

import { View,Text, StyleSheet, LogBox } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { Icon, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import axios from 'axios'

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },

    userInfoSection: {
        paddingLeft: 20,
    },

    title:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        justifyContent: 'center'
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
        justifyContent: 'center'
    },

    border: {
        borderBottomColor: '#CCC',
        marginTop: 20,
        borderBottomWidth: 1
    },

    icon: {
        marginLeft: 10,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black'
    },
})

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${global.token}`
    }
}

class DrawerScreen extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            mongoId: '',
            avatar: '',
            isLoading: true
        }
    }

     callApi() {
    }
    
     componentDidMount() {

        this.callApi()
       
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

    render() {
        console.log('IMAGEN DESDE EL RENDER: ', this.props.avatar)
       
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            
                            <Avatar.Image 
                                source={{
                                    uri: `http://192.168.0.17:3000/${this.props.avatar}`
                                }}
                                size={50}
                                style={{
                                    marginTop: 5
                                }}
                            />

                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>
                                    {this.props.name}
                                </Title>
                                <Caption style={styles.caption}>
                                    {this.props.email}
                                </Caption>


                            </View>                        
                        </View>
                    </View>

                    <View style={styles.border} />
                    
                    <View style={styles.icon}>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('home');
                            }}
                        >
                            <Icon 
                                name="chatbubbles"
                                color
                            />
                            <Text style={{paddingRight: 20, fontWeight:'bold', fontSize: 16}}>Chats</Text> 
                        </Button>
                    </View> 
         

                    <View style={styles.icon}>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('config');
                            }}
                        >
                            <Icon 
                                name="settings"
                                color
                            />
                            <Text style={{paddingRight: 20, fontWeight:'bold', fontSize: 16}}>Configuración</Text> 
                        </Button>
                    </View>    

                    <View style={styles.icon}>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('contacts');
                            }}
                        >
                            <Icon 
                                type='FontAwesome'
                                name="address-book"
                                color
                            />
                            <Text style={{paddingRight: 20, fontWeight:'bold', fontSize: 16}}>Contactos</Text> 
                        </Button>
                    </View>    
              
                    <View style={styles.icon}>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('auth');
                        }}>
                            <Icon 
                                name="log-out"
                                color
                            />
                            <Text style={{paddingRight: 20, fontWeight: 'bold', fontSize: 16}}>Cerrar Sesión</Text> 
                        </Button>
                    </View>  
                    
                </View>
            </View>
        )
    }
}

export default withNavigation(DrawerScreen);