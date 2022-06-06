function Card({card, onCardClick}) {
    const handleCardClick = () => {
        onCardClick(card)
    }
    return (
        <article className="elements__item element">
        <button className="element__trash"></button>
        <img className="element__image"
         src={`${card.link}`}
         alt={`${card.name}`}
         onClick={handleCardClick}
         />
        <div className="element__info">
            <h2 className="element__name">{`${card.name}`}</h2>
            <div className="element__wrapper">
            <button className="element__like"></button>
            <span className="element__count">{`${card.likes.length}`}</span>
            </div>
        </div>
        </article>
    )
}
export default Card;