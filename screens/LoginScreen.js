import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import styled from 'styled-components';
import CustomButton from '../components/CustomButton/custombutton'

const CardForm = styled.View`
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-start;
`

const Start = styled.Text`
    font-weight: bold;
    font-size: 36px;
`

const Span = styled.Text` 
    font-size: 14px;
    margin-top: 10px;
`

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
  margin-top: 12%;
  align-items: center;
  flex-direction: column;
  
`

export default class LoginScreen extends Component {

    constructor(){
        super()

        this.state = {
            email:'',
            password:''
        }
    }

    render() {
        const { navigation } = this.props
    return (

        <Card>
            <Start>Bienvenido</Start>
            <CardForm>
                <Span>Email</Span>
                <Input onChangeText={email => this.setState({ email })} value={this.state.email} />
                <Span>Contraseña</Span>
                <Input onChangeText={password => this.setState({ password })} value={this.state.value} />
            </CardForm> 

            <ButtonContainer>
            <CustomButton title='Iniciar sesión' />
            <CustomButton title='Registrarse' onPress={() => navigation.navigate('register')} />
            </ButtonContainer>


        </Card>
    );
}
}

