import "./Popup.css"
import React from "react";

import "./Popup.css"

function CreateQuestion(props) {
  const [question, setQuiestion] = React.useState('')
  const [questionError, setQuestionError] = React.useState('')
  const [subject, setSubject] = React.useState('Фронтенд');
  const [difficulty, setDifficulty] = React.useState('легкий');
  const [type, setType] = React.useState('открытый вопрос');
  const [themes, setThemes] = React.useState('');
  const [themesError, setThemesError] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(null);
 const [error, setError] = React.useState('') 

  const addAnswerInput = () => {
    setAnswers([...answers, '']);
  };

  const handleCheckboxChange = (index) => {
    setCorrectAnswerIndex(index);
    setError('')
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  function handleChangeSubject(evt) {
    setSubject(evt.target.value)
  }

  function handleChangeDifficulty(evt) {
    setDifficulty(evt.target.value)
  }

  function handleChangeType(evt) {
    setType(evt.target.value)
  }

  function handleChangeTheme(evt) {
    setThemes(evt.target.value)
    if (evt.target.value !== '') {
      setThemesError('')
    } else {
      setThemesError('У вопроса должна быть хотя бы одна тема')
      setThemes('')
    }
  }

  function handleChangeQuestion(evt) {
    setQuiestion(evt.target.value)
    if (evt.target.value !== '') {
      setQuestionError('')
    } else {
      setQuestionError('Вопрос не может быть пустым')
      setQuiestion('')
    }
  }

  function handleCreateQuestion(evt) {
    evt.preventDefault()
    console.log(subject, themes, question, difficulty, type, answers, correctAnswerIndex !== null ? answers[correctAnswerIndex] : '')
    props.createQuestion(subject, themes, difficulty, question, type, answers, answers.length !== 0 ? answers[correctAnswerIndex] : '')
  }

  function closePopup(evt) {
    setQuestionError('')
    setThemesError('')
    setThemes('')
    setIsActive(false)
    setSubject('Фронтенд')
    setDifficulty('легкий')
    setType('открытый вопрос')
    setAnswers([])
    setCorrectAnswerIndex(null)
    setError('')
    setQuiestion('')
    props.onClose()
  }

  React.useEffect(() => {
    if (questionError || themesError) {
      setIsActive(false)
    } else if (question === '' || themes === '') {
      setIsActive(false)
    }	else if (type === 'с вариантами ответа' && correctAnswerIndex == null) {
      setIsActive(false)
      setError('Выберите правильный ответ')
    } else {
        setIsActive(true)
    }
  }, [questionError, themesError, question, themes, type, correctAnswerIndex])

  return (
    <section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={closePopup}></button>
        <h3 className="popup__title">Создание вопроса</h3>
        <form className="popup__form" onSubmit={handleCreateQuestion}>
          <div className="popup__selection">
            <p className="popup__selection-title">Название предмета:</p>
            <select name="select" className="popup__selection-options" onChange={handleChangeSubject} value={subject}>
              <option className="popup__subject-option">Фронтенд</option>
              <option className="popup__subject-option">Бэкенд</option>
            </select>
          </div>
          <input className="popup__input" placeholder="Темы(а) вопроса" type="text" onChange={handleChangeTheme} value={themes}></input>
          <textarea className="popup__textarea" placeholder="Впишите вопроса" type="text" onChange={handleChangeQuestion} value={question}></textarea>
          <div className="popup__selection">
            <p className="popup__selection-title">Сложность:</p>
            <select name="select" className="popup__selection-options" onChange={handleChangeDifficulty} value={difficulty}>
              <option className="popup__subject-option">легкий</option>
              <option className="popup__subject-option">средний</option>
              <option className="popup__subject-option">сложный</option>
            </select>
          </div>
          <div className="popup__selection">
            <p className="popup__selection-title">Тип вопроса:</p>
            <select name="select" className="popup__selection-options" onChange={handleChangeType} value={type}>
              <option className="popup__subject-option">открытый вопрос</option>
              <option className="popup__subject-option">с вариантами ответа</option>
            </select>
          </div>
          {type === 'с вариантами ответа' && (
          <>
            {answers.map((answer, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="popup__input"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Вариант ответа ${index + 1}`}
                />
                <input
                  type="checkbox"
                  checked={correctAnswerIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label>Правильный ответ</label>
              </div>
            ))}
            <p className="popup__add-answer-button" onClick={addAnswerInput}>
              <span className="popup__add-answer-button-icon">+</span>
              Добавить вариант ответа
            </p>
          </>
          )}
          <span className="popup__error">{themesError || questionError || error}</span>
          <div className="popup__adding">
            <span className="popup__error">{props.error}</span>
            <button type="submit" className={`popup__button ${isActive ? 'popup__button-active' : 'popup__button-disable'}`} disabled={!isActive}>Сохранить</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateQuestion