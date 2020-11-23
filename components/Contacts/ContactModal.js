import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Input, List, Icon, Item, } from 'native-base'
import axios from 'axios'
import ContactCardToAdd from './ContactCardToAdd'



class ContactModal extends React.Component {
    
    constructor() {
        super()

        this.state = {
            isValid: false,
            searchField: '',
            contacts: []
        }
    }
     async componentDidMount() {
        this.mounted = true;

        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                search: this.state.searchField
            }
        }

        const res = await axios.get('http://192.168.0.17:3000/home/users', config)

        this.setState({ contacts: res.data })
        
    }

    handleChange(text) {
        
        this.setState({ searchField: text })

        
    }


    render() {

        const { searchField, contacts } = this.state

        const filteredContacts = contacts.filter(contact => contact.email.toLowerCase().includes(searchField.toLowerCase()))
        console.log('FILTERED CONTACTS: ', filteredContacts)

        return(
                   
                    <Content>

                            <Item success={this.state.isValid && true} style={styles.inputItem} >
                            <Input placeholder='Buscar contacto a añadir' onChangeText={ text => this.handleChange(text) } value={this.state.searchField} />
                            {
                                this.state.isValid ?
                                <Icon name='check-circle' type='FontAwesome' />     
                                : 
                                <Icon name='times-circle' type='FontAwesome' />
                            }
                            
                            </Item>
                            <List>
                                {
                                    filteredContacts.map(contacto => <ContactCardToAdd key={contacto._id} contacto={contacto} />)
                                }
                            </List>
                           
                        
                    </Content>
        )
    }
}

const styles = StyleSheet.create({
    InputItem: {
        marginTop: 10
    }
})

export default ContactModal