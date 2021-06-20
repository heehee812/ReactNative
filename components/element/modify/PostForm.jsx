import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Text,
    ActionSheet
} from 'native-base'

import {
    View,
    TextInput
} from 'react-native'

import { connect } from 'react-redux';

//import { getMoodIcon } from 'utilities/weather.js';

import {
    createPost,
    input,
    inputDanger,
    inputVol,
    togglelocationType,
    setlocationTypeToggle,
    selectlocationType,
    clearItems,
    vibrateSetting,
    volumeDanger,
    typeFormSetting,
    listRemindItem,
    mapOpen,
    setMap
} from '../../states/post-actions.js';

//import './PostForm.css';
import ListItem from './RemindItemList.jsx'


class PostForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        locationTypeToggle: PropTypes.bool,
        locationType: PropTypes.string,
        remindItemLoading: PropTypes.bool,
        vibration: PropTypes.bool,
        volume: PropTypes.string,
        volumeDanger: PropTypes.bool,
        isPersonal: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.inputVol = null;
        this.locationTypeToggleEl = null;
        this.itemList = React.createRef();
        this.Loactions = [
            { text: "Cafe" },
            { text: "Library" },
            { text: "Cancel", icon: "close", iconColor: "#25de5b" }
        ];
        this.ActionSheetRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleLTToggle = this.handleLTToggle.bind(this);
        this.handleVibrate = this.handleVibrate.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleTypeForm = this.handleTypeForm.bind(this);
    }

    render() {
        const { isPersonal, inputValue, locationTypeToggle, locationType, remindItemLoading, vibration, volumeDanger } = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';
        let vibtext = (vibration == true) ? 'On' : 'Off';
        let typeFormName = isPersonal ? 'Personal' : 'General';
        let typeFormColor = isPersonal ? 'primary' : 'info';
        let vibColor = (vibration == true) ? 'primary' : 'secondary';
        let typeForm = undefined;

        if (isPersonal) {
            typeForm = (
                <View>
                    <Text>Add a new Personal Place</Text>
                    <TextInput innerRef={el => { this.inputEl = el }} value={this.props.inputValue} onChange={this.handleInputChange} placeholder="Give a Name for this place" />
                    <Button rounded success onPress={this.handleLTToggle}>
                        <Text>Google Map</Text>
                    </Button>
                </View>
            );
            //console.log('weird');
        } else {
            typeForm = (
                <View>
                    <View>
                        <Button rounded onPress={() => {
                            ActionSheet.show(
                                {
                                    options: this.Loactions,
                                    cancelButtonIndex: 3,
                                    destructiveButtonIndex: 3,
                                    title: 'Location Type:'
                                },
                                buttonIndex => {
                                    this.handleDropdownSelect({ clicked: this.Loactions[buttonIndex].text });
                                }
                            )
                        }}>
                            <Text>{locationType == 'na' ? 'Select Location Type' : locationType}</Text>
                        </Button>
                    </View>
                </View >
            );
        }
        //console.log(locationType);
        return (
            <View>
                <View>
                    <View>
                        <Button rounded onPress={this.handleTypeForm}><Text>{typeFormName}</Text></Button>
                        {typeForm}
                        <View>
                            <Button rounded onPress={this.handleVibrate}><Text>Vibration: {vibtext}</Text></Button>
                            <Text>Volume:
                                <TextInput placeholder="0-100" innerRef={el => { this.inputVol = el }} value={this.props.volume} onChange={this.handleVolumeChange} />
                            </Text>
                        </View>
                        <ListItem childRef={ref => (this.itemList = ref)} />{
                            remindItemLoading &&
                            <Text>Loading...</Text>
                        }
                    </View>
                    <Button rounded onPress={this.handlePost}><Text>Set</Text></Button>
                </View>
            </View>
        );
    }
    componentDidMount() {
        const FormRef = () => this.props;
        FormRef(this);
        this.props.dispatch(listRemindItem());
    }
    componentWillUnmount() {
        const FormRef = () => this.props;
        FormRef(undefined);
    }
    handleTypeForm() {
        this.props.dispatch(setlocationTypeToggle(false));
        this.props.dispatch(typeFormSetting());
        //console.log('set Type of form');
    }

    handleVibrate() {
        this.props.dispatch(vibrateSetting());
        //console.log(this.props.vibration);
    }

    handleDropdownSelect(locationType) {
        //console.log(locationType);
        if (locationType.clicked != 'Cancel')
            this.props.dispatch(selectlocationType(locationType.clicked));
        else
            this.props.dispatch(selectlocationType('na'));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleVolumeChange(e) {
        const text = e.target.value
        //console.log(text);
        let vol = Number(text, 10); //check if number
        //console.log(this.props.volumeDanger);
        if (!isNaN(vol)) {
            if (vol >= 0 && vol <= 100) {
                this.props.dispatch(inputVol(text));
                if (text && this.props.volumeDanger) {
                    this.props.dispatch(volumeDanger(false));
                }
            } else {
                this.props.dispatch(volumeDanger(true));
                return;
            }
        } else {
            this.props.dispatch(volumeDanger(true));
            return;
        }
    }

    handleLTToggle(e) {
        this.props.dispatch(togglelocationType());
    }

    handlePost() {
        let bad = false;
        if (!this.props.inputValue && this.props.isPersonal) {
            this.props.dispatch(inputDanger(true));
            bad = true;
        }

        if (this.props.locationType === 'na' && !this.props.isPersonal) {
            this.props.dispatch(setlocationTypeToggle(true));
            bad = true;
        }
        //console.log(this.props.volume);
        if (!this.props.volume) {
            this.props.dispatch(volumeDanger(true));
            bad = true;
        }
        //console.log(this.itemList);
        if (this.itemList.current == null) { //Null
            console.log('No receive reference from itemlist');
            return; //abort
        }
        let itemGood = this.itemList.saveWholeList();
        //console.log(locationType);
        if (itemGood && !bad) {  //save
            this.props.dispatch(createPost(this.props.id, this.props.isPersonal, this.props.inputValue, this.props.locationType, this.props.volume, this.props.vibration));
            this.props.dispatch(input(''));
            this.props.dispatch(selectlocationType('na'));
            this.props.dispatch(clearItems());
        }
        return;
    }
}

export default connect(state => ({
    inputValue: state.postForm.inputValue,
    inputDanger: state.postForm.inputDanger,
    volumeDanger: state.postForm.volumeDanger,
    volume: state.postForm.volume,
    locationTypeToggle: state.postForm.locationTypeToggle,
    locationType: state.postForm.locationType,
    remindItemLoading: state.reminder.remindItemLoading,
    vibration: state.postForm.vibrate ? true : false,
    isPersonal: state.postForm.isPersonal ? true : false,
    //searchText: state.searchText,
}))(PostForm);
