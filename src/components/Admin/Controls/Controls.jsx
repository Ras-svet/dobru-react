import plusIcon from "../../../images/плюсик.svg"
import genIcon from "../../../images/gen.svg"
import "./Controls.css";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";
import searchIcon from '../../../images/search.svg'

function Controls(props) {
  const {pathname} = useLocation()
  const [groupFilter, setGroupFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('На проверке')

  const uniqueGroups = [...new Set(props.controls.map(control => control.userId?.group))];

  const filteredStudents = props.controls.filter(control => {
    const groupMatch = !groupFilter || control.userId.group === groupFilter;
    const nameMatch = !nameFilter || control.userId.lastName.toLowerCase().startsWith(nameFilter.toLowerCase());
    let statusMatch = true;
  
    if (statusFilter === "На проверке") {
      statusMatch = control.checkedPoints === '0';
    } else if (statusFilter === "Проверенные") {
      statusMatch = Number(control.checkedPoints) > 0;
    }
  
    return groupMatch && nameMatch && statusMatch;
  });

	return (
		<div className="controls">
			{pathname !== '/admin/check' && <div className="panel">
				<div className="panel__action">
					<img className="panel__icon" src={plusIcon} alt="добавить контрольную" />
					<p className="panel__do" onClick={props.openCreateControl}>Добавить контрольную</p>
				</div>
				<div className="panel__action">
					<img className="panel__icon" src={genIcon} alt="сгенерировать вариант" />
					<p className="panel__do" onClick={props.openGenerateVariant}>Сгенерировать вариант</p>
				</div>
			</div>}
      {pathname === '/admin/check' && <div className="control-students__filter">
				<select 
          name="select" 
          className="filter__select" 
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        >
          <option className="filter__select-option" value=''>Номер группы</option>
          {uniqueGroups?.map((group) => (
            <option className="filter__select-option" key={group} value={group}>{group}</option>
          ))}
				</select>
        <select name="select" className="filter__select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option className="filter__select-option" value='На проверке'>На проверке</option>
          <option className="filter__select-option" value='Проверенные'>Проверенные</option>
				</select>
				<div className="filter__search">
          <input 
            type="text" 
            placeholder="Поиск по фамилии" 
            className="filter__search-input" 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
					<img src={searchIcon} alt="search icon" className="filter__search-button" />
				</div>
			</div>}
			{pathname === '/admin/check' ? <section className="cards">
				{filteredStudents?.map(card => {
						return (
							<Card
								card={card}
								key={card._id}
								variants={props.variants ? props.variants : null}
								addGroup={props.addGroup ? props.addGroup : null}
                delete={props.delete ? props.delete : null}
							/>
						)
					})}
			</section> :
      <section className="cards">
      {props.controls?.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              variants={props.variants ? props.variants : null}
              addGroup={props.addGroup ? props.addGroup : null}
              delete={props.delete ? props.delete : null}
            />
          )
        })}
    </section>}
		</div>
	)
}

export default Controls;