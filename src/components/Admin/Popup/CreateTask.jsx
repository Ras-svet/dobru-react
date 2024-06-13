import "./Popup.css"
import React from "react";

function CreateTask(props) {
  const currentDate = new Date().toISOString().split('T')[0];
	const [name, setName] = React.useState('');
  const [deadline, setDeadline] = React.useState(currentDate)
	const [nameError, setNameError] = React.useState('');
  const [subject, setSubject] = React.useState('Фронтенд');
  const [seats, setSeats] = React.useState('5')
  const [file, setFile] = React.useState(null)
  const [text, setText] = React.useState('')
  const [textError, setTextError] = React.useState('')
  const [points, setPoints] = React.useState('5')
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

  function handleChangeDate(evt) {
    setDeadline(evt.target.value)
  }

  function handleChangePoints(evt) {
    setPoints(evt.target.value)
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

  function handleChangeFile(evt) {
		setFile(evt.target.files[0])
    console.log(evt.target.files[0])
	}

  function handleChangeSeats(evt) {
    setSeats(evt.target.value)
  }

	function handleSaveTask(evt) {
		evt.preventDefault()
    console.log(name, text, seats, subject, deadline, points, file)
    props.createTask(name, text, seats, subject, deadline, points, file)
	}

  function handleChangeSubject(evt) {
		setSubject(evt.target.value)
	}

	function closePopup(evt) {
		setNameError('')
    setTextError('')
		setName('')
    setPoints('5')
    setDeadline(currentDate)
    setSeats('5')
    setFile(null)
		setIsActive(false)
    setSubject('Фронтенд')
    setText('')
		props.onClose()
	}

	React.useEffect(() => {
		if (nameError || text === '') {
			setIsActive(false)
		} else if (name === '') {
			setIsActive(false)
		}	else {
			setIsActive(true)
			}
	}, [nameError, name, text])

	// React.useEffect(() => {
	// 	setName('')
	// 	setThemes('')
	// 	setSubject('Фронтенд')
	// }, [])

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Создание дополнительного задания</h3>
				<form className="popup__form" onSubmit={handleSaveTask}>
					<input className="popup__input" placeholder="Название" type="text" onInput={handleChangeName} value={name} />
					<span className="popup__error">{nameError}</span>
          <div className="popup__selection">
						<p className="popup__selection-title">Название предмета:</p>
						<select name="select" className="popup__selection-options" onChange={handleChangeSubject} value={subject}>
							<option className="popup__subject-option">Фронтенд</option>
							<option className="popup__subject-option">Бэкенд</option>
						</select>
					</div>
          <div className="popup__selection">
						<p className="popup__selection-title">Максимальное количество мест:</p>
						<input className="popup__input popup__input-number" type="text" value={seats} onChange={handleChangeSeats}/>
					</div>
          <textarea className="popup__textarea" placeholder="Напишите задание" type="text" onChange={handleChangeText} value={text}></textarea>
          <span className="popup__error">{textError}</span>
          <div className="popup__selection">
            <p className="popup__selection-title">Дедлайн:</p>
            <input className="popup__input" placeholder={currentDate} type="date" onInput={handleChangeDate} value={deadline} />
          </div>
          <div className="popup__selection">
						<p className="popup__selection-title">Максимальное количество баллов:</p>
						<input className="popup__input popup__input-number" type="text" value={points} onChange={handleChangePoints}/>
					</div>
          <div className="popup__selection">
						<input className="popup__input-file" type="file" id="add__file-task" onChange={handleChangeFile}/>
            <label htmlFor="add__file-task" className="input__file"><span className={`input__file-span ${file === null ? '' : 'input__file-span_done'}`}>{`${file === null ? 'Выберите файл или архив' : 'Материалы загружены'}`}</span></label>
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

export default CreateTask