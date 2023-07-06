import React from "react";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  saveText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__content">
        <button
          className="popup__close-button button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form-container popup__form-container_type_${name}`}
          action="#"
          name={`profile-${name}-form`}
          noValidate=""
          onSubmit={onSubmit}
        >
          {children}
          <button className="button popup__save-button" type="submit">
            {saveText}
          </button>
        </form>
      </div>
    </div>
  );
}
