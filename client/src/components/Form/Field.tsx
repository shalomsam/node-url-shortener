import React, { FC, useContext, useState } from 'react';
import { FormContext, FormContextType } from '.';

interface IOptions {
    label: string;
    value?: string | number;
    isSelected?: boolean;
}

interface FieldProps {
    label: string;
    name: string;
    type?: 'text' | 'password' | 'select' | 'multiSelect' | 'date' | 'datetime-local' | 'checkbox' | 'radio';
    options?: IOptions[];
    value?: string | number;
    placeholder?: string;
}

const Field: FC<FieldProps> = ({ type, label, name, value, placeholder, options }) => {
    let { addFormData } = useContext<FormContextType>(FormContext as any);
    const [ _value, setValue ] = useState(value);
    const [ selectedOption, setSelectedOption ] = useState(0);

    const onChange = (newValue: any) => {
        addFormData({ [name]: newValue });
        setValue(newValue);
    }

    let fieldContent = null;

    if (type === 'text' || type === 'password' || type === 'date' || type === 'datetime-local') {
        if ((type === 'date' || type === 'datetime-local') && _value === '') {
            const date = new Date();
            let defaultDate = date.toISOString();
            defaultDate = defaultDate.substring(0, defaultDate.length - 1);
            if (type === 'date') {
                defaultDate = defaultDate.slice(0,9);
            }
            setValue(defaultDate);
        }
        
        addFormData({ [name]: _value });

        fieldContent = (
            <>
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    type={type}
                    id={name}
                    className='form-control'
                    name={name}
                    value={_value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || label}
                />
            </>
        );
    }

    if ((type === 'select' || type === 'multiSelect') && options?.length) {
        addFormData({ [name]: options[selectedOption].value })
        
        const htmlOptions = options?.map(({ label, value, isSelected }, i) => {
            if (isSelected) {
                setSelectedOption(i);
            }

            const onClick = () => {
                setSelectedOption(i);
                addFormData({ [name]: options[selectedOption].value });
            };

            return (
                <option
                    value={value}
                    selected={i === selectedOption}
                    onClick={onClick}
                >
                    {label}
                </option>
            )
        });

        fieldContent = (
            <div className="form-group">
                <label htmlFor={name}>Example select</label>
                <select
                    id={name}
                    name={name}
                    className="form-control"
                    multiple={type === 'multiSelect'}
                >
                    {htmlOptions}
                </select>
            </div>
        )
    } else if (type === 'select' && options?.length === 0) {
        throw new Error(`<Field> type provided as '${type}' but options prop is empty!`);
    }

    return (
        <div className="form-group">
            {fieldContent}
        </div>
    );
}

export default Field;
