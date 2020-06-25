import React, { Component } from 'react';

import styled from 'styled-components';
import CustomButton from '../components/CustomButton/custombutton';

import { auth, createUser } from '../firebase/config';
import { LinearGradient } from "expo-linear-gradient";

import { Input } from 'react-native-elements';


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


        const { navigation } = this.props

        // ! Enviar a la base de datos
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            // ! ver video sobre firestore y react native
            await createUser(user, { displayName })

            // ! Reseteo del form
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: false,
                errMensaje: ''
            });

            navigation.navigate('home');

            // ! Si hubo error
        } catch (error) {
            alert('Hubo un error', error);
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

                                <Input 
                                    onChangeText={displayName => this.setState({ displayName })} 
                                    value={this.state.displayName}
                                    placeholder = "Inserte su nombre"
                                    label='Nombre'
                                    labelStyle={{
                                        color: 'white'
                                    }}
                                    inputContainerStyle={{
                                        borderBottomColor: 'black',
                                    }}
                                    inputStyle={{
                                        color: 'black'
                                    }}
                                />
                                
                                <Input 
                                    onChangeText={email => this.setState({ email })} 
                                    value={this.state.email}
                                    placeholder = "Inserte su email"
                                    label='Email'
                                    labelStyle={{
                                        color: 'white'
                                    }}
                                    inputContainerStyle={{
                                        borderBottomColor: 'black'
                                    }}
                                    inputStyle={{
                                        color: 'black'
                                    }}
                                    keyboardType='email-address'
                                />
                                
                                <Input 
                                    secureTextEntry={ true } 
                                    onChangeText={password => this.setState({ password })} value={this.state.password}  
                                    placeholder = "Inserte su contraseña"
                                    label='Contraseña'
                                    labelStyle={{
                                        color: 'white'
                                    }}
                                    inputContainerStyle={{
                                        borderBottomColor: 'black'
                                    }}
                                    inputStyle={{
                                        color: 'black'
                                    }}
                                />
                                
                                <Input 
                                    secureTextEntry={ true } 
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })} type='password' 
                                    value={this.state.confirmPassword}
                                    placeholder = "Confirme su contraseña"
                                    label='Confirme contraseña'
                                    labelStyle={{
                                        color: 'white'
                                    }}
                                    inputContainerStyle={{
                                        borderBottomColor: 'black'
                                    }}
                                    inputStyle={{
                                        color: 'black'
                                    }}
                                />

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