import {Router, Scene} from 'react-native-router-flux';
import Details from './Screens/Details';
import Initial from './Screens/Initial';
import List from './Screens/List';
import LoggerScreen from './Screens/Logger';
import Logger from './Utilities/Log';
import React, {useEffect} from 'react';
const App = () => {
  useEffect(() => {
    const obj = {
      node1: 'node1 Data',
      node2: 'node2 Data',
      node3: {
        'node3.1': 'node3.1 data',
        'node3.2': 'node3.2 data',
        'node3.3': {
          'node3.3.1': 'node3.1 data',
          'node3.3.2': 'node3.2 data',
          'node3.3.3': {
            'node3.3.3.1': 'node3.1 data',
            'node3.3.3.2': 'node3.2 data',
          },
        },
      },
    };
    Logger.log({
      date: new Date().toString(),
      data: 'App loaded',
    });
    Logger.log(obj);
    Logger.log([1,2,3,{aman : "singh"},5,6,7,8,9,10])
  }, []);

  return (
    <Router>
      <Scene key="root">
        <Scene key="initial" component={Initial} initial hideNavBar />
        <Scene key="list" component={List} hideNavBar />
        <Scene key="logger" component={LoggerScreen} hideNavBar />
        <Scene key= "details" component={Details} hideNavBar />
      </Scene>
    </Router>
  );
};

export default App;
