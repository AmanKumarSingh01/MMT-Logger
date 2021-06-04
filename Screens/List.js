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
  TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import jsonPlaceholderAPI from '../Constants/Apicaller';
import Logger from '../Utilities/Log';
import {styles} from "./../Utilities/GenericStyles"
export default function List() {
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [users, setUsers] = useState([]);
  const [dataToBeShown, setDataToBeShown] = useState([]);
  const [dataNum, setDataNum] = useState(100);
  const [start, setStart] = useState(0);
  const title = 'To-Do List';

  useEffect(() => {
    loadMore(true);
    getuserData();
  }, []);

  const onPrevPress = () => {
    Actions.push('initial');
  };
  
  const getuserData = () => {
    jsonPlaceholderAPI('/users')
      .then(result => {
        setUsers(result.data);
        console.log(result.data)
      })
      .catch(error => {
        setIsActive(false)
        console.error(error)
      })
  }

  const loadMore = (initial = false) => {
    jsonPlaceholderAPI.get(`/posts111?_start=${start}&_limit=30`)
      .then(result => {
        console.log(result.data)
        setStart(prev => prev + 30);
        setData(prev=>[...prev, ...result.data])
        if(initial) setIsActive(prev=>!prev);
        Logger.log({
          data : "Api call sucessfully happened, called json placeholder api",
          time : new Date().toString(),
          context : {
            startdata : start,
            limit : 30
          }
        }, 'information');
      }).catch(error => {
        console.log(error, typeof error , "aman")
        setIsActive(prev=>!prev)
        Logger.err(error, "aman's errror", "nesting")
      })
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isActive ? (
        <View style={[stylesheet.container, stylesheet.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={[styles.main, styles.headerStyle]}>
            <Button title="<" onPress={onPrevPress} />
            <Text style={stylesheet.text}>{title}</Text>
            <View/>
          </View>
          
          <FlatList
            data={data}
            renderItem= {({item}) => (
              <TouchableHighlight 
                style={stylesheet.card}
                underlayColor="transparent"
                onPress={()=>{
                  Actions.push('details', {item})
                }}
                key={Math.random()}>
                <View key={Math.random()}>
                  <Text style={{marginVertical : 10}} >{item.title}</Text>
                  <Text style={stylesheet.authorName} >- {
                    users.filter(user => user?.id === item?.userId)[0]?.name
                  }</Text>
                </View>
              </TouchableHighlight>
            )}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            onEndReached={()=>loadMore(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  list: {
    padding: 10,
  },
  main: {
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection : 'row'
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
  card : {
    // height : 50,
    // width : 90,
    padding : 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 10,
    backgroundColor : '#d5e1df',
    marginHorizontal : 10,
    marginVertical : 10,
    borderRadius : 10,
    position : 'relative'
  },
  authorName  :  {
    position : 'absolute',
    zIndex : 100,
    bottom : 5,
    right: 5,
    color : 'red',
    fontSize : 12
  }
});
