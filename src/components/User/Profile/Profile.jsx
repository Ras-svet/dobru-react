import './Profile.css'
import { CurrentUserContext } from '../../../context/CurrentUserContext'
import React from 'react'
import LabCard from '../LabCard/LabCard';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [selectedCards, setSelectedCards] = React.useState('labs');
  const [selectedFilter, setSelectedFilter] = React.useState('');
  const [selectedLab, setSelectedLab] = React.useState(null);

  function handleChangeCards(evt) {
    setSelectedCards(evt.target.value);
    setSelectedFilter('');
    setSelectedLab(null);
  }

  function handleChangeFilter(evt) {
    setSelectedFilter(evt.target.value);
    if (selectedCards === 'labs') {
      const foundLab = props.labs.find(lab => lab._id === evt.target.value);
      setSelectedLab(foundLab);
    }
  }

  const labs = selectedCards === 'labs' ? props.labs.find(lab => lab._id === selectedFilter)?.variants.filter(variant => variant.students.some(student => student._id === currentUser._id)) : []
  const tasks = selectedCards === 'tasks' ? props.tasks.filter(task => task.subject === selectedFilter && task.students.some(student => student._id === currentUser._id)) : [];
  return (
    <section className="profile">
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.firstName} {currentUser.lastName}</h1>
        <p className="profile__text">Группа: {currentUser.group}</p>
        <p className="profile__text">Telegram: <a className="profile__text" href={currentUser.telegram} target="_blank" rel="noreferrer">{currentUser.telegram}</a></p>
        <p className="profile__text">GitHub: <a className="profile__text" href={currentUser.github} target="_blank" rel="noreferrer">{currentUser.github}</a></p>
      </div>
      <div className="profile__info">
        <h1 className="profile__title">Мои записи:</h1>
        <div className="profile__filter">
          <select name="select" className="filter__select" value={selectedCards} onChange={handleChangeCards}>
            <option className="filter__select-option" value='labs'>Лабораторные</option>
            <option className="filter__select-option" value='tasks'>Дополнительные задания</option>
          </select>
          {selectedCards === 'labs' && (
            <select name="select" className="filter__select" value={selectedFilter} onChange={handleChangeFilter}>
              <option className="filter__select-option" value=''>Название лабораторной</option>
              {props.labs.map((lab) => (
                <option className="filter__select-option" value={lab._id} key={lab._id}>{lab.name}</option>
              ))}
            </select>
          )}
          {selectedCards === 'tasks' && <select name="select" className="filter__select" value={selectedFilter} onChange={handleChangeFilter}>
            <option className="filter__select-option" value=''>Выберите предмет</option>
            <option className="filter__select-option" value='Фронтенд'>Фронтенд</option>
            <option className="filter__select-option" value='Бэкенд'>Бэкенд</option>
          </select>}
        </div>
        <ul className='profile__cards'>
          {selectedCards === 'labs' && labs?.map((variant) => (
            <LabCard key={variant._id} lab={selectedLab} isAppoint={props.isAppoint} card={variant} user={currentUser} profile={selectedCards} show={props.showVariant} canselAppointment={props.canselAppointmentToLab}/>
          ))}
          {selectedCards === 'tasks' && tasks?.map((task) => (
            <LabCard key={task._id} card={task} user={currentUser} profile={selectedCards} show={props.showTask} canselAppointment={props.canselAppointmentToTask}/>
          ))}
        </ul>
      </div>
      <div className="profile__info">
        <h1 className="profile__title">Баллы за контрольные работы:</h1>
        <div className="appoint__table">
          <table>
            <thead>
              <tr>
                <th>Название контрольной</th>
                <th>Предварительные баллы</th>
                <th>Окончательные баллы</th>
              </tr>
            </thead>
            {props.controlMarks?.map((card) => {
              return (
                <React.Fragment key={card._id}>
                  <tbody>
                        <tr>
                          <td>{card.controlId.name}</td>
                          <td>{card.points}</td>
                          <td>{card.checkedPoints !== '0' && card.checkedPoints}</td>
                        </tr>
                  </tbody>
                </React.Fragment>
                )
              })}
          </table>
        </div>
      </div>
    </section>
  );
}

export default Profile;
