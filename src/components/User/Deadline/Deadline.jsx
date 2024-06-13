import './Deadline.css'
import React from 'react'
import { formatDate } from '../../../utils/dateUtils'

function Deadline(props) {
  const [isActive, setIsActive] = React.useState('Лабораторные')

  function handleChangeActive(evt) {
    setIsActive(evt.target.value)
  }

  React.useEffect(() => {
    setIsActive('Лабораторные')
  }, [])
  return (
    <section className="deadline">
      <div className="appoint__navbar">
        <button className={`appoint__navbar-text ${isActive === 'Лабораторные' ? 'appoint__navbar-text_focused' : ''}`} onClick={handleChangeActive} value="Лабораторные">Лабораторные</button>
        <button className={`appoint__navbar-text ${isActive === 'Дополнительные задания' ? 'appoint__navbar-text_focused' : ''}`} onClick={handleChangeActive} value="Дополнительные задания">Дополнительные задания</button>
      </div>
      {isActive === 'Лабораторные' && 
      <div className="appoint__table">
        <table>
          <thead>
            <tr>
              <th colSpan="5">Лабораторные по фронтенд-разработке</th>
            </tr>
            <tr>
              <th>Название лабораторной</th>
              <th>Дедлайн</th>
              <th>Максимальное количество баллов</th>
              <th>Штрафные баллы за 1 день</th>
              <th>Максимальное количество баллов на сегодня</th>
            </tr>
          </thead>
          {props.labs.filter(lab => lab.subject === 'Фронтенд')?.map((lab) => {
            return (
              <>
                <tbody>
                      <tr>
                        <td>{lab.name}</td>
                        <td>{formatDate(lab.deadline)}</td>
                        <td>{lab.points}</td>
                        <td>{lab.penaltyPoints}</td>
                        <td>{(Math.max(Number(lab.points) - ((new Date() > new Date(lab.deadline) ? (new Date() - new Date(lab.deadline)) / (1000 * 60 * 60 * 24) * lab.penaltyPoints : 0)), 0)).toFixed(1)}</td>
                      </tr>
                </tbody>
              </>
              )
            })}
        </table>
        <table>
          <thead>
            <tr>
              <th colSpan="5">Лабораторные по бэкенд-разработке</th>
            </tr>
            <tr>
              <th>Название лабораторной</th>
              <th>Дедлайн</th>
              <th>Максимальное количество баллов</th>
              <th>Штрафные баллы за 1 день</th>
              <th>Максимальное количество баллов на сегодня</th>
            </tr>
          </thead>
          {props.labs.filter(lab => lab.subject === 'Бэкенд')?.map((lab) => {
            return (
              <>
                <tbody>
                      <tr>
                        <td>{lab.name}</td>
                        <td>{formatDate(lab.deadline)}</td>
                        <td>{lab.points}</td>
                        <td>{5 || lab.penaltyPoints}</td>
                        <td>{Number(lab.points) - ((new Date() > new Date(lab.deadline) ? (new Date() - new Date(lab.deadline)) / (1000 * 60 * 60 * 24) * 5 : 0))}</td>
                      </tr>
                </tbody>
              </>
              )
            })}
        </table>
      </div>}
      {isActive === 'Дополнительные задания' && <div className="appoint__table">
        <table>
          <thead>
            <tr>
              <th>Предмет</th>
              <th>Задание</th>
              <th>Дедлайн</th>
            </tr>
          </thead>
          {props.tasks?.map((task) => {
            return (
              <>
                <tbody>
                      <tr>
                        <td>{task.subject}</td>
                        <td>{task.name}</td>
                        <td>{formatDate(task.deadline)}</td>
                      </tr>
                </tbody>
              </>
              )
            })}
        </table>
      </div>}
    </section>
  )
}

export default Deadline