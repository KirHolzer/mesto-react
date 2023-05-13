import React from 'react';
import '../index.css'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setCurrentCard(card);
  }
  

  return (
    <>
      <Header/>
      <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      />
      <Footer/>

      <PopupWithForm 
      name="edit" 
      title='Редактировать профиль' 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      saveText='Сохранить'>
      <input
      className="popup__input popup__input_type_name"
      id="title-input"
      type="text"
      name="name"
      placeholder="Имя"
      defaultValue="Жак-Ив Кусто"
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
      defaultValue="Исследователь океана"
      minLength={2}
      maxLength={200}
      required=""
    />
    <span className="popup__error job-input-error" />
    </PopupWithForm>

  <PopupWithForm 
  name="new-place" 
  title="Новое место"
  isOpen={isAddPlacePopupOpen} 
  onClose={closeAllPopups}
  saveText="Создать"
  >
  <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          name="name"
          placeholder="Название"
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
          required=""
        />
        <span className="popup__error url-input-error" />
  </PopupWithForm>

  <PopupWithForm 
  name="delete-card" 
  title="Вы уверены" 
  isOpen={null} 
  onClose={closeAllPopups} 
  saveText='Да'/>

  <PopupWithForm 
  name="new-avatar" 
  title="Обновить аватар" 
  isOpen={isEditAvatarPopupOpen} 
  onClose={closeAllPopups} 
  saveText='Сохранить'>
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
        />
        <span className="popup__error link-input-error" />
  </PopupWithForm>

  <ImagePopup currentCard={currentCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
</>
);
}

export default App;
