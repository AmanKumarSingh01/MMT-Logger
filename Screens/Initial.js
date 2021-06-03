import React from 'react';
import {Button, SafeAreaView, View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Logger from '../Utilities/Log';

export default function Initial() {
  const onNextPress = () => {
    Actions.push('list');
    Logger.log('Initial Screen - Next Press');
  };

  const onLoadLogsPress = () => {
    Actions.push('logger');
    Logger.log('Initial Screen - Load Press', 'warning');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginVertical: 10}}>
        <Button title="Next Page" onPress={onNextPress} />
      </View>
      <Button title="Load Logs" onPress={onLoadLogsPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
