import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native';

//import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
//import moment from 'moment';

//import { getMoodIcon } from 'utilities/weather.js';
import { deletePost, setIsOpen, OpenCard } from '../../states/post-actions.js';

//import './PostItem.css';
//import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        Name: PropTypes.string,
        locationType: PropTypes.string,
        reminding: PropTypes.array,
        volume: PropTypes.string,
        vibrate: PropTypes.bool,
        isOpen: PropTypes.bool,
        isPersonal: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        //this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleX = this.handleX.bind(this);
    }

    render() {
        const { id, Name, isPersonal, volume, vibrate, isOpen, locationType } = this.props;
        let { reminding } = this.props;
        let itemTable = undefined;
        let header = isPersonal ? Name : locationType
        let iconColor = isPersonal ? 'dodgerblue' : 'darkturquoise';
        console.log(reminding);
        if (reminding != undefined) {
            if (reminding.length) {
                const itemTableHead = <Text>ItemName Notify as Leaving Entering</Text>
                //console.log(reminding);
                const itemTableBody = reminding.map(item => (
                    //console.log(item)
                    <Text>{item.name}{item.leaving ? 'V' : 'X'}{item.entering ? 'V' : 'X'}</Text>
                ));
                //console.log(itemTableBody);
                itemTable = (
                    <View>
                        {itemTableHead}
                        {itemTableBody}
                    </View>
                );
            }
        }

        let vibtext = vibrate ? 'on' : 'Off';

        return (
            <Collapse style={styles.container}>
                <CollapseHeader isExpanded={this.props.isOpen} onToggle={this.handleOpen}>
                    <TouchableWithoutFeedback style={{ backgroundColor: { iconColor }, height: 1, width: 1 }} />
                    <Text>{header}</Text>
                    <Text>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.handleX}>
                        <Text>X</Text>
                    </TouchableOpacity>
                </CollapseHeader>
                <CollapseBody>
                    {itemTable}
                </CollapseBody>
            </Collapse>
        );
    }

    handleOpen() {
        this.props.dispatch(OpenCard(this.props.id));
    }

    handleX() {
        this.props.dispatch(deletePost(this.props.id));
    }
}

export default connect((state, ownProps) => ({
    isOpen: state.postItem.isOpen[ownProps.id] ? true : false
}))(PostItem);


const styles = StyleSheet.create({
    buttonStyle: {
        color: "#ff0000",
        height: 3,
        width: 3,
        alignItems: 'center',
        justifyContent: 'center',
    }
})