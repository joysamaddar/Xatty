import * as actions from "./actionTypes";

export const setUsernameAction = (username)=>{
    return {
        type: actions.SET_USERNAME,
        username: username
    }
}

export const setChatroomNameAction = (chatroomName)=>{
    return {
        type: actions.SET_CHATROOM_NAME,
        chatroomName: chatroomName
    }
}

export const setChatroomIdAction = (chatroomId)=>{
    return {
        type: actions.SET_CHATROOM_ID,
        chatroomId: chatroomId
    }
}