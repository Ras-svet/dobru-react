import React from 'react';
import './PopupUser.css';
import download from '../../../images/download.svg';
import { formatDate } from '../../../utils/dateUtils';

function UserVariant(props) {
  const utf8Decode = (str) => {
    return decodeURIComponent(escape(str));
  };
  const filePath = utf8Decode(props.card.file?.replace(/\\/g, '/').replace('uploads/', ''));
  const handleDownload = () => {
    const token = localStorage.getItem('jwt');
    
    fetch(`http://localhost:3001/users/labs/variant/${props.card.file?.replace(/\\/g, '/').replace('uploads/', '')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => {
      console.error('Ошибка при скачивании файла:', error);
    });
  };

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__user-container">
        <button className="popup__close-button" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
        {Object.keys(props.lab).length !== 0 && <h1 className="popup__user-title">{props.lab.name}</h1>}
        <h2 className="popup__user-title">{props.card.nameVariant ? props.card.nameVariant : props.card.name}</h2>
        <h3 className="popup__subtitle">Задание:</h3>
        <p className="popup__text">{props.card.text}</p>
        <h3 className="popup__subtitle">Баллы:</h3>
        <p className="popup__text">{Object.keys(props.lab).length !== 0 ? props.lab.points : props.card.points}</p>
        <h3 className="popup__subtitle">Дедлайн:</h3>
        <p className="popup__text">{Object.keys(props.lab).length !== 0 ? formatDate(props.lab.deadline) : formatDate(props.card.deadline)}</p>
        {props.card.file && <span className="popup__subtitle">Дополнительные материалы:</span>}
        {props.card.file && <p className="popup__text popup__lab-file">{filePath}<img className="file__download" alt="скачать доп материалы" src={download} onClick={handleDownload}/></p>}
      </div>
    </section> 
  );
}

export default UserVariant;