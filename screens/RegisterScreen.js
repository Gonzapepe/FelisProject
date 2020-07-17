import React, { Component } from 'react';

import styled from 'styled-components';
import CustomButton from '../components/CustomButton/custombutton';

import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';


// ! Styled Components
const Start = styled.Text`
    font-weight: bold;
    font-size: 36px;
    color: white;
`;

const ErrorBox = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const MessageError = styled.Text`
  text-align: center;
  color: red;
  font-size: 15px;
`;


const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 60%;
  flex-direction: row;
  justify-content: center;
`;

const LoginText = styled.Text`
  font-size: 18px;
`;

const LoginTextContainer = styled.View`
    margin-top: 45px;
    display: flex;
    flex-direction: row;
`;

const SecondText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Card = styled.View`
  width: 100% ;
  height: 100%;
  margin: 0;
  display: flex;
  margin-top: 12%;
  align-items: center;
  flex-direction: column;

`;

class RegisterScreen extends Component {

    // ! Constructor del state
    constructor() {
        super()

        this.state = {
            email: '',
            displayName: '',
            password: '',
            confirmPassword: '',
            error: false,
            errMensaje: ''
        }
        
    }


    // ! Para enviar formularios, se usa onPress, y se llama en el boton, ya que no existe el tag de <form>

    handleSubmit = async event => {
        event.preventDefault()

        const { email, displayName, password, confirmPassword } = this.state
        const regularExp = new RegExp("@");

        // ! Validación
        if(email.trim() === '' || password.trim() === '' || displayName.trim() === '' || confirmPassword.trim() === '') {
            this.setState({
                error: true,
                errMensaje: 'Rellene los campos correctamente'
            });

            setTimeout(() => {
                this.setState({
                    error: true,
                    errMensaje: ''
                });
            }, 3000);

            return;
        }

        if(password.trim().length < 6) {
            this.setState({
                error: true,
                errMensaje: 'La contraseña debe tener al menos 6 dígitos'
            });

            setTimeout(() => {
                this.setState({
                    error: true,
                    errMensaje: ''
                });
            }, 3000);

            return;
        }

        if(password !== confirmPassword) {
              this.setState({
                error: true,
                errMensaje: 'Las contraseñas deben ser iguales'
            });

            setTimeout(() => {
                this.setState({
                    error: true,
                    errMensaje: ''
                });
            }, 3000);

            return;
        }

        if(!regularExp.test(email)){
            this.setState({
                error: true,
                errMensaje: 'Email inválido'
            });

            setTimeout(() => {
                this.setState({
                    error: false,
                    errMensaje: ''
                });
            }, 3000);

            return;
        }
        
        // ! Enviar a la base de datos
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify({name: displayName, email, password, confirmPassword});

            const res = await axios.post('http://192.168.100.14:3000/register', body, config);
            console.log(res);

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: false,
                errMensaje: ''
            });

            this.props.navigation.navigate('login');
            // ! Si hubo error
        } catch (err) {
            console.log('Hubo un error', err);
        }

    }

    render(){
        return (
            <LinearGradient colors={['#1D2671', '#C33764']}>
                <Card>
                        <Start>Bienvenido</Start>

                                <ErrorBox>
                                    {this.state.error ? <MessageError>{this.state.errMensaje}</MessageError> : null}
                                </ErrorBox>

                              

                        <ButtonContainer>
                            <CustomButton width='250px' title='Registrarse' onPress={  this.handleSubmit } />
                        </ButtonContainer>

                        <LoginTextContainer>
                            <LoginText> ¿Ya tenés cuenta? </LoginText>
                            <SecondText onPress={() => this.props.navigation.navigate('login')} >Inicia sesión</SecondText>
                        </LoginTextContainer>
                </Card>
            </LinearGradient>
        )}
}

export default RegisterScreen;