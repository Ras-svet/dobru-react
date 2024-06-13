// import React from "react";
// import './TableStudents.css'
// import TableStudent from "./TableStudent";
// import searchIcon from '../../images/search.svg'

// function TableStudents(props) {
//   const uniqueGroups = [...new Set(props.students.map(user => user.group))];

//   function addAccess(userId) {
//     props.openAccess(userId)
//   }

//   function deleteAccess(userId) {
//     props.closeAccess(userId)
//   }

//   return (
//     <section className="table-students">
//       <div className="table-students__filter">
// 				<select name="select" className="filter__select">
//           <option className="filter__select-option" value=''>Номер группы</option>
//           {uniqueGroups?.map((group) => {
//               return (
//               <option className="filter__select-option" value={group}>{group}</option>
//             )
//           })}
// 				</select>
// 				<div className="filter__search">
//           <input type="text" placeholder="Поиск по фамилии" className="filter__search-input" />
// 					<img src={searchIcon} alt="search icon" className="filter__search-button" />
// 				</div>
// 			</div>
//       <ul className="students">
//         {props.students?.map((student) => {
//           return (
//             <TableStudent 
//               key={student._id}
//               student={student}
//               addAccess={addAccess}
//               deleteAccess={deleteAccess}
//             />
//           )
//         })}
//       </ul>
//     </section>
//   )
// }

// export default TableStudents

import React, { useState } from "react";
import './TableStudents.css'
import TableStudent from "./TableStudent";
import searchIcon from '../../../images/search.svg'

function TableStudents(props) {
  const [groupFilter, setGroupFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const uniqueGroups = [...new Set(props.students.map(user => user.group))];

  function addAccess(userId) {
    props.openAccess(userId);
  }

  function deleteAccess(userId) {
    props.closeAccess(userId);
  }

  const filteredStudents = props.students.filter(student => {
    const groupMatch = !groupFilter || student.group === groupFilter;
    const nameMatch = !nameFilter || student.lastName.toLowerCase().startsWith(nameFilter.toLowerCase());
    return groupMatch && nameMatch;
  });

  return (
    <section className="table-students">
      <div className="table-students__filter">
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
			</div>
      <ul className="students">
        {filteredStudents.map((student) => (
          <TableStudent 
            key={student._id}
            student={student}
            addAccess={addAccess}
            deleteAccess={deleteAccess}
          />
        ))}
      </ul>
    </section>
  )
}

export default TableStudents;