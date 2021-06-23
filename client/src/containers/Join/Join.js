import React, { useState, useEffect } from "react";
import styles from "./Join.module.scss";
import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";

const Join = ()=>{
    const [username, setUsername] = useState();
    const [chatroomId, setChatroomId] = useState();

    return (
        <div className={styles.join}>
             <Link to="/"><h1>XATTY</h1></Link>
            <form className={styles.formGroup}>
                {/* <input className={styles.formInput} type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input className={styles.formInput} type="text" placeholder="Enter chatroom id" value={chatroomId} onChange={(e)=>setChatroomId(e.target.value)}/> */}
                <Link to="/chat"><Button text="Join"/></Link>
            </form>
        </div>
    )
}

export default Join;