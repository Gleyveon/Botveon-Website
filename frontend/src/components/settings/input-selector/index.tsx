// src/components/settings/input-selector
import { useState, useEffect } from 'react';
import { Role, Channel, ShopItem } from '../../../utils/types';
import './styles.scss';

interface componentProps {
    items: Role[] | Channel[];
    itemsType: "Role" | "Channel";
    selectedItems: ShopItem[];
    setSelectedItems: (ShopItems: ShopItem[]) => void;
}

const Selector = ({ items, itemsType, selectedItems, setSelectedItems }: componentProps) => {

    const [isDropdownActive, setDropdownActive] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    
    /*
    * =============================================================================================
    *
    * Selecting/Deselecting channels:
    *
    * =============================================================================================
    */

    const toggleItem = (id: string) => {
        const isActive = selectedItems.some(obj => obj.itemID === id);

        const updatedItems : ShopItem[] = isActive
            ? selectedItems.filter(obj => obj.itemID !== id)
            : [...selectedItems, { itemID: id }];
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
    const handleMouseOut = () => {
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

    const changeTitle = (itemID: string, title: any) => {
        
        const updatedItems = selectedItems.map((role) =>
            role.itemID === itemID ? { ...role, title } : role
        );

        setSelectedItems(updatedItems);
    };

    const changeDescription = (itemID: string, description: any) => {
        
        const updatedItems = selectedItems.map((role) =>
            role.itemID === itemID ? { ...role, description } : role
        );

        setSelectedItems(updatedItems);
    };

    const changePrice = (itemID: string, price: any) => {
        
        const updatedItems = selectedItems.map((role) =>
            role.itemID === itemID ? { ...role, price } : role
        );

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

                            {items.map((item) => (
                                <div key={item.id} className={`flex-table-row list-item-wrapper ${selectedItems.some(obj => obj.itemID === item.id) ? ' active' : ''}`}>

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
                                        <div className="input-field-level">
                                            <input className="number" type='number' placeholder="lvl 0" value={selectedItems.find(obj => obj.itemID === item.id)?.level} min="0" max="9999" onChange={(e) => changeValue(item.id, e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="flex-table-col list-item-input">
                                        <div className="input-field-level">
                                            <input className="number" type='number' placeholder="lvl 0" value={selectedItems.find(obj => obj.itemID === item.id)?.level} min="0" max="9999" onChange={(e) => changeValue(item.id, e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="flex-table-col list-item-input">
                                        <div className="input-field-level">
                                            <input className="number" type='number' placeholder="lvl 0" value={selectedItems.find(obj => obj.itemID === item.id)?.level} min="0" max="9999" onChange={(e) => changeValue(item.id, e.target.value)}></input>
                                        </div>
                                    </div>

                                    <div className="flex-table-col">
                                        <div className="list-item-delete" onClick={() => toggleItem(item.id)}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="add-button" onClick={toggleDropdown} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>+ Add Role</button>
                    </div>
                    <div className={`inactive-list-wrapper${isDropdownActive ? " active" : ""}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                        <div className="inactive-list">
                            {items.map((item) => (
                                <div key={item.id} className={`list-item ${selectedItems.some(obj => obj.itemID === item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
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

export default Selector;