import React from "react"
import './LabCard.css'
import { useLocation } from "react-router-dom"

function LabCard(props) {
  const hasAppoint= props.card?.students?.some(student => student._id === props.user?._id)
  const {pathname} = useLocation()

  function handleMakeAppointment(evt) {
    evt.stopPropagation()
    if (pathname === '/user/tasks') {
      props.makeAppointment(props.card._id)
    } else {
      props.makeAppointment(props.labId, props.card._id)
    }
  }

  function handleCanselAppointment(evt) {
    evt.stopPropagation()
    if (pathname === '/user/tasks') {
      props.canselAppointment(props.card._id)
    } else if (pathname === '/user'){
      props.canselAppointment(props.labId, props.card._id)
    } else if (props.profile === 'labs') {
      props.canselAppointment(props.lab._id, props.card._id)
    } else {
      props.canselAppointment(props.card._id)
    }
  }

  function handleShowVariant() {
    if (pathname === '/user/tasks') {
      props.show(props.card)
    } else if (pathname === '/user') {
      props.show(props.lab, props.card)
    } else if (props.profile === 'labs') {
      props.show(props.lab, props.card)
    } else {
      props.show(props.card)
    }
  }

  return (
    <li className={`user-labs__card ${hasAppoint ? 'user-labs__card-appointed' : ''}`} onClick={handleShowVariant}>
      <p className={`user-labs__card-text ${hasAppoint ? 'user-labs__card-text_bold' : ''}`}>{props.card.nameVariant ? props.card.nameVariant : props.card.name}</p>
      <div className="user-labs__card-action">
        <span className={`user-labs__card-status ${hasAppoint ? 'user-labs__card-status_white' : ''} ${props.card.students.length < Number(props.card.seats) ? 'good' : 'bad'}`}>{props.card.students.length}/{props.card.seats} мест</span>
        {props.card.students.length !== Number(props.card.seats) && !hasAppoint && <button className="user-labs__card-button button_appoint" type="button" onClick={handleMakeAppointment}></button>}
        {hasAppoint && <button className="user-labs__card-button button_disappoint" type="button" onClick={handleCanselAppointment}></button>}
        {props.card.students.length === Number(props.card.seats) && !hasAppoint && <button className="user-labs__card-button" type="button"></button>}
      </div>
    </li>
  )
}

export default LabCard