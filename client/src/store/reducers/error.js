import * as actions from "../actions/actionTypes";

const initialState = {
    error: false,
    message: ""
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actions.SET_ERROR:
            return {
                error: action.flag,
                message: action.message
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;