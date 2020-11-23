import React from 'react'
import { StyleSheet } from 'react-native'
import { Left, ListItem, Body, Right, Text, Thumbnail, Button, Icon } from 'native-base'

const styles = StyleSheet.create({
    LeftBody: {
        flex: 0.3
    },
    RightBody: {
        flex: 0.3
    },
    MarginItem: {
        marginLeft: 15,
        marginRight: 15
    }
})

const ContactCardToAdd = props => (
        <ListItem style={styles.MarginItem} >
        <Left style={styles.LeftBody} >
            <Thumbnail source={{ uri: `http://192.168.0.17:3000/${props.contacto.avatar}` }} />
        </Left>
        <Body>
            <Text> {props.contacto.name} </Text>
            <Text note> {props.contacto.email} </Text>
        </Body>
        <Right style={styles.RightBody} >
        
            <Button transparent>
            
            </Button>
        </Right>
        </ListItem>
       

)

export default ContactCardToAdd