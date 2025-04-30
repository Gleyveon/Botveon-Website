// src/components/settings/selector-levels
import { useState, useRef } from 'react';
import { Role, BoostRole } from '../../../utils/types';
import './styles.scss';

interface componentProps {
    items: Role[];
    selectedItems: BoostRole[];
    setSelectedItems: (items: BoostRole[]) => void;
    invalidFields: Record<string, (keyof BoostRole)[]>;
}

const BoostSelector = ({ items, selectedItems, setSelectedItems, invalidFields }: componentProps) => {

    const [isDropdownActive, setDropdownActive] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [stackableDropdowns, setStackableDropdowns] = useState<{ id: string, timeout: any }[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const hasInvalidFields = () => Object.values(invalidFields).some(fields => fields.length > 0);


    /*
    * =============================================================================================
    *
    * Selecting/Deselecting channels:
    *
    * =============================================================================================
    */

    const toggleItem = (id: string) => {
        const isActive = selectedItems.some(obj => obj.roleID === id);

        const updatedItems = isActive
            ? selectedItems.filter(obj => obj.roleID !== id)
            : [...selectedItems, { roleID: id }];
        setSelectedItems(updatedItems);
    };


    /*
    * =============================================================================================
    *
    * Opening/Closing Channel/Role Dropdown:
    *
    * =============================================================================================
    */

    const toggleDropdown = () => {
        setDropdownActive(!isDropdownActive);
    };

    // Close dropdown after a delay
    const handleMouseOut = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null;
    
        if (relatedTarget?.closest('.add-button, .inactive-list-wrapper')) {return};
    
        // Close dropdown after a delay
        const id = window.setTimeout(() => setDropdownActive(false), 200);
        setTimeoutId(id);
    };

    // Cancel closing dropdown if mouse comes back
    const handleMouseOver = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            //setTimeoutId(null);
        }
    };

    // Auto scroll down, when dropdown appears under screen
    // useEffect(() => {
    //     if (isDropdownActive && dropdownRef.current) {
    //         const dropdownPosition = dropdownRef.current.getBoundingClientRect();
    //         const dropdownHeight = dropdownPosition.height;
    //         const windowHeight = window.innerHeight;
    //         const distanceFromBottom = dropdownPosition.bottom - windowHeight;

    //         // If the dropdown will go below the screen, scroll the page down to ensure it's fully visible
    //         if (distanceFromBottom > 0) {
    //             window.scrollBy(0, distanceFromBottom); // Scroll down
    //         }
    //     }
    // }, [isDropdownActive]);


    /*
    * =============================================================================================
    *
    * Opening/Closing Selection Dropdown:
    *
    * =============================================================================================
    */

    // toggle dropdown from being active:
    function toggleMiniDropdown(id: string) {
        if (stackableDropdowns.some((obj) => obj.id === id)) {
            setStackableDropdowns((prevState) =>
                prevState.filter((obj) => obj.id !== id)
            );
        } else {
            setStackableDropdowns((prevState) => [...prevState, { id: id, timeout: null }]);
        }
    }

    // Make the dropdown inactive in 200ms by creating a timeout
    function exitMiniDropdown(event: React.MouseEvent, id: string) {

        const relatedTarget = event.relatedTarget as HTMLElement | null;
    
        if (relatedTarget?.closest('.selector-button, .input-select-dropdown')) {return};

        // remove dropdown in 200ms
        const timeout = setTimeout(() => {
            setStackableDropdowns((prevState) =>
                prevState.filter((obj) => obj.id !== id)
            );
        }, 200);

        // save function in dropdown useState (So it can be deleted before the timeout runs out)
        setStackableDropdowns((prevState) =>
            prevState.map((obj) =>
                obj.id === id ? { ...obj, timeout: timeout } : obj
            )
        );
    }

    // Cancel making the dropdown inactive by clearing the timeout
    function enterMiniDropdown(id: string) {

        const existingTimeout = stackableDropdowns.find(obj => obj.id === id);

        // Clear the timeout
        if (existingTimeout?.timeout) {
            clearTimeout(existingTimeout.timeout);
        }
    }

    // Close dropdown when a selection has been made
    function closeMiniDropdown(id: string) {
        setStackableDropdowns((prevState) =>
            prevState.filter((obj) => obj.id !== id)
        );
    }


    /*
    * =============================================================================================
    *
    * Changing Selection Value:
    *
    * =============================================================================================
    */


    const changeBoost = (roleID: string, boost: any) => {
        const updatedItems = selectedItems.map((role) => {
            if (role.roleID !== roleID) return role;
            boost = parseFloat(boost);
    
            if (isNaN(boost) || boost === '' || boost === null) {
                const { boost, ...rest } = role;
                return rest;
            }
    
            return { ...role, boost: boost };
        });
        setSelectedItems(updatedItems);
    };

    const changeStackable = (roleID: string, stackable: boolean) => {
        let updatedItems = selectedItems.map((role) => {
            if (role.roleID !== roleID) return role;

            if (!stackable) {
                const { stackable, equation, ...rest } = role;
                return rest;
            } 

            return role.roleID === roleID ? { ...role, stackable: stackable } : role
        });
        setSelectedItems(updatedItems);
    };

    const changeEquation = (roleID: string, equation: string) => {
        if (equation !== 'add' && equation !== 'multiply') { return }

        const updatedItems = selectedItems.map((role) =>
            role.roleID === roleID ? { ...role, equation: equation as "add" | "multiply" } : role
        );

        setSelectedItems(updatedItems);
    };

    return (
        <div className="setting-subcomponent boost-selector">

            <div className="setting-item">
                <div className='selector inputs'>
                    <div className="active-list">

                        <div className="flex-table">
                            <div className="flex-table-header">
                                <div className="flex-table-col list-item-role-wrapper"><div className="flex-table-title">Role</div></div>
                                <div className="flex-table-col"><div className="flex-table-title">Boost</div></div>
                                <div className="flex-table-col"><div className="flex-table-title">Stackable</div></div>
                                <div className="flex-table-col"><div className="flex-table-title">Equation</div></div>
                                <div className="flex-table-col"><div className="flex-table-title"></div></div>
                            </div>

                            {items.map((item) => {
                                const selectedItem = selectedItems.find(obj => obj.roleID === item.id);

                                const boost = selectedItem?.boost;
                                const stackable = selectedItem?.stackable || false;
                                const equation = selectedItem?.equation;

                                const invalidBoost = invalidFields[item.id]?.includes('boost');
                                const invalidEquation = invalidFields[item.id]?.includes('equation');

                                return (
                                    <div key={item.id} className={`flex-table-row list-item-wrapper ${!!selectedItem ? ' active' : ''}`}>

                                        <div className="flex-table-col list-item-role-wrapper">
                                            <div className="list-item-role">
                                                <div className="role-color-wrapper">
                                                    <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                                    <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                                </div>
                                                <div className="text-content">{item.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex-table-col list-item-input">
                                            <div className={`input-field-boost${invalidBoost ? ' invalid' : ''}`}>
                                                <input type="number" placeholder="2" value={boost ?? ''} min="0.01" max="5" step="0.01" onChange={(e) => changeBoost(item.id, e.target.value)}></input>
                                            </div>
                                        </div>

                                        <div className="flex-table-col list-item-input">
                                            <div className="input-select-stackable">
                                                <button
                                                    type="button"
                                                    className="selector-button"
                                                    onClick={() => toggleMiniDropdown('stackable' + item.id)}
                                                    onMouseEnter={() => enterMiniDropdown('stackable' + item.id)}
                                                    onMouseLeave={(event) => exitMiniDropdown(event, 'stackable' + item.id)}>
                                                    {stackable ? "Yes" : "No"}
                                                </button>
                                            </div>
                                            <div
                                                className={`input-select-dropdown ${stackableDropdowns.some(obj => obj.id === 'stackable' + item.id) ? "active" : ""}`}
                                                onMouseEnter={() => enterMiniDropdown('stackable' + item.id)}
                                                onMouseLeave={(event) => exitMiniDropdown(event, 'stackable' + item.id)}>
                                                <label onClick={() => {changeStackable(item.id, true); closeMiniDropdown('stackable' + item.id);}}>
                                                    <span>Yes</span>
                                                </label>
                                                <label onClick={() => {changeStackable(item.id, false); closeMiniDropdown('stackable' + item.id);}}>
                                                    <span>No</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex-table-col list-item-input">
                                            <div className="input-select-equation">
                                                <button
                                                    type="button"
                                                    className={`selector-button${invalidEquation ? ' invalid' : ''}`}
                                                    disabled={stackable === false}
                                                    onClick={() => toggleMiniDropdown('equation' + item.id)}
                                                    onMouseEnter={() => enterMiniDropdown('equation' + item.id)}
                                                    onMouseLeave={(event) => exitMiniDropdown(event, 'equation' + item.id)}>
                                                    {equation ? equation : stackable ? "" : " - "}
                                                </button>
                                            </div>
                                            <div
                                                className={`input-select-dropdown ${stackableDropdowns.some(obj => obj.id === 'equation' + item.id) ? "active" : ""}`}
                                                onMouseEnter={() => enterMiniDropdown('equation' + item.id)}
                                                onMouseLeave={(event) => exitMiniDropdown(event, 'equation' + item.id)}>
                                                <label onClick={(e) => { changeEquation(item.id, 'add'); closeMiniDropdown('equation' + item.id); }}>
                                                    <span>Add</span>
                                                </label>
                                                <label onClick={(e) => { changeEquation(item.id, 'multiply'); closeMiniDropdown('equation' + item.id); }}>
                                                    <span>Multiply</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex-table-col">
                                            <div className="list-item-delete" onClick={() => toggleItem(item.id)}></div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className="bottom-wrapper">
                            <button type="button" className="add-button" onClick={toggleDropdown} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>+ Add Role</button>
                            {hasInvalidFields() && (
                                <div className="error-message">* Please fill out all fields correctly!</div>
                            )}
                        </div>
                    </div>
                    <div className={`inactive-list-wrapper${isDropdownActive ? " active" : ""}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} ref={dropdownRef}>
                        <div className="inactive-list">
                            {items.map((item) => (
                                <div key={item.id} className={`list-item ${selectedItems.some(obj => obj.roleID === item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
                                    <div className="role-color-wrapper">
                                        <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                        <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                    </div>
                                    <div className="item-name">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BoostSelector;