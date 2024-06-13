import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../Enter.css';

function SignIn(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('')

	function handleChangeEmail(evt) {
		setEmail(evt.target.value)
		const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!reg.test(evt.target.value)) {
			setEmailError("Введите корректный email формата example@domain.ru")
		}
		else {
			setEmailError('')
		}
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value)
		if (evt.target.value.length < 3 || evt.target.value.length > 32) {
			setPasswordError("Пароль должен быть больше 3 символов и меньше 32")
		}
		else {
			setPasswordError('')
		}
	}

	function handleLogin(evt) {
		evt.preventDefault();
		props.onClick(email, password)
	}

	React.useEffect(() => {
		if (passwordError || emailError) {
			setIsActive(false)
		} else if (password === '' || email === '') {
				setIsActive(false)
			} else {
			setIsActive(true)
			}
	}, [passwordError, emailError, password, email])

	return (
		<div className="entry">
			<h2 className="entry__title">Вход</h2>
			<form className="entry__form" onSubmit={handleLogin} >
				<input className="entry__input" placeholder="Email" type="email" onChange={handleChangeEmail} />
				<span className="entry__input-error">{emailError}</span>
				<input className="entry__input" placeholder="Пароль" type="password" onChange={handleChangePassword} />
				<span className="entry__input-error">{passwordError}</span>
				<button className={`entry__button ${isActive ? 'entry__button-active' : 'entry__button-disable'}`} disabled={!isActive} type="submit" >Войти</button>
			</form>
		</div>
	)
}

export default SignIn;