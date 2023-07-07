import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Изображение профиля"
          />
          <button className="profile__avatar-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="list elements__grid-table">
          {cards ? (
            cards.map((card) => (
              <li className="elements__grid-item">
                <Card
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  card={card}
                />
              </li>
            ))
          ) : (
            <h2>Ошибка при загрузке карточек</h2>
          )}
        </ul>
      </section>
    </main>
  );
}
