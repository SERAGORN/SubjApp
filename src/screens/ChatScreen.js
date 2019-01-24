import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Чат',
    };

    renderMain = () => {
        return (
            <View style={styles.mainMessages}>

            </View>
        )
    }

    renderInput = () => {
        return (
            <View style={styles.inputContainer}>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderMain()}
                {this.renderInput()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainMessages: {
        flex: 1
    },
    inputContainer: {
        width: '100%',
        height: 60,
        backgroundColor: 'black'
    }
})