import styles from '../../styles/Textfield.module.css';

const TextField = ({type, placeholder}) => {
    return <input className={styles.textfield} type={type} placeholder={placeholder} />
}

export default TextField;