import plusIcon from "../../../images/плюсик.svg"
import "../Controls/Controls.css";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

function Labs(props) {

  return (
    <div className="controls">
      <div className="panel">
        <div className="panel__action">
          <img className="panel__icon" src={plusIcon} alt="добавить контрольную" />
          <p className="panel__do" onClick={props.openCreateLab}>Добавить лабораторную</p>
        </div>
        <div className="panel__action">
          <img className="panel__icon" src={plusIcon} alt="добавить контрольную" />
          <p className="panel__do" onClick={props.openCreateLabVariant}>Добавить вариант лабораторной</p>
        </div>
      </div>
      <section className="cards">
        {props.labs.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              addGroup={props.addGroup}
              variantsLabs={card.variants}
              delete={props.delete}
            />
          )
        })}
      </section>
    </div>
  )
}

export default Labs;