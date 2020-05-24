import React from 'react'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

const AuthStack = createStackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null
    }
  },

})

const AppStack = createStackNavigator({
  home: HomeScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'

  }
  )
)

