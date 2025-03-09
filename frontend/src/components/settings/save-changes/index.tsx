// src/pages/settings/save-changes
import { useEffect, useState, useRef } from "react";
import isEqual from "lodash/isEqual";


import './styles.scss';

interface SaveChangesProps {
  settings: any;
  onSave: (newSettings: any) => Promise<void>;
}

function SaveChanges({ settings, onSave }: SaveChangesProps) {

  const initialSettings = useRef(settings);
  const [showPopup, setShowPopup] = useState(false);
  const popupBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasChanges = !isEqual(initialSettings.current, settings);
    setShowPopup(hasChanges);
  }, [settings]);

  const handleSave = async () => {
    try {
      await onSave(settings);
      initialSettings.current = JSON.stringify(settings);
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  useEffect(() => {
    const updatePopupWidth = () => {
      if (popupBodyRef.current) {
        const container = popupBodyRef.current.closest(".container") as HTMLElement
        if (container) {
          const containerStyle = window.getComputedStyle(container);
          const containerPadding = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
  
          popupBodyRef.current.style.width = container.offsetWidth - containerPadding + "px";
          popupBodyRef.current.style.marginLeft = containerStyle.paddingLeft;
          popupBodyRef.current.style.marginRight = containerStyle.paddingRight;
        }
      }
    }
    updatePopupWidth()
    window.addEventListener("resize", updatePopupWidth)
    return () => window.removeEventListener("resize", updatePopupWidth)
  }, [])

  return (
    <div className="component save-changes">
      <div className={`component-body${showPopup ? " visible" : ""}`} ref={popupBodyRef}>
        <div className="component-title">
          <p>You have unsaved changes!</p>
        </div>
        <div className="component-buttons">

          {/* <button className="discard-button" /*onClick={onCancel}> */}
          {/*  Discard  */}
          {/* </button> */}

          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default SaveChanges;