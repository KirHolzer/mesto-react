import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm
      name="new-place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      saveText="Создать"
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Название"
        onChange={handleNameChange}
        value={name || ''}
        minLength={2}
        maxLength={30}
        required=""
      />
      <span className="popup__error name-input-error" />
      <input
        className="popup__input popup__input_type_job"
        id="url-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        value={link || ''}
        required=""
      />
      <span className="popup__error url-input-error" />
    </PopupWithForm>
  );
}
