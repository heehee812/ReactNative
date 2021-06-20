import React, { Component, useState } from 'react'
import { FlatList, SafeAreaView, StatusBar, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'

import PropTypes, { any, string } from 'prop-types'
import { connect } from 'react-redux';

import { getMoodIcon } from '../../utilities/weather.js';
import { inputItemName, deleteRemindItem, createSet, StoreItemName, deleteNotify } from '../../states/post-actions.js';

import { itemDanger } from '../../states/post-actions.js';

const DATA = [
   {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Entering",
   },
   {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Leaving",
   },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
   </TouchableOpacity>
);


class Inputs extends Component {

   static propTypes = {
      id: PropTypes.string,
      inputValue: PropTypes.string,
      //Name: PropTypes.string,
      leaving: PropTypes.bool,
      entering: PropTypes.bool,
      itemDanger: PropTypes.bool,
      dispatch: PropTypes.func
   };

   constructor(props) {
      super(props);
      this.ItemEl = null;
      this.handleItemChange = this.handleItemChange.bind(this);
      this.handleSet = this.handleSet.bind(this);
      this.saveItem = this.saveItem.bind(this);
   }

   render() {

      const { id, leaving, entering } = this.props;
      let leave = (leaving ? true : false);
      let enter = (entering ? true : false);

      return (
         <View>
            <View style={styles.container}>
               <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={
                     () => this.handleSet('delete')
                  }>
                  <Text style={styles.submitButtonText}> Delete </Text>
               </TouchableOpacity>

               <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Iterm Name"
                  placeholderTextColor="#4A4444"
                  autoCapitalize="none"
                  onChange={this.handleItemChange} />

               <TouchableOpacity
                  style={enter === true ? styles.deleteButton : styles.enterANDleavingButton}
                  onPress={
                     () => this.handleSet('entering')
                  }>


                  <Text style={styles.submitButtonText}> Entering </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={leave === true ? styles.deleteButton : styles.enterANDleavingButton}
                  onPress={
                     () => this.handleSet('leaving')
                  }>

                  <Text style={styles.submitButtonText}> Leaving </Text>
               </TouchableOpacity>

            </View>
         </View>
      )
   }

   componentDidMount() {
      const itemRef = () => this.props;
      itemRef(this);
   }
   componentWillUnmount() {
      const itemRef = () => this.props;
      itemRef(undefined);
   }

   handleItemChange(e) {
      const text = e.target.value
      this.props.dispatch(inputItemName(this.props.id, text));
      if (text && this.props.itemDanger) {
         this.props.dispatch(itemDanger(this.props.id, false));
      }
   }

   handleSet(setting) {
      //console.log("hi")
      if (setting != 'delete') {
         this.props.dispatch(createSet(this.props.id, setting));
         this.props.dispatch(StoreItemName(this.props.id, this.props.inputValue));
         //console.log(this.props.id);
      } else {
         this.props.dispatch(deleteRemindItem(this.props.id));
         this.props.dispatch(deleteNotify(this.props.id));
      }
   }
   saveItem() {
      //console.log(this.props.id);
      if (!this.props.inputValue) {
         //console.log('fuck');
         this.props.dispatch(itemDanger(this.props.id, true));
         return false;
      }
      //console.log(this.props.inputValue);
      this.props.dispatch(StoreItemName(this.props.id, this.props.inputValue));
      return true;
      //this.props.dispatch(AllSafe());
   }




   handleItermName = (text) => {
      this.setState({ itemName: text })
   }
   /*
      login = (email, pass) => {
         alert('email: ' + email + ' password: ' + pass)
      }
   */

}


export default connect((state, ownProps) => ({
   //Name: state.remindItem.Name[ownProps.id],
   itemDanger: state.remindItem.itemDanger ? true : false,
   inputValue: state.remindItem.Name[ownProps.id] ? state.remindItem.Name[ownProps.id] : ''
}))(Inputs);

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      padding: 20,
   },
   input: {
      margin: 15,
      borderColor: '#4A4444',
      borderWidth: 1,
      marginRight: 0,
      marginLeft: 0,
   },
   deleteButton: {
      backgroundColor: '#ff0000',
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
   },
   enterANDleavingButton: {
      backgroundColor: '#4A4444',
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
   },
   onPressedButton: {
      backgroundColor: '#0000ff',
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
   },
   submitButtonText: {
      color: 'white',
   }
})
/*
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'react-native-reactstrap';
*/

/*
<TouchableOpacity
             style = {styles.enterANDleavingButton}
             onPress = {
                () => this.handleSet('entering')
             }>
             <Text style = {styles.submitButtonText}> Entering </Text>
          </TouchableOpacity>

          <TouchableOpacity
             style = {styles.enterANDleavingButton}
             onPress = {
                () => this.handleSet('leaving')
             }>
             <Text style = {styles.submitButtonText}> Leaving </Text>
          </TouchableOpacity>
          */

/*
 const EnterAndLeave = () => {
   const [selectedId, setSelectedId] = useState(null);

   const renderItem = ({ item }) => {
      //const backgroundColor = item.isSelect ? "#0000ff" : "#4A4444";
     const backgroundColor = item.id === selectedId ? "#0000ff" : "#4A4444";
     const color = item.id === selectedId ? 'white' : 'white';

     return (
       <Item
         item={item}
         onPress={() => {setSelectedId(item.id); this.handleSet(item.title); }} // {item.isSelect = !item.isSelect}} //
         backgroundColor={{ backgroundColor }}
         textColor={{ color }}
       />
     );
   };

   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         data={DATA}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         extraData={selectedId}
         horizontal = {true}
       />
     </SafeAreaView>
   );
 };
*/