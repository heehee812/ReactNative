import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {View, Text} from '../../Themed'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native';

import './NotificationItem.css';

const ICON_SIZE = 24;
const messages= [
    {
        _id: 1,
        text: 'purse, phone!',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
    }
];

class NotificationItem extends React.Component{
    static PropTypes= {
    };

    constructor(props) {
        super(props);
        this.state= {
            isCheckedEnabled: false,
        }
        this.setCheckedIcon= this.setCheckedIcon.bind(this);
    }

    setCheckedIcon = () => {
            this.setState({isCheckedEnabled: !this.state.isCheckedEnabled});
    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <GiftedChat 
                    messages={messages}
                    //get rid of the typing box
                    minComposerHeight={0}
                    maxComposerHeight={0}
                    minInputToolbarHeight={0}
                    renderInputToolbar={() => null}
                />
                <MaterialCommunityIcons.Button
                    name={this.state.isCheckedEnabled? 'check-circle': 'check-circle-outline'}
                    color={'grey'}
                    size={ICON_SIZE}
                    onPress={this.setCheckedIcon}
                    backgroundColor={'transparent'}
                />
                <Text
                    style={{color: 'grey'}}
                >
                    geolocation
                </Text>
            </View>
        );
    }
}

export default connect(state => ({
}))(NotificationItem);
