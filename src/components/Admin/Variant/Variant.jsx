import React from "react";
import { useParams } from 'react-router-dom';
import back from '../../../images/back.svg';
import forward from "../../../images/forward.svg";
import { useLocation } from 'react-router-dom';
import './Variant.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {formatDate} from '../../../utils/dateUtils'
import download from '../../../images/download.svg'

function Variant(props) {
	const {variantId} = useParams()
	const location = useLocation();
  const [checkedAnswers, setCheckedAnswers] = React.useState([])
  const {card, number, variants, variant} = location.state;
	const navigate = useNavigate();
  const utf8Decode = (str) => {
    return decodeURIComponent(escape(str));
  };
  const filePath = utf8Decode(variant? variant.file?.replace(/\\/g, '/')?.replace('uploads/', '') : (card? card.file?.replace(/\\/g, '/')?.replace('uploads/', ''): ''));
  const handleDownload = () => {
    const token = localStorage.getItem('jwt');
    
    fetch(`http://localhost:3001/labs/variant/${variant?.file.replace(/\\/g, '/').replace('uploads/', '')}`, {
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

  const handleDownloadTask = () => {
    const token = localStorage.getItem('jwt');
    
    fetch(`http://localhost:3001/tasks/${card.file.replace(/\\/g, '/').replace('uploads/', '')}`, {
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
  }

	function navigateToNext() {
    if (location.pathname.startsWith('/admin/controls/variant/')) {
      navigate(`/admin/controls/variant/${variants[number]?._id}`, { state: { card: card, number: number + 1, variants: variants, variant: variants[number] } })
    } else if (location.pathname.startsWith('/admin/labs/variant/')) {
      navigate(`/admin/labs/variant/${variants[number]?._id}`, { state: { card: card, number: number + 1, variants: variants, variant: variants[number] } })
    }
	}

  function handleCheckAnswer(evt) {
    setCheckedAnswers([...checkedAnswers, evt.target.value])
  }

  function handleDeleteAnswer(evt) {
    const newCheckedAnswers = checkedAnswers.filter(answer => answer !== evt.target.value)
    setCheckedAnswers(newCheckedAnswers)
  }

	function deleteVariant() {
    if (location.pathname.startsWith('/admin/controls/variant/')) {
      navigate('/admin')
		  props.delete(variantId)
    } else if (location.pathname.startsWith('/admin/labs/variant/')) {
      navigate('/admin/labs')
		  props.delete(card._id, variant._id)
    }
	}

  function handleCheckControl() {
    props.checkControl(card._id, Number(card.points) + checkedAnswers.length)
  }

	return (
		<section className="variant">
      {location.pathname.startsWith('/admin/controls/variant/') && 
      <>
        <div className="variant__header">
          <h1 className="variant__name variant__header_title">Контрольная: "{card.name}"</h1>
          <h2 className="variant__number variant__header_title">Вариант {variants.findIndex(item => item._id === variantId) + 1}</h2>
        </div>
        <ol className="variant__questions">
          {variant.questions.map((question) => {
            return (
              <li key={question._id} className="variant__question">
                {question.question}
                {question.type === 'с вариантами ответа' && 
                  <ul className="variant__questions-close">
                    {question.answers.map((answer) => {
                      return (<li key={answer._id} className="variant__answer-close">{answer}</li>)
                    })}
                  </ul>
                }
                {question.type === 'открытый вопрос' && 
                  <div className="variant__answer-open"></div>
                }
              </li>
            );
          })}
        </ol>
      </>
      }
      {location.pathname.startsWith('/admin/labs/variant/') && 
        <>
          <div className="variant__header">
            <h1 className="variant__name variant__header_title">Лабораторная: "{card.name}"</h1>
            <h2 className="variant__number variant__header_title">{variant.nameVariant}</h2>
          </div>
          <span className="variant__task">Задание:</span>
          <p className="variant__lab-text">{variant.text}</p>
          <span className="variant__task">Дедлайн:</span>
          <p className="variant__lab-text">{formatDate(card.deadline)}</p>
          <span className="variant__task">Максимальное количество баллов:</span>
          <p className="variant__lab-text">{card.points}</p>
          <span className="variant__task">Количество мест:</span>
          <p className="variant__lab-text">{variant.seats}</p>
          {variant.file && <span className="variant__task">Дополнительные материалы:</span>}
          {variant.file && <p className="variant__lab-text variant__lab-file">{filePath}<img className="file__download" alt="скачать доп материалы" src={download} onClick={handleDownload}/></p>}
          <span className="variant__task">Записаны:</span>
          <ul className="variant__persons">
            {variant.students?.length !== 0 ? variant.students?.map((student) => {
              return (<li key={student._id} className="variant__person">
                {student.firstName} {student.lastName}, {student.group}
                </li>)
            }) : <p className="variant__lab-text">Пока никто не записан</p>}
          </ul>
        </>
      }
      {location.pathname.startsWith('/admin/tasks') &&
        <>
          <div className="variant__header">
            <h1 className="variant__name variant__header_title">"{card.name}"</h1>
          </div>
          <span className="variant__task">Задание:</span>
          <p className="variant__lab-text">{card.text}</p>
          <span className="variant__task">Дедлайн:</span>
          <p className="variant__lab-text">{formatDate(card.deadline)}</p>
          <span className="variant__task">Максимальное количество баллов:</span>
          <p className="variant__lab-text">{card.points}</p>
          <span className="variant__task">Количество мест:</span>
          <p className="variant__lab-text">{card.seats}</p>
          {card.file && <span className="variant__task">Дополнительные материалы:</span>}
          {card.file && <p className="variant__lab-text variant__lab-file">{filePath}<img className="file__download" alt="скачать доп материалы" src={download} onClick={handleDownloadTask}/></p>}
          <span className="variant__task">Записаны:</span>
          <ul className="variant__persons">
            {card.students?.length !== 0 ? card.students?.map((student) => {
              return (<li key={student._id} className="variant__person">
                {student.firstName} {student.lastName}, {student.group}
                </li>)
            }) : <p className="variant__lab-text">Пока никто не записан</p>}
          </ul>
      </>
      }
      {location.pathname.startsWith('/admin/check') && 
        <>
          <div className="variant__header">
            <h1 className="variant__name variant__header_title">Контрольная: "{card.controlId.name}"</h1>
            <h2 className="variant__number variant__header_title">Студент: {card.userId.firstName} {card.userId.lastName}</h2>
          </div>
          <ol className="variant__questions">
            {card.variantId.questions.map((question) => {
              return (
                <li key={question._id} className="variant__question">
                  {question.question}
                  {question.type === 'с вариантами ответа' && 
                    <ul className="variant__questions-close">
                      {question.answers.map((answer) => {
                        return (
                          <li key={answer._id} className={`variant__answer-close ${card.userAnswers.find(userAnswer => userAnswer.id === question._id && userAnswer.answer === answer) ? 'variant__answer-selected' : ''}`}>
                            {answer}
                          </li>
                        );
                      })}
                    </ul>
                  }
                  {question.type === 'открытый вопрос' &&
                  <div className="variant__block-open">
                    <div className="variant__answer-open">
                      {card.userAnswers.map((userAnswer) => {
                        return userAnswer.id === question._id ? userAnswer.answer : ''
                      })}
                    </div>
                    <button className={`variant__answer-check ${checkedAnswers.some(answer => answer === question._id) ? 'variant__answer-check_done' : ''}`} value={question._id} type="button" onClick={checkedAnswers.some(answer => answer === question._id) ? handleDeleteAnswer : handleCheckAnswer}></button>
                  </div>
                  }
                </li>
              );
            })}
          </ol>
        </>
      }
			<div className="variant__footer">
				<div className="variant__moving">
					<img className="variant__moving_image" src={back} alt="кнопка назад" />
					<Link to={location.pathname.startsWith('/admin/controls/variant/') ? "/admin" : location.pathname.startsWith('/admin/labs/variant/') ? "/admin/labs" : location.pathname.startsWith('/admin/tasks') ? "/admin/tasks" : "/admin/check"} className="variant__moving_text">Вернуться к списку</Link>
				</div>
				{!location.pathname.startsWith('/admin/tasks') && !location.pathname.startsWith('/admin/check') && <button className="variant__button variant__deletion" type="button" onClick={deleteVariant}></button>}
				{!location.pathname.startsWith('/admin/tasks') && !location.pathname.startsWith('/admin/check') && variants?.length !== number && <div className="variant__moving">
					<p className="variant__moving_text" onClick={navigateToNext}>К следующему варианту</p>
					<img className="variant__moving_image" src={forward} alt="кнопка вперед" />
				</div>}
        {location.pathname.startsWith('/admin/check') && <button className="variant__button variant__confirm" type="button" onClick={handleCheckControl}></button>}
			</div>
		</section>
	)
}

export default Variant