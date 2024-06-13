import React from "react";
import './Questions.css'

function CardQuestions(props) {
  function handleDelete() {
    props.deleteQuestion(props.card._id)
  }
	return (
		<li className="questions__card" key={props.card._id}>
			<p className="question__text">{props.card.question}</p>
			<div className="question__action">
				<span className={`question__difficulty ${props.card.difficulty === 'легкий' ? `question__difficulty_easy` : props.card.difficulty === 'средний' ? `question__difficulty_normal` : `question__difficulty_hard`}`}>{props.card.difficulty}</span>
				<button className="question__button button__delete" type="button" onClick={handleDelete}></button>
				<button className="question__button button__edit" type="button"></button>
			</div>
		</li>
	)
}

export default CardQuestions