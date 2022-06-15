import { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const [avatar, setAvatar] = useState('');
    const avatarRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
        setAvatar('');
    }
    const handleAvatar = (e) => {
        setAvatar(e.target.value);
    }
    return (
        <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        button="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <input className="popup__input popup__input_avatar"
        name="avatar"
        id="input-avatar"
        type="url"
        required
        ref={avatarRef}
        onChange={handleAvatar}
        value={avatar || ''}
        placeholder="Ссылка на картинку" />
                <span className="popup__error input-avatar-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;