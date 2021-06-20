/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { Provider } from 'react-redux'
import {Root} from 'native-base'
import { createStore } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { combineReducers, compose, applyMiddleware } from 'redux';

//import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
//import { Provider } from 'react-redux';
import { searchText, post, postForm, NotificationItem, postItem, reminder, remindItem } from '../components/states/post-reducers.js';


function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

/*const store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})*/



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(combineReducers({
    searchText, post, postForm, NotificationItem, postItem, reminder, remindItem
  }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));


  return (
    <Provider store={store}>
      <Root>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
      </Root>
    </Provider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
