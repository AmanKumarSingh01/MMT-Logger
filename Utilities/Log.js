import LocalStorage from "./LocalStorage";
import {Actions} from "react-native-router-flux"
class Log {
  constructor(limit) {
    this.limit = limit;
    this.logs = [];
  }

  setLimit = (number) => {
    this.limit = number;
  }

  getCurrentLimit = ()=>{
    return this.limit;
  }

  reset = () => {
    this.logs = [];
  };

  /**
   * Valid types:
   * information
   * error
   * warning
   */

  //normal log function
   log (data) {
    let type = "information"
    let args= [...arguments]
   
    //checking the local stroage 
    LocalStorage.load({
      key : 'loggerdev',
    }).then( res => {
      if(res){
        args.map(i =>{
          if (this.logs.length >= this.limit) {
            this.reset();
          }
          this.logs.push({
            data : i,
            type,
            screen : Actions.currentScene
          });  
        })
      }
    }).catch(err => {
      console.log("Error found", err);
    })
  };

  //error function 
  err (data) {
    let type = 'error';
    let args = [...arguments]
    LocalStorage.load({
      key : 'loggerdev',
    }).then( res => {
      if(res){
        args.map(i =>{
          if (this.logs.length >= this.limit) {
            this.reset();
          }
          if(i instanceof Error) i = i.stack;
          this.logs.push({
            data : i,
            type,
            screen : Actions.currentScene
          }); 
        }) 
      }
    }).catch(err => {
      console.log("Error found", err);
    })
  }

  warning (data) {
    let type = 'error';
    let args = [...arguments]
    LocalStorage.load({
      key : 'loggerdev',
    }).then( res => {
      if(res){
        args.map(i =>{
          if (this.logs.length >= this.limit) {
            this.reset();
          }
          this.logs.push({
            data : i,
            type,
            screen : Actions.currentScene
          }); 
        }) 
      }
    }).catch(err => {
      console.log("Error found", err);
    })
  }

  deleteLog = async(idx) => {
    await this.logs.splice(idx, 1);
  };

  display = () => {
    return this.logs;
  };
}

export default Logger = new Log(100);