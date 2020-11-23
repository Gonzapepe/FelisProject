import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, List, ListItem, Left, Body, Right, Thumbnail, Text, Content } from 'native-base'

//investigar sobre ImagePicker y la funcion de Multer de Academind, ahi estan las respuestas

const styles = StyleSheet.create({
    LeftBody: {
        flex: 0.3
        
    }
})

class Contacto extends React.Component {



    render() {
        return(
                    <List>
                        <ListItem Avatar>
                            <Left style={styles.LeftBody} >
                                <Thumbnail source={{uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'}} />
                            </Left>
                            <Body>
                                <Text> {this.props.name} </Text>
                                <Text note> {this.props.message} </Text>
                            </Body>
                            <Right>
                                <Text note> {this.props.time} </Text>
                            </Right>
                        </ListItem>
                    </List>
            
        )
    }

}

export default Contacto