import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Logger from '../Utilities/Log';
import RenderComponent from '../Utilities/RenderComponent';
import {styles} from '../Utilities/GenericStyles';
import LocalStorage from '../Utilities/LocalStorage';

export default function LoggerScreen(props) {
  const [logs, setLogs] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [displayLogs, setDisplayLogs] = useState(false);
  const [loggerLimit, setLoggerlimit] = useState(10);

  
  const onBackPress = () => {
    Actions.push('initial');
  };

  const onResetLogsPress = () => {
    Logger.reset();
    setLogs(Logger.display());
  };

  const handleCardLongPress = index => {
    Alert.alert('Delete Log', 'Are you sure you want to delete the log?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async() => {
          await Logger.deleteLog(index);
          setRefreshTrigger(prev => !prev)
        },
      },
    ]);
  };

  useEffect(() => {
    setLogs(Logger.display());
  }, [refreshTrigger]);

  useEffect(()=>{
    Checker();
    setLimit();
  },[])

  const setLimit = async() =>{
    await setLoggerlimit(Number(Logger.getCurrentLimit()))
  }

  const Checker = ()=>{
    LocalStorage.load({
      key : 'loggerdev'   
    }).then(res => {
      setDisplayLogs(res)
    }).catch(err => {
      setDisplayLogs(false);
    })
  }

  const onToggleChange = async() => {
    setDisplayLogs((prev) => !prev)
    if(displayLogs){
      LocalStorage.save({
        key: 'loggerdev', 
        data: false,
      });
    }else {
      LocalStorage.save({
        key: 'loggerdev', 
        data: true,
      });
    }
  }


  const handleLoggertextChange = async(text) =>{
    await setLoggerlimit(text);
    Logger.setLimit(Number(text))
  }



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={[styles.main, styles.headerStyle, styles.marginBotton]}>
          <View>
            <Button title="X" onPress={onBackPress}></Button>
          </View>
          <View>
            <Text style={styles.mainText}>Logs</Text>
          </View>
          <View style={styles.main} >
            <Switch value={displayLogs} onChange={onToggleChange} />
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          {
            displayLogs&&(
              <View>
                <View style={[styles.logsMenustyle]} >
                  <Button  title="Reset Logs" onPress={onResetLogsPress} />
                  <View style={[styles.main]} >
                    <Text>Logger maximum value : </Text> 
                    <TextInput
                      keyboardType="numeric"
                      style = {styles.TextInput}
                      onChangeText={(e)=> handleLoggertextChange(e)}
                      defaultValue= {loggerLimit.toString()}
                    />  
                  </View>  
              </View>
              <View style={[styles.logsMenustyle]} >
                <TouchableHighlight><Text>all</Text></TouchableHighlight>
                <TouchableHighlight><Text>Info</Text></TouchableHighlight>
                <TouchableHighlight><Text>Error</Text></TouchableHighlight>
                <TouchableHighlight><Text>Warning</Text></TouchableHighlight>
              </View>
              </View>
            )
          }
          {logs.map((ele, index) => {
            return (
              <TouchableHighlight 
                underlayColor="transparent"
                onLongPress={() => handleCardLongPress(index)}
                key={Math.random()}>
                <ScrollView style={[styles.log, styles[ele.type], styles.relativeBlock]}>
                  <Text style={[styles.locationText]} >screen : {ele.screen}</Text>
                  <RenderComponent
                    component={typeof ele.data}
                    data={ele.data}
                    type={ele.type}
                  />
                </ScrollView>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}