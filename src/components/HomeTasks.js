import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from "graphql-tag"
import { inject, observer } from 'mobx-react'

const Dimensions = require('Dimensions');
const { height, width } = Dimensions.get('window');

@inject('store')
@observer export default class HomeTasks extends React.Component {
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

    renderCards = (data) => {
        let that = this
        let mapper = (data) => {
            return (
                data.map((row)=>{
                    return (
                        that.OneCard(row)
                    )
                })
            )
        }
        return (
            <View style={styles.cardsContainer}>
                {mapper(data)}
            </View>
        )
    }

    queryTasks = () => {
        return (
        <Query
          query={
            gql` 
                query group($_id: String!) {
                    group(_id: $_id) {
                        tasks {
                            _id
                            title
                            content
                            subjectId
                            groupId
                        }
                  }
                }
              `}
          variables={{ _id: this.props.store.current_group_id }}

        >
          {({ loading, error, data, refetch }) => {
            if (loading) return null;
            if (error) return null;
            if (data) {
                if (this.state.refreshing == true) {
                  refetch()
                  this.setState({refreshing: false})
                }
              return this.renderCards(data.group.tasks)
            }
          }}
        </Query>
        )
    }
 
    render() {
        return (
            <View style={styles.container}>
                {this.renderActTitle()}
                {this.queryTasks()}
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