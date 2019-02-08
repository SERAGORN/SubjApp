import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import LoginScreen from './src/screens/LoginScreen'
import { ApolloProvider } from 'react-apollo'
import {InMemoryCache} from 'apollo-cache-inmemory'
import FadeAnimation from './src/components/FadeAnimation'
import Client from './src/gql/Client'

import Store from './src/store'
import {Provider} from 'mobx-react'
const store = new Store()
const stores = store.routerFunc()

// This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache();



export default class App extends React.Component {
  constructor (props) {
    super(props)
    console.disableYellowBox = true;
    this.state = {
    isLoadingComplete: false,      
    login: false
    }
  }


  componentDidMount() {
    const val = AsyncStorage.getItem('login')
    let obj = JSON.stringify(val)
    console.log(obj)
    if (obj.login == "true") {
      this.setState({login: true})  
    }
  }

  loginSubmit = (data) => {
    this.setState({login: true,login_id: data})
  }

  renderLogin = () => {
      return (
        <AppNavigator />
      ) 
  }

  AppRender () {
    return (
    <ApolloProvider client={Client}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <FadeAnimation style={{width: "100%", height: "100%", backgroundColor: 'white'}}>
          {this.renderLogin()}
        </FadeAnimation>
      </View>
    </ApolloProvider>
    );
  }

  render() {
    return (
      <Provider {...stores}>
        {this.AppRender()}
      </Provider>
    )
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});