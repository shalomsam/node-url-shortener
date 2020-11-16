import React, { FC, createContext, useState } from 'react';

interface FormProps {
    submit: (props: any, e?: any) => void;
}

export interface IFormData {
    [key: string]: string;
};

export type FormContextType = {
    formData: IFormData;
    setFormData: (data: any) => void;
    addFormData: (data: any) => void;
}

export const FormContext = createContext<FormContextType|null>(null)

const Form: FC<FormProps> = ({ children, submit }) => {

    let [formData, setFormData] = useState({});

    const addFormData = (data: object) => {
        formData = {...formData, ...data};
        setFormData(formData);
    }

    return (
        <FormContext.Provider value={{formData, setFormData, addFormData}}>
            <form onSubmit={(e) => submit(formData, e)}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export default Form;
