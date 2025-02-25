// src/components/settings/item-title
import { useState, useRef } from 'react';
import './styles.scss';

interface componentProps {
    title?: string;
    info?: string;
}

const InputField = ({ title, info }: componentProps) => {

    const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false)
    const timeoutID = useRef<number | null>(null);

    function toggleDropdown() {
        setDropdownIsActive(!dropdownIsActive)
    }

    function closeDropdown() {
        timeoutID.current = window.setTimeout(() => setDropdownIsActive(false), 200);
    }

    function cancelCloseDropdown() {
        if (timeoutID.current) {
            clearTimeout(timeoutID.current);
            timeoutID.current = null;
        }
    }

    return (
        <div className="setting-subcomponent item-title">
            <div className="setting-item-title-wrapper">
                <div className="setting-item-title">{title}</div>
                {info && (
                    <div className="info-button-wrapper">
                        <div className="info-button" onClick={toggleDropdown} onMouseLeave={closeDropdown} onMouseEnter={cancelCloseDropdown}>ⓘ</div>
                        <div className={'info-dropdown' + (dropdownIsActive ? ' active' : '')} onMouseLeave={closeDropdown} onMouseEnter={cancelCloseDropdown}>
                            <div className="info-text">
                                {info}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputField;


