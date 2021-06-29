import * as actions from "./actionTypes";

export const setError=(flag, message)=>{
    return {
        type: actions.SET_ERROR,
        flag: flag,
        message: message
    }
}
