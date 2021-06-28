import React, { useState } from "react";
import {useDispatch} from "react-redux";
import styles from "./Join.module.scss";
import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import {setUsernameAction, setChatroomIdAction, setChatroomNameAction} from "../../store/actions/user";

const Join = (props)=>{
    const [username, setUsername] = useState("");
    const [chatroomId, setChatroomId] = useState("");
    const dispatch = useDispatch();

    const onSubmitFormHandler=(e)=>{
        e.preventDefault();
        dispatch(setUsernameAction(username));
        dispatch(setChatroomNameAction(""));
        dispatch(setChatroomIdAction(chatroomId));
        props.history.push("/chat?mode=join");
    }

    return (
        <div className={styles.join}>
             <Link to="/"><h1>XATTY</h1></Link>
            <form className={styles.formGroup} onSubmit={onSubmitFormHandler}>
                <input className={styles.formInput} type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input className={styles.formInput} type="text" placeholder="Enter chatroom id" value={chatroomId} onChange={(e)=>setChatroomId(e.target.value)}/>
                <Button text="Join" onClick={onSubmitFormHandler}/>
            </form>
        </div>
    )
}

export default Join;