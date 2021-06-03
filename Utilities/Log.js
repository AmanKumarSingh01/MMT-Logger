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
  log = (data, type = 'information') => {
    //error handling 
    if (!type == 'information' || !type == 'error' || !type == 'warning') {
      return 'Not a valid log type';
    }
    //checking the local stroage 
    LocalStorage.load({
      key : 'loggerdev',
    }).then( res => {
      if(res){
        if (this.logs.length >= this.limit) {
          this.reset();
        }
        this.logs.push({
          data,
          type,
          screen : Actions.currentScene
        });  
      }
    }).catch(err => {
      console.log("Error found", err);
    })
  };

  deleteLog = async(idx) => {
    await this.logs.splice(idx, 1);
  };

  display = () => {
    return this.logs;
  };
}

export default Logger = new Log(100);