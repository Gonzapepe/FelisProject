import * as React from 'react'
import { View, Text, StyleSheet} from 'react-native'




export default class MeMessages extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.Container}>
                <Text >{this.props.text}</Text>
            </View>

        )
    }

}


const styles = StyleSheet.create({
    Container: {
        justifyContent: 'flex-end',
        flexDirection: "row",
        overflow: 'hidden',
        marginLeft: '30%'

    }
})