import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
function DeleteCardPopup({isOpen, onClose, onDeleteCard, card}) {
    const currentUser = useContext(CurrentUserContext);
    const handleDeleteCard = (e) => {
        e.preventDefault();
        if(card.owner._id === currentUser._id) {
            onDeleteCard(card);
        } 
    }
    return (
        <PopupWithForm
        title="Вы уверены?"
        name="delete"
        button="Да"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDeleteCard}
         />
    )
}
export default DeleteCardPopup;