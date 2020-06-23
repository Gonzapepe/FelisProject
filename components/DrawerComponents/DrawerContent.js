import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Content, Container, Header, Left, Body, List, ListItem, Icon } from 'native-base'
import { Avatar } from 'react-native-paper'
import { auth, firestore } from '../../firebase/config'
import styled from 'styled-components'


const TextList = styled.Text`
    margin-left: 10px;
`

const logout = async () => {
    try {
        await auth.signOut()
        props.navigation.navigate('Auth')

    } catch (err) {
        console.log(err)
    }    
}

class DrawerContent extends React.Component{

    constructor(){
        super()

        this.state = {
            email: '',
            displayName: ''
        }
    }

    componentDidMount() {
        
        const user = auth.currentUser
        const dbData = firestore.collection('users').doc(`${user.uid}`)

        // Encontrar una solucion para usar las promeas de .then()
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


return (
    <Container>
        <Header style={styles.header} > 
        
            <Text>
                {this.state.email}
            </Text>
            <Text>
                {this.state.displayName}
            </Text>

        </Header>

        <Content>
            <FlatList data={ [
                 { title: 'Home', icon: 'home', route: 'home'}, { title: 'Test', icon: 'log-in', route: 'test'}
            ]} 
            renderItem={ ({ item }) => (
               <ListItem  noBorder style={ styles.ListItem } onPress={ () =>  props.navigation.navigate(item.route)} >
                   <Icon name={item.icon} style={ styles.Icon }/>
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
        height: 58
    },
    ListItem: {
        justifyContent: "flex-start",
        backgroundColor: 'transparent'
    },
    Icon: {
        color: '#3a455c',
        width: 40
    }
})

export default DrawerContent