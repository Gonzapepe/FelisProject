import React, { Component } from 'react';


import LoadingScreen from './LoadingScreen';
import { View, Animated } from 'react-native';

import styled from 'styled-components';
import CustomButton from '../components/CustomButton/custombutton';
import { LinearGradient } from "expo-linear-gradient";
import { Input } from 'react-native-elements';
import axios from 'axios';

import io from 'socket.io-client'

const Start = styled.Text`
    font-weight: bold;
    font-size: 36px;
    color: white;
`;

//

const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorBox = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const MessageError = styled.Text`
  text-align: center;
  color: red;
  font-size: 15px;
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

export default class LoginScreen extends Component {
    constructor(){
        super()

        this.state = {
            LogoAnime: new Animated.Value(0),
            email:'',
            password:'',
            loading: true,
            error: false,
            errorValidation: false,
            errorMessage: '',
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {


        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3500);
    }

    componentWillUpdate(){
        Animated.parallel([
            Animated.spring(this.state.LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
            })
        ]).start()
    }

    // ! handleChange email
    handleEmail = (text) => {
        this.setState({
            email: text,
        });
    }

    // ! handleChange password
    handlePassword = (text) => {
        this.setState({
            password: text,
        });
    }

    // ! Enviar la informacion
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        const regularExp = new RegExp("@");

        // ! Validacion
        if(email.trim() === '' || password.trim() === ''){
            this.setState({
                errorValidation: true,
                errorMessage: 'Rellene los campos correctamente',
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: false,
                })
            }, 3000);

            return;
         }

        // ! Validacion password
        if(password.trim().length < 6 ){
            this.setState({
                errorValidation: true,
                errorMessage: 'La contraseña debe tener al menos 6 dígitos',
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: false,
                    errorMessage: '',
                })
            }, 3000);

            return;
        }


        if(!regularExp.test(email)){
            this.setState({
                errorValidation: true,
                errorMessage: 'Email inválido'
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: false,
                    errorMessage: ''
                });
            }, 3000);

            return;
        }


        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify({ email, password });

            const res = await axios.post('http://192.168.0.17:3000/login', body, config)

            // ! Reseteo de formulario
            this.setState({
                email:'',
                password:'',
                error: false,
                errorMessage: null
            });

            this.props.navigation.navigate('home', {token: res.data.token});

        } catch (err) {
            alert('No existe el usuario ingresado', err);

            // ! Error
            this.setState({
                error: true,
            });


            setTimeout(() => {
                this.setState({
                    error: false,
                });
            }, 2500);
        }


    }

    render() {
        const { navigation } = this.props

        if(this.state.loading) {
            return (
                <LoadingScreen />
            )

        } else {
            return (
                <LinearGradient colors={['#1D2671', '#C33764']}>
                    <Animated.View style={{
                        opacity: this.state.LogoAnime,
                        top: this.state.LogoAnime.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10]
                        })
                    }}>

                    <Card>
                        <Start>Bienvenido</Start>

                            <ErrorBox>
                                {this.state.errorValidation ? <MessageError>{this.state.errorMessage}</MessageError> : null}
                            </ErrorBox>


                            <Input
                                inputContainerStyle={{
                                    borderBottomColor: 'black'
                                }}
                                inputStyle={{
                                    color: 'black'
                                }}
                                onChangeText={
                                    this.handleEmail
                                }
                                value={this.state.email}
                                placeholder = "Inserte su email"
                                label='Email'
                                labelStyle={{
                                    color: 'white'
                                }}
                                keyboardType='email-address'
                            />

                            <Input
                                inputContainerStyle={{
                                    borderBottomColor: 'black'
                                }}
                                secureTextEntry={true}
                                onChangeText={this.handlePassword}
                                value={this.state.password}
                                placeholder = "Inserte su contraseña"
                                label='Contraseña'
                                labelStyle={{
                                    color: 'white'
                                }}
                            />

                        <ButtonContainer>
                            <CustomButton title='Iniciar sesión' onPress={ this.handleSubmit } />
                            <CustomButton title='Registrarse' onPress={() => navigation.navigate('register')} />
                        </ButtonContainer>


                    </Card>
                    </Animated.View>
                </LinearGradient>
            );
        }
}
}

