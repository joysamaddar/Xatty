import * as actions from "../actions/actionTypes";

const initialState = {
    username: "",
    chatroomName: "",
    chatroomId: ""
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case actions.SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        case actions.SET_CHATROOM_NAME:
            return{
                ...state,
                chatroomName: action.chatroomName,
            }
        case actions.SET_CHATROOM_ID:
            return {
                ...state,
                chatroomId: action.chatroomId,
            }
        default:
            return {...state}
    }
}

export default reducer;