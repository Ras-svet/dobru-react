import React from "react";
import plusIcon from "../../../images/плюсик.svg"
import "./Questions.css"
import CardQuestions from "./CardQuestions";

function Questions(props) {
	const [selected, setSelected] = React.useState('Фронтенд');
	const [cards, setCards] = React.useState(props.cards)
	const [filteredCards, setFilteredCards] = React.useState([])
	const [cardsCounted, setCardsCounted] = React.useState(6)

  React.useEffect(() => {
		setCards(props.cards)
		setCardsCounted(6)
	}, [props.cards])

	function handleSelectSubject(evt) {
		setSelected(evt.target.value)
		if (evt.target.value === '') {
			setCards(props.cards)
			setFilteredCards(props.cards)
			setCardsCounted(6)
		} else {
			const filteredCards = cards.length > 0? cards.filter(item => item.subject === evt.target.value) : props.cards.filter(item => item.subject === evt.target.value)
			setCards(filteredCards)
			setFilteredCards(filteredCards)
			setCardsCounted(6)
		}
	}

	function handleSelectDifficulty(e) {
		if (e.target.value.length === 0) {
			setCardsCounted(6)
			return setCards(filteredCards.length > 0 ? filteredCards : props.cards)
		}
		setCardsCounted(6)
		const cardsSearch = filteredCards.length > 0 ? filteredCards.filter(item => item.difficulty === e.target.value) : props.cards.filter(item => item.difficulty === e.target.value)
		setCards(cardsSearch)
	}

	function addMore() {
		setCardsCounted(prev => prev + 5)
	}

	// React.useEffect(()=> {
	// 	setCards(filteredCards)
	// }, [filteredCards])

	const cardsSplited = cards?.slice(0, cardsCounted)

	return (
		<section className="questions">
			<div className="panel__action">
				<img className="panel__icon" src={plusIcon} alt="добавить контрольную" />
				<p className="panel__do" onClick={props.openCreateQuestion}>Добавить вопрос</p>
			</div>
			<div className="questions__filter">
				<select name="select" className="filter__select" onChange={handleSelectSubject}>
							<option className="filter__select-option" value=''>Название предмета</option>
							<option className="filter__select-option" value='Фронтенд'>Фронтенд</option>
							<option className="filter__select-option" value='Бэкенд'>Бэкенд</option>
				</select>
				<select name="select" className="filter__select" onChange={handleSelectDifficulty}>
							<option className="filter__select-option" value=''>Сложность</option>
							<option className="filter__select-option" value='легкий'>Легко</option>
							<option className="filter__select-option" value='средний'>Нормально</option>
							<option className="filter__select-option" value='сложный'>Сложно</option>
				</select>
			</div>
			<ul className="questions__list">
				{cardsSplited?.map((card) => {
					return (
						<CardQuestions
						key={card._id}
						card={card}
            deleteQuestion={props.deleteQuestion}
						/>
					)
				})}
				</ul>
				{cardsSplited.length >0 && cardsSplited.length !== cards.length && <button type="button" className="cards__more" onClick={addMore}>Ещё</button>}
		</section>
	)
}

export default Questions