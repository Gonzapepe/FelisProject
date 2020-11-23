import React, { Component } from 'react';


// ! Componentes
import { Item, Input, Label, View } from 'native-base';
import { Card } from 'react-native-paper';
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
    margin-bottom: 10px;
    margin-top: 15px;
    background-color: red;
    border-radius: 20px;
`;

const MessageError = styled.Text`
    text-align: center;
    color: white;
    font-size: 15px;
    padding: 5px;
`;

const styles = StyleSheet.create({
    stretch: {
      width: 100,
      height: 100,
      resizeMode: 'stretch',
    },

    label: {
        color: 'black',
        fontSize: 17,
        marginTop: 5,

    },

    input: {
        fontSize: 15,
        marginTop: 0,
    },

    card: {
        paddingTop: 5,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    keyboardScroll: {
        marginBottom: 100
    }
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
    margin-top: 25px;
    margin-bottom: 30px;
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
            errorValidation: false,
            errorMessage: '',
        }
        
    }

    // ! Para enviar formularios, se usa onPress, y se llama en el boton, ya que no existe el tag de <form>

    handleSubmit = async event => {
        event.preventDefault()

        const { email, displayName, password, confirmPassword } = this.state;
        const regularExp = new RegExp("@");

        // ! Validación
        if(email.trim() === '' || password.trim() === '' || displayName.trim() === '' || confirmPassword.trim() === '') {
            this.setState({
                errorValidation: true,
                errorMessage: 'Rellene los campos correctamente',
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: false,
                });
            }, 3000);

            return;
        }

        if(password.trim().length < 6) {
            this.setState({
                errorValidation: true,
                errMensaje: 'La contraseña debe tener al menos 6 dígitos'
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: true,
                });
            }, 3000);

            return;
        }

        if(password !== confirmPassword) {
              this.setState({
                errorValidation: true,
                errMensaje: 'Las contraseñas deben ser iguales'
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: true,
                });
            }, 3000);

            return;
        }

        if(!regularExp.test(email)){
            this.setState({
                errorValidation: true,
                errMensaje: 'El email es inválido'
            });

            setTimeout(() => {
                this.setState({
                    error: false,
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

            const res = await axios.post('http://192.168.0.17:3000/register', body, config);
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
                        <KeyboardAwareScrollView style={ styles.keyboardScroll } >
                            <Title>
                                Bienvenido
                            </Title>
                            
                            <Logo>
                                <Image style={styles.stretch} source={logo} />
                            </Logo>

                                <Card style={styles.card}>
                                

                                        <ErrorBox>
                                            {this.state.errorValidation ? <MessageError>{this.state.errorMessage}</MessageError> : null}
                                        </ErrorBox>

                                            <Item stackedLabel>
                                                <Label style={styles.label}>Nombre</Label>
                                        
                                                    <Input 
                                                        onChangeText={displayName => this.setState({ displayName })}
                                                        value={this.state.displayName}
                                                        style={styles.input}
                                                        autoCapitalize='none'
                                                        placeholder = "Ingrese su nombre"
                                                    />
                                            </Item>

                                            <Item stackedLabel last style={styles.label}>
                                                <Label style={styles.label}>Email</Label>
                                                    <Input 
                                                        onChangeText={email => this.setState({ email })}
                                                        value={this.state.email}
                                                        style={styles.input}
                                                        autoCapitalize='none'
                                                        placeholder = "Ingrese su email"
                                                    />
                                            </Item>
                                            
                                            <Item stackedLabel>
                                                <Label style={styles.label}>Contraseña</Label>
                                                    <Input
                                                        secureTextEntry={ true }
                                                        onChangeText={password => this.setState({ password })} 
                                                        value={this.state.password}
                                                        style={styles.input}
                                                        autoCapitalize='none'
                                                        placeholder = "Ingrese su contraseña"
                                                    />
                                            </Item >

                                            <Item stackedLabel>
                                                <Label style={styles.label}>Confirme su contraseña</Label>

                                                    <Input
                                                        secureTextEntry={ true }
                                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                                        style={styles.input}
                                                        autoCapitalize='none'
                                                        placeholder = "Ingrese su contraseña"
                                                    />
                                            </Item>

                                        <ButtonContainer>
                                            <CustomButton width='250px' title='Registrarse' onPress={  this.handleSubmit } />
                                        </ButtonContainer>

                                                      
                             

                                </Card>        
                                <LoginTextContainer>
                                            <LoginText> ¿Ya tenés cuenta? </LoginText>
                                            <SecondText onPress={() => this.props.navigation.navigate('login')} >Inicia sesión</SecondText>
                                </LoginTextContainer>                  

                        </KeyboardAwareScrollView>
                    </Contenedor>
                </LinearGradient>
            </>
        )}
}

export default RegisterScreen;