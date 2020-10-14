import * as React from 'react'
import { View,Text,TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Button, Left, Right, Title, Container, Icon, Body } from 'native-base'
import { withNavigation } from 'react-navigation'


const styles = StyleSheet.create({
    header: {
        margin: 0
    }
})

class contactosScreen extends React.Component{
    render(){
        return(
            <Container style={styles.header}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                        <Icon type='FontAwesome' name='arrow-left' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Contactos</Title>
                    </Body>
                </Header>
            </Container>
        )
    }
}

export default withNavigation(contactosScreen)