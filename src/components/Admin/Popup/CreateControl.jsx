import "./Popup.css"
import React from "react";

function CreateControl(props) {
	const [name, setName] = React.useState('');
	const [nameError, setNameError] = React.useState('');
	const [subject, setSubject] = React.useState('Фронтенд');
	const [themes, setThemes] = React.useState('');
	const [resThemes, setResThemes] = React.useState('');
	const [themesError, setThemesError] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);

	function handleChangeName(evt) {
		if (evt.target.value !== '') {
			setName(evt.target.value)
			setNameError('')
		} else {
			setNameError('Название контрольной не может быть пустым')
			setName(evt.target.value)
		}
	}

	function handleChangeSubject(evt) {
		setSubject(evt.target.value)
	}

	function handleChangeTheme(evt) {
		setThemes(evt.target.value)
		if (evt.target.value !== '') {
			let s = evt.target.value
			let result = s.split(/[\s,;]+/);
			setResThemes(result)
			setThemesError('')
		} else {
			setThemesError('У контрольной должна быть хотя бы одна тема')
			setThemes('')
			setResThemes('')
		}
	}

	function handleSaveControl(evt) {
		evt.preventDefault()
		console.log(name, subject, resThemes)
		props.addControl(name, subject, resThemes)
	}

	function closePopup(evt) {
		setNameError('')
		setThemesError('')
		setName('')
		setThemes('')
		setResThemes('')
		setIsActive(false)
		setSubject('Фронтенд')
		props.onClose()
	}

	React.useEffect(() => {
		if (nameError || themesError) {
			setIsActive(false)
		} else if (name === '' || themes === '') {
			setIsActive(false)
		}	else {
			setIsActive(true)
			}
	}, [nameError, themesError, name, themes])

	// React.useEffect(() => {
	// 	setName('')
	// 	setThemes('')
	// 	setSubject('Фронтенд')
	// }, [])

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Создание контрольной</h3>
				<form className="popup__form" onSubmit={handleSaveControl}>
					<input className="popup__input" placeholder="Название контрольной" type="text" onInput={handleChangeName} value={name} />
					<span className="popup__error">{nameError}</span>
					<div className="popup__selection">
						<p className="popup__selection-title">Название предмета:</p>
						<select name="select" className="popup__selection-options" onChange={handleChangeSubject} value={subject}>
							<option className="popup__subject-option">Фронтенд</option>
							<option className="popup__subject-option">Бэкенд</option>
						</select>
					</div>
					<input className="popup__input" placeholder="Темы(а) контрольной" type="text" onChange={handleChangeTheme} value={themes}></input>
					<span className="popup__error">{themesError}</span>
					<div className="popup__adding">
						<span className="popup__error">{props.error}</span>
						<button type="submit" className={`popup__button ${isActive ? 'popup__button-active' : 'popup__button-disable'}`} disabled={!isActive}>Сохранить</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CreateControl