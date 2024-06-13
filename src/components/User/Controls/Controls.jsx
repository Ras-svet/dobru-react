import './Controls.css'
import React from 'react'
import ControlCard from '../ControlCard/ControlCard'

function Controls(props) {
  const [selectedSubject, setSelectedSubject] = React.useState('Фронтенд')

  function handleChangeSubject(evt) {
    setSelectedSubject(evt.target.value)
  }

  const cards = props.controls.filter(card => !props.controlMarks.some(controlMark => String(controlMark.controlId._id) === String(card._id)) && card.subject === selectedSubject);

  return (
    <section className="user-controls">
      <select name="select" className="filter__select" value={selectedSubject} onChange={handleChangeSubject}>
        <option className="filter__select-option" value='Фронтенд'>Фронтенд</option>
        <option className="filter__select-option" value='Бэкенд'>Бэкенд</option>
      </select>
      <ul className="user-controls__cards">
        {cards.map((card) => {
          return (
          <ControlCard 
            key={card._id}
            card={card}
          />
          )
        })}
      </ul>
    </section>
  )
}

export default Controls