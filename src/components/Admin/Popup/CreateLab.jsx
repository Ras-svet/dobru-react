import "./Popup.css"
import React from "react";

function CreateLab(props) {
  const currentDate = new Date().toISOString().split('T')[0];
	const [name, setName] = React.useState('');
	const [nameError, setNameError] = React.useState('');
	const [subject, setSubject] = React.useState('Фронтенд');
  const [deadline, setDeadline] = React.useState(currentDate)
  const [points, setPoints] = React.useState('15')
  const [penaltyPoints, setPenaltyPoints] = React.useState('2')
	const [isActive, setIsActive] = React.useState(false);

	function handleChangeName(evt) {
		if (evt.target.value !== '') {
			setName(evt.target.value)
			setNameError('')
		} else {
			setNameError('Название лабораторной не может быть пустым')
			setName(evt.target.value)
		}
	}

	function handleChangeSubject(evt) {
		setSubject(evt.target.value)
	}

  function handleChangeDate(evt) {
    setDeadline(evt.target.value)
  }

  function handleChangePoints(evt) {
    setPoints(evt.target.value)
  }

  function handleChangePenaltyPoints(evt) {
    setPenaltyPoints(evt.target.value)
  }

	function handleSaveLab(evt) {
		evt.preventDefault()
    console.log(name, subject, deadline, points, penaltyPoints)
		props.addLab(name, subject, deadline, points, penaltyPoints)
	}

	function closePopup(evt) {
		setNameError('')
		setName('')
    setDeadline(currentDate)
    setPoints('15')
		setIsActive(false)
    setPenaltyPoints('2')
		setSubject('Фронтенд')
		props.onClose()
	}

	React.useEffect(() => {
		if (nameError) {
			setIsActive(false)
		} else if (name === '') {
			setIsActive(false)
		}	else {
			setIsActive(true)
			}
	}, [nameError, name])

	// React.useEffect(() => {
	// 	setName('')
	// 	setThemes('')
	// 	setSubject('Фронтенд')
	// }, [])

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Создание лабораторной</h3>
				<form className="popup__form" onSubmit={handleSaveLab}>
					<input className="popup__input" placeholder="Название лабораторной" type="text" onInput={handleChangeName} value={name} />
					<span className="popup__error">{nameError}</span>
					<div className="popup__selection">
						<p className="popup__selection-title">Название предмета:</p>
						<select name="select" className="popup__selection-options" onChange={handleChangeSubject} value={subject}>
							<option className="popup__subject-option">Фронтенд</option>
							<option className="popup__subject-option">Бэкенд</option>
						</select>
					</div>
          <div className="popup__selection">
            <p className="popup__selection-title">Дедлайн:</p>
            <input className="popup__input" placeholder={currentDate} type="date" onInput={handleChangeDate} value={deadline} />
          </div>
          <div className="popup__selection">
						<p className="popup__selection-title">Максимальное количество баллов:</p>
						<input className="popup__input popup__input-number" type="text" value={points} onChange={handleChangePoints}/>
					</div>
          <div className="popup__selection">
						<p className="popup__selection-title">Штрафные баллы:</p>
						<input className="popup__input popup__input-number" type="text" value={penaltyPoints} onChange={handleChangePenaltyPoints}/>
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

export default CreateLab