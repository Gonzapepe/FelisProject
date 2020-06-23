import React from 'react'
import { StyleSheet } from 'react-native';
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

const App = () => {

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
        headerShown: false
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

  return(
    <Provider store={store} >
        <AppContainer />
    </Provider>
  )
}

export default App