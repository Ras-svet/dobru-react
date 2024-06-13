import React from "react";
import './LabsUser.css'
import LabCard from "../LabCard/LabCard.jsx";
import { CurrentUserContext } from "../../../context/CurrentUserContext.js";

function Labs(props) {
  const [selectedSubject, setSelectedSubject] = React.useState('')
  const [selectedLab, setSelectedLab] = React.useState(null)
  
  function handleChangeSubject(evt) {
    setSelectedSubject(evt.target.value)
    setSelectedLab(null)
  }

  function handleChangeLab(evt) {
    setSelectedLab(evt.target.value)
  }

	return (
		<section className="user-labs">
     <div className="user-labs__filter">
				<select name="select" className="filter__select" onChange={handleChangeSubject}>
          <option className="filter__select-option" value=''>Название предмета</option>
          <option className="filter__select-option" value='Фронтенд'>Фронтенд</option>
          <option className="filter__select-option" value='Бэкенд'>Бэкенд</option>
				</select>
				<select name="select" className="filter__select" onChange={handleChangeLab}>
          <option className="filter__select-option" value=''>Название лабораторной</option>
          {props.labs.filter(lab => lab.subject === selectedSubject).map(lab => (
            <option className="filter__select-option" value={lab._id} key={lab._id}>{lab.name}</option>
          ))}
				</select>
			</div>
      <ul className="user-labs__cards">
        {selectedLab && props.labs.filter(item => item._id === selectedLab)[0].variants?.map((variant) => {
          return (
            <LabCard
            key={variant._id}
            card={variant}
            user={props.user}
            labId={selectedLab}
            lab={props.labs.filter(item => item._id === selectedLab)[0]}
            makeAppointment={props.makeAppointment}
            canselAppointment={props.canselAppointment}
            show={props.showVariant}
          />
          )
        })}
      </ul>
    </section>
	)
}

export default Labs;