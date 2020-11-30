import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Drawer, Text, List, ListItem, Switch, Card, Content, Header, Left, Body, Right, Button, Icon } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';
import { Avatar } from 'react-native-paper';
import axios from 'axios'



const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: '#355C7D',
        height: '40%'
    },

    name: {
        fontSize: 20,
        marginTop: 40,
        color: 'white',
        backgroundColor: '#C06C84',
        borderRadius: 10,
        padding: 10,
    },

    email_contact: {
        color: 'white',
        backgroundColor: '#355C7D',
        borderRadius: 10,
        padding: 10, 
        marginTop: 30
    },

    estado_frase : {
        color: 'white',
        backgroundColor: '#355C7D',
        borderRadius: 10,
        padding: 10, 
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },

    estado: {
        fontSize: 20,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },  

    email: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        marginTop: 5,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },

    bottom_view: {
        backgroundColor: '#C06C84',
        height: '60%',
        width: '100%',
        alignItems: 'center',
    },

    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        width: '100%',
        marginTop: 20,
    },

    view_estado: {
        width: '100%',
        alignItems: 'center',
    },
    
    view_email: {
        width: '100%',
        alignItems: 'center',
    }
})

class ConfigScreen extends React.Component {

    constructor() {
        super()
        
        this.state = {
            name: '',
            email: '',
            estado: '',
            avatar: ''
        }
    }

    openDrawer(){
        this._drawer._root.open();
    }
    
    closeDrawer(){
        this._drawer._root.close();
    }

    async callApi(config) {
        try {
            const res = await axios.get('http://192.168.0.17:3000/home', config)
            const { avatar, email, name, estado } = res.data.data
            this.setState({
                name,
                email,
                avatar,
                estado
            })
            
        } catch (err) {
            console.log(err)
        }
    }


     componentDidMount() {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${global.token}`
            }
        }

        this.callApi(config)

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

    render() {
        return (
            <>
                <Drawer
                    ref={(ref) => {this._drawer = ref}}
                    content={ <DrawerScreen/> }
                    onClose={() => this.closeDrawer()}
                >
                {this.renderHeader()}
                

                    <View style={styles.view}>
                        <Avatar.Image 
                            source={{
                                uri: `http://192.168.0.17:3000/${this.state.avatar}`
                            }}
                            size={110}
                            style={{
                                marginTop: 50,
                            }}
                        />
                        <Text style={styles.name}> {this.state.name} </Text>
                    </View>

                    <View style={styles.bottom_view}>
                        <View style={styles.view_estado}>
                            <Text style={styles.estado}>Estado</Text>   
                            <Text style={styles.estado_frase} > {this.state.estado} </Text>
                            
                        </View>

                        <View style={styles.border}></View>

                        <View style={styles.view_email}>
                            <Text style={styles.email}>Email</Text>
                            <Text style={styles.email_contact}> {this.state.email} </Text>
                        </View>
                    </View>

                </Drawer>
            </>
        )
    }
}


export default ConfigScreen