import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleAboutChange = (e) => {
    setAbout(e.target.value)
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      saveText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        id="title-input"
        type="text"
        name="name"
        placeholder="Имя"
        defaultValue={currentUser.name}
        onChange={handleNameChange}
        value={name}
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="popup__error title-input-error" />
      <input
        className="popup__input popup__input_type_job"
        id="job-input"
        type="text"
        name="job"
        placeholder="О себе"
        defaultValue={currentUser.about}
        onChange={handleAboutChange}
        value={about}
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className="popup__error job-input-error" />
    </PopupWithForm>
  );
}
