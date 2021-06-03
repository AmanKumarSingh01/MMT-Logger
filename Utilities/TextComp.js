import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {styles} from './GenericStyles';

const {height, width} = Dimensions.get('window');

export default TextComp = prop => {
  const [numberOfLines, setNumberOfLines] = useState(1);
  const handleTextPress = () => {
    setNumberOfLines(prev => (prev === 1 ? 0 : 1));
  };

  return (
    <Text
      style={[styles.text, styles.textWidth, styles[prop.type]]}
      onPress={handleTextPress}
      numberOfLines={numberOfLines}>
      {prop.data}
    </Text>
  );
};
