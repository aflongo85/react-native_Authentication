import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    state = { 
        email: '',
        password: '',
        error: '',
        loading: false
    };
    
    onButtonPress() {
        const { email, password } = this.state;
        
        this.setState({ 
            error: '', 
            loading: true 
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error);
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(() => {
                this.setState({ 
                    error: 'Authentication failed',
                    loading: false 
                });
            });
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner spinnerSize='large' />;
        }

        return (
            <Button whenPressed={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection >
                    <Input
                        secureTextEntry={false}
                        placeholder="user@email.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}  
                    />
                </CardSection>
                <CardSection >
                    <Input
                        secureTextEntry
                        placeholder="YourPassword!"
                        label="Password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}  
                    />
                </CardSection>
                <CardSection>
                    <Text style={styles.errorTextStyle}>
                    {this.state.error}
                    </Text>
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
   errorTextStyle: {
       fontSize: 20,
       color: 'red',
       alignSelf: 'center'
   }
};

export default LoginForm;
