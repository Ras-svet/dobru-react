import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './App.css';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute"
import UnProtectedRoute from "../UnProtectedRoute";
import AdminPanel from "../Admin/AdminPanel/AminPanel";
import SignIn from "../Enter/SignIn/SignIn"
import UserPanel from "../User/UserPanel/UserPanel";
import SignUp from "../Enter/SignUp/SignUp";
import Header from "../Header/Header";
import api from "../../utils/api";
import userApi from "../../utils/userApi";
import InActiveUser from "../InActiveUser/InActiveUser";
import NotFound from "../InActiveUser/NotFound";

function App() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState({
		_id: '',
		firstName: '',
		lastName: '',
		email: '',
		role: '',
    group: ''
	});
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.length > 0 ? localStorage.getItem('jwt') ? true : false : false);

	function register(group, firstName, lastName, email, password, telegram, github) {
		api.signUp(group, firstName, lastName, email, password, telegram, github)
			.then((user) => {
				setCurrentUser(user)
				navigate("/sign-in")
        console.log(user)
			})
			.catch((err) => {
				console.log(err, err.message)
			})
	}

	function login(email, password) {
		api.signIn(email, password)
			.then((res) => {
				localStorage.setItem('jwt', res.token);
				setIsLoggedIn(true);
				localStorage.setItem('role', res.role)
        localStorage.setItem('group', res.group)
				if (res.role === 'admin') {
					navigate("/admin")
				} else if (res.role === 'user') {
					navigate("/user")
				} else {
          navigate('/await')
        }
			})
			.catch((err) => {
				console.log(err, err.message)
			})
	}

  function logOut() {
    localStorage.clear()
    setCurrentUser({
			_id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      group: ''
		});
    navigate('/sign-in')
    window.location.reload()
  }

  function getMyInfo() {
    userApi.getMyInfo()
    .then((user) => {
      setCurrentUser({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emeil,
        role: user.role,
        group: user.group,
        telegram: user.telegram ? user.telegram : '',
        github: user.github ? user.github : ''
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

	// React.useEffect(() => {
	// 	setCurrentUser({
	// 		_id: '',
	// 	firstName: '',
	// 	lastName: '',
	// 	email: '',
	// 	role: ''
	// 	})
	// }

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="body">
				<div className="page">
					<Routes>
						<Route exact path="/sign-in" element={
							<>
								<Header textLink="Регистрация" link="/sign-up" isLoggedIn={isLoggedIn} />
								<SignIn onClick={login} />
							</>
						} />
						<Route exact path="/sign-up" element={
							<>
								<Header textLink="Вход" link="/sign-in" isLoggedIn={isLoggedIn} />
								<SignUp onClick={register} />
							</>
						} />
						<Route exact path="/await" element={
              <ProtectedRoute
                component={InActiveUser}
                isLoggedIn={isLoggedIn}
                logOut={logOut}
              />
            } />
            <Route exact path="/" element={
						  <Navigate to={localStorage.getItem('role') === 'admin' ? '/admin' : localStorage.getItem('role') === 'user' ? '/user' : '/sign-in'} />}
						/>
						<Route exact path="/admin/*" element={
							<>
								<ProtectedRoute
									component={AdminPanel}
									isLoggedIn={isLoggedIn}
                  logOut={logOut}
								/>
							</>
						} />
						<Route exact path="/user/*" element={
							<>
								<ProtectedRoute
									component={UserPanel}
									isLoggedIn={isLoggedIn}
                  getMyInfo={getMyInfo}
                  logOut={logOut}
								/>
							</>
						} />
            <Route path="*" element={
							<NotFound />
						} />
					</Routes>
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default App;