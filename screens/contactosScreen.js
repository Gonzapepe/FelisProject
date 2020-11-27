import * as React from 'react'
import { View,Text,TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Header, Button, Left, Right, Title, Container, Icon, Body, Item, Input, Content, Footer, FooterTab } from 'native-base'
import { withNavigation } from 'react-navigation'
import Contacto from '../components/Contacts/ContactCard'
import ContactModal from '../components/Contacts/ContactModal'
import Axios from 'axios'

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

class contactosScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isVisible: false,
            contacts: []
        }
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    async componentDidMount() {
        this.mounted = true

        if(this.mounted) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${global.token}`
                }
            }

            const res = await Axios.get('http://192.168.0.17:3000/home/contacts', config)

            this.setState({ contacts: res.data })
            console.log('CONTACTOS: ', this.state.contacts)

        
        }
    }

    toggleModal() {
        if(this.state.isVisible) {
            this.setState({ isVisible: false })
        } else {
            this.setState({ isVisible: true })
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render(){
        return(
            <Container>
                <Modal visible={this.state.isVisible} >
                <Container>
                <Header>
                        <Left>
                            <Button transparent onPress={ () => this.toggleModal() }>
                                <Icon name='times-circle' type='FontAwesome' />
                            </Button>
                        </Left>
                        <Body>
                            <Title> Nuevo Contacto </Title>
                        </Body>
                        
                    </Header>
                    <ContactModal />
                </Container>
                </Modal>            
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
                <Content style={styles.color} >
                <Item style={styles.input} >
                    <Input placeholder='Buscar contacto...' value={this.state.inputValue} onChange={e => this.handleChange(e)} />
                    <Icon active type='FontAwesome' name='search' />
                </Item>
                    {
                        this.state.contacts.map( contacto => 
                            <Contacto key={contacto._id} avatar={contacto.avatar} message={contacto.estado} name={contacto.name} time='4:50 pm' />
                            )
                    }
                    
                    
                
                </Content>

                <Footer>
                    <FooterTab style={styles.footerTabStyles} >
                        <Button active>
                            <Icon name='address-card' type='FontAwesome' />
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button>
                            <Icon name='envelope' type='FontAwesome' />
                        </Button>
                    </FooterTab>
                    
                </Footer>

            </Container>
        )
    }
}

export default withNavigation(contactosScreen)