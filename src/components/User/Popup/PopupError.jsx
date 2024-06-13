import './PopupUser.css'

function PopupError(props) {
	return (
		<section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__user-container">
				<img className="popup__image" alt="статус ответа" src={props.image} />
				<button className="popup__close-button" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
				<h2 className="popup__alert">{props.title}</h2>
			</div>
		</section>	
	)
}

export default PopupError;