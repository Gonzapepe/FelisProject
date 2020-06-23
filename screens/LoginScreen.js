import React, { Component } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/config'
import CustomButton from '../components/CustomButton/custombutton'
import { LinearGradient } from "expo-linear-gradient";
import { Input } from 'react-native-elements';


const Start = styled.Text`
    font-weight: bold;
    font-size: 36px;
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
            email:'',
            password:'',
            error: false,
            errorValidation: false,
            errorMessage: ''
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        try {
            // ! Validacion
            if(email.trim() === '' || password.trim() === ''){
                this.setState({
                    errorValidation: true,
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
                    errorMessage: 'La contraseña debe tener al menos 6 dígitos',
                });
                
                setTimeout(() => {
                    this.setState({
                        errorMessage: '',
                    })  
                }, 3000);

                return;
            }
            // ! Envio de datos
            await auth.signInWithEmailAndPassword(email, password);

            // ! Reseteo de formulario
            this.setState({
                email:'',
                password:'',
                error: false,
                errorMessage: null
            });

            this.props.navigation.navigate('home');

        } catch (err) {
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

    return (
        <LinearGradient colors={['#005AA7', '#FFFDE4']}>
            <Card>
                <Start>Bienvenido</Start>

                <ErrorBox>
                    {this.state.errorValidation ? <MessageError>Complete todos los campos correctamente</MessageError> : null}
                    {this.state.error ? <MessageError>Los datos ingresados no son correctos</MessageError> : null}
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
                        errorMessage={this.state.errorMessage}     
                    />
                    
                <ButtonContainer>
                    <CustomButton title='Iniciar sesión' onPress={ this.handleSubmit } />
                    <CustomButton title='Registrarse' onPress={() => navigation.navigate('register')} />
                </ButtonContainer>


            </Card>
        </LinearGradient>
    );
}
}

