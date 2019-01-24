import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
//import QueryTempl from '../gql/query'
import { Query } from 'react-apollo';
import { Button, FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements'
import { compose, graphql } from 'react-apollo';
import { inject, observer } from 'mobx-react'
import Board from '../components/Board'
import Carousel from 'react-native-snap-carousel';

const Dimensions = require('Dimensions');
const { height, width } = Dimensions.get('window');
//import { getPageNameQuery, getPageNameOptions } from '../gql/getPageName';
@inject ('store')
@observer class LinksScreen extends React.Component {
  state = {
    fake: [
      {lol: 1},
      {lol: 2}
    ]
  }
  static navigationOptions = {
    title: 'Data Views',
  };


  parseSubj = ({ item, index }) => {
    return (
        <View style={styles.slide}>
            <Board/>
        </View>
    )
}



  render() {
    return (
      <View style={styles.container}>
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.fake}
            renderItem={this.parseSubj}
            sliderWidth={width}
            sliderHeight = {height}
            itemWidth={width - 50}
            itemHeight = {height}
        />
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
  }
});

export default LinksScreen