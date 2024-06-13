import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import ProtectedRoute from "../../ProtectedRoute"
import UnProtectedRoute from "../../UnProtectedRoute";
import Controls from "../Controls/Controls";
import Header from "../../Header/Header";
import api from "../../../utils/api";
import { useLocation } from "react-router-dom";
import CreateControl from "../Popup/CreateControl";
import GenerateVarinat from "../Popup/GenerateVariant";
import Variant from "../Variant/Variant";
import AddGroup from "../Popup/AddGroup";
import Questions from "../Questions/Questions";
import CreateQuestion from "../Popup/CreateQuestion";
import Labs from "../Labs/Labs";
import CreateLab from "../Popup/CreateLab";
import CreateLabVariant from "../Popup/CreateLabVariant";
import TableStudents from "../TableStudents/TableStudents";
import TableAppointment from "../TableAppointment/TableAppointment";
import Tasks from "../Tasks/Tasks";
import CreateTask from "../Popup/CreateTask";
import Footer from "../../Footer/Footer";

function AdminPanel(props) {
	const navigate = useNavigate();
	const currentUser = React.useContext(CurrentUserContext);
	const [controls, setControls] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [labs, setLabs] = React.useState([])
  const [controlmarks, setControlMarks] = React.useState([])
	const [variants, setVariants] = React.useState([])
	const [questions, setQuestions] = React.useState([])
	const {pathname} = useLocation()
	const [isCreateControlPopupOpen, setIsCreateControlPopupOpen] = React.useState(false)
	const [isGenerateVariantPopupOpen, setIsGenerateVariantPopupOpen] = React.useState(false)
	const [isAddGroupPopupOpen, setIsAddGroupPopupOpen] = React.useState(false)
  const [isCreateQuestionsPopupOpen, setIsCreateQuestionsPopupOpen] = React.useState(false)
  const [isCreateLabPopupOpen, setIsCreateLabPopupOpen] = React.useState(false)
  const [isCreateLabVariantPopupOpen, setIsCreateLabVariantPopupOpen] = React.useState(false)
  const [isCreateTaskPopupOpen, setIsCreateTaskPopupOpen] = React.useState(false)
	const [currentCard, setCurrentCard] = React.useState('')
	const [errorAdding, setErrorAdding] = React.useState('')

	function getControls() {
		api.getControls()
		.then((controls) => {
			setControls(controls)
		})
		.catch((err) => {
			console.log((err, err.message))
		})
	}

  function getUsers() {
    api.getUsers()
    .then((users) => {
      setUsers(users)
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  function getTasks() {
    api.getTasks()
    .then((tasks) => {
      setTasks(tasks)
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  const updateUserAccess = (users, userId, newUser) => {
    return users.map((user) => {
      if (user._id === userId) {
        return {
          ...newUser,
        };
      }
      return user;
    });
  };

  function openAccessToUser(userId) {
    api.openAccessToUser(userId)
    .then((user) => {
      setUsers(prevUsers => updateUserAccess(prevUsers, userId, user));
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  function deleteAccessFromUser(userId) {
    api.deleteAccessFromUser(userId)
    .then((user) => {
      setUsers(prevUsers => updateUserAccess(prevUsers, userId, user));
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  function getLabs() {
		api.getLabs()
		.then((labs) => {
			setLabs(labs)
		})
		.catch((err) => {
			console.log((err, err.message))
		})
	}

	function getVariants() {
		api.getVariants()
		.then((variants) => {
			setVariants(variants)
		})
		.catch((err) => {
			console.log((err, err.message))
		})
	}

	function getQuestions() {
		api.getQuestions()
		.then((questions) => {
			setQuestions(questions)
		})
		.catch((err) => {
			console.log((err, err.message))
		})
	}

	function addControl(name, subject, themes) {
		api.addControl(name, subject, themes)
		.then((control) => {
			setControls([...controls, control])
			setErrorAdding('')
		})
		.catch((err) => {
			console.log(err.error)
			setErrorAdding(err.error)
		})
	}

  function addLab(name, subject, deadline, points, penaltyPoints) {
		api.addLab(name, subject, deadline, points, penaltyPoints)
		.then((lab) => {
			setLabs([...labs, lab])
			setErrorAdding('')
		})
		.catch((err) => {
			console.log(err.error)
			setErrorAdding(err.error)
		})
	}

	function generateVariant(controlName, controlId, easy, normal, hard) {
		api.generateVariant(controlName, controlId, easy, normal, hard)
		.then((variant) => {
			setVariants([...variants, variant])
		})
		.catch((err) => {
			console.log((err, err.message))
		})
	}

  const updateLabVariant = (labs, labId, updatedLab) => {
    return labs.map((lab) => {
      if (lab._id === labId) {
        return {
          ...updatedLab,
        };
      }
      return lab;
    });
  };

  const removeVariantFromLab = (labs, labId, variantId) => {
    return labs.map((lab) => {
      if (lab._id === labId) {
        return {
          ...lab,
          variants: lab.variants.filter((variant) => variant._id !== variantId),
        };
      }
      return lab;
    });
  };

  function createLabVariant(labId, nameVariant, text, seats, file) {
    api.createLabVariant(labId, nameVariant, text, seats, file)
    .then((variant) => {
      setLabs(prevLabs => updateLabVariant(prevLabs, labId, variant));
    })
    .catch((err) => {
			console.log(err)
		})
  } 

	function deleteControlVariant(variantId) {
		api.deleteControlVariant(variantId)
		.then(() => {
			const newVariants = variants.filter(item => item._id !== variantId)
			setVariants(newVariants)
		})
		.catch((err) => {
			console.log(err)
		})
	}

  function deleteQuestion(questionId) {
    api.deleteQuestion(questionId)
    .then(() => {
			const newQuestions = questions.filter(item => item._id !== questionId)
			setQuestions(newQuestions)
		})
		.catch((err) => {
			console.log(err)
		})
  }

  function deleteLabVariant(labId, variantId) {
    api.deleteLabVariant(labId, variantId)
    .then(() => {
      setLabs(prevLabs => removeVariantFromLab(prevLabs, labId, variantId));
    })
    .catch((err) => {
			console.log(err)
		})
  }

  function createQuestion(subject, theme, difficulty, question, type, answers, goodAnswer) {
    const body = {
      subject,
      theme,
      difficulty,
      question,
      type,
      answers
    };
    if (goodAnswer !== '') {
      body.goodAnswer = goodAnswer;
    }
    api.createQuestion(body)
    .then((question) => {
      setQuestions([question, ...questions])
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  function createTask(name, text, seats, subject, deadline, points, file) {
    api.createTask(name, text, seats, subject, deadline, points, file)
    .then((task) => {
      setTasks([...tasks, task])
    })
    .catch((err) => {
			console.log((err, err.message))
		})
  }

  function deleteControl(controlId) {
		api.deleteControl(controlId)
		.then(() => {
			const newControls = controls.filter(item => item._id !== controlId)
			setControls(newControls)
		})
		.catch((err) => {
			console.log(err)
		})
	}

  function deleteLab(labId) {
		api.deleteLab(labId)
		.then(() => {
			const newLabs = labs.filter(item => item._id !== labId)
			setLabs(newLabs)
		})
		.catch((err) => {
			console.log(err)
		})
	}

  function deleteTask(taskId) {
		api.deleteTask(taskId)
		.then(() => {
			const newTasks = tasks.filter(item => item._id !== taskId)
			setTasks(newTasks)
		})
		.catch((err) => {
			console.log(err)
		})
	}

  function getControlMarks() {
    api.getControlMarks()
    .then((controlmarks) => {
      setControlMarks(controlmarks)
    })
    .catch((err) => {
			console.log(err)
		})
  }

  function checkControl(controlId, checkedPoints) {
    api.checkControl(controlId, checkedPoints)
    .then((card) => {
      const cardIndex = controlmarks.findIndex(item => item._id === card._id);
      if (cardIndex !== -1) {
        const updatedCards = [...controlmarks];
        updatedCards[cardIndex] = card;
        setControlMarks(updatedCards);
        navigate("/admin/check")
      }
    })
    .catch((err) => {
			console.log(err)
		})
  }

	function handleCreateControlPopup() {
		setIsCreateControlPopupOpen(true)
	}

  function handleCreateTaskPopupOpen() {
    setIsCreateTaskPopupOpen(true)
  }

  function handleCreateQuestionPopup() {
		setIsCreateQuestionsPopupOpen(true)
	}

	function handleAddGroupPopup(card) {
		setIsAddGroupPopupOpen(true)
		setCurrentCard(card)
	}

	function handleGenerateVariantPopup() {
		setIsGenerateVariantPopupOpen(true)
	}

  function handleCreateLabPopup() {
		setIsCreateLabPopupOpen(true)
	}

  function handleCreateLabVariantPopup() {
		setIsCreateLabVariantPopupOpen(true)
	}

	function closeAllPopups() {
		setIsCreateControlPopupOpen(false)
    setIsCreateQuestionsPopupOpen(false)
		setIsGenerateVariantPopupOpen(false)
		setIsAddGroupPopupOpen(false)
    setIsCreateLabPopupOpen(false)
    setIsCreateLabVariantPopupOpen(false)
    setIsCreateTaskPopupOpen(false)
		setErrorAdding('')
		setCurrentCard('')
	}

	React.useEffect(() => {
		if (pathname === '/admin' && (questions.length === 0 || controls.length === 0 || variants.length === 0)) {
			getControls()
			getVariants()
			getQuestions()
		} else if (pathname === '/admin/questions' && questions.length === 0) {
			getQuestions()
		} else if (pathname === '/admin/labs' && labs.length === 0) {
      getLabs()
    } else if (pathname === '/admin/users' && users.length === 0) {
      getUsers()
    } else if (pathname === '/admin/tasks' && tasks.length === 0) {
      getTasks()
    } else if (pathname === '/admin/appointments' && (labs.length === 0 || tasks.length === 0)) {
      getLabs()
      getTasks()
    } else if (pathname === '/admin/check' && controlmarks.length === 0) {
      getControlMarks()
    }
	}, [pathname])

	// const checkAccess = () => {
	// 	console.log('tut')
  //   if (localStorage.getItem('role') !== 'admin') {
  //     navigate('/user'); // Перенаправляем на главную страницу, если у пользователя нет доступа
  //   }
  // };

	React.useEffect(() => {
		if (localStorage.getItem('role') !== 'admin') {
			navigate('/user')
		}
  }, []);

	return (
		<>
			<Routes>
				<Route path="" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} logOut={props.logOut}/>
						<Controls controls={controls} delete={deleteControl} variants={variants} openCreateControl={handleCreateControlPopup} openGenerateVariant={handleGenerateVariantPopup} addGroup={handleAddGroupPopup} />
            <Footer />
					</>
				} />
				<Route path="controls/variant/:variantId" element={
					<Variant questions={questions} delete={deleteControlVariant} />
				} />
				<Route path="questions" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} logOut={props.logOut} />
						<Questions cards={questions} openCreateQuestion={handleCreateQuestionPopup} deleteQuestion={deleteQuestion} />
            <Footer />
					</>
				} />
        <Route path="labs" element={
					<>
						<Header isLoggedIn={props.isLoggedIn} logOut={props.logOut}/>
						<Labs labs={labs} delete={deleteLab} addGroup={handleAddGroupPopup} openCreateLab={handleCreateLabPopup} openCreateLabVariant={handleCreateLabVariantPopup}/>
            <Footer />
					</>
				} />
        <Route path="labs/variant/:variantId" element={
					<Variant delete={deleteLabVariant}/>
				} />
        <Route path="users" element={
          <>
            <Header isLoggedIn={props.isLoggedIn} logOut={props.logOut} />
            <TableStudents openAccess={openAccessToUser} students={users} closeAccess={deleteAccessFromUser}/>
            <Footer />
          </>
        } />
        <Route path="appointments" element={
          <>
            <Header isLoggedIn={props.isLoggedIn} logOut={props.logOut} />
            <TableAppointment labs={labs} tasks={tasks}/>
            <Footer />
          </>
        } />
        <Route path="tasks" element={
          <>
            <Header isLoggedIn={props.isLoggedIn} logOut={props.logOut} />
            <Tasks tasks={tasks} delete={deleteTask} openPopup={handleCreateTaskPopupOpen} addGroup={handleAddGroupPopup}/>
            <Footer />
          </>
        } />
        <Route path="tasks/:taskId" element={
					<Variant />
				} />
        <Route path="check" element={
          <>
            <Header isLoggedIn={props.isLoggedIn} logOut={props.logOut} />
            <Controls controls={controlmarks}/>
            <Footer />
          </>
        } />
        <Route path="check/:checkId" element={
					<Variant checkControl={checkControl}/>
				} />
			</Routes>
			<CreateControl
				isOpened={isCreateControlPopupOpen}
				addControl={addControl}
				onClose={closeAllPopups}
				error={errorAdding}
			/>
			<GenerateVarinat
				isOpened={isGenerateVariantPopupOpen}
				onClose={closeAllPopups}
				controls={controls}
				generateVariant={generateVariant}
			/>
			<AddGroup
				isOpened={isAddGroupPopupOpen}
				card={currentCard}
				onClose={closeAllPopups}
			/>
      <CreateQuestion
        isOpened={isCreateQuestionsPopupOpen}
        onClose={closeAllPopups}
        createQuestion={createQuestion}
      />
      <CreateLab
        isOpened={isCreateLabPopupOpen}
        onClose={closeAllPopups}
        addLab={addLab}
      />
      <CreateLabVariant
        isOpened={isCreateLabVariantPopupOpen}
        onClose={closeAllPopups}
        labs={labs}
        createLabVariant={createLabVariant}
      />
      <CreateTask 
        isOpened={isCreateTaskPopupOpen}
        onClose={closeAllPopups}
        createTask={createTask}
      />
		</>
	)
}

export default AdminPanel;