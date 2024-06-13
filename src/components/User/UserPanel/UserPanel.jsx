import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import ProtectedRoute from "../../ProtectedRoute"
import UnProtectedRoute from "../../UnProtectedRoute";
import Labs from "../Labs/Labs";
import Header from "../../Header/Header";
import userApi from "../../../utils/userApi";
import PopupError from "../Popup/PopupError";
import badRequest from '../../../images/OhBad.svg'
import goodRequest from '../../../images/AllRight.svg'
import UserVariant from "../Popup/UserVariant";
import Tasks from "../Tasks/Tasks";
import Profile from "../Profile/Profile";
import Deadline from "../Deadline/Deadline";
import Controls from "../Controls/Controls";
import UserControl from "../UserControl/UserControl";
import Footer from "../../Footer/Footer";

function UserPanel(props) {
	const navigate = useNavigate();
	const currentUser = React.useContext(CurrentUserContext);
  const [labs, setLabs] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [controls, setControls] = React.useState([])
  const [controlMarks, setControlMarks] = React.useState([])
  const [isAppointToLab, setIsAppointToLab] = React.useState(false)
  const [isAppointToTask, setIsAppointToTask] = React.useState(false)
  const {pathname} = useLocation()
  const [isPopupErrorOpen, setIsPopupErrorOpen] = React.useState(false)
  const [statusImage, setStatusImage] = React.useState('')
  const [statusTitle, setStatusTitle] = React.useState('')
  const [selectedLab, setSelectedLab] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState({})
  const [isShow, setIsShow] = React.useState(false)

  function getLabs() {
    userApi.getLabs(localStorage.getItem('group'))
    .then((labs) => {
      setLabs(labs)
    })
    .catch((err) => {
      console.log(err, err.message)
    })
  }

  function makeAppointmentToLab(labId, variantId) {
    userApi.makeAppointmentToLab(labId, variantId)
    .then((lab) => {
      const labIndex = labs.findIndex(item => item._id === lab._id);
      if (labIndex !== -1) {
        const updatedLabs = [...labs];
        updatedLabs[labIndex] = lab;
        setLabs(updatedLabs);
        setIsAppointToLab(true)
      }
    })
    .catch((err) => {
      console.log(err, err.message)
      handleOpenPopupError()
      setStatusImage(badRequest)
      setStatusTitle(err.message)
    })
  }

  function canselAppointmentToLab(labId, variantId) {
    userApi.canselAppointmentToLab(labId, variantId)
    .then((lab) => {
      const labIndex = labs.findIndex(item => item._id === lab._id);
      if (labIndex !== -1) {
        const updatedLabs = [...labs];
        updatedLabs[labIndex] = lab;
        setLabs(updatedLabs);
        setIsAppointToLab(false)
      }
    })
  }

  function getTasks() {
    userApi.getTasks(localStorage.getItem('group'))
    .then((tasks) => {
      setTasks(tasks)
    })
    .catch((err) => {
      console.log(err, err.message)
    })
  }

  function makeAppointmentToTask(taskId) {
    userApi.makeAppointmentToTask(taskId)
    .then((task) => {
      const taskIndex = tasks.findIndex(item => item._id === task._id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = task;
        setTasks(updatedTasks);
        setIsAppointToTask(true)
      }
    })
    .catch((err) => {
      console.log(err, err.message)
      handleOpenPopupError()
      setStatusImage(badRequest)
      setStatusTitle(err.message)
      setIsAppointToTask(false)
    })
  }

  function canselAppointmentToTask(taskId) {
    userApi.canselAppointmentToTask(taskId)
    .then((task) => {
      const taskIndex = tasks.findIndex(item => item._id === task._id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = task;
        setTasks(updatedTasks);
      }
    })
  }

  function getControls() {
    userApi.getControls(localStorage.getItem('group'))
    .then((controls) => {
      setControls(controls)
    })
    .catch((err) => {
      console.log(err, err.message)
    })
  }

  function showVariant(lab, card) {
    setSelectedCard(card)
    setSelectedLab(lab)
    setIsShow(true)
  }

  function showTask(card) {
    setSelectedCard(card)
    setIsShow(true)
  }

  function checkAnswers(controlId, variantId, userAnswers) {
    userApi.checkAnswers(controlId, variantId, userAnswers)
    .then((res) => {
      const newControls = controls.filter(card => card._id !== controlId)
      setControls(newControls)
      setStatusImage(goodRequest)
      setStatusTitle(`Предварительный балл за проверку открытых вопросов: ${res.points}. Окончательный балл будет известен после проверки преподавателем`)
      navigate('/user/controls')
    })
    .then(() => {
      setIsPopupErrorOpen(true)
    })
    .catch((err) => {
      setStatusImage(badRequest)
      setStatusTitle(`Что-то пошло не так. ${err.message}`)
      setIsPopupErrorOpen(true)
    })
  }

  function getControlMarks() {
    userApi.getControlMarks()
    .then((controlMarks) => {
      setControlMarks(controlMarks)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleOpenPopupError() {
    setIsPopupErrorOpen(true)
  }

  function closeAllPopups() {
    setIsPopupErrorOpen(false)
    setIsShow(false)
    setStatusImage('')
    setStatusTitle('')
    setSelectedCard({})
    setSelectedLab({})
  }

  React.useEffect(() => {
    if (currentUser._id === '') {
      props.getMyInfo()
    }
    if (pathname === '/user' && labs.length === 0) {
      getLabs()
    } else if (pathname === '/user/tasks' && tasks.length === 0) {
      getTasks()
    } else if (pathname === '/user/profile' && (tasks.length === 0 || labs.length === 0 || controlMarks.length === 0)) {
      getLabs()
      getTasks()
      getControlMarks()
    } else if (pathname === '/user/controls' && (controls.length === 0 || controlMarks.length === 0)) {
      getControls()
      getControlMarks()
    } else if (pathname === '/user/deadline' && (tasks.length === 0 || labs.length === 0)) {
      getLabs()
      getTasks()
    }
  }, [pathname])

	React.useEffect(() => {
		if (localStorage.getItem('role') !== 'user') {
			navigate('/sign-in')
		}
  }, []);

	return (
		<>
			<Routes>
				<Route path="/" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} title='Лабораторные работы' logOut={props.logOut}/>
						<Labs showVariant={showVariant} labs={labs} user={currentUser} isAppoint={isAppointToLab} makeAppointment={makeAppointmentToLab} canselAppointment={canselAppointmentToLab}/>
            <Footer />
					</>
				} />
        <Route path="tasks" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} title='Дополнительные задания' logOut={props.logOut}/>
						<Tasks showTask={showTask} tasks={tasks} isAppoint={isAppointToTask} user={currentUser} makeAppointment={makeAppointmentToTask} canselAppointment={canselAppointmentToTask}/>
            <Footer />
					</>
				} />
        <Route path="profile" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} title='Личный кабинет' logOut={props.logOut}/>
						<Profile showTask={showTask} showVariant={showVariant} labs={labs} controlMarks={controlMarks} isAppoint={isAppointToLab} tasks={tasks} canselAppointmentToTask={canselAppointmentToTask} canselAppointmentToLab={canselAppointmentToLab}/>
            <Footer />
					</>
				} />
        <Route path="deadline" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} title='Дедлайны' logOut={props.logOut}/>
						<Deadline labs={labs} isAppoint={isAppointToLab} tasks={tasks} />
            <Footer />
					</>
				} />
        <Route path="controls" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} title='Контрольные работы' logOut={props.logOut}/>
						<Controls controls={controls} controlMarks={controlMarks}/>
            <Footer />
					</>
				} />
        <Route path="controls/:variantId" element={
					<UserControl checkAnswers={checkAnswers} />
				} />
			</Routes>
      <PopupError
        isOpen={isPopupErrorOpen}
        onClose={closeAllPopups}
        image={statusImage}
        title={statusTitle}
      />
      <UserVariant
        isOpen={isShow}
        onClose={closeAllPopups}
        lab={selectedLab}
        card={selectedCard}
      />
		</>
	)
}

export default UserPanel;