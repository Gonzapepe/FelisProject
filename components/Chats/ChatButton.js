import React from 'react'

import { StyleSheet } from 'react-native'
import { Left, ListItem, Body, Right, Text, Thumbnail, Button, Title, Content } from 'native-base'

const styles = StyleSheet.create({
    LeftBody: {
        flex: 0.2
    },
    Body: {
        color: 'white'
    }
})

const ChatButton = (props) => {

        return(
            
            <ListItem>
                <Left style={styles.LeftBody}>
                    <Thumbnail source={{  uri: `http://192.168.0.17:3000/${props.avatar}` }} />
                </Left>
                <Content>
                <Button transparent onPress={props.onPress} >
                
                <Body style={styles.Body}>
                    <Text style={styles.Body}> {props.name} </Text>
                </Body>
                <Right>
                    <Text> asdasdads</Text>
                </Right>
                </Button>
                </Content>
            </ListItem>
            
        )
    

}

export default ChatButton