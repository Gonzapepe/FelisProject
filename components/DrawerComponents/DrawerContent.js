import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Content, Container, Header, Left, Body, List, ListItem, Icon } from 'native-base'
import styled from 'styled-components'
import { YellowBox } from 'react-native'
import _ from 'lodash'
import axios from 'axios'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const TextList = styled.Text`
    margin-left: 10px;
`


class DrawerContent extends React.Component {

    constructor() {
        super()

        this.state = {
            email: '',
            name: '',

        }
    }


    // Encontrar una solucion para usar las promesas de .then()

    componentDidMount() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${this.props.navigation.state.params.token}`
            }
        }
        axios.get('http://192.168.0.17:3000/home', config)
            .then(res => res.data)
            .then(res => JSON.stringify(res.data))
            .then(response => JSON.parse(response))
            .then(response => this.setState({ name: response.name, email: response.email }))
            .catch(err => console.log(err))
        }

    render() {
        console.log(this.props.navigation.state)
        // const logout = async () => {
        //     try {

        //     } catch (err) {
        //         console.log(err)
        //     }
        // }

        return (
            // <Container>

            //     <Header style={styles.header} >
            //         <View style={styles.avatarStyle}>
            //             <Avatar
            //                 showAccessory
            //                 onPress={() => console.log('Funciona')}
            //                 activeOpacity={0.7}
            //                 size='medium'
            //                 rounded
            //                 icon={{ name: 'user', type: 'font-awesome' }}

            //             />
            //         </View>
            //         <View style={styles.insideHeader}>
            //             <Text style={styles.headerText}>
            //                 {this.state.email}
            //             </Text>
            //             <Text style={styles.headerText}>
            //                 {this.state.displayName}
            //             </Text>
            //         </View>

            //     </Header>

            //     <Content>
            //         <FlatList data={[
            //             { title: 'Home', icon: 'home', route: 'home' }, { title: 'Test', icon: 'log-in', route: 'test' },
            //             { title: 'Configuración', icon: 'cog', route: 'config' }
            //         ]}
            //             renderItem={({ item }) => (
            //                 <ListItem noBorder style={styles.ListItem} onPress={() => this.props.navigation.navigate(item.route)} >
            //                     <Icon name={item.icon} type='FontAwesome' style={styles.Icon} />
            //                     <TextList>{item.title}</TextList>
            //                 </ListItem>
            //             )}
            //         />


            //         <ListItem noBorder >
            //             <Icon name='log-out' style={styles.Icon} />
            //             <TouchableOpacity onPress={() => logout()}><Text> Cerrar sesión </Text></TouchableOpacity>
            //         </ListItem>
            //     </Content>
            // </Container>

            <View>
                <Text>Drawer</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3a455c',
        height: 58,
        flexDirection: 'row'
    },
    avatarStyle: {
        marginRight: 5
    },
    insideHeader: {
        flexDirection: 'column',
        marginRight: 40,
        marginTop: 5
    },
    ListItem: {
        justifyContent: "flex-start",
        backgroundColor: 'transparent'
    },
    Icon: {
        color: '#3a455c',
        width: 40
    },
    headerText: {
        color: 'white',
        fontSize: 16,
    }
})

export default DrawerContent