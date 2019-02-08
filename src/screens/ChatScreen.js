import React from 'react'
import { Text, ScrollView, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

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
                <View style={styles.inputSelfContainer}>
                    <TextInput placeholder="Введите сообщение ..." style={styles.inputSelf}></TextInput>
                </View>
                <TouchableOpacity style={styles.sendIcon}>
                    <Icon
                        name={'send'}
                        size={26}
                        color={'#007AFF'}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={64} behavior="padding" enabled>
                {this.renderMain()}
                {this.renderInput()}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainMessages: {
        flex: 1
    },
    inputContainer: {
        width: '100%',
        minHeight: 50,
        backgroundColor: 'rgb(250,250,250)',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row'
    },
    inputSelfContainer: {
        paddingRight: 16,
        flex: 1,
        paddingLeft: 16,
    },
    inputSelf: {
        width: "100%",
        fontSize: 19
    },
    sendIcon: {
        marginRight:16
    }
})