import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const handleAddPlaceSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: title,
            link: link
        })
        setTitle('');
        setLink('');
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleLink = (e) => {
        setLink(e.target.value)
    }
    return (
        <PopupWithForm
        title="Новое место"
        name="add"
        buttonText="Сохранить"
        buttonLoadingText="Сохранение..."
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddPlaceSubmit}
        isLoading={isLoading}
        >
    <input className="popup__input popup__input_place" 
    name="name"
    id="input-place"
    type="text"
    required
    value={title || ''}
    minLength={2} 
    maxLength={30} 
    placeholder="Название"
    onChange={handleTitle}
    />
            <span className="popup__error input-place-error"></span>
    <input className="popup__input popup__input_href"
    name="link"
    id="input-href"
    type="url"
    required
    value={link || ''}
    placeholder="Ссылка на картинку"
    onChange={handleLink}
    />
            <span className="popup__error input-href-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup;