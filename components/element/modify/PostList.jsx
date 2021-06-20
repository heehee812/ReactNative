import React from 'react';
import PropTypes from 'prop-types';
import {
    List, ListItem
} from 'native-base';

import { StyleSheet, Text, View } from "react-native";
import { connect } from 'react-redux';

//import NotificationItem from 'components/NotificationItem.jsx';
import PostItem from './PostItem';

//import './PostList.css';

class PostList extends React.Component {
    static PropTypes = {
        posts: PropTypes.array,
        hasMore: PropTypes.bool,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        let { posts } = this.props;
        if (!posts) posts = [];

        let children = (
            <ListItem>
                <Text>No post here.</Text>
                <Text>Go add some posts.</Text>
            </ListItem>
        );
        if (posts.length) {
            children = posts.map(p => (
                <ListItem key={p.id} action>
                    <PostItem {...p} />
                </ListItem>
            ));
        }
        console.log(posts);
        return (
            <View>
                <List>
                    {children}
                </List>
            </View>
        );
    }

    handleScroll(page) {
        const { posts, searchText } = this.props;
        this.props.dispatch(listMorePosts(searchText, posts[posts.length - 1].id));
    }
}

export default connect(state => ({
    posts: state.post.posts == undefined ? [] : state.post.posts,
    hasMore: state.post.hasMore == undefined ? false : state.post.hasMore,
    searchText: state.searchText == undefined ? '' : state.searchText,
}))(PostList);




/*
class Notification extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
        hasMore: PropTypes.bool,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.props.dispatch(listPosts());
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        //console.log("aaaa");
        //this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        let { posts } = this.props;
        if (!posts) posts = [];
        console.log(posts);
        /*let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No post here.<br />Go add some posts.</div>
            </ListGroupItem>
        );

let children = "";
if (posts.length) {
children = posts.map(p => (
<div key={p.id} action>
    <NotificationItem {...p} />
</div>
));
}

return (
<div style={{ position: "relative", height: "500px" }}>
<ThreeDots />
<ListGroup>
    {children}
</ListGroup>
</div>
);
}

handleScroll(page) {
const { posts, searchText } = this.props;
this.props.dispatch(listMorePosts(searchText, posts[posts.length - 1].id));
}
}

export default connect(state => ({
posts: state.post.posts,
hasMore: state.post.hasMore,
searchText: state.searchText
}))(Notification);*/
