import React, { Component } from 'react'
import { View, Text, TextInput, Linking } from 'react-native'
import styled from 'styled-components'
import CustomButton from '../components/CustomButton/custombutton'
import { auth, createUser } from '../firebase/config';


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
  justify-content: center;
`

const LoginText = styled.Text`
  font-size: 18px;
`

const LoginTextContainer = styled.View`
    margin-top: 45px;
    display: flex;
    flex-direction: row; 
`

const SecondText = styled.Text`
  font-size: 18px;
  font-weight: bold;
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

class RegisterScreen extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            displayName: '',
            password: '',
            confirmPassword: '',
        }
    }

    
    // Para enviar formularios, se usa onPress, y se llama en el boton, ya que no existe el tag de <form>

    handleSubmit = async event => {
        event.preventDefault()

        const { email, displayName, password, confirmPassword } = this.state

        if(password !== confirmPassword) {
            alert('Las contraseñas no son iguales. Por favor, intentalo de nuevo')
            return
        }

        const { navigation } = this.props

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            await createUser(user, { displayName })

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''

            })

            navigation.navigate('home')
        } catch (err) {
            console.log('hubo un error: ', err)
        }

    }

    render(){

        return (
            <Card>
            <Start>Bienvenido</Start>
            <CardForm>
                <Span>Nombre de usuario</Span>
                <Input onChangeText={displayName => this.setState({ displayName })} value={this.state.displayName} />
                <Span>Email</Span>
                <Input onChangeText={email => this.setState({ email })} value={this.state.email} />
                <Span>Contraseña</Span>
                <Input secureTextEntry={ true } onChangeText={password => this.setState({ password })} value={this.state.password}  />
                <Span>Confirmar contraseña</Span>
                <Input secureTextEntry={ true } onChangeText={confirmPassword => this.setState({ confirmPassword })} type='password' value={this.state.confirmPassword} />

               
            </CardForm> 

            <ButtonContainer>
                <CustomButton width='250px' title='Registrarse' onPress={  this.handleSubmit } />
            </ButtonContainer>

            <LoginTextContainer>
            <LoginText> ¿Ya tenés cuenta?  </LoginText>
            <SecondText onPress={() => this.props.navigation.navigate('login')} >Inicia sesión</SecondText>
            </LoginTextContainer>
        </Card>
        )
    }
}

export default RegisterScreen