import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


const ConfigScreen = () => (
    <View styles={styles.view}>
        <Text styles={styles.text}>
            Hola
        </Text>
    </View>
)

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