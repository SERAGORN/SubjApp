import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class FeedUsers extends React.Component {
    state = {
        users: [
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            },
            {
                firstname: "Asdsd",
                lastname: "Sdakdams",
            }
        ]
    }

    oneUser = (row) => {
        return (
            <View style={styles.userContainer}>
                <TouchableOpacity style={styles.userAvatar}
                onPress={() => this.props.navigate.navigate('ChatScreen')}
                >
                    <Text>{row.firstname[0]} {row.lastname[0]}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderUsers = () => {
        return (
            <ScrollView style={styles.scrollHorizontal} horizontal>
                {this.state.users.map(row => {
                    return this.oneUser(row)
                })}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderUsers()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70
    },
    scrollHorizontal: {
        flex: 1
    },
    userContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgb(240,240,240)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})