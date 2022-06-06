import React, { useEffect, useState } from 'react';
import Card from './Card';
import buttonIcon from '../images/add-button.png'
import api from '../utils/Api';
function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getAllData()
            .then(([cards, data]) => {
                setUserName(data.name)
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
                setCards(cards)
            })
            .catch(err => console.log(err))
    }, [])
    return (
    <main className="main">
    <section className="profile">
        <div className="profile__item">
            <div className="profile__item-wrapper">
                <button className="profile__avatar-button" onClick={onEditAvatar} ></button>
                <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}><img src={buttonIcon} alt="значок плюса" /></button>
    </section>
    <section className="elements">
        {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
    </section>
    </main>
    )
}
export default Main;