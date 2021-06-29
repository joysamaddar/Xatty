import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import queryString from "query-string";
import {setChatroomNameAction, setChatroomIdAction} from "../../store/actions/user";
import {setError} from "../../store/actions/error";
import styles from "./Chat.module.scss";
import ScrollToBottom from 'react-scroll-to-bottom';
import {  FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faHome, faCopy } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

let socket;

const Chat = ({location, history})=>{
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [users, setUsers] = useState([]);
    const inviteCode = useRef(null);
    const inviteCodeMobile = useRef(null);
    const inviteText = useRef(null);
    const inviteTextMobile = useRef(null);
    const username=useSelector(state=>state.user.username);
    const chatroomName=useSelector(state=>state.user.chatroomName);
    const chatroomId=useSelector(state=>state.user.chatroomId);
    const roomType=queryString.parse(location.search).mode;
    const ENDPOINT="http://localhost:5000/";
    const dispatch = useDispatch();
    
    useEffect(()=>{
        socket=io(ENDPOINT);

        if(roomType==="create"){
            if(username=="" || chatroomName==""){
                dispatch(setError(true, "Please try again!"));
                history.push("/create");
            }
            socket.emit("adminJoin", {username: username, chatroomName: chatroomName}, (data)=>{
                dispatch(setChatroomIdAction(data.payload.chatroomId));
            });
        }

        if(roomType==="join"){
            socket.emit("join", {username: username, chatroomId: chatroomId}, (data)=>{
                if(data.payload){
                    dispatch(setChatroomNameAction(data.payload.chatroomName));
                }else{
                    dispatch(setError(true, data.error.message));
                    history.push("/join");
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
        if((e.code=="Enter" || e.type=="click") && inputMessage!=""){
            socket.emit("clientMessage", {user: username, message: inputMessage}, setInputMessage(""));
        }
    }

    const copyInviteCode = ()=>{
        inviteCode.current.select();
        document.execCommand("copy");
        inviteText.current.innerHTML="Copied!"
        setTimeout(()=>{
            inviteText.current.innerHTML=`<span>Invite Code:</span> ${chatroomId}`
        }, 500)
    }

    const copyInviteCodeMobile = ()=>{
        inviteCodeMobile.current.select();
        document.execCommand("copy");
        inviteTextMobile.current.innerHTML="Copied!"
        setTimeout(()=>{
            inviteTextMobile.current.innerHTML=`<span>Invite Code:</span> ${chatroomId}`
        }, 500)
    }
    
    return (
        <div className={styles.Chat}>
            <div className={styles.container}>
                <div className={styles.chatHeader}>
                    <p><Link to="/"><FontAwesomeIcon icon={faHome}/></Link> {chatroomName}</p>
                </div>
               
                <div className={styles.containerLeft}>
                    <ScrollToBottom className={styles.messages}>
                        {messages.map(message=>(
                            <div className={message.type=='notification'?
                            (`${styles.notification}`):
                            (message.user==username?(`${styles.message} ${styles.active}`):(`${styles.message}`))}>
                                <h1>{message.user}</h1>
                                <p>{message.message}</p>
                            </div>
                        ))}
                    </ScrollToBottom>
                    <div className={styles.inputInvite}>
                        <p ref={inviteTextMobile}><span>Invite Code:</span> {chatroomId}</p>
                        <textarea
                        ref={inviteCodeMobile}
                        value={chatroomId}
                        />
                        <FontAwesomeIcon icon={faCopy} className={styles.icon} onClick={copyInviteCodeMobile}/>
                    </div>
                    <div className={styles.input}>
                        <input type="text" value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} onKeyPress={sendMessageHandler} placeholder="Enter message"/>
                        <button onClick={sendMessageHandler}>SEND</button>
                    </div>
                </div>

                <div className={styles.containerRight}>
                    <div className={styles.users}>
                            <h2>USERS</h2>
                        {users.map(user=>(
                            <p className={styles.user}><span>•</span> {user}</p>
                        ))}
                    </div>
                    <div className={styles.invite}>
                        <p ref={inviteText}><span>Invite Code:</span> {chatroomId}</p>
                        <textarea
                         ref={inviteCode}
                         value={chatroomId}
                         />
                        <FontAwesomeIcon icon={faCopy} className={styles.icon} onClick={copyInviteCode}/>
                    </div>
                </div>
            </div>
        </div>



        )
}

export default Chat;