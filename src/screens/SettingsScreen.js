import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl
} from 'react-native';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, ListItem } from 'react-native-elements'

import { inject, observer } from 'mobx-react'

import { Query, Mutation} from 'react-apollo'
import gql from "graphql-tag"

@inject('store')
@observer export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  state = {
    main_data: null,
    isModalVisible: false,
    refreshing: false,
    current_group_id: null,
    isModalOptionsVisible: false
  }

  componentDidMount() {
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  queryRooms = (data) => {
    if (data.user.groups) {
      const groups = data.user.groups
      return (
        <View>
          {groups.map((row, key) => {
            return (
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Room', { title: "row.title" })
                  this.props.store.current_group_id = row._id
                }
                }
                onLongPress = {()=> {
                  this.setState({
                    current_group_id: row._id,
                    isModalOptionsVisible: true
                  })
                }}
                >
                  <ListItem
                    key={key}
                    title={row.title}
                    subtitle={row.content}
                  />
                </TouchableOpacity>
            )
          })}
        </View>
      )
    }
  }

  queryGroup = () => {
      return (
        <Query
          query={
            gql` 
                query user($_id: String!) {
                  user(_id: $_id) {
                    _id
                    first_name
                    last_name
                    groupId
                    login
                    password
                    groups {
                      _id
                      title
                      content
                      usersId
                    }
                  }
                }
              `}
          variables={{ _id: this.props.store.main_data.user._id }}

        >
          {({ loading, error, data, refetch }) => {
            if (loading) return null;
            if (error) return null;
            if (data) {
                if (this.state.refreshing == true) {
                  refetch()
                  this.setState({refreshing: false})
                }
              return (
                <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={()=>{
                       refetch()
                    }}
                  />
                }
              >
                {this.queryRooms(data)}
              </ScrollView>
              )
            }
          }}
        </Query>
      )
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

  modalFormAdd = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity style={[styles.modal_add_task_container, {height: this.props.store.dim_height, width: this.props.store.dim_width}]} onPress={() => this.setState({ isModalVisible: false })}>
          <View style={styles.modal_add_task}>
            <View>
              <FormLabel>Title</FormLabel>
              <FormInput onChangeText={(text) => this.setState({ task_title: text })} />
              <FormLabel>Content</FormLabel>
              <FormInput onChangeText={(text) => this.setState({ task_content: text })} />
              <FormValidationMessage>Error message</FormValidationMessage>
              {this.addGroup()}
              <Button title="Close"
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  deleteGroup = () => {
    return(
      <Mutation mutation={gql`
      mutation deleteGroup($_id: String!){
        deleteGroup(_id: $_id) {
          _id
          title
          content
          usersId
        }
      }
      `}>
        {(deleteGroup, { data }) => (
          <TouchableOpacity style = {styles.optionButton}
            onPress={() => {
              this.setState({
                isModalOptionsVisible: false, refreshing: true
              });
              deleteGroup({ variables: {_id: this.state.current_group_id} });
            }}>
            <Text>Delete</Text>
          </TouchableOpacity>
        )}
      </Mutation>
    )
  }

  optionsRender = () => {
      return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalOptionsVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <TouchableOpacity style={[styles.optionCloseView,{height: this.props.store.dim_height, width: this.props.store.dim_width}]} onPress={() => this.setState({ isModalOptionsVisible: false })}>
          <View style={styles.modal_add_task}>
            <View>
              {this.deleteGroup()}
              <TouchableOpacity style = {styles.optionButton}
                onPress={() => {
                  this.setState({ isModalOptionsVisible: false });
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      )
    
  }

  render() {
    return (
      <View style={styles.container}>
        {this.optionsRender()}
        {this.queryGroup()}
        {this.modalFormAdd()}
        <View style={styles.addRoomButton}>
          <Icon
            raised
            name='add'
            color='#f50'
            onPress={this._toggleModal} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: '#fff',
  },
  optionButton: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  addRoomButton: {
    bottom: 5,
    position: "absolute",
    right: 5,
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
  },
  optionCloseView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  }
});

