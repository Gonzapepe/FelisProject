import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Content, Container, Header, Left, Body, List, ListItem, Icon } from 'native-base'
import { auth, firestore } from '../../firebase/config'
import styled from 'styled-components'
import { YellowBox } from 'react-native'
import _ from 'lodash'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const TextList = styled.Text`
    margin-left: 10px;
`



class DrawerContent extends React.Component{

    constructor(){
        super()

        this.state = {
            email: '',
            displayName: '',
            
        }
    }

    componentDidMount() {
        
        const user = auth.currentUser
        const dbData = firestore.collection('users').doc(`${user.uid}`)

        // Encontrar una solucion para usar las promesas de .then()
         dbData.get().then((doc) => {
            if (doc.exists) {
                const userEmail = doc.data().email
                const userName = doc.data().displayName

                this.setState({
                    email: userEmail,
                    displayName: userName
                })

            } else {
                console.log('Ese documento no existe')
            }
        }).catch(err => console.log('Hubo un error: ', err))
    }
render(){
    const logout = async () => {
        try {
            await auth.signOut()
            this.props.navigation.navigate('Auth')
    
        } catch (err) {
            console.log(err)
        }    
    }

return (
    <Container>

        <Header style={styles.header} >
            <View style={styles.avatarStyle}>
            <Avatar 
            showAccessory 
            onPress={() => console.log('Funciona')} 
            activeOpacity={0.7} 
            size='medium' 
            rounded 
            icon={{name: 'user', type: 'font-awesome'}}
            
            />
            </View>
            <View style={styles.insideHeader}>
            <Text style={styles.headerText}>
                {this.state.email}
            </Text>
            <Text style={styles.headerText}>
                {this.state.displayName}
            </Text>
            </View>

        </Header>

        <Content>
            <FlatList data={ [
                 { title: 'Home', icon: 'home', route: 'home'}, { title: 'Test', icon: 'log-in', route: 'test'}, 
                 { title: 'Configuración', icon: 'cog', route: 'config' }
            ]} 
            renderItem={ ({ item }) => (
               <ListItem  noBorder style={ styles.ListItem } onPress={ () =>  this.props.navigation.navigate(item.route)} >
                   <Icon name={item.icon} type='FontAwesome' style={ styles.Icon }/>
                   <TextList>{item.title}</TextList>
               </ListItem> 
            ) }
            />


            <ListItem noBorder >
                <Icon name='log-out' style={styles.Icon} />
                <TouchableOpacity onPress={ () => logout()}><Text> Cerrar sesión </Text></TouchableOpacity>
            </ListItem>
        </Content>
    </Container>
)
}
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3a455c',
        height: 58,
        flexDirection: 'row'
    },
    avatarStyle: {
        marginRight: 5
    },
    insideHeader: {
        flexDirection: 'column',
        marginRight: 40,
        marginTop: 5
    },  
    ListItem: {
        justifyContent: "flex-start",
        backgroundColor: 'transparent'
    },
    Icon: {
        color: '#3a455c',
        width: 40
    },
    headerText: {
        color: 'white',
        fontSize: 16,
    }
})

export default DrawerContent