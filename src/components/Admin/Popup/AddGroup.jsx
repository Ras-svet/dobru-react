import "./Popup.css"
import React from "react";
import api from "../../../utils/api";
import { useLocation } from "react-router-dom";

function AddGroup(props) {
	const addingGroup = React.useRef('');
	const [groupError, setGroupError] = React.useState('')
	const [isActive, setIsActive] = React.useState(false);
	const [groups, setGroups] = React.useState(props.card?.groups)
  const {pathname} = useLocation()

	React.useEffect(() => {
		setGroups(props.card?.groups)
		addingGroup.current.value= ''
		setGroupError('')
		setIsActive(false)
	}, [props.isOpened])

	function closePopup(evt) {
		props.onClose()
		window.location.reload()
	}

	function deleteGroup(evt) {
    if (pathname === '/admin') {
      api.deleteGroup(props.card._id, evt.target.value)
      .then((result) => {
        const newGroups = groups.filter(item => item !== evt.target.value)
        setGroups(newGroups)
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (pathname === '/admin/labs') {
      api.deleteGroupFromLab(props.card._id, evt.target.value)
      .then((result) => {
        const newGroups = groups.filter(item => item !== evt.target.value)
        setGroups(newGroups)
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (pathname === '/admin/tasks') {
      api.deleteGroupFromTask(props.card._id, evt.target.value)
      .then((result) => {
        const newGroups = groups.filter(item => item !== evt.target.value)
        setGroups(newGroups)
      })
      .catch((err) => {
        console.log(err)
      })
    }
	}

	function addGroup(evt) {
		evt.preventDefault()
		let addingGroups = addingGroup.current.value
		let refactorGroups =  addingGroups.split(/[\s,;]+/);
    if (pathname === '/admin') {
      api.addGroup(props.card._id, refactorGroups)
      .then((result) => {
        setGroups(result.groups)
      })
      .catch((err) => {
        setGroupError(err.error)
      })
    } else if (pathname === '/admin/labs') {
      api.addGroupToLab(props.card._id, refactorGroups)
      .then((result) => {
        setGroups(result.groups)
      })
      .catch((err) => {
        setGroupError(err.error)
      })
    } else if (pathname === '/admin/tasks') {
      api.addGroupToTask(props.card._id, refactorGroups)
      .then((result) => {
        setGroups(result.groups)
      })
      .catch((err) => {
        setGroupError(err.error)
      })
    }
	}

	function handleChangeGroup(evt) {
		setGroupError('')
		if (evt.target.value !== '') {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}

	return (
		<section className={`popup ${props.isOpened ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button type="button" className="popup__close-button" onClick={closePopup}></button>
				<h3 className="popup__title">Контрольная доступна для следующих групп</h3>
				<ul className="popup__list">
					{props.card.length !== 0 && groups?.map((group) => {
						return (
						<li key={group} className="popup__point">{group}
							<button className="popup__delete-button" value={group} onClick={deleteGroup}></button>
						</li>
					)})}
				</ul>
				<form className="popup__form" onSubmit={addGroup}>
					<div className="popup__group">
						<input className="popup__input" placeholder="Напишите группу(ы)" type="text" ref={addingGroup} onChange={handleChangeGroup}/>
						<button type="submit" className={`popup__button popup__button-group ${isActive ? 'popup__button-active' : 'popup__button-disable'}`} disabled={!isActive}>Добавить</button>
						<span className="popup__error popup__error-group">{groupError}</span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default AddGroup