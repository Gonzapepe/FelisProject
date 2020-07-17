import React, { Component } from 'react';


// ! Componentes
import { Item, Input, Label, View } from 'native-base';
import { Card } from 'react-native-ui-lib';
import { Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from '../components/CustomButton/custombutton';
import logo from '../assets/images/whatsapp.png';

// ! Styles
import styled from 'styled-components';

// ! Axios
import axios from 'axios';


// ! Styled Components
const Title = styled.Text`
    font-weight: bold;
    font-size: 36px;
    color: white;
    text-align: center;
    margin-top:50px;
`;

const Logo = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const ErrorBox = styled.View`
    margin-bottom: 5px;
    margin-top: 15px;
`;

const MessageError = styled.Text`
    text-align: center;
    color: red;
    font-size: 15px;
`;

const styles = StyleSheet.create({
    stretch: {
      width: 100,
      height: 100,
      resizeMode: 'stretch',
    },

    password: {
        marginTop: 20,
        marginBottom: 20
    },

    label: {
        color: 'black',
        fontSize: 17
    },

    input: {
        fontSize: 15,
        marginTop: 5,
    },

    bodyMessages: {
        flex: 2,
        backgroundColor: 'blue'
    },
});

const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 100%;
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

const Contenedor = styled.View`
  width: 100% ;
  height: 100%;
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
            <>
                <LinearGradient colors={['#1D2671', '#C33764']}>
                    <Contenedor>
                        <KeyboardAwareScrollView >
                            <Title>
                                Bienvenido
                            </Title>
                            
                            <Logo>
                                <Image style={styles.stretch} source={logo} />
                            </Logo>

                                <Card paddingT-5 paddingB-20 paddingL-10 paddingR-10>
                                

                                        <ErrorBox>
                                            {this.state.error ? <MessageError>{this.state.errMensaje}</MessageError> : null}
                                        </ErrorBox>

                                            <Item stackedLabel>
                                                <Label style={styles.label}>Email</Label>
                                        
                                                    <Input 
                                                        placeholder="Ingrese un correo" 
                                                        style={styles.input}
                                                        onChangeText={this.handleEmail}
                                                        value={this.state.email}    
                                                    />
                                            </Item>

                                            <Item stackedLabel last style={styles.password}>
                                                <Label style={styles.label}>Password</Label>
                                                    <Input 
                                                        secureTextEntry={true} 
                                                        placeholder="Ingrese una contraseña"
                                                        style={styles.input}
                                                        onChangeText={this.handlePassword}
                                                        value={this.state.password}    
                                                    />
                                            </Item>



                                        <ButtonContainer>
                                            <CustomButton width='250px' title='Registrarse' onPress={  this.handleSubmit } />
                                        </ButtonContainer>

                                </Card>
                            

                                
                                <LoginTextContainer>
                                    <LoginText> ¿Ya tenés cuenta? </LoginText>
                                    <SecondText onPress={() => this.props.navigation.navigate('login')} >Iniciar sesión</SecondText>
                                </LoginTextContainer>

                        </KeyboardAwareScrollView>
                    </Contenedor>
                </LinearGradient>
            </>
        )}
}

export default RegisterScreen;