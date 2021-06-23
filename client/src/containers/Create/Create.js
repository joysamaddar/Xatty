import styles from "./Create.module.scss";
import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";

const Create = ()=>{

    return (
        <div className={styles.create}>
             <Link to="/"><h1>XATTY</h1></Link>
            <form className={styles.formGroup}>
                <input className={styles.formInput} type="text" placeholder="Enter username"/>
                <input className={styles.formInput} type="text" placeholder="Enter chatroom name"/>
                <Link to="/chat"><Button text="Create"/></Link>
            </form>
        </div>
    )
}

export default Create;