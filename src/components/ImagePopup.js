import React from "react";

export default function ImagePopup({ currentCard, onClose, isOpen }) {
  return (
    <div className={`popup popup_type-image ${isOpen && "popup_opened"}`}>
      <figure className="popup__image-container">
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={currentCard.link}
          alt={currentCard.name}
        />
        <figcaption className="popup__image-caption">
          {currentCard.name}
        </figcaption>
      </figure>
    </div>
  );
}
