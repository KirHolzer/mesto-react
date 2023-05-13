import {useState, useEffect} from 'react';
import avatar from '../images/Jacques-Yves-Cousteau.png';
import {api} from '../utils/api';
import Card from './Card';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    api.getInitialCards()
    .then((fetchedCards) => {
      setCards(fetchedCards)
    }).catch(error => console.log('Error: ', error));
  })

  useEffect(()=> {
    api.getUser()
    .then((user) => {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
    }).catch(error => console.log('Error: ', error));
  }, [])


  return (
    <main className="content">
    <section className="profile">
      <div className="profile__avatar-container">
        <img
          className="profile__avatar"
          src={userAvatar}
          alt="Изображение профиля"
        />
        <button className="profile__avatar-button" onClick={onEditAvatar}/>
      </div>
      <div className="profile__info">
        <div className="profile__title-container">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__profession">{userDescription}</p>
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
        {cards ? cards.map((card) => 
          <Card key={card._id} onCardClick={onCardClick} card={card}/>
        ): <h2>Ошибка при загрузке карточек</h2>}
      </ul>
    </section>
  </main>
  )
}
