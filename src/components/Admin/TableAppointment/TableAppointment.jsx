import React from "react"
import './TableAppointment.css'
import { formatDate } from "../../../utils/dateUtils"

function TableAppointment(props) {
  const [isActive, setIsActive] = React.useState('Лабораторные')

function handleChangeActive(evt) {
  setIsActive(evt.target.value)
  console.log(evt.target.value)
}

  React.useEffect(() => {
    setIsActive('Лабораторные')
  }, [])
  return (
    <section className="appoint">
      <div className="appoint__navbar">
        <button className={`appoint__navbar-text ${isActive === 'Лабораторные' ? 'appoint__navbar-text_focused' : ''}`} onClick={handleChangeActive} value="Лабораторные">Лабораторные</button>
        <button className={`appoint__navbar-text ${isActive === 'Дополнительные задания' ? 'appoint__navbar-text_focused' : ''}`} onClick={handleChangeActive} value="Дополнительные задания">Дополнительные задания</button>
      </div>
      {isActive === 'Лабораторные' && 
      <div className="appoint__table">
        <table>
          {props.labs?.map((lab) => {
            return (
              <>
                <thead>
                  <tr>
                    <th colSpan="5">{lab.name}</th>
                  </tr>
                  <tr>
                    <th>Вариант</th>
                    <th>Количество свободных мест</th>
                    <th>Студенты</th>
                    <th>Дедлайн</th>
                  </tr>
                </thead>
                <tbody>
                  {lab.variants?.map((variant) => {
                    return (
                      <tr>
                        <td>{variant.nameVariant}</td>
                        <td>{variant.seats - variant.students.length}</td>
                        <td>
                          <ol>
                            {variant.students?.map((student) => {
                              return (
                                <li>{student.firstName} {student.lastName} {student.group}</li>
                              )
                            })}
                          </ol>
                        </td>
                        <td>{formatDate(lab.deadline)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </>
              )
            })}
        </table>
      </div>}
      {isActive === 'Дополнительные задания' && <div className="appoint__table">
        <table>
          {props.tasks?.map((task) => {
            return (
              <>
                <thead>
                  <tr>
                    <th>Задание</th>
                    <th>Количество свободных мест</th>
                    <th>Студенты</th>
                    <th>Дедлайн</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>{task.name}</td>
                        <td>{task.seats - task.students.length}</td>
                        <td>
                          <ol>
                            {task.students?.map((student) => {
                              return (
                                <li>{student.firstName} {student.lastName} {student.group}</li>
                              )
                            })}
                          </ol>
                        </td>
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

export default TableAppointment