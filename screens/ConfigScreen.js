import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Drawer, Text, List, ListItem, Switch, Card, Content, Header, Left, Body, Right, Button, Icon } from 'native-base';
import DrawerScreen from '../components/DrawerComponents/DrawerContent';

class ConfigScreen extends React.Component {

    openDrawer(){
        this._drawer._root.open();
    }

    closeDrawer(){
        this._drawer._root.close();
    }

    renderHeader(){
        return(
            <>
                <Header style={{ width: 100 }}>
                        <Button  transparent style={styles.button} onPress={() => this.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                </Header>
            </>
        )
    }

    render() {
        return (
            <>
                <Drawer
                    ref={(ref) => {this._drawer = ref}}
                    content={ <DrawerScreen/> }
                    onClose={() => this.closeDrawer()}
                >
                {this.renderHeader()}
         

                    <Text style={{flex: 1}}>Hola Mundo, desde configuración</Text>
                </Drawer>
            </>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20
    }
})

export default ConfigScreen