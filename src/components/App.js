import React from "react";
import "../index.css";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUser()
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error));

    api
      .getInitialCards()
      .then((fetchedCards) => {
        setCards(fetchedCards);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

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

  function handleCardLike(card) {
    const isCardLiked = card.likes.some(
      (field) => field._id === currentUser._id
    );

    if (isCardLiked) {
      api
        .removeLike(card._id)
        .then((likedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? likedCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else {
      api
        .putLike(card._id)
        .then((dislikedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? dislikedCard : c))
          );
        })
        .catch((error) => console.log(error));
    }
  }

  function handleCardDelete(card) {
    api
      .removeExistingCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateUser(profileInfo) {
    api
      .editProfile(profileInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        currentCard={currentCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены"
        isOpen={null}
        onClose={closeAllPopups}
        saveText="Да"
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
