import React from 'react';
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import jsonPlaceholderAPI from '../Constants/Apicaller';
import Logger from '../Utilities/Log';

export default function List() {
  const [start, setStart] = (0)
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [dataToBeShown, setDataToBeShown] = useState([]);
  const [dataNum, setDataNum] = useState(100);
  const title = 'To-Do List';

  useEffect(() => {
    jsonPlaceholderAPI(`/posts?_start=${start}&_limit=5`)
      .then(result => {
        setData(result.data);
        // setIsActive(prev => !prev)
      }).catch(error => {
        console.error(error)
      })
    // fetch('https://jsonplaceholder.typicode.com/photos')
    //   .then(res => res.json())
    //   .then(data => {
    //     setData(data.slice(0, 200));
    //     setDataToBeShown(data.slice(0, dataNum));
    //     setIsActive(false);
    //     Logger.log(
    //       {
    //         date: new Date().toString(),
    //         data: 'API call made API call made API call made API call made API call made API call made API call made API call made API call made API call made API call made API call made API call made API call made ',
    //         context: {
    //           numOfRows: data.length.toString(),
    //         },
    //       },
    //       'error',
    //     );
    //   }).catch(error => {
    //     setIsActive(false)
    //     Logger.log(
    //       error.message,
    //       'error',
    //     );
    //   });
    
  }, []);

  const onPrevPress = () => {
    Actions.push('initial');
  };

  const loadMore = () => {
    setDataToBeShown(data.slice(0, dataNum + 30));
    setDataNum(state => state + 30);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isActive ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.main}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <FlatList
            style={{flex: 2}}
            data={data}
            renderItem={({item}) => (
              <View style={(styles.list, styles.main)}>
                <Text>
                 {item.title}
                </Text>
              </View>
            )}
            initialNumToRender={100}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
          <Button title="Previous Page" onPress={onPrevPress} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  main: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
