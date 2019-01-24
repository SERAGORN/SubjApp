import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from 'react-native-elements'

import { Query, Mutation, ApolloProvider } from "react-apollo";
import { inject, observer } from 'mobx-react'
import gql from "graphql-tag"

@inject('store')
@observer export default class HomeCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            times_of: [
                {
                    range_time: "8:00 - 9:35"
                },
                {
                    range_time: "9:50 - 11:25"
                },
                {
                    range_time: "11:45 - 13:15"
                },
                {
                    range_time: "14:00 - 15:35"
                },
                {
                    range_time: "15:50 - 17:25"
                },
                {
                    range_time: "17:35 - 19:00"
                },
            ]
        }
    }

    parseSubj = (data) => {
        return (
            data.map((row, key) => {
                return (
                    <View style={styles.subjectRow}>
                        <Text style={styles.subjectTime}>{this.state.times_of[key].range_time}</Text>
                        <Text>{row.title}</Text>
                    </View>

                )
            })
        )
    }

    parseQl = (dayq) => {
        return (
            <Query
                query={gql`
            query group($_id: String!,$day: String!) {
                group(_id: $_id)
                    {    
                        _id
                        title
                        content
                        usersId
                        subjects(day: $day) {
                            _id
                            title
                            teacher
                            day
                            date
                            groupsId
                        }
                    }
            }
        `}
                variables={{ _id: this.props.store.current_group_id, day: this.props.day }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Text>LOAD</Text>;
                    if (error) {
                        console.log(error)
                        return <Text>{this.props.day}</Text>;
                    }
                    if (data) return this.parseSubj(data.group.subjects)
                }}
            </Query>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}

                // onPress={
                //     () => {
                //         //this.props.setRoute("cart_page", this.props.day)
                //         this.props.store.current_card_day = this.props.day
                //         //this.props.navigation.navigate('Cards')
                //     }
                //     }
                >
                    {
                        this.parseQl(this.props.day)
                    }
                </View>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
    },
    card: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: "rgb(250,250,250)"
    },
    subjectRow: {
        flex: 1,
        flexDirection: "row",
        height: 20,
        borderBottomWidth: 1,
        borderColor: "rgb(240,240,240)"
    },
    subjectTime: {
        fontSize: 12,
        width: 100,
        color: 'rgb(140,140,140)'
    },
});
