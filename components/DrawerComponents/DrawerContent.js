import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Content, Container, Header, Left, Body, List, ListItem, Icon } from 'native-base'
import { Avatar } from 'react-native-paper'
import { auth } from '../../firebase/config'
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

const DrawerContent = (props) => (
    <Container>
        <Header style={styles.header} />

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