import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, Button } from 'react-native';
//import QueryTempl from '../gql/query'
import { Query } from 'react-apollo';
import { FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements'
import { compose, graphql } from 'react-apollo';
import { inject, observer } from 'mobx-react'
import Board from '../components/Board'
import Carousel from 'react-native-snap-carousel';
import { throwServerError } from 'apollo-link-http-common';

const Dimensions = require('Dimensions');
const { height, width } = Dimensions.get('window');
//import { getPageNameQuery, getPageNameOptions } from '../gql/getPageName';
@inject('store')
@observer class AddTaskScreen extends React.Component {
    static navigationOptions = {
        title: 'Добавить',
        headerRight: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Добавить"
            />
        )
    };

    state = {
        fake: [
            { lol: 1 },
            { lol: 2 }
        ]
    }

    renderActTitle = () => {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    
                </Text>
            </View>
        )
    }

    renderTitleInput = () => {
        return (
            <View style={styles.titleInputContainer}>
                <TextInput
                placeholder="Оглавление"
                style={styles.titleInput}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                />
            </View>
        )
    }

    renderTextInputArea = () => {
        return (
            <ScrollView style={styles.textScrollContainer}>
                <TextInput
                placeholder="Описание"
                style={styles.textAreaInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}/>
            </ScrollView>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderActTitle()}
                {this.renderTitleInput()}
                {this.renderTextInputArea()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    slide: {
        flex: 1
    },
    titleContainer: {
        padding: 6,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    textAreaInput: {
        maxHeight: 200,
        padding: 9
    },
    textScrollContainer: {
        height: 200,
    },
    titleInput: {
        fontSize: 16,
        fontWeight: "bold"
    },
    titleInputContainer: {
        padding: 9
    }
});

export default AddTaskScreen