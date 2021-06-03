import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  textWidth: {
    maxWidth: width * 0.7,
  },
  text: {
    fontSize: 15,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  main: {
    flexDirection: 'row',
    // margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {},
  mainText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  log: {
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    width: 0.9 * width,
    // marginVertical : 10
  },
  warning: {
    backgroundColor: 'rgb(255, 244, 229)',
    color: 'rgb(102, 60, 0)',
    borderColor: 'rgb(102, 60, 0)',
  },
  information: {
    backgroundColor: 'rgb(232, 244, 253)',
    color: 'rgb(13, 60, 97)',
    borderColor: 'rgb(13, 60, 97)',
  },
  error: {
    backgroundColor: 'rgb(253, 236, 234)',
    color: 'rgb(97, 26, 21)',
    borderColor: 'rgb(97, 26, 21)',
  },
  sidewise : {
    display : 'flex',
    flexDirection  : 'row'
  },
  marginLeft : {
    marginLeft  : 10
  },
  headerStyle : {
    padding : 12,
    backgroundColor :'#deeaee',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  logsMenustyle : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginHorizontal : 20,
    marginVertical : 10,
    height : 50,
    alignItems : 'center'
  },
  TextInput : {
    height: 30,
    width :60,
    padding : 10,
    borderWidth: 1,
    fontSize : 10
  },
  relativeBlock : {
    position : 'relative'
  },
  locationText : {
    position : 'absolute',
    top : -1,
    right : 0,
    fontSize : 10,
    lineHeight : 12,
    color :'red',
    zIndex : 10
  },
  marginBotton :  {
    marginBottom : 10
  }
});
