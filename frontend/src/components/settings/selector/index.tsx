// src/components/settings/subcomponents/selector
import { useState } from 'react';
import './styles.scss';

// components
import InfoButton from '../../shared/info-button'

interface Channel {
    id: string;
    name: string;
    type: number;
}

interface Role {
    id: string;
    name: string;
    color: string;
}

type Item = Role | Channel;

interface componentProps {
    title?: string; 
    info?: string;
    itemCategory: "role" | "channel";
    selectionMode: "singular" | "multiple";
    items: Item[];
    selectedItems: string[];
    setSelectedItems: (value: string[]) => void;
}

const Selector = ({ title, info, itemCategory, selectionMode, items, selectedItems, setSelectedItems }: componentProps) => {

    const [isDropdownActive, setDropdownActive] = useState(false);
    const [isMouseInside, setIsMouseInside] = useState(false)
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    function isChannel(item: Item): item is Channel {
        return (item as Channel).type !== undefined;
    }
    
    function isRole(item: Item): item is Role {
        return (item as Role).color !== undefined;
    }


    /*
    * =============================================================================================
    *
    * Selecting/Deselecting channels:
    *
    * =============================================================================================
    */

    const toggleItem = (id: string) => {
        if (selectionMode === "singular") {
            const isAlreadySelected = selectedItems.includes(id);
            setSelectedItems(isAlreadySelected ? [] : [id]);
            setDropdownActive(false);
        } else {
            const isActive = selectedItems.includes(id);
            const updatedItems = isActive
                ? selectedItems.filter(itemId => itemId !== id)
                : [...selectedItems, id];
            setSelectedItems(updatedItems);
        }
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

    return (
        <div className="setting-subcomponent selector">

            <div className="setting-item">
                <InfoButton title={title} info={info} />
                <div className={`selector ${selectionMode}`}>
                    <div className="active-list">
                        {items.map((item) => (
                            <div key={item.id} className={`list-item${selectedItems.includes(item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
                                {itemCategory === "channel" ? (
                                    isChannel(item) && (
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
                                    )
                                ) : isRole(item) ? (
                                    <div className="role-color-wrapper">
                                        <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                        <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                    </div>
                                ) : null}
                                {item.name}
                            </div>
                        ))}
                        <button type="button" className={`add-button${selectionMode === "singular" && selectedItems.length > 0 ? " hidden" : ""}`} onClick={toggleDropdown} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>+ Add {itemCategory === "channel" ? "Channel" : "Role"}</button>
                    </div>
                    <div className={`inactive-list-wrapper${isDropdownActive ? " active" : ""}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                        <div className="inactive-list">
                        {items.map((item) => (
                            <div key={item.id} className={`list-item${selectedItems.includes(item.id) ? ' active' : ''}`} onClick={() => toggleItem(item.id)}>
                                {itemCategory === "channel" ? (
                                    isChannel(item) && (
                                        <div className="channel-icon-wrapper">
                                            <div className="channel-color">
                                                {item.type === 2 ? (
                                                    <svg className="channel-icon voice-chat" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" className=""></path><path fill="#7e828c" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" className=""></path></svg>
                                                ) : (
                                                    <svg className="channel-icon" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#7e828c" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" className=""></path></svg>
                                                )}
                                            </div>
                                        </div>
                                    )
                                ) : isRole(item) ? (
                                    <div className="role-color-wrapper">
                                        <div className="role-delete-color" style={{ backgroundColor: "#00FFFF" }}></div>
                                        <div className="role-color" style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}></div>
                                    </div>
                                ) : null}

                                <div className="item-name">
                                    { item.name }
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Selector;