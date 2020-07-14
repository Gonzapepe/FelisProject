import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Test from './components/DrawerComponents/Test'
import Button from './components/DrawerComponents/Button'
import DrawerContent from './components/DrawerComponents/DrawerContent'
import chatScreen from './screens/chatScreen'

import LoadingScreen from './screens/LoadingScreen';
import ConfigScreen from './screens/ConfigScreen'


const App = () => {

  const LoadingStack = createStackNavigator({
    loading: {
      screen: LoadingScreen,
      navigationOptions: {
        headerShown: false
      }
    },
  })


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

  const TestStack = createStackNavigator({
    test: {
      screen: Test,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => <Button navigation={navigation} />,
        title: null

      })
    }
  })

  const ConfigStack = createStackNavigator({
    config: {
      screen: ConfigScreen,
    }
  })

  const AppStack = createStackNavigator({
    home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>  <Button navigation={navigation} />,
        title: null
      })
      },
    chat:{
      screen:chatScreen,
      navigationOptions: ({navigation}) =>({
        headerLeft: ()=><Button navigation={navigation} />,
        title: null
      })
    }


  })


  const DrawerNavigator = createDrawerNavigator({
    home: AppStack,
    test: TestStack,
    config: ConfigStack
    //signOut: SignOut
  }, {
    initialRouteName: 'home',
    contentComponent: props => <DrawerContent {...props} />
  })

  const AppContainer = createAppContainer(
    createSwitchNavigator({
      Auth: AuthStack,
      App: AppStack,
      Test: TestStack,
      Config: ConfigStack,
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