import styles from "./Button.module.scss";

const Button = ({text})=>{
    return (
        <button className={styles.Button}>{text}</button>
    )
}

export default Button;