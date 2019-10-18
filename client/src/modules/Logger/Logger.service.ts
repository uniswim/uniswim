import { Service } from "libs/Service";
import moment from "moment"



@Service
export default class LoggerService {

    

    log(message?: any, ...optionalParams: any[]){
        let _now = moment().format("YYYY-MM-DD hh:mm:ss:SSS");
        console.log(`%c${_now} : `,"color: grey", message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]){
        let _now = moment().format("YYYY-MM-DD hh:mm:ss:SSS");
        console.info(`%c${_now} : `,"color: grey", message, ...optionalParams);
    }
}