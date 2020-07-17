import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={styles.body}>
                <Text>HomeScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: "column",
        justifyContent: 'center'
    }
})