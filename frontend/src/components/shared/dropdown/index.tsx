import React, { useState } from "react";
import "./styles.scss";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  classname?: string;
}

import DropdownIcon from "../../../assets/img/icons/arrow-closed.svg"

const Dropdown = ({ title, children, classname }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`component dropdown-component${classname ? ` ${classname}` : ""}`}>
      <button className={`dropdown-header${isOpen ? ` active` : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <img className="dropdown-icon" src={DropdownIcon} alt="dropdown icon" />
      </button>
      <div className={`dropdown-content ${isOpen ? ` active` : ""}`}>{children}</div>
    </div>
  );
};

export default Dropdown;
