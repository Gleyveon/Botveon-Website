// src/components/shared/popup-form
import './styles.scss';
import React from 'react'
import { useEffect, useState } from 'react';

interface InputField {
    title: string;
    value?: string | number;
    type: "text" | "number" | "textarea";
    placeholder?: string;
    invalid?: boolean;
}

interface PopupFormProps {
    inputs: InputField[];
    onSave: (values: Record<string, string | number | undefined>) => void;
    onCancel: () => void;
    classname?: string;
    children?: React.ReactNode;
}

const PopupForm = ({ inputs, onSave, onCancel, classname, children }: PopupFormProps) => {

    const [visible, setVisible] = useState<boolean>(false)

    const [savedFormData, setSavedFormData] = useState<InputField[]>(JSON.parse(JSON.stringify(inputs)));
    const [formData, setFormData] = useState<InputField[]>(JSON.parse(JSON.stringify(inputs)));

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [visible]);

    
    const handleChange = (value: string, index: number) => {

        const updatedItems = formData.map((input, findex) => {
            if (index !== findex) return input;
    
            if (value === '' || value === null) {
                const { value, ...rest } = input;
                return rest;
            }
    
            return { ...input, value: value };
        });
        setFormData(updatedItems);
    };

    function handleSave() {
        console.log(formData);
        const formValues = formData.reduce((acc, input) => {
            acc[input.title] = input.value;
            return acc;
        }, {} as Record<string, string | number | undefined>);
        setSavedFormData(JSON.parse(JSON.stringify(formData)));
        setVisible(false);
        onSave(formValues);
    }

    function handleCancel() {
        setFormData(JSON.parse(JSON.stringify(savedFormData)));
        setVisible(false);
        onCancel();
    }

    return (
        <>
            {children && React.isValidElement(children) ? (
                React.cloneElement(children as React.ReactElement, {
                    onClick: () => setVisible(true),
                })
            ) : null}

            <div className={`component component-popup-form${classname ? ` ${classname}` : ""}`}>
                <div className={`popup${visible ? ` active` : ''}`}>
                    <div className="overlay" onClick={handleCancel}></div>
                    <div className="form-wrapper">
                        <form>
                            {formData.map((input, index) => {

                            const invalid = inputs[index].invalid;

                            return (
                                <div className="field" key={index}>
                                    <div className="title">{input.title ? input.title : ""}</div>
                                    {input.type === "text" && <input className={`${invalid ? 'invalid' : ''}`} type="text" value={input.value || ""} placeholder={input.placeholder} onChange={(e) => handleChange(e.target.value, index)} />}
                                    {input.type === "number" && <input className={`${invalid ? 'invalid' : ''}`} type='number' value={input.value || ""} placeholder={input.placeholder} onChange={(e) => handleChange(e.target.value, index)} />}
                                    {input.type === "textarea" && <textarea className={`${invalid ? 'invalid' : ''}`} value={input.value || ""} placeholder={input.placeholder} onChange={(e) => handleChange(e.target.value, index)} />}
                                </div>
                            )})}
                            <div className="button-wrapper">
                                <button className='cancel-button' type="button" onClick={handleCancel}>Cancel</button>
                                <button className='save-button' type="button" onClick={handleSave}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopupForm;
