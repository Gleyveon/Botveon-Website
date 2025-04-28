// src/components/shared/popup-form
import './styles.scss';
import React from 'react'
import { useEffect, useState } from 'react';

interface InputField {
    title: string;
    initialValue?: string | Number;
    type: "text" | "number" | "textarea";
    placeholder?: string;
}

interface PopupFormProps {
    inputs: InputField[];
    onSave: (values: Record<string, string>) => void;
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

    function handleChange(index: number, value: string) {
        const updatedFormData = [...formData];
        updatedFormData[index].initialValue = value;
        setFormData(updatedFormData);
    }

    function handleSave() {
        const formValues = formData.reduce((acc, input) => {
            acc[input.title.toLowerCase()] = input.initialValue;
            return acc;
        }, {} as Record<string, string>);
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
                            {formData.map((input, index) => (
                                <div className="field" key={index}>
                                    <div className="title">{input.title ? input.title : ""}</div>
                                    {input.type === "text" && <input type="text" value={input.initialValue || ""} placeholder={input.placeholder} onChange={(e) => handleChange(index, e.target.value)} />}
                                    {input.type === "number" && <input type='number' value={input.initialValue || ""} placeholder={input.placeholder} onChange={(e) => handleChange(index, e.target.value)} />}
                                    {input.type === "textarea" && <textarea value={input.initialValue || ""} placeholder={input.placeholder} onChange={(e) => handleChange(index, e.target.value)} />}
                                </div>
                            ))}
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
