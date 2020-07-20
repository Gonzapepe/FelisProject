import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },

    userInfoSection: {
        paddingLeft: 20,
    },

    title:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
    }

})

class DrawerScreen extends Component{
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                                style={{
                                    marginTop: 5
                                }}
                            />

                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>
                                    Juan Doe
                                </Title>
                                <Caption style={styles.caption}>
                                    @email_
                                </Caption>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default DrawerScreen;