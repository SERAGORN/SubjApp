import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text,TouchableOpacity, View, Picker, PanResponder, Animated, Dimensions} from 'react-native';

import { Icon, Header, Button } from 'react-native-elements'

import {inject, observer} from 'mobx-react'
//import CardPage from './home/CardScreen'
import HomeCard from '../components/HomeCard'

@inject ('store')
@observer export default class OneRoom extends React.Component {
  static navigationOptions = {
    title: 'Subjects',
    headerRight: (
      <TouchableOpacity style={{width: 50}} onPress={()=>null}>
          <Text>OK</Text>
      </TouchableOpacity>
    ),
  };
  constructor(props) {
    super(props)
    this.state = {
      routes: 'home',
      days: [1, 2, 3, 4, 5, 6],
      back: 0,
      current_day: null,
      days_data: [
        {
          key:1,
          day: 'Monday',
          hide: false,
        },
        {
          key:2,
          day: 'Tuesday',
          hide: false
        },
        {
          key:3,
          day: 'Wednesday',
          hide: false,
        },
        {
          key:4,
          day: 'Thursday',
          hide: false,
        },
        {
          key:5,
          day: 'Friday',
          hide: false,
        },
        {
          key:6,
          day: 'Saturday',
          hide: false,
        }
      ]
    }
  }

  componentDidMount() {
  }

  navigateCustom = () => {
    return (
      <ScrollView>
        {this.renderDays()}
        {this.addUsers()}
      </ScrollView>
    )
  }

  addUsers = () => {
    return (
      <Button 
      buttonStyle={{width: 100, height: 40, backgroundColor: "#2f95dc"}}
      title="Invite users"
      onPress={()=> {
        this.props.navigation.navigate('InviteUsers')
      }}
    />
    )
  }

  setRoute = (route, day) => {
    this.setState({
      routes: route,
      current_day: day
    }, () => {
      if (this.state.routes != "home") {
        this.setState({
          back: 1
        })
      } else {
        this.setState({
          back: 0
        })
      }
    })
  }

  dropdownContent = (row) => {
    if (row.hide == true) {
      return (
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Cards')
          this.props.store.current_card_day = row.key
        }}>
          <HomeCard setRoute={this.setRoute} day={row.key} />
        </TouchableOpacity>
      )
    }
  }

  renderDays = () => {
    return (
      this.state.days_data.map((row, key) => {
        return (
          <View>{this.dropdownList(row, key)}
          {this.dropdownContent(row)}</View>
        )
      })
    )
  }

  dropdownList = (row, key) => {
    let that = this
    let showHide = (key) => {
      let data = that.state.days_data
      data[key].hide = !data[key].hide
      that.setState({days_data: data})
    }
    return (
      <View>
      <TouchableOpacity style={styles.dropdownTouch} onPress={()=>showHide(key)}>
        <Text>{row.day}{row.hide}</Text>
        <Button 
          buttonStyle={{width: 100, height: 40, backgroundColor: "#2f95dc"}}
          title="EDIT"
          onPress={()=> {
            this.props.navigation.navigate('EditSchedule',{day: key})
            this.props.store.current_day_to_edit = key + 1
          }}
        />
      </TouchableOpacity>
      </View>

    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.navigateCustom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdownTouch: {
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "rgb(200,200,200)",
  },
  backButton: {
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: '#fff',
  },
  head: {
    marginTop: 25,
    height: 50,
    width: "100%"
  },
  headFlex: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center"
  },
  head_main_text: {
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
