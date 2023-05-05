import '../../styles/index.css';

const TextField = ({id, addStyle, type, placeholder, onChange, value}) => {
    return <input id={id}
        type={type}
        className={"textfield " + addStyle}
        placeholder={placeholder} 
        onChange={onChange}
        value={value} />
}

export default TextField;