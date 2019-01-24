import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Alert,
    Modal
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { graphql, compose, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import gql_store from '../../gql/store'

import {inject, observer} from 'mobx-react'

import Carousel from 'react-native-snap-carousel';

const gtag_obj = new gql_store()
const gtag = gtag_obj.localOne()

const Dimensions = require('Dimensions');
const { height, width } = Dimensions.get('window');

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

@inject ('store')
@observer class CardScreen extends React.Component {
    static navigationOptions = {
        title: 'Cards',
    }

    constructor(props) {
        super(props)
        this.state = {
            entries: [{ title: "asd" }, { title: "dsa" }],
            data: [],
            add_task_modal: false,
            task_title: "",
            task_content: "",
            task_subject_id: ""
        }
    }

    setModalVisible(visible) {
        this.setState({ add_task_modal: visible });
    }

    addTaskModal(data, visible) {
        this.setState({
            task_subject_id: data,
            add_task_modal: visible
        })
    }


    parseSubj = ({ item, index }) => {
        let that = this

        let parseTasks = (data) => {
            return (
                data.map((row) => {
                    return (
                        <View style={styles.task_card}>
                            <Text>{row.title}</Text>
                            <Text>{row.content}</Text>
                        </View>
                    )
                })

            )
        }
        return (
            <View style={styles.slide}>
                <View style={styles.head}>
                    <Text>{item.title}</Text>
                </View>
                <Button title="Add Task" onPress={() => {
                    that.addTaskModal(item._id, true);
                }} />
                <ScrollView style={styles.tasks_scroll}>
                    {parseTasks(item.tasks)}
                </ScrollView>
            </View>
        )
    }




    dataMutation = () => {
        return (
            <Mutation mutation={gql`
            mutation createTask($subjectId: String!, $title: String!, $content: String!){
            createTask(subjectId: $subjectId, title: $title, content: $content) {
              _id,
              title,
              content
            }
            }
            `}>
                {(createTask, { data }) => (
                    <Button
                        onPress={() => {
                            this.setState({ add_task_modal: false });
                            alert(this.state.task_subject_id)
                            createTask({ variables: { subjectId: this.state.task_subject_id, title: this.state.task_title, content: this.state.task_content } });
                        }} title="ADD">
                    </Button>
                )}
            </Mutation>
        )
    }
    oneDayQuery = () => {
        return (
            <Query
                query={gql`
                query subjects($day: String!) {
                    subjects(day: $day)
                        {
                            _id
                            title
                            teacher
                            day
                            date
                            tasks {
                                _id
                                title
                                content
                              }
                        }
                }
            `}
                variables={{ day: String(this.props.store.current_card_day) }}
            >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <Text>LOAD</Text>;
                    if (error) return <Text>ERROR</Text>;
                    if (data) {
                        return (
                            <View style={styles.card}>
                                <Button title="Refresh" onPress={() => {
                                    refetch()
                                }} />
                                <Query query={GET_VISIBILITY_FILTER}>
                                    {
                                        ({ data, client }) => {
                                     
                                                if (data) {
                                                    return (
                                                        <Text>{data.visibilityFilter}</Text>
                                                    )
                                                } else {
                                            
                                            return (
                                                <View>
                                                    <Button title="Local" onClick={() => client.writeData({ data: { visibilityFilter: "kek" } })}
                                                    />
                                                </View>
                                            )
                                                }
                                        }
                                    }
                                </Query>

                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={data.subjects}
                                    renderItem={this.parseSubj}
                                    sliderWidth={width}
                                    itemWidth={width - 50}
                                />
                            </View>
                        )
                    }
                }}
            </Query>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this.oneDayQuery()}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.add_task_modal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <TouchableOpacity style={styles.modal_add_task_container} onPress={() => this.setState({ add_task_modal: false })}>
                        <View style={styles.modal_add_task}>
                            <View>

                                <FormLabel>Title</FormLabel>
                                <FormInput onChangeText={(text) => this.setState({ task_title: text })} />
                                <FormLabel>Content</FormLabel>
                                <FormInput onChangeText={(text) => this.setState({ task_content: text })} />
                                <FormValidationMessage>Error message</FormValidationMessage>
                                {this.dataMutation()}
                                <Button title="Close"
                                    onPress={() => {
                                        this.setState({ add_task_modal: false });
                                    }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        width: "100%",
        padding: 15,
        textAlign: "center"
    },

    card: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "rgb(200,200,200)"
    },
    slide: {
        flex: 1,
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "rgb(250,250,250)",
        width: "100%",
        height: "100%"
    },
    modal_add_task: {
        height: "auto",
        borderRadius: 4,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 16,
        backgroundColor: "white"
    },
    modal_add_task_container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: width,
        height: height
    },
    tasks_scroll: {
        width: "100%"
    },
    task_card: {
        width: "100%",
        margin: 5,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 4,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(140,140,140)"
    }
});
export default compose(
    graphql(gtag, {
        props: ({ data: { currentSubject } }) => ({
            currentSubject
        })
    })
)(CardScreen)