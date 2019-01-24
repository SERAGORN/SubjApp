import React from 'react'

import { graphql, compose, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { View, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Icon, Header, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

 

    render() {
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

