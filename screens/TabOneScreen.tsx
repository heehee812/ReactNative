import * as React from 'react';
import { StyleSheet } from 'react-native';
import Notification from '../components/element/modify/Notification.jsx'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//new
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
const LOCATION_TASK_NAME = 'background-location-task';
// <EditScreenInfo path="/screens/TabOneScreen.tsx" />

export default function TabOneScreen() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getBackgroundPermissionsAsync();
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }

    })();
  }, []);

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      // const { locations } = data;
      console.log("hi");
      console.log(data);
      // setLocation(locations);
      // do something with the locations captured in the background
    }
  });

  // if (location) {  //location
  //   return (
  //     <Notification currentLat={location[0].coords.latitude} currentLon={location[0].coords.longitude} />
  //   );

  //   /*return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Notification</Text>
  //       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

  //       <Text>This is Setting</Text>

  //     </View>
  //   );*/
  // }
  // else {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Notification</Text>
  //       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

  //       <Text>This is Setting</Text>

  //     </View>
  //   );
  // }
  return(
    <Notification/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //new
    backgroundColor: 'rgba(245, 222, 179, 1.0)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: { //separator line
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



