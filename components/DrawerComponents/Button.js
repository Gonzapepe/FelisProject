import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'


const Button = ({ navigation }) => (
    <View>
        <SafeAreaView>
            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} >
                <Text> &#9776; </Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
)

export default Button