import React, { Component } from 'react';

// ! Componentes
import { Item, Input, Label } from 'native-base';
import { Animated, Image, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoadingScreen from './LoadingScreen';
import CustomButton from '../components/CustomButton/custombutton';
import { LinearGradient } from "expo-linear-gradient";
import * as Font from 'expo-font';
import { Card } from 'react-native-paper';



// ! Styles
import styled from 'styled-components';
import logo from '../assets/images/whatsapp.png';

// ! Axios
import axios from 'axios';

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

    card: {
        paddingTop: 5,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    }
});
  

const ButtonContainer = styled.View`
  margin-top: 15px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
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

const Contenedor = styled.View`
  width: 100% ;
  height: 100%;
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

    async componentWillMount(){
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
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
                })
            }, 3000);

            return;
        }


        if(!regularExp.test(email)){
            this.setState({
                errorValidation: true,
                errorMessage: 'El email es inválido'
            });

            setTimeout(() => {
                this.setState({
                    errorValidation: false,
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

            const res = await axios.post('http://192.168.100.14:3000/login', body, config)

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
                <>
                <LinearGradient colors={['#1D2671', '#C33764']}>
                    <Animated.View style={{
                        opacity: this.state.LogoAnime,
                        top: this.state.LogoAnime.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10]
                        })
                    }}>

                        <Contenedor>
                            <KeyboardAwareScrollView>

                                <Title>
                                    Bienvenido
                                </Title>
                                <Logo>
                                    <Image style={styles.stretch} source={logo} />
                                </Logo>


                                <Card  style={styles.card}>

                                    <ErrorBox>
                                        {this.state.errorValidation ? <MessageError>{this.state.errorMessage}</MessageError> : null}
                                    </ErrorBox>


                                        <Item stackedLabel>
                                            <Label style={styles.label}>Email</Label>
                                            <Input 
                                                placeholder="Ingrese un correo" 
                                                style={styles.input}
                                                onChangeText={this.handleEmail}
                                                autoCapitalize='none'
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
                                                autoCapitalize='none'
                                                value={this.state.password}    
                                            />
                                        </Item>
                                    
                                        <ButtonContainer>
                                            <CustomButton title='Iniciar sesión' onPress={ this.handleSubmit } />
                                            <CustomButton title='Registrarse' onPress={() => navigation.navigate('register')} />
                                        </ButtonContainer>
                                
                                </Card>

                            </KeyboardAwareScrollView>
                        </Contenedor>
                    </Animated.View>
                </LinearGradient>
                </>
            );
        }
}
}

