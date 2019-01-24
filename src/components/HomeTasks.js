import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

const Dimensions = require('Dimensions');
const { height, width } = Dimensions.get('window');

export default class HomeTasks extends React.Component {
    state = {
        fake: [
            {
                title:"Задания по Математике",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"Сдать за до Завтра",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"Заливаем Тут",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"Сдатоь задачи",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"Работаем по этим",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"Кик юзера",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            },
            {
                title:"ПОСЛЕДНИЙ СРОК СДАТЬ ДО КОНЦА НЕДЕЛИ",
                content: "Запретить гражданам покупать криптовалюту.Ограничить покупку от 100 тыс. рублей или от 600 тыс., точно еще не решили."
            }
        ]
    }

    renderActTitle = () => {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    Актуальное
                </Text>
            </View>
        )
    }

    OneCard = row => {
        return (
            <View style={styles.oneCardContainer}>
                <View style={styles.oneCardBody}>
                    <View style={styles.oneCardTitleContainer}>
                        <Text style={styles.oneCardTitleText}>{row.title}</Text>
                    </View>
                    <View style={styles.oneCardContentContainer}>
                        <Text>
                            {row.content}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderCards = () => {
        let that = this
        let mapper = () => {
            return (
                that.state.fake.map((row)=>{
                    return (
                        that.OneCard(row)
                    )
                })
            )
        }
        return (
            <View style={styles.cardsContainer}>
                {mapper()}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderActTitle()}
                {this.renderCards()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        padding: 6,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    cardsContainer: {
        flex: 1,
        flexDirection: "column"
    },
    oneCardContainer: {
        width: "100%",
        height: 150,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    oneCardBody: {
        flex: 1,
        backgroundColor: "rgb(240,240,240)"
    },
    oneCardTitleContainer: {
        padding: 6,
    },
    oneCardTitleText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    oneCardContentContainer: {
        padding: 6,
    },
    oneCardContentText: {
        
    }
});