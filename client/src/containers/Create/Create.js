import React, { useState } from "react";
import {useDispatch} from "react-redux";
import styles from "./Create.module.scss";
import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import {setUsernameAction, setChatroomNameAction, setChatroomIdAction} from "../../store/actions/user";
import {  FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Create = (props)=>{
    const [username, setUsername] = useState("");
    const [chatroomName, setChatroomName] = useState("");
    const dispatch = useDispatch();

    const onSubmitFormHandler=(e)=>{
        e.preventDefault();
        dispatch(setUsernameAction(username));
        dispatch(setChatroomNameAction(chatroomName));
        dispatch(setChatroomIdAction(""));
        props.history.push("/chat?mode=create");
    }

    return (
        <div className={styles.create}>
             <Link to="/"><h1>XATTY</h1></Link>
            <form className={styles.formGroup} onSubmit={onSubmitFormHandler}>
                <div className={styles.nav}>
                    <Link to="/"><FontAwesomeIcon icon={faHome} className={styles.icon}/></Link>
                    <FontAwesomeIcon icon={faChevronRight} className={styles.icon}/>
                    <p className={styles.navText}>Create</p>
                </div>
                <input className={styles.formInput} type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input className={styles.formInput} type="text" placeholder="Enter chatroom name" value={chatroomName} onChange={(e)=>setChatroomName(e.target.value)}/>
                <Button text="Create" onClick={onSubmitFormHandler}/>
            </form>
        </div>
    )
}

export default Create;