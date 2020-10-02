import React, { Component } from 'react';

import { View,Text, StyleSheet } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { Icon, Button } from 'native-base';
import { withNavigation } from 'react-navigation';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

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

class DrawerScreen extends Component {
    
    render() {


        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                                style={{
                                    marginTop: 5
                                }}
                            />

                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>
                                    Juan Doe
                                </Title>
                                <Caption style={styles.caption}>
                                    @email_
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