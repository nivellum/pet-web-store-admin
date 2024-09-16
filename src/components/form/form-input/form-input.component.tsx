import "./form-input.style.scss";
import { useEffect, useState } from "react";

type FormInputProps = {
    label: string;
    name: string;
    value?: string;
    type?: string;
}

const FormInput = ({ type = "text", label, name, value }: FormInputProps) => {

    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    return (
        <div className="form-input">
            <label className="form-input__label" htmlFor={name}>{label}</label>
            <input className="form-input__field" name={name} type={type} value={currentValue} />
        </div>
    );
}

export default FormInput;