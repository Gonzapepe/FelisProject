import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components';
import CustomButton from './components/CustomButton/custombutton'


 
const Input = styled.TextInput`
  width: 300px;
  height: 40px;
  margin-top: 10px;
  border-radius: 6px;
  border-width:2px;
  border-color: black;
  ::placeholder {
    margin-left: 2px;
  }
`



const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 60%;
  flex-direction: row;
  justify-content: space-between;
`






const Card = styled.View`
  width: 100% ;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`

export default function App() {
  return (

    <Card>
      <Input placeholder='Usuario' placeholderTextColor='blue' />
      <Input placeholder='Contraseña' placeholderTextColor='blue' />

      <ButtonContainer>
        <CustomButton title='Iniciar sesión'/>
        <CustomButton title='Registrarse' />
      </ButtonContainer>
      

    </Card>
  );
}

