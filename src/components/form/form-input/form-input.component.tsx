import "./form-input.style.scss";
import { useEffect, useState } from "react";

type FormInputProps = {
    label?: string;
    name: string;
    value?: string;
    type?: string;
}

const FormInput = ({ type = "text", label, name, value }: FormInputProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);


    switch (type) {
        case "hidden":
            return (
                <input type={type} name={name} defaultValue={currentValue} />
            );
        default:
            return (
                <div className={`form-input form-input_${type}`}>
                    {label && <label className="form-input__label" htmlFor={name}>{label}</label>}
                    <input className="form-input__field" name={name} type={type} defaultValue={currentValue} />
                </div>
            );
    }


}

export default FormInput;