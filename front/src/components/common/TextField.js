import '../../styles/index.css';

const TextField = ({id, type, placeholder, onChange, value}) => {
    return <input id={id}
        type={type}
        className="textfield sz-normal"
        placeholder={placeholder} 
        onChange={onChange}
        value={value} />
}

export default TextField;