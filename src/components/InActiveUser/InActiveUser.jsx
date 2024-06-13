import './InActiveUser.css'
import { Link } from 'react-router-dom';

function InActiveUser(props) {
	return (
		<div className="notfound">
			<div className="notfound__container">
				<h1 className="notfound__title">Ограничение доступа</h1>
				<p className="notfound__text">Дождись, когда преподаватель предоставит тебе доступ, и заходи снова</p>
			</div>
      <p className="notfound__link" onClick={() => props.logOut()}>Выйти из системы</p>
		</div>
	);
};

export default InActiveUser;