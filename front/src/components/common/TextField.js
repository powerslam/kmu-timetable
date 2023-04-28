import styles from '../../styles/Textfield.module.css';

const TextField = ({id, type, placeholder, onChange, value, addClassName=''}) => {
    return <input id={id} 
        className={`${styles.textfield} ${addClassName}`} 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        value={value} />
}

export default TextField;