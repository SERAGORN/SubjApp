import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class Card extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>User</Text>
                </View>
                <View style={styles.content}>
                    <Text>Теперь это общедоступная доска. Ее администратор может изменить настройки доступа в любой момен</Text>
                </View>
                <View style={styles.footer}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 4,
        marginBottom: 4
    },
    content: {

    },
    footer: {
        height: 50
    }
});