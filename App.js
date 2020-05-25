import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import Test from './components/DrawerComponents/Test'
import Button from './components/DrawerComponents/Button'

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

const TestStack = createStackNavigator({
  test: { 
    screen: Test,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button navigation={navigation} />,
      title: null
    })
  }
})

const AppStack = createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button navigation={navigation} />,
      title: null
    })
    }

  
})

const DrawerNavigator = createDrawerNavigator({
  home: AppStack,
  test: TestStack,
  //signOut: 
}, {
  initialRouteName: 'home',
})

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: AppStack,
    Test: TestStack,
    Drawer: DrawerNavigator
  },
  {
    initialRouteName: 'Auth',
    navigationOptions: {
      gesturesEnabled: false,
     
    }

  }
  )
)

