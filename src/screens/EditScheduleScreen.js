import React from 'react';
import { Modal, RefreshControl, FlatList, ScrollView, StyleSheet, 
    Text, TouchableOpacity, View, Picker, Dimensions, KeyboardAvoidingView } from 'react-native';

import { Icon, Header, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { inject, observer } from 'mobx-react'
//import CardPage from './home/CardScreen'
import HomeCard from '../components/HomeCard'

import { Query, Mutation } from 'react-apollo'
import gql from "graphql-tag";


@inject('store')
@observer export default class EditSchedule extends React.Component {
    static navigationOptions = {
        title: 'Schedule',
        headerRight: (
            <TouchableOpacity style={{ width: 50 }} onPress={() => null}>
                <Text>OK</Text>
            </TouchableOpacity>
        ),
    };
    state = {
        isModalOptionsVisible: false,
        forms:
            [{ time: "8:00-9:35", title: null, teacher: null, key: "1" },
            { time: "9:50-11:25", title: null, teacher: null, key: "2" },
            { time: "11:35-13:15", title: null, teacher: null, key: "3" },
            { time: "14:00-15:35", title: null, teacher: null, key: "4" },
            { time: "15:50-17:25", title: null, teacher: null, key: "5" },
            { time: "17:35-19:00", title: null, teacher: null, key: "6" }],
        selected_time: { time: "0", key: "0" }

    }



    addGroup() {
        return (
            <Mutation mutation={gql`
      mutation createGroup($title: String!, $content: String!, $userId: String!){
        createGroup(title: $title, content: $content, userId: $userId) {
          _id
          title
          content
          usersId
        }
      }
      `}>
                {(createGroup, { data }) => (
                    <Button
                        onPress={() => {
                            this.setState({
                                isModalVisible: false,
                                add_task_modal: false,
                                refreshing: true
                            });
                            if (data) {
                                this.props.store.new_group = data
                            }
                            createGroup({ variables: { userId: this.props.store.main_data.user._id, title: this.state.task_title, content: this.state.task_content } });
                        }} title="ADD">
                    </Button>
                )}
            </Mutation>
        )
    }

    addSubject = () => {
        return (
            <Button
                buttonStyle={{ width: 100, height: 40, backgroundColor: "#2f95dc" }}
                title="add"
                onPress={() => {
                    this.setState({ isModalOptionsVisible: true })
                }}
            />
        )
    }

    mutateSubject = () => {
        return (
            <Mutation mutation={gql`
          mutation createSubject($title: String!, $teacher: String!, $groupId: String!, $date: String!, $time: String!){
            createSubject(title: $title, teacher: $teacher, groupId: $groupId, date: $date, time: $time) {
                _id
                title
                teacher
                day
                date
                groupsId
            }
          }
          `}>
                {(createSubject, { data }) => (
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isModalOptionsVisible: false
                            });
                            createSubject({
                                variables: {
                                    groupId: this.props.store.current_group_id, title: this.state.modal_edit_title,
                                    teacher: this.state.modal_edit_teacher, date: this.props.store.current_day_to_edit,
                                    time: this.state.selected_time.key
                                }
                            });
                        }} title="ADD">
                        <Text>Add</Text>
                    </TouchableOpacity>
                )}
            </Mutation>
        )
    }

    formRender = (data) => {
        if (data)
            return [
                <View style={styles.subject_row}>
                    <View style={{ width: 100 }}>
                        <FormLabel>Time</FormLabel>
                    </View>
                    <View style={styles.one_cell_form}>
                        <FormLabel>Subject Name</FormLabel>
                    </View>
                    <View>
                        <FormLabel>Teacher</FormLabel>
                    </View>
                </View>
                ,
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.subject_row}>
                                <KeyboardAvoidingView style={styles.subject_row} behavior="padding" enabled>
                                    <View style={styles.time_cell}>
                                        <Text style={styles.subjectTime}>{item.date}</Text>
                                    </View>
                                    <View style={styles.one_cell_form}>
                                        <FormInput placeholder="title" onChangeText={(data) => this.setState({ modal_edit_title: data })} />
                                    </View>
                                    <View>
                                        <FormInput placeholder="teacher" onChangeText={(data) => this.setState({ modal_edit_teacher: data })} />
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        )
                    }}
                />
            ]
    }

    querySubjects = () => {
        return (
            <Query
                query={
                    gql` 
                query group($_id: String!, $day: String!) {
                    group(_id: $_id) {
                        _id
                        subjects(day: $day) {
                            _id
                            title
                            teacher
                            day
                            date
                            groupsId
                        }
                    }
                }
            `}
                variables={{ _id: this.props.store.current_group_id, day: this.props.store.current_day_to_edit }}

            >
                {({ loading, error, data, refetch }) => {
                    if (loading) return null;
                    if (error) return null;
                    if (data) {
                        return (
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={() => {
                                            refetch()
                                        }}
                                    />
                                }
                            >
                                {this.formRender(data.group.subjects)}
                                <Text>{JSON.stringify(data.group.subjects)}</Text>
                                {this.addSubject()}
                            </ScrollView>
                        )
                    }
                }}
            </Query>
        )
    }


    addSubjectModalRender = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalOptionsVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <TouchableOpacity style={[styles.optionCloseView, { height: this.props.store.dim_height, width: this.props.store.dim_width }]} onPress={() => this.setState({ isModalOptionsVisible: false })}>
                    <TouchableOpacity style={styles.modal_add_task} onPress={() => null}>
                        <View>
                            <Picker
                            selectedValue={this.state.language}
                            style={{ height: 250, width: 100 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue}, ()=> alert(itemValue))}>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                            <Picker
                                selectedValue={this.state.selected_time}
                                style={{ height: 300, width: 250 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selected_time: itemValue })}>
                                {this.state.forms.map(row => {
                                    return (
                                        <Picker.Item label={row.time} value={row} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style={styles.subjInput} >
                            <FormInput placeholder="title" onChangeText={(data) => this.setState({ modal_edit_title: data })} />
                        </View>
                        <View style={styles.subjInput}>
                            <FormInput placeholder="teacher" onChangeText={(data) => this.setState({ modal_edit_teacher: data })} />
                        </View>
                        {/* <Text>{JSON.stringify({
                            variables: {
                                groupId: this.props.store.current_group_id, title: this.state.modal_edit_title,
                                teacher: this.state.modal_edit_teacher, date: this.props.store.current_day_to_edit,
                                time: this.state.selected_time.key
                            }
                        })}</Text> */}
                        <View>
                            {this.mutateSubject()}
                            <TouchableOpacity style={styles.optionButton}
                                onPress={() => {
                                    this.setState({ isModalOptionsVisible: false });
                                }}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>

            </Modal>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this.addSubjectModalRender()}
                <ScrollView>
                    {this.querySubjects()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subjInput: {
        width: 200
    },
    optionButton: {
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    optionCloseView: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    modal_add_task: {
        maxWidth: 300,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        borderRadius: 4,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 16,
        backgroundColor: "white"
    },
    ok_button: {
        width: 100
    },
    subjectTime: {
        fontSize: 12,
        width: 100,
        paddingTop: 16,
        paddingLeft: 20,
        color: 'rgb(140,140,140)',
    },
    time_cell: {
        width: 100,
        height: 50,
        paddingBottom: 10,
        alignItems: 'center',
    },
    one_cell_form: {
        width: (Dimensions.get('window').width - 100) / 2,
    },
    subject_row: {
        flex: 1,
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#fff',
    },
});
