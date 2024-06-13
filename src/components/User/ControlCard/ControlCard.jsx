import userApi from '../../../utils/userApi'
import './ControlCard.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ControlCard(props) {
  const navigate = useNavigate();

  function handleGetVariant() {
    userApi.getControl(props.card._id)
    .then((variant) => {
      navigate(`/user/controls/${variant._id}`, { state: { card: props.card, variant: variant } })
    })
    .catch((err) => {
      console.log(err, err.message)
    })
  }

  return (
    <>
			<div className="card">
				<h1 className="card__title">{props.card.name}</h1>
				<div className="card__info">
					<p className="card__text">Предмет: {props.card.subject}</p>
					<p className="card__text" title={props.card.themes.length > 0 ? props.card.themes.join(', ') : props.card.themes}>Тематика: {props.card.themes.length > 0 ? props.card.themes.join(', ') : props.card.themes}</p>
				</div>
				<div className="card__buttons">
					<button className="user-card__button" type="button" onClick={handleGetVariant}>Приступить к выполнению</button>
				</div>
			</div>
		</>
  )
}

export default ControlCard