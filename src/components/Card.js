import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwnCard = card.owner._id === currentUser._id;
  const isCardLiked = card.likes.some((field) => field._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      <div className="elements__image-box" onClick={handleClick}>
        <img className="elements__image" src={card.link} alt={card.name} />
      </div>
      {isOwnCard && (
        <button
          className="button elements__delete-button"
          type="button"
          aria-label="Удалить элемент"
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__info-box">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__likes-container">
          <button
            className={`button elements__like-reaction ${
              isCardLiked && "elements__like-reaction_active"
            }`}
            type="button"
            aria-label="Добавить лайк"
            onClick={handleLikeClick}
          />
          <p className="elements__likes">{card.likes.length}</p>
        </div>
      </div>
      </>
  );
}
