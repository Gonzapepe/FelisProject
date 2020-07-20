import React, { Component } from 'react'


// ! Components
import { Container, Drawer, Text, List, ListItem, Switch, Card, Content, Header, Left, Body, Right, Button, Icon } from 'native-base';

// ! Styles
import styled from 'styled-components';
// ! Axios
import axios from 'axios';


class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            displayName: '',
            token: ''
        }
    }

    async componentDidMount() {

        console.log(this.props.navigation.state.params.token)
        const { token } = this.props.navigation.state.params

        const config = {
            headers: {
                'x-auth-token': token
            }

        }

        await axios.get('http://192.168.100.14/home', config)
    }

    openDrawer(){
        this._drawer._root.open();
    }

    closeDrawer(){
        this._drawer._root.close();
    }

    renderHeader(){
        return(
            <>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                </Header>
            </>
        )
    }

    render(){
        return (
            <>
            <Drawer
                ref={(ref) => {this._drawer = ref}}
                content={ <Text>Hola mundo</Text> }
                onClose={() => this.closeDrawer()}
            >
            {this.renderHeader()}

            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Left>
                                <Icon name="plane" />
                            </Left>
                            <Body>
                                <Text>Menu De Prueba</Text>
                            </Body>
                            <Right>
                                <Switch value={false} />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon name="wifi" />
                            </Left>
                            <Body>
                                <Text>Wifi</Text>
                            </Body>
                            <Right>
                                <Switch value={false} />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
            </Drawer>
            </>
        )
    }
}


export default HomeScreen;