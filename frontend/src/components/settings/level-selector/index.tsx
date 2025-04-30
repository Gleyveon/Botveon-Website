// src/components/settings/selector-levels
import { useState } from 'react';
import { Role, LevelRole } from '../../../utils/types';
import './styles.scss';

interface componentProps {
    items: Role[];
    selectedItems: LevelRole[];
    setSelectedItems: (levelRole: LevelRole[]) => void;
    invalidFields: Record<string, (keyof LevelRole)[]>;
}

const Selector = ({ items, selectedItems, setSelectedItems, invalidFields }: componentProps) => {

    const [isDropdownActive, setDropdownActive] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

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
            setTimeoutId(null);
        }
    };


    /*
    * =============================================================================================
    *
    * Changing Selection Value:
    *
    * =============================================================================================
    */

    const changeValue = (roleID: string, level: any) => {
        const updatedItems = selectedItems.map((role) => {
            if (role.roleID !== roleID) return role;
            level = parseInt(level);
    
            if (isNaN(level) || level === '' || level === null) {
                const { level, ...rest } = role;
                return rest;
            }
    
            return { ...role, level: level };
        });
    
        setSelectedItems(updatedItems);
    };
    

    return (
        <div className="setting-subcomponent level-selector">

            <div className="setting-item">
                <div className='selector inputs'>
                    <div className="active-list">

                        <div className="flex-table">
                            <div className="flex-table-header">
                                <div className="flex-table-col list-item-role-wrapper"><div className="flex-table-title">Role</div></div>
                                <div className="flex-table-col"><div className="flex-table-title">level</div></div>
                                <div className="flex-table-col"><div className="flex-table-title"></div></div>
                            </div>

                            {items.map((item) => { 
                                
                                const invalidLevel = invalidFields[item.id]?.includes('level');

                                return (
                                <div key={item.id} className={`flex-table-row list-item-wrapper ${selectedItems.some(obj => obj.roleID === item.id) ? ' active' : ''}`}>

                                    <div className="flex-table-col list-item-role-wrapper">
                                        <div className="list-item-role">
                                            <div className="role-color-wrapper">
                                                <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                                <div className="role-color" style={{ backgroundColor: `#${Number(item.color).toString(16).padStart(6, '0')}` }}></div>
                                            </div>
                                            <div className="text-content">{item.name}</div>
                                        </div>
                                    </div>

                                    <div className="flex-table-col list-item-input">
                                        <div className={`input-field-level${invalidLevel ? ' invalid' : ''}`}>
                                            <input className="number" type='number' placeholder="lvl 0" value={selectedItems.find(obj => obj.roleID === item.id)?.level ?? ''} min="0" max="9999" onChange={(e) => changeValue(item.id, e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="flex-table-col">
                                        <div className="list-item-delete" onClick={() => toggleItem(item.id)}></div>
                                    </div>
                                </div>
                            )})}
                        </div>
                        <div className="bottom-wrapper">
                            <button type="button" className="add-button" onClick={toggleDropdown} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>+ Add Role</button>
                            { hasInvalidFields() && (
                                <div className="error-message">* Please fill out all fields correctly!</div>
                            )}
                        </div>
                    </div>
                    <div className={`inactive-list-wrapper${isDropdownActive ? " active" : ""}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                        <div className="inactive-list">
                            {items.map((item) => (
                                <div key={item.id} className={`list-item ${selectedItems.some(obj => obj.roleID === item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
                                    <div className="role-color-wrapper">
                                        <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                        <div className="role-color" style={{ backgroundColor: `#${Number(item.color).toString(16).padStart(6, '0')}` }}></div>
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

export default Selector;