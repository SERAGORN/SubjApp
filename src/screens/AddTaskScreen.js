import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, Button } from 'react-native';
//import QueryTempl from '../gql/query'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag"
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

    state = {
        fake: [
            { lol: 1 },
            { lol: 2 }
        ]
    }


    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('otherParam', 'A Nested Details Screen'),
          headerRight: (
            <Mutation mutation={gql
                `
                    mutation createTask($title: String!, $content: String!, $userId: String!){
                        createTask (title: $title , content: $content, groupId: $userId) {
                            _id
                            title
                            content
                            subjectId
                            groupId
                        }
                    }
                `
            }>
                {(createGroup, { data }) => (
            <Button
            onPress={() => createGroup({ variables: {
                 userId:  navigation.getParam('taskGroupId', 'A Nested Details Screen'), 
                 title: navigation.getParam('taskTitle', 'A Nested Details Screen'), 
                 content: navigation.getParam('taskContent', 'A Nested Details Screen') } })}
            title="Добавить">
            </Button>
            )}
            </Mutation>
            )
        }
      }


    // static navigationOptions = ({navigation}) => {
    //     const {params = {}} = navigation.state;
    //     return {
    //         headerRight: <Button
    //                          title="Refresh"
    //                          onPress={ () => params.handleThis() } />

    //     };
    // };

    // static navigationProps = {
    //     header: ({ state }) => {
    //     return {
    //      title: state.params.myTitle
    //     }
    //    }
    //    }

    componentDidMount() {
        this.props.navigation.setParams({taskGroupId: this.props.store.current_group_id })
    }


    buttonFixedAdd = () => {
        return <View style={styles.fixedButton}>
                <Button title="lel" onPress={()=>this.props.navigation.setParams({otherParam: 'Updated!'})}></Button> 
                </View>
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
                onChangeText={(title) => this.props.navigation.setParams({taskTitle: title})}
                value={this.state.title}
                />
            </View>
        )
    }

    renderTextInputArea = () => {
        return (
            <ScrollView style={styles.textScrollContainer}>
                {this.renderTitleInput()}
                <TextInput
                placeholder="Описание"
                style={styles.textAreaInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.props.navigation.setParams({taskContent: text})}
                value={this.state.text}/>
                {this.buttonFixedAdd()}
            </ScrollView>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderActTitle()}
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
    },
    fixedButton: {
    }
});

export default AddTaskScreen