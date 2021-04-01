import React from 'react'
import { Button, ListItem, Left, Thumbnail, Body, Text, Right, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${global.token}`
    }
}

const styles = StyleSheet.create({
    LeftBody: {
        flex: 0.3
    },
    RightBody: {
        flex: 0.3,
        flexDirection: 'row'
    },
    MarginItem: {
        marginLeft: 15,
        marginRight: 15
    }
})


const PendingContactCard = props => {
    

    const acceptOnPress = async () => {

        

        const res = await axios.post(`http://192.168.0.17:3000/contact/accept-friend/${props.contacto._id}`, null, config)
        /*if(res.status === 200 || res.status === 304) {
            alert('Usuario añadido correctamente.')
        } */
    }

    const declineOnPress = async () => {

        const res = await axios.delete(`http://192.168.0.17:3000/contact/${props.contacto._id}`, config)

        if(res.status === 200 || res.status === 304) {
            alert('Usuario eliminado correctamente')
        }
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
        
            <Button transparent onPress={ acceptOnPress } >
                <Icon type='FontAwesome' name='check-circle' style={{ fontSize: 25 }} />
            </Button>
            <Button transparent onPress={ declineOnPress }>
                <Icon type='FontAwesome' name='times-circle' style={{ fontSize: 25 }} />
            </Button>
        </Right>
        </ListItem>
       

)} 

export default PendingContactCard