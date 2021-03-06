import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React, { useState } from 'react';
import EditProfilePopup from './EditProfilePopup';
import { useEffect } from 'react';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
        .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
  }, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeleteCard({});
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleDeleteCardClick = (card) => {
    setDeleteCardPopupOpen(true);
    setDeleteCard(card);
  }
  const handleCardLike = (id, isLiked) => {
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api.delete(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c))
    })
    .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    closeAllPopups();
  }
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api.setUserInfoApi(data)
      .then(data => {
        setCurrentUser(data);
      })
        .catch(err => console.log(err))
          .finally(() => setIsLoading(false));
        closeAllPopups();
  }
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.handleAvatar(data)
      .then(data => {
        setCurrentUser(data);
      })
        .catch(err => console.log(err))
          .finally(() => setIsLoading(false));
        closeAllPopups();
  }
  const onAddPlace = (data) => {
    setIsLoading(true);
    api.addUserCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
        .catch(err => console.log(err))
          .finally(() => setIsLoading(false));
        closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <div className="page__content">
    <Header />
    <Main
    cards={cards}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleDeleteCardClick}
    />
    <Footer />

    <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
    isLoading={isLoading}
    />

    <EditAvatarPopup
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
    isLoading={isLoading}
    />
    
    <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlace={onAddPlace}
    isLoading={isLoading}
    />

    <DeleteCardPopup
    card={deleteCard}
    isOpen={isDeleteCardPopupOpen}
    onClose={closeAllPopups}
    onDeleteCard={handleCardDelete}
    isLoading={isLoading}
    />

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    <div className="popup popup-delete">
        <div className="popup__main-container">
            <button className="popup__close"></button>
            <form className="popup__form" name="form-add" noValidate action="#">
                <h2 className="popup__heading">???? ???????????????</h2>
                <fieldset className="popup__input-container">
                    <button className="popup__submit-button" type="submit">????</button>
                </fieldset>
            </form>
        </div>
      </div>

    </div>
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
