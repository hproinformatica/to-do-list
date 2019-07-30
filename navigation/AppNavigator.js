import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

// Auth
import AuthScreen from '../screens/AuthScreen';

// ToDo List
import ToDoListScreen from '../screens/ToDoListScreen';

// Stack com uma única tela - utilizada para ter os recursos de header
const ToDoListStack = createStackNavigator(
    {
        ToDoListScreen: ToDoListScreen,
    },
    {
        initialRouteName: 'ToDoListScreen',
    }
);

const AppNavigator = createSwitchNavigator(
    {
        AuthScreen: AuthScreen,
        ToDoListStack: ToDoListStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
);

export default AppNavigator;