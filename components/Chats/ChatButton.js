import React from 'react'

import { StyleSheet } from 'react-native'
import { Left, ListItem, Body, Right, Text, Thumbnail, Button, Icon } from 'native-base'

const styles = StyleSheet.create({
    LeftBody: {
        flex: 0.3
    },
})

const ChatButton = props => {

    console.log('PROPS DISPONIBLES:', props.navigation)

    return(
        <ListItem>
            <Button transparent onPress={props.onPress} >
            <Left style={styles.LeftBody}>
                <Thumbnail source={{  uri: `http://192.168.0.17:3000/${props.contacto.avatar}` }} />
            </Left>
            <Body>

            </Body>
            <Right>

            </Right>
            </Button>
        </ListItem>
    )

}

export default ChatButton