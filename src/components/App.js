import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { React, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  return (
    <div className="page">
    <div className="page__content">
    <Header />
    <Main
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    />
    <Footer />
    
    <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
    >
    <input className="popup__input popup__input_name"
     name="name"
     id="input-name"
     type="text"
     required
     minLength={2}
     maxLength={40}
     placeholder="Введите имя"
     />
              <span className="popup__error input-name-error"></span>
    <input className="popup__input popup__input_description"
     name="about"
     id="input-description"
     type="text"
     required
     minLength={2}
     maxLength={200}
     placeholder="О себе" />
                <span className="popup__error input-description-error"></span>
    </PopupWithForm>

    <PopupWithForm
        title="Новое место"
        name="add"
        button="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
    >
    <input className="popup__input popup__input_place" 
    name="name"
    id="input-place"
    type="text"
    required
    minLength={2} 
    maxLength={30} 
    placeholder="Название" />
            <span className="popup__error input-place-error"></span>
    <input className="popup__input popup__input_href"
    name="link"
    id="input-href"
    type="url"
    required
    placeholder="Ссылка на картинку" />
            <span className="popup__error input-href-error"></span>
    </PopupWithForm>

    <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            button="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
    >
    <input className="popup__input popup__input_avatar"
    name="avatar"
    id="input-avatar"
    type="url"
    required
    placeholder="Ссылка на картинку" />
            <span className="popup__error input-avatar-error"></span>
    </PopupWithForm>

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    <div className="popup popup-delete">
        <div className="popup__main-container">
            <button className="popup__close"></button>
            <form className="popup__form" name="form-add" noValidate action="#">
                <h2 className="popup__heading">Вы уверены?</h2>
                <fieldset className="popup__input-container">
                    <button className="popup__submit-button" type="submit">Да</button>
                </fieldset>
            </form>
        </div>
      </div>

    </div>
  </div>
  );
}

export default App;
