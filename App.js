import React from 'react'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

const AuthStack = createStackNavigator({
  login: LoginScreen,
  register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }
  )
)

