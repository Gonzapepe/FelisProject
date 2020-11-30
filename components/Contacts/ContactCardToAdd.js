import React from 'react'
import { StyleSheet } from 'react-native'
import { Left, ListItem, Body, Right, Text, Thumbnail, Button, Icon } from 'native-base'
import axios from 'axios'

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

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${global.token}`
    }
}



const ContactCardToAdd = props => {

    const handleOnPress = async () => {
        
            const { email } = props.contacto

            const body = JSON.stringify({ email })
            console.log('BODY', body)
            
            const res = await axios.post(`http://192.168.0.17:3000/contact/friend-request`, body, config)
    
        
            console.error('hubo un error: ', err)
        
    
        console.log('CONTACTO: ', props.contacto)
    }


return (
        <ListItem style={styles.MarginItem} >
        <Left style={styles.LeftBody} >
            <Thumbnail source={{ uri: `http://192.168.0.17:3000/${props.contacto.avatar}` }} />
        </Left>
        <Body>
            <Text> {props.contacto.name} </Text>
            <Text note> {props.contacto.email} </Text>
        </Body>
        <Right style={styles.RightBody} >
        
            <Button transparent onPress={ handleOnPress } >
                <Icon type='FontAwesome' name='plus-circle' style={{ fontSize: 25 }} />
            </Button>
        </Right>
        </ListItem>
       

)} 

export default ContactCardToAdd