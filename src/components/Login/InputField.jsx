const InputField = ({labelName, type, name, id, value, onChange, placeholder}) =>{

return (
    <div className="content_input_field">
        <lavel className="label_component_input">{labelName}</lavel>
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