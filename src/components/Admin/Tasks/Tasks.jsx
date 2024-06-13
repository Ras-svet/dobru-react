import React from "react";
import plusIcon from '../../../images/плюсик.svg'
import Card from "../Card/Card";
import './Tasks.css'
import '../Card/Card.css'

function Tasks(props) {
  return (
    <section className="tasks">
      <div className="controls">
      <div className="panel">
        <div className="panel__action">
          <img className="panel__icon" src={plusIcon} alt="добавить дополнительное задание" />
          <p className="panel__do" onClick={props.openPopup}>Добавить дополнительное задание</p>
        </div>
      </div>
      <section className="cards">
        {props.tasks.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              addGroup={props.addGroup}
              delete={props.delete}
            />
          )
        })}
      </section>
    </div>
    </section>
  )
}

export default Tasks