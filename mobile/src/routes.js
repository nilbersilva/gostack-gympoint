import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';
import HelpOrder from './pages/HelpOrder';
import HelpOrderNew from './pages/HelpOrder/New';
import HelpOrderView from './pages/HelpOrder/ViewOrder';
import Profile from './pages/Profile';

const tabBarIcon = ({tintColor}) => (
  <Icon name="live-help" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (isSigned = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIn,
            New: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  HelpOrderNew,
                  HelpOrderView,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon,
              },
            },
            Profile,
          },
          {
            resetOnBlue: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {initialRouteName: isSigned ? 'App' : 'Sign'}
    )
  );
};
