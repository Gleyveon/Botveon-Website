// src/components/settings/input-selector
import { useState, useEffect } from 'react';
import { Role, Channel, ShopItem } from '../../../utils/types';
import './styles.scss';

// components
import PopupForm from '../../shared/popup-form';
import SaveChanges from '../save-changes';

type Item = Role | Channel;

interface componentProps {
    items: Role[] | Channel[];
    itemsType: "Role" | "Channel";
    selectedItems: ShopItem[];
    setSelectedItems: (ShopItems: ShopItem[]) => void;
    invalidFields: Record<string, (keyof ShopItem)[]>;
}

const Selector = ({ items, itemsType, selectedItems, setSelectedItems, invalidFields}: componentProps) => {

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
        const isActive = selectedItems.some(obj => obj.itemID === id);

        const updatedItems: ShopItem[] = isActive
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

    const onSave = (itemID: string, value: any) => {

        const updatedItems = selectedItems.map((role) =>
            role.itemID === itemID ? { ...role, name: value.title, description: value.description, price: value.price } : role
        );

        setSelectedItems(updatedItems);
    }

    const onCancel = () => {
        console.log("cancelled lole");
    }

    function isChannel(item: Item): item is Channel {
        return (item as Channel).type !== undefined;
    }

    function isRole(item: Item): item is Role {
        return (item as Role).color !== undefined;
    }

    return (
        <div className="setting-subcomponent input-selector">

            <div className="setting-item">
                <div className='selector inputs'>
                    <div className="active-list">

                        <div className="flex-table">
                            <div className="flex-table-header">
                                <div className="flex-table-col list-item-role-wrapper"><div className="flex-table-title">Role</div></div>
                                <div className="flex-table-col"><div className="flex-table-title">values</div></div>
                                <div className="flex-table-col"><div className="flex-table-title"></div></div>
                            </div>

                            {items.map((item) => {
                                const selectedItem = selectedItems.find(obj => obj.itemID === item.id);

                                const invalidName = invalidFields[item.id]?.includes('name');
                                const invalidDescription = invalidFields[item.id]?.includes('description');
                                const invalidPrice = invalidFields[item.id]?.includes('price');

                                console.log(invalidPrice);

                                // const boost = selectedItem?.boost;
                                // const stackable = selectedItem?.stackable || false;
                                // const equation = selectedItem?.equation;

                                return (
                                    <div key={item.id} className={`flex-table-row list-item-wrapper ${selectedItems.some(obj => obj.itemID === item.id) ? ' active' : ''}`}>

                                        <div className="flex-table-col list-item-role-wrapper">
                                        <div className="list-item-role">
                                        {isChannel(item) ? (
                                                <div className="channel-icon-wrapper">
                                                    <div className="channel-delete-color"></div>
                                                    <div className="channel-color">
                                                        {item.type === 2 ? (
                                                            <svg className="channel-icon voice-chat" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" className=""></path><path fill="#7e828c" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" className=""></path></svg>
                                                        ) : (
                                                            <svg className="channel-icon" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" className=""></path></svg>
                                                        )}
                                                    </div>
                                                </div>
                                        ) : isRole(item) ? (
                                                    <div className="role-color-wrapper">
                                                        <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                                        <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                                    </div>
                                                    
                                        ) : null}
                                        <div className="text-content">{item.name}</div>
                                        </div>
                                        </div>

                                        <div className="flex-table-col list-item-input">
                                            <PopupForm
                                                inputs={[
                                                    { title: "Title", initialValue: selectedItem?.name, type: "text" },
                                                    { title: "Description", initialValue: selectedItem?.description, type: "textarea" },
                                                    { title: "Price", initialValue: selectedItem?.price, type: "number", invalid: invalidPrice }
                                                ]}
                                                onSave={(values) => onSave(item.id, values)}
                                                onCancel={onCancel}
                                                classname="list-item-input input-field-edit">
                                                <button className={`edit-button${(invalidPrice || invalidName || invalidDescription) ? ' invalid' : ''}`}>Edit</button>
                                            </PopupForm>
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
                    <div className={`inactive-list-wrapper${isDropdownActive ? " active" : ""}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                        <div className="inactive-list">
                            {items.map((item) => {
                                const selectedItem = selectedItems.find(obj => obj.itemID === item.id);

                                return (
                                    <div key={item.id} className={`list-item ${selectedItems.some(obj => obj.itemID === item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
                                        {isChannel(item) ? (
                                            <div className="channel-icon-wrapper">
                                                <div className="channel-color">
                                                    {item.type === 2 ? (
                                                        <svg className="channel-icon voice-chat" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" className=""></path><path fill="#7e828c" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" className=""></path></svg>
                                                    ) : (
                                                        <svg className="channel-icon" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" className=""></path></svg>
                                                    )}
                                                </div>
                                            </div>
                                        ) : isRole(item) ? (

                                            <div className="role-color-wrapper">
                                                <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                                <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                            </div>
                                        ) : null}
                                        <div className="item-name">
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Selector;