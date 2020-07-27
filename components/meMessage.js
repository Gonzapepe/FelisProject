import * as React from 'react'
import { View, Text, StyleSheet} from 'react-native'




export default class MeMessages extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.Container}>
                <Text style={styles.mensaje}>{this.props.text}</Text>
            </View>

        )
    }

}


const styles = StyleSheet.create({
    Container: {
        justifyContent: 'flex-end',
        flexDirection: "row",
        overflow: 'hidden',
        marginLeft: '30%',
    },

    mensaje: {
        color: 'white',
        margin: 10,
        backgroundColor: '#C06C84',
        borderRadius: 10,
        padding: 10
    }
})