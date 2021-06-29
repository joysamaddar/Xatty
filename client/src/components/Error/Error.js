import { useSelector, useDispatch } from "react-redux";
import styles from "./Error.module.scss";
import {setError} from "../../store/actions/error";

const Error=()=>{
    const message=useSelector(state=>state.error.message);
    const error = useSelector(state=>state.error.error);
    const dispatch = useDispatch();

    return (
            <div className={error?(styles.Error):(styles.ErrorHidden)}>
                <p>{message}</p>
                <button onClick={()=>dispatch(setError(false, ""))}>GO BACK</button>
            </div>
    )
}

export default Error;