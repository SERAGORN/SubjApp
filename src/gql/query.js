import React from 'react';
import { graphql, compose, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { ScrollView, StyleSheet, View } from 'react-native';

export default class QueryTempl extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Query >
                {this.props.children}
            </Query>
        )
    }

}