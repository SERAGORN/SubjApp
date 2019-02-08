import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Modal,
  RefreshControl
} from 'react-native';
import { Icon, Header, Button, FormLabel, FormInput, FormValidationMessage, ListItem } from 'react-native-elements'

import { inject, observer } from 'mobx-react'

import { Query, Mutation } from 'react-apollo'
import gql from "graphql-tag"

import HomeTasks from "../components/HomeTasks"
import FeedUsers from "../components/FeedUsers"

// import Modal from "react-native-modal";


//import graphql from 'graphql-anywhere';
@inject('store')
@observer class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Главное',
  };

  state = {
    main_data: null,
    isModalVisible: false,
    refreshing: false,
    current_group_id: null,
    isModalOptionsVisible: false
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderMain = () => {
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={()=>{
             this.setState({refreshing: true}, () => 
             setTimeout(()=> {
               this.setState({refreshing: false})
             }), 1000)
          }}
        />
      }
      >
        <FeedUsers navigate={this.props.navigation}/>
        <HomeTasks />
      </ScrollView>
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
        <TouchableOpacity style={[styles.modal_add_task_container, { height: this.props.store.dim_height, width: this.props.store.dim_width }]} onPress={() => this.setState({ isModalVisible: false })}>
          <View style={styles.modal_add_task}>
            <View>
              <FormLabel>Title</FormLabel>
              <FormInput onChangeText={(text) => this.setState({ task_title: text })} />
              <FormLabel>Content</FormLabel>
              <FormInput onChangeText={(text) => this.setState({ task_content: text })} />
              <FormValidationMessage>Error message</FormValidationMessage>
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



  render() {
    if (!this.state.refreshing) { 
    return (
      <View style={styles.container}>
        {this.renderMain()}
        {this.modalFormAdd()}
        <View style={styles.addRoomButton}>
          <Icon
            raised
            name='add'
            color='#f50'
            onPress={() => this.props.navigation.navigate('AddTaskScreen')} />
        </View>
      </View>
    );
  } else {
    return null
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: '#fff',
  },
  addRoomButton: {
    bottom: 5,
    position: "absolute",
    right: 5,
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
});

export default HomeScreen