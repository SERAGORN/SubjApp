import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header, Text, Button, FormLabel, Input, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";


const LOGIN_QUERY = gql`query 
user($login: String!, $password: String!) {
    user(login: $login, password: $password) {
        _id
        first_name
        last_name
        groupId
        login
        password
        groups {
        _id
        title
        content
        usersId
        }
    }
}`
const REG_MUTATION = gql`mutation 
createUser($first_name: String!, $last_name: String!, $login: String!, $password: String!){
    createUser(first_name: $first_name, last_name: $last_name, login: $login, password: $password) {
        _id
        first_name
        last_name
        groupId
        login
        password
    }
}  `

@inject('store')
@observer export default class LoginScreen extends React.Component {

    state = {
        login: 1,
        query_lock: 0,
        login_login_val: "123",
        login_pass_val: "123"
    }

    setLoginData = (data) => {
        this.props.loginSubmit(data)
    }

    loginQuery = () => {
        if (this.state.query_lock == 1) {
            return (
                <Query
                    query={LOGIN_QUERY}
                    variables={{ login: this.state.login_login_val, password: this.state.login_pass_val }}
                >
                    {({ loading, error, data, refetch }) => {
                        if (loading) return null;
                        if (error) return (
                        <View style={{position: "absolute", bottom: 0, left: 0}}><Text>ERROR</Text></View>
                        );
                        if (data) {
                            this.props.store.main_data = data
                            this.setState({ query_lock: 0 }, () => this.setLoginData(data.user._id))
                            return null
                        }
                    }}
                </Query>
            )
        }
    }

    regMutation = () => {
        return(
            <Mutation mutation={REG_MUTATION}>
                {(createUser, { data }) => (
                    <Button  buttonStyle={styles.logButton}
                        onPress={() => {
                            if (data) {
                                this.props.store.new_group = data 
                            }
                            createUser({ variables: { first_name: this.state.reg_first_val, last_name: this.state.reg_last_val, login: this.state.reg_login_val, password: this.state.reg_pass_val } });
                        }} title="SUBMIT">
                    </Button>
                )}
            </Mutation>
        )
    }

    renderReg() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{flex: 1, justifyContent: "flex-end", alignContent:"center"}}>
                    <FormInput placeholder="First Name"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    onChangeText={(text) => this.setState({ reg_first_val: text })} />
                    <FormInput  placeholder="Last Name"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    onChangeText={(text) => this.setState({ reg_last_val: text })} />
                    <FormInput  placeholder="Login"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    onChangeText={(text) => this.setState({ reg_login_val: text })} />
                    <FormInput  placeholder="Password"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    onChangeText={(text) => this.setState({ reg_pass_val: text })} />
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignContent:"center"}}>
                    {this.regMutation()}
                    <Button title="BACK" buttonStyle={styles.logButton} onPress={() => this.setState({ login: 1 })} />
                </View>
            </KeyboardAvoidingView>
        )
    }

    mainRender() {
        if (this.state.login == 1) {
            return (
                this.renderLogin()
            )
        } else {
            return (
                this.renderReg()
            )
        }
    }

    renderLogin() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{flex: 1, justifyContent: "flex-end", alignContent:"center"}}>
                    <FormInput placeholder="Username"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    onChangeText={(text) => this.setState({ login_login_val: text })}/>
                    <FormInput placeholder="Password"
                    containerStyle={styles.inputContainerForm} inputContainerStyle={styles.inputForm} 
                    secureTextEntry={true} onChangeText={(text) => this.setState({ login_pass_val: text })} />
                </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignContent:"center"}}>
                        <Button
                            containerStyle={{ marginTop: 20 }}
                            buttonStyle={styles.logButton}
                            titleStyle={{ color: 'black' }}
                            onPress={() => this.setState({ query_lock: 1 })}
                            title='Login'
                        />
                        <Button
                            containerStyle={{ marginTop: 20 }}
                            titleStyle={{ color: 'black' }}
                            buttonStyle={styles.logButton}
                            onPress={() => this.setState({ login: 2 })}
                            title='Register'
                        />
                    </View>
            </KeyboardAvoidingView>
        )
    }

    render() {
        return [
            this.mainRender(),
            this.loginQuery()
        ]
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logButton: {
        borderRadius: 16,
        width: 135,
        
    },
    inputContainerForm: {
        width: 300,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 15,
        borderBottomWidth: 0,
        marginBottom: 16,
        backgroundColor: "rgb(240,240,240)"
    }
})

