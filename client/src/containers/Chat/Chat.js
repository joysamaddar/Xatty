import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import queryString from "query-string";
import {setChatroomNameAction, setChatroomIdAction} from "../../store/actions/user";
import styles from "./Chat.module.scss";

let socket;

const Chat = ({location})=>{
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [users, setUsers] = useState([]);
    const username=useSelector(state=>state.user.username);
    const chatroomName=useSelector(state=>state.user.chatroomName);
    const chatroomId=useSelector(state=>state.user.chatroomId);
    const roomType=queryString.parse(location.search).mode;
    const ENDPOINT="http://localhost:5000/";
    const dispatch = useDispatch();
    
    useEffect(()=>{
        socket=io(ENDPOINT);

        if(roomType==="create"){
            socket.emit("adminJoin", {username: username, chatroomName: chatroomName}, (data)=>{
                dispatch(setChatroomIdAction(data.payload.chatroomId));
            });
        }

        if(roomType==="join"){
            socket.emit("join", {username: username, chatroomId: chatroomId}, (data)=>{
                if(data.payload){
                    dispatch(setChatroomNameAction(data.payload.chatroomName));
                }else{
                    console.log(data.error);
                }
            });
        }

        return ()=>{
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on("serverMessage", (data)=>{
            setMessages([...messages, {
                type: "message",
                user: data.user,
                message: data.message
            }])
        });

        socket.on("serverNotification", (data)=>{
            setMessages([...messages, {
                type: "notification",
                user: data.user,
                message: data.message
            }])
        })

        socket.on("usersData", (data)=>{
            setUsers(data);
        })
    },[messages])

    const sendMessageHandler = (e)=>{
        if(e.code=="Enter"){
            socket.emit("clientMessage", {user: username, message: inputMessage}, setInputMessage(""));
        }
    }
    
    return (
        <div className={styles.Chat}>
            {/* <p>username - {username}</p>
            <p>chatroomName - {chatroomName}</p> */}
            <p>chatroomId - {chatroomId}</p> 
            {messages.map(message=>(
                <div className="">
                    <h1>{message.user}</h1>
                    <p>{message.message}</p>
                </div>
            ))}
            <input type="text" value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} onKeyPress={sendMessageHandler} placeholder="Enter message"/>
            {users}
        </div>
        )
}

export default Chat;