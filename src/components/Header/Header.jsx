import headerLogo from '../../images/logo.svg'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./Header.css"
import { useLocation } from "react-router-dom";

function Header(props) {
	const currentUser = React.useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);
	const {pathname} = useLocation()

  function handleLogOut() {
    props.logOut()
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

	return (
		<header className="header">
			<img src={headerLogo} className="header__logo" alt="логотип сервиса Место" />
      {props.title && <h1 className="header__title">{props.title}</h1>}
      {props.isLoggedIn && <div className={`header__burger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
      </div>}
        {
          props.isLoggedIn
          ? localStorage.getItem('role') === 'admin'
              ? <div className={`header__navbar ${isOpen ? 'open' : ''}`}>
                  <Link to="/admin" className={`header__link ${pathname==='/admin' ? "header__link-active" : ''}`} type="button" >Контрольные</Link>
                  <Link to="/admin/labs" className={`header__link ${pathname==='/admin/labs' ? "header__link-active" : ''}`} type="button" >Лабораторные</Link>
                  <Link to="/admin/tasks" className={`header__link ${pathname==='/admin/tasks' ? "header__link-active" : ''}`} type="button" >Дополнительные задания</Link>
                  <Link to="/admin/questions" className={`header__link ${pathname==='/admin/questions' ? "header__link-active" : ''}`} type="button" >Банк вопросов</Link>
                  <Link to="/admin/users" className={`header__link ${pathname==='/admin/users' ? "header__link-active" : ''}`} type="button" >Пользователи</Link>
                  <Link to="/admin/appointments" className={`header__link ${pathname==='/admin/appointments' ? "header__link-active" : ''}`} type="button" >Записи</Link>
                  <Link to="/admin/check" className={`header__link ${pathname==='/admin/ckeck' ? "header__link-active" : ''}`} type="button" >Проверка работ</Link>
                  <Link to="/sign-in" className={`header__link ${pathname==='/sign-in' ? "header__link-active" : ''}`} type="button" onClick={handleLogOut}>Выйти из системы</Link>
                </div>
              : localStorage.getItem('role') === 'user' && <div className={`header__navbar ${isOpen ? 'open' : ''}`}>
                  <Link to="/user" className={`header__link ${pathname==='/user/choice' ? "header__link-active" : ''}`} type="button" >Лабораторные</Link>
                  <Link to="/user/controls" className={`header__link ${pathname==='/user/choice' ? "header__link-active" : ''}`} type="button" >Контрольные</Link>
                  <Link to="/user/tasks" className={`header__link ${pathname==='/user/choice' ? "header__link-active" : ''}`} type="button" >Дополнительные задания</Link>
                  <Link to="/user/deadline" className={`header__link ${pathname==='/user/deadline' ? "header__link-active" : ''}`} type="button" >Дедлайны</Link>
                  <Link to="/user/profile" className={`header__link ${pathname==='/user/profile' ? "header__link-active" : ''}`} type="button" >Личный кабинет</Link>
                  <Link to="/sign-in" className={`header__link ${pathname==='/sign-in' ? "header__link-active" : ''}`} type="button" onClick={handleLogOut}>Выйти из системы</Link>
                </div>
          : <Link to={props.link} className="header__link-unauth" type="button" onClick={props.onClick}>{props.textLink}</Link>
        }
		</header>
	)
}

export default Header;