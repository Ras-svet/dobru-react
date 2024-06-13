import "./Popup.css"
import React from "react";

function CreateLabVariant(props) {
	const [name, setName] = React.useState('');
	const [nameError, setNameError] = React.useState('');
	const [lab, setLab] = React.useState('Выбрать');
  const [labId, setLabId] = React.useState('')
  const [seats, setSeats] = React.useState('5')
  const [file, setFile] = React.useState(null)
  const [text, setText] = React.useState('')
  const [textError, setTextError] = React.useState('')
	const [isActive, setIsActive] = React.useState(false);

	function handleChangeName(evt) {
		if (evt.target.value !== '') {
			setName(evt.target.value)
			setNameError('')
		} else {
			setNameError('Название варианта лабораторной не может быть пустым')
			setName(evt.target.value)
		}
	}

  function handleChangeText(evt) {
		if (evt.target.value !== '') {
			setText(evt.target.value)
			setTextError('')
		} else {
			setTextError('Задание не может быть пустым')
			setText(evt.target.value)
		}
	}

	function handleChangeLab(evt) {
    setLab(evt.target.value)
    setLabId(evt.target.options[evt.target.selectedIndex].getAttribute('id'))
  }

  function handleChangeFile(evt) {
		setFile(evt.target.files[0])
    console.log(evt.target.files[0])
	}

  function handleChangeSeats(evt) {
    setSeats(evt.target.value)
  }

	function handleSaveLabVariant(evt) {
		evt.preventDefault()
    console.log(name, lab, text, seats, file)
    props.createLabVariant(labId, name, text, seats, file)
	}

	function closePopup(evt) {
		setNameError('')
    setTextError('')
		setName('')
    setSeats('5')
		setIsActive(false)
    setLabId('')
    setText('')
    setFile(null)
		setLab('Выбрать')
		props.onClose()
	}

	React.useEffect(() => {
		if (nameError || lab === 'Выбрать' || text === '') {
			setIsActive(false)
		} else if (name === '') {
			setIsActive(false)
		}	else {
			setIsActive(true)
			}
	}, [nameError, name, lab, text])

	// React.useEffect(() => {
	// 	setName('')
	// 	setThemes('')
	// 	setSubject('Фронтенд')
	// }, [])

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Создание варианта лабораторной</h3>
				<form className="popup__form" onSubmit={handleSaveLabVariant}>
					<input className="popup__input" placeholder="Название варианта" type="text" onInput={handleChangeName} value={name} />
					<span className="popup__error">{nameError}</span>
          <div className="popup__selection">
						<p className="popup__selection-title">Название лабораторной:</p>
						<select name="select" className="popup__selection-options popup__genarate-options" value={lab} onChange={handleChangeLab}>
							<option className="popup__subject-option popup__genarate-option">Выбрать</option>
							{props.labs.map(card => {
								return (
									<option className="popup__subject-option popup__genarate-option" key={card._id} id={card._id}>{card.name}</option>
								)
							})}
						</select>
					</div>
          <div className="popup__selection">
						<p className="popup__selection-title">Максимальное количество мест:</p>
						<input className="popup__input popup__input-number" type="text" value={seats} onChange={handleChangeSeats}/>
					</div>
          <textarea className="popup__textarea" placeholder="Напишите задание" type="text" onChange={handleChangeText} value={text}></textarea>
          <span className="popup__error">{textError}</span>
          <div className="popup__selection">
						<input className="popup__input-file" type="file" id="add__file" onChange={handleChangeFile}/>
            <label htmlFor="add__file" className="input__file"><span className={`input__file-span ${file === null ? '' : 'input__file-span_done'}`}>{`${file === null ? 'Выберите файл или архив' : 'Материалы загружены'}`}</span></label>
					</div>
					<div className="popup__adding">
						<span className="popup__error">{props.error}</span>
						<button type="submit" className={`popup__button ${isActive ? 'popup__button-active' : 'popup__button-disable'}`} disabled={!isActive}>Сохранить</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CreateLabVariant