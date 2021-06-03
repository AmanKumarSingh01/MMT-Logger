import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import TextComp from './TextComp';
import ObjectComponent from './ObjectComponent';
import ArrayComponent from './ArrayComponent';

const Component = {
  string: TextComp,
  object: ObjectComponent,
  array: ArrayComponent,
  number : TextComp
};

const RenderComponent = props => {
  let type = typeof props.data;
  if(Array.isArray(props.data)){
    type = 'array'
  }
  let Comp = Component[type];
  return <View>{<Comp {...props} />}</View>;
};

export default RenderComponent;
