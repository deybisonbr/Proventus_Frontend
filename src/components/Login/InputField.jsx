import './LoginComponents.css'

const InputField = ({labelName, type, name, id, value, onChange, placeholder}) =>{

return (
    <div className="content_input_field">
        <label for={name} className="label_component_input">{labelName}</label>
        <input 
            type={type} 
            name={name} 
            id={id} 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input_component"
        />
    </div>
);

}


export default InputField