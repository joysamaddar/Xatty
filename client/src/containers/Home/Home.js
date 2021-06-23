import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import styles from "./Home.module.scss";

const Home = ()=>{
    return (
        <div className={styles.home}>
            <Link to="/"><h1>XATTY</h1></Link>
            <div className={styles.btnGroup}>
                <Link to="/join"><Button text="Join Room"/></Link>
               <Link to="/create"> <Button text="Create Room"/></Link>
            </div>
        </div>
    )
}

export default Home;