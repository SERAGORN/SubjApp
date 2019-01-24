import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import Card from './Card';
import { map } from 'async';
export default class Board extends React.Component {
    state = {
        fake: [
            {a:1},{a:1},{a:1},{a:1},{a:1},{a:1},{a:1},
        ]
    }
    header() {
        return(
            <View style={styles.header}>
                <Text style={styles.headerText}>One Board</Text>
            </View>
        )
    }

    renderCard() {
        return this.state.fake.map(row => <Card/>)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.header()}
                <View style={styles.cardContainer}>
                    <ScrollView style={styles.cardScroller}>
                        {this.renderCard()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }, 
    header: {
        backgroundColor: "rgb(240,240,240)",
        width: "100%",
        height: 60,
        justifyContent: "center",
        padding: 5
    },
    headerText: {
        fontSize: 18
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "rgb(240,240,240)",
        padding: 5,
        width: "100%",
        height: "auto"
    },
    cardScroller: {
        height: 100
    }
});