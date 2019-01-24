import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Picker, PanResponder, Animated, Dimensions } from 'react-native';

import { Icon, Header, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import gql from "graphql-tag"
import { Query, Mutation, compose, graphql } from 'react-apollo'

import { inject, observer } from 'mobx-react'
//import CardPage from './home/CardScreen'
import HomeCard from '../components/HomeCard'

@inject('store')
@observer export default class InviteScreen extends React.Component {
    static navigationOptions = {
        title: 'Invite',
    };
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    inviteButton = (id) => {
        return (
            <Mutation mutation={gql`
                mutation updateGroup($_id: String!, $userId: String!){
                updateGroup(_id: $_id, userId: $userId) {
                    _id
                    title
                    content
                    usersId
                }
                }
                `}>
                {(updateGroup, { data }) => (
                    <Button
                        onPress={() => {
                            updateGroup({ variables: { userId: id, _id: this.props.store.current_group_id } });
                        }} title="Invite">
                    </Button>
                )}
            </Mutation>
        )

    }

    renderUsersList = (data) => {
        return (
            <ScrollView>
                <Text>Users</Text>
                {
                    data.users.map((row) => {
                        return (
                            <TouchableOpacity style={styles.dropdownTouch} >
                                <View>
                                    <Text>{row.first_name}</Text>
                                    <Text>{row.last_name}</Text>
                                </View>
                                {this.inviteButton(row._id)}
                                <Button
                                    buttonStyle={{ width: 100, height: 40, backgroundColor: "#2f95dc" }}
                                    title="Invite"
                                    onPress={() => {
                                        alert("invite")
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }

    queryUsers = () => {
        return (
            <Query
                query={
                    gql` 
                    query users {
                        users {
                            _id
                            first_name
                            last_name
                            groupId
                            login
                            password
                        }
                    }
              `}
            >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <Text>asd</Text>;
                    if (error) return <Text>dsa</Text>;
                    if (data) {
                        return this.renderUsersList(data)
                    }
                }
                }
            </Query>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.queryUsers()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdownTouch: {
        width: "100%",
        height: 60,
        justifyContent: "space-between",
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "rgb(200,200,200)",
    },
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#fff',
    },
});
