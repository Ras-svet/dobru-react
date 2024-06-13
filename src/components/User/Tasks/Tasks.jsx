import React from "react";
import './TasksUser.css'
import LabCard from "../LabCard/LabCard.jsx";
import { CurrentUserContext } from "../../../context/CurrentUserContext.js";

function Tasks(props) {
  const [selectedSubject, setSelectedSubject] = React.useState('Фронтенд')
  const currentUser = React.useContext(CurrentUserContext);
  
  function handleChangeSubject(evt) {
    setSelectedSubject(evt.target.value)
  }

	return (
		<section className="user-labs">
     <div className="user-labs__filter">
				<select name="select" className="filter__select" onChange={handleChangeSubject}>
          <option className="filter__select-option" value='Фронтенд'>Фронтенд</option>
          <option className="filter__select-option" value='Бэкенд'>Бэкенд</option>
				</select>
			</div>
      <ul className="user-labs__cards">
        {selectedSubject && props.tasks.filter(item => item.subject === selectedSubject).map((task) => {
          return (
            <LabCard
            key={task._id}
            card={task}
            user={props.user}
            makeAppointment={props.makeAppointment}
            canselAppointment={props.canselAppointment}
            show={props.showTask}
          />
          )
        })}
      </ul>
    </section>
	)
}

export default Tasks;