import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import RoomScreen from '../screens/OneRoom'
import CardsScreen from '../screens/home/CardScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import EditScheduleScreen from '../screens/EditScheduleScreen'
import InviteScreen from '../screens/InviteScreen'
import AddTaskScreen from '../screens/AddTaskScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'


import { Icon } from 'react-native-elements'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddTaskScreen: AddTaskScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      // name={
      //   Platform.OS === 'ios'
      //     ? `ios-information-circle${focused ? '' : '-outline'}`
      //     : 'md-information-circle'
      // }
      color={
        Platform.OS === 'ios'
          ? `${focused ? '#007AFF' : '#ccc'}`
          : '#007AFF'
      }
      name='home'
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name='subject'
      color={
        Platform.OS === 'ios'
          ? `${focused ? '#007AFF' : '#ccc'}`
          : '#007AFF'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Room: RoomScreen,
  Cards: CardsScreen,
  EditSchedule: EditScheduleScreen,
  InviteUsers: InviteScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name='person'
      color={
        Platform.OS === 'ios'
          ? `${focused ? '#007AFF' : '#ccc'}`
          : '#007AFF'
      }
    />
  ),
};

const BottomNav = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

const MainStart = createStackNavigator(
  {
    BottomNav:
    {
      screen: BottomNav,
      navigationOptions:
      {
        header: null
      }
    },
    ChatScreen:
    {
      screen: ChatScreen
    }
  },
  {
    headerMode: 'screen'
  }
)

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:
    {
      header: null
    }
  },
  Main:  {
    screen: MainStart,
    navigationOptions:
    {
      header: null
    }
  }
})