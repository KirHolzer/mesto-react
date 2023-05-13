import React from 'react'

export default function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }  

  return (
    <li className="elements__grid-item" onClick={handleClick}>
  <div className="elements__image-box">
    <img className="elements__image" src={card.link} alt={card.name} />
  </div>
  <button
    className="button elements__delete-button"
    type="button"
    aria-label="Удалить элемент"
  />
  <div className="elements__info-box">
    <h2 className="elements__text">{card.name}</h2>
    <div className="elements__likes-container">
      <button
        className="button elements__like-reaction "
        type="button"
        aria-label="Добавить лайк"
      />
      <p className="elements__likes">{card.likes.length}</p>
    </div>
  </div>
</li>

  )
}
