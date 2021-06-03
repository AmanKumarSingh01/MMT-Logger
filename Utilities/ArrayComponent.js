import React, {useState} from 'react';
import {View, Text} from 'react-native';
import RenderComponent from './RenderComponent';
import {styles} from "./GenericStyles"

const ArrayComponent = (props) => {
  const [fullObjectCollapse, setFullObjectCollapse] = useState(true);
  if(fullObjectCollapse){
    return (
      <View>
        <Text onPress={()=>setFullObjectCollapse(prev => !prev)}>
        [...] ({props.data.length}) 
        </Text>
      </View>
    )
  }
  return (
    <>
      {
        !props.single && (
          <Text onPress={()=>setFullObjectCollapse(prev => !prev)}>
            -
          </Text>
        )
      }
      {
        props.data.map((item,key)=>{
          return(
            <View style={styles.sidewise} >
              <Text>{key} :</Text>
              <View style = {styles.marginLeft} >
              <RenderComponent
                data = {item}
                type = {props.type}
              />
              </View>
            </View>
          )
        })
      }
    </>
  );
};

export default ArrayComponent;
