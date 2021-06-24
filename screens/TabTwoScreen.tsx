import * as React from 'react';
import { StyleSheet } from 'react-native';

import SwitchToggle from '../components/element/SwitchToggle';
//import Inputs from '../components/element/TextInput';
import RemindItem from '../components/element/modify/RemindItem';
import ListItem from '../components/element/modify/RemindItemList';
import App from '../components/element/test';
import { Text, View } from '../components/Themed';
import { searchText, post, postForm, NotificationItem, postItem, reminder, remindItem } from '../components/states/post-reducers.js';

import {Root} from 'native-base'
import {Container, Content} from 'native-base'
import PostList from '../components/element/modify/PostList.jsx';
import PostForm from '../components/element/modify/PostForm.jsx';
import PostItem from '../components/element/modify/PostItem.jsx';

export default function TabTwoScreen() {
  return (
    <Root>
      <Container>
        <Content>
        <View style={styles.container}>
          <Text style={styles.title}>Place</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          
          
          <PostForm/>
          <PostList/>
          <PostItem/>
         

          <App/>
        </View>
      </Content>
      </Container>
    </Root>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 20,
     
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
/*
<PostForm/>
          <PostList/>
 <PostItem/>
*/

/**
 * <View style={styles.switchButton}>
          <Text>Vibration</Text>
          <SwitchToggle/></View>
 */