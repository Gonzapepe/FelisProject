import React from 'react'
import { Header, Button, Left, Right, Title, Container, Icon, Body, Item, Input, Content, Footer, FooterTab } from 'native-base'
import { withNavigation } from 'react-navigation'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    color: {
        marginTop: 20,
        color: 'red'
    },
    input: {
        marginLeft: 5,
        marginRight: 5,
        height: 35
    },
    noBorder: {
        borderWidth: 0
    },
    footerTabStyles: {
        borderRightColor: 'white',
        borderRightWidth: 1
    }

})


class requestScreen extends React.Component {
    render(){
        return(
            <Container>         
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                        <Icon type='FontAwesome' name='arrow-left' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Contactos</Title>
                    </Body>
                    <Right> 
                        <Button transparent onPress={() => this.setState({ isVisible: true })} >
                            <Icon name='user-plus' type='FontAwesome' />
                        </Button>
                    </Right>
                </Header>
                

            </Container>
        )
}

}

export default withNavigation(requestScreen);