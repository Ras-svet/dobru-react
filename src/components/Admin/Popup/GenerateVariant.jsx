import "./Popup.css"
import React from "react";

import "./Popup.css"

function GenerateVarinat(props) {
	const [isActive, setIsActive] = React.useState(false);
	const [controlName, setControlName] = React.useState('Выбрать');
	const [controlId, setControlId] = React.useState('');
	// const [easyCount, setEasyCount] = React.useState('0');
	// const [normalCount, setNormalCount] = React.useState('0');
	// const [hardCount, setHardCount] = React.useState('0');
	const easyCountRef = React.useRef('0');
	const normalCountRef = React.useRef('0');
	const hardCountRef = React.useRef('0')

	function handleChangeName(evt) {
		if (evt.target.value === 'Выбрать') {
			setControlName(evt.target.value)
			setIsActive(false)
			setControlId('')
		} else {
			setControlName(evt.target.value)
			setIsActive(true)
			setControlId(evt.target.options[evt.target.selectedIndex].getAttribute('id'))
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault()
		let easy = easyCountRef.current.value
		let normal = normalCountRef.current.value
		let hard = hardCountRef.current.value
		console.log({
			controlName, controlId, easy, normal, hard
		})
		props.generateVariant(controlName, controlId, easy, normal, hard)
	} 

	function closePopup(evt) {
		setControlId('')
		setControlName('')
		// setEasyCount('0')
		// setHardCount('0')
		// setNormalCount('0')
		props.onClose()
	}

	// React.useEffect(() => {
	// 	if (controlNameError) {
	// 		setIsActive(false)
	// 	} else if (easyCountRef === '0' && normalCountRef === '0' && hardCountRef === '0') {
	// 		setIsActive(false)
	// 	}	else {
	// 		setIsActive(true)
	// 		}
	// }, [controlNameError, easyCountRef, normalCountRef, hardCountRef])

	React.useEffect(() => {
		easyCountRef.current.value = '0';
		normalCountRef.current.value = '0';
		hardCountRef.current.value = '0';
	}, [props.isOpened])

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Генерация варианта</h3>
				<form className="popup__form" onSubmit={handleSubmit}>
					<div className="popup__selection">
						<p className="popup__selection-title">Название контрольной:</p>
						<select name="select" className="popup__selection-options popup__genarate-options" value={controlName} onChange={handleChangeName}>
							<option className="popup__subject-option popup__genarate-option">Выбрать</option>
							{props.controls.map(card => {
								return (
									<option className="popup__subject-option popup__genarate-option" key={card._id} id={card._id}>{card.name}</option>
								)
							})}
						</select>
					</div>
					<div className="popup__selection">
						<p className="popup__selection-title">Количество простых вопросов:</p>
						<input className="popup__input popup__input-number" type="text" ref={easyCountRef} />
					</div>
					<div className="popup__selection">
						<p className="popup__selection-title">Количество умеренных вопросов:</p>
						<input className="popup__input popup__input-number" type="text" ref={normalCountRef} />
					</div>
					<div className="popup__selection">
						<p className="popup__selection-title">Количество сложных вопросов:</p>
						<input className="popup__input popup__input-number" type="text" ref={hardCountRef} />
					</div>
					<button type="submit" className={`popup__button ${isActive ? 'popup__button-active' : 'popup__button-disable'}`} disabled={!isActive}>Сгенерировать</button>
				</form>
			</div>
		</section>
	)
}

export default GenerateVarinat