import React from 'react'
import {  StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

// Styled Components parece que no se puede usar para botones :( por ahi deberiamos instalar react native elements tambien

const Texto = styled.Text`
  font-size: 12px;    
  color: white;
  text-transform: uppercase;
`
const ButtonStyle = styled.TouchableOpacity`
padding: 10px;
width: ${props =>  props.width ? props.width : '120px'};
border-radius: 16px;
align-items: center;
background-color: black;
color: white;

`

const CustomButton = (props) => {
 return(
    
    <ButtonStyle width={props.width} onPress={ props.onPress } >
      <View>
        <Texto>{props.title}</Texto>
      </View>
      </ButtonStyle>
 )
}



export default CustomButton