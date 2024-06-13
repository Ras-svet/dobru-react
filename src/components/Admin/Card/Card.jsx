import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import "./Card.css"
import {formatDate} from '../../../utils/dateUtils'

function Card(props) {
	const countVariant = props.variants? props.variants.filter((card) => card.controlName === props.card.name).length : props.variantsLabs ? props.variantsLabs.length : '';
	const navigate = useNavigate();
  const {pathname} = useLocation()

	function handleShowVariant() {
		let variants = props.variants ? props.variants.filter((card) => card.controlName === props.card.name) : props.variantsLabs
		props.variants ? navigate(`/admin/controls/variant/${variants[0]._id}`, { state: { card: props.card, number: 1, variants: variants, variant: variants[0] } }) : props.variantsLabs ? navigate(`/admin/labs/variant/${variants[0]._id}`, { state: { card: props.card, number: 1, variants: variants, variant: variants[0] } }) : pathname === '/admin/tasks' ? navigate(`/admin/tasks/${props.card._id}`, { state: { card: props.card } }) : navigate(`/admin/check/${props.card._id}`, {state: {card: props.card}})
	}

	function handleAddGroup() {
		props.addGroup(props.card)
	}

  function handleDelete() {
    props.delete(props.card._id)
  }

	return (
		<>
			<div className="card">
        {pathname !== '/admin/check' && <button type="button" className="card__delete-button" onClick={handleDelete}></button>}
        {pathname !== '/admin/check' && <span className="card__action-tooltip">Удалить карточку</span>}
				<h1 className="card__title">{props.card.name || props.card.controlId?.name}</h1>
				<div className="card__info">
					{pathname !== '/admin/check' && <p className="card__text">Предмет: {props.card.subject}</p>}
					{(props.card.themes !== undefined || props.card.controlId?.themes !== undefined) && (
            <p className="card__text" title={(props.card.themes || props.card.controlId?.themes)?.length > 0 ? (props.card.themes || props.card.controlId?.themes).join(', ') : (props.card.themes || props.card.controlId?.themes)}>
              Тематика: {(props.card.themes || props.card.controlId?.themes)?.length > 0 ? (props.card.themes || props.card.controlId?.themes).join(', ') : (props.card.themes || props.card.controlId?.themes)}
            </p>
          )}
					{pathname !== '/admin/check' && countVariant !== '' && <p className="card__text">Количество вариантов: {countVariant}</p>}
          {pathname !== '/admin/check' && props.card.deadline !== undefined && <p className="card__text">Дедлайн: {formatDate(props.card.deadline)}</p>}
					{pathname !== '/admin/check' && <p className="card__text" title={props.card.groups?.length > 0 ? props.card.groups.join(', ') : 'не выбрано'}>Открыто для: {props.card.groups?.length > 0 ? props.card.groups.join(', ') : 'не выбрано'}</p>}
          {pathname === '/admin/check' && <p className="card__text">Студент: {props.card.userId.firstName} {props.card.userId.lastName}</p>}
          {pathname === '/admin/check' && <p className="card__text">Баллы по автопроверке: {props.card.points}</p>}
          {pathname === '/admin/check' && props.card.checkedPoints !== '0' && <p className="card__text">Окончательные баллы: {props.card.checkedPoints}</p>}
				</div>
        {pathname === '/admin/check' && <button className="card__button" type="button" onClick={handleShowVariant}>Проверить</button>}
				<div className="card__buttons">
					{pathname !== '/admin/check' && <button className="card__button" type="button" onClick={handleShowVariant}>Посмотреть</button>}
					{pathname !== '/admin/check' && <button className="card__add-group" onClick={handleAddGroup}></button>}
				</div>
			</div>
		</>
	)
}

export default Card;