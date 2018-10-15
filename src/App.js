/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import firebase from 'firebase';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};

export default class App extends Component<Props> {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCt1-mBgYvNeH9Tl-9i3DEtUpr1WN_0iKA',
        authDomain: 'authentication-a7798.firebaseapp.com',
        databaseURL: 'https://authentication-a7798.firebaseio.com',
        projectId: 'authentication-a7798',
        storageBucket: 'authentication-a7798.appspot.com',
        messagingSenderId: '879779789836'
    });

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
        this.setState({ loggedIn: true });
       } else {
        this.setState({ loggedIn: false });
       }
    });
  }
  
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button whenPressed={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner spinnerSize='large' />
          </CardSection>
        );
    }  
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

