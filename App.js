import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';

import {  createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/LoginScreen';

import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';

import { Provider } from 'react-redux';

import { store } from './redux/store';

import chatScreen from './screens/chatScreen';

import ConfigScreen from './screens/ConfigScreen';

import DrawerScreen from './components/DrawerComponents/DrawerContent';



const App = () => {
  // ! Login / Register Screen
  const AuthStack = createStackNavigator({
    login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false
      }
    },

  })

  const ConfigStack = createStackNavigator({
    config: {
      screen: ConfigScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    
  })

  // ! Menu Home Screen
  const AppStack = createStackNavigator({
    home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
      },
    chat:{
      screen:chatScreen,
      navigationOptions: {
        headerShown: false
      }
    }


  })

  // ! Drawer Component
  const DrawerNavigator =  createDrawerNavigator({
    home: AppStack,
    config: ConfigStack,
    auth: AuthStack,
  }, {
    initialRouteName: 'home',
    contentComponent: props => <DrawerScreen {...props}/>
  })

  // ! Todas las rutas en el componente principal
  const AppContainer = createAppContainer(
    createSwitchNavigator({
      Auth: AuthStack,
      App: AppStack,
      Drawer: DrawerNavigator
    },
    {
      initialRouteName: 'Auth',
      navigationOptions: {
        gesturesEnabled: false,

      }

    })
  )

  return(
    <Provider store={store} >
        <AppContainer />
    </Provider>
  )
}

export default App