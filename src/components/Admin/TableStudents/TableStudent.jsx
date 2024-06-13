import React from "react"
import '../Card/Card.css'

function TableStudent(props) {

  function handleAddAccess() {
    props.addAccess(props.student._id)
  }

  function handleDeleteAccess() {
    props.deleteAccess(props.student._id)
  }

  return (
    <li className="student__card card" key={props.student._id}>
      <p className="card__title">{props.student.firstName} {props.student.lastName}</p>
      <div className="student__info">
        <span className="card__text">Группа:</span>
        <p className="card__text">{props.student.group}</p>
        <span className="card__text">Telegram:</span>
        <a className="card__text" href={props.student.telegram} target="_blank" rel="noreferrer">{props.student.telegram}</a>
        <span className="card__text">GitHub:</span>
        <a className="card__text" href={props.student.github} target="_blank" rel="noreferrer">{props.student.github}</a>
        <span className="card__text">Доступ:</span>
        <p className="card__text">{props.student.role === 'user' ? 'Есть' : 'Нет'}</p>
      </div>
      {props.student.role === '' && <div className="student__action">
        <button className="student__action-button" alt="подтвердить наличие доступа" onClick={handleAddAccess}/>
        <span className="student__action-tooltip">Подтвердить доступ пользователя</span>
      </div>}
      {props.student.role === 'user' && <div className="student__action">
        <button className="student__action-button delete" alt="отменить наличие доступа" onClick={handleDeleteAccess}/>
        <span className="student__action-tooltip">Отменить доступ пользователя</span>
      </div>}
    </li>
  )
}

export default TableStudent