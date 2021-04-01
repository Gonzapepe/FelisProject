import React from 'react'
import { Header, Button, Left, Right, Title, Container, Icon, Body, Item, Input, Content, Footer, FooterTab, Text } from 'native-base'
import { withNavigation } from 'react-navigation'
import { StyleSheet } from 'react-native'
import PendingContactCard from '../components/Contacts/PendingContactCard'
import axios from 'axios'

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
    
    constructor(props) {
        super(props)

        this.state = {
            contacts: []
        }
    }

    async callApi(config) {
        try {
         
            const res = await axios.get(`http://192.168.0.17:3000/home`, config)
            console.log('DATOS: ', res.data)   
            const id = res.data._id
            console.log('ID: ', id)
            if(id) {
                const response = await axios.get(`http://192.168.0.17:3000/contact/pending-contacts/${id}`, config)
                console.log('DATOS 2: ', response.data)
                this.setState({ contacts: response.data })
            }
        } catch (err) {
            console.log('Hubo un error: ', err)
        }
            
        
    }

     componentDidMount() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${global.token}`
            }
           
        }
         this.callApi(config)

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.callApi(config)
            }
        )

    }

    componentWillUnmount() {
        this.willFocusSubscription.remove()
    }

    render(){
        return(
            <Container>         
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type='FontAwesome' name='arrow-left' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Contactos</Title>
                    </Body>
                </Header>

                <Content>
                    {
                        this.state.contacts ? 
                        this.state.contacts.map(contacto => {
                            console.log('CONTACTO: ', contacto)
                            return(
                                <PendingContactCard key={contacto._id} contacto={contacto} />
                            )
                        })
                        : <Text>No tienes contactos aún</Text>
                    }
                </Content>
                
                <Footer>
                    <FooterTab style={styles.footerTabStyles} >
                        <Button onPress={ () =>  this.props.navigation.navigate('contact') }>
                            <Icon name='address-card' type='FontAwesome' />
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button active>
                            <Icon name='envelope' type='FontAwesome' />
                        </Button>
                    </FooterTab>
                    
                </Footer>

            </Container>
        )
}

}

export default withNavigation(requestScreen);