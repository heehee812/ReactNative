import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import NotificationList from './NotificationList.jsx';
import { listNotification } from '../../states/post-actions.js';

// import NotificationItem from './NotificationItem.jsx';

class Notification extends React.Component {
    static PropTypes = {
        masking: PropTypes.bool,
        searchText: PropTypes.string,
        postLoading: PropTypes.bool,
        posts: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.dispatch(listNotification(122.2, 23.51, this.props.searchText));
    }

    componentWillUnmount() { //render後  立即調用

    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.searchText !== this.props.searchText) {
    //         this.props.dispatch(listNotification(122.2, 23.51, nextProps.searchText));
    //     }
    // }

    render() {
        const { masking, postLoading } = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <NotificationList />{
                        postLoading &&
                        <Text>Loading...</Text>
                    }
                </View>
            </View>
        );
    }
}

export default connect(state => ({
    postLoading: state.post.postLoading,
    searchText: state.searchText,
}))(Notification);
