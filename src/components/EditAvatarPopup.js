import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.createRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      saveText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_job"
        id="link-input"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        defaultValue=""
        minLength={2}
        maxLength={200}
        required=""
        ref={avatarRef}
      />
      <span className="popup__error link-input-error" />
    </PopupWithForm>
  );
}
