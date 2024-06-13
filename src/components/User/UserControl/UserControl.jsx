import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './UserControl.css'

function UserControl(props) {
  const location = useLocation();
  const {card, variant} = location.state;
  const [userAnswers, setUserAnswers] = useState(variant.questions.map(question => {
    return { id: question._id, answer: "" };
  }));
  const [isAllFilled, setIsAllFilled] = useState(false);

  React.useEffect(() => {
    const isFilled = userAnswers.every(answer => answer.answer !== "");
    setIsAllFilled(isFilled);
  }, [userAnswers]);

  const handleSelectAnswer = (questionId, answer) => {
    const updatedAnswers = userAnswers.map((item) => {
      if (item.id === questionId) {
        return { ...item, answer };
      }
      return item;
    });
    setUserAnswers(updatedAnswers);
  };

  const handleTypeAnswer = (questionId, answer) => {
    const updatedAnswers = userAnswers.map((item) => {
      if (item.id === questionId) {
        return { ...item, answer };
      }
      return item;
    });
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = () => {
    props.checkAnswers(card._id, variant._id, userAnswers)
  };

  return (
    <section className="variant">
      <div className="variant__header">
        <h1 className="variant__name variant__header_title">Контрольная: "{card.name}"</h1>
      </div>
      <ol className="variant__questions">
        {variant.questions.map((question) => {
          return (
            <li key={question._id} className="user-variant__question">
              {question.question}
              {question.type === 'с вариантами ответа' && 
                <ul className="user-variant__questions-close">
                  {question.answers.map((answer) => {
                    return (
                      <li key={answer._id} className="user-variant__answer-close">
                        <label>
                          <input
                            type="radio"
                            value={answer}
                            checked={userAnswers.find(item => item.id === question._id)?.answer === answer}
                            onChange={() => handleSelectAnswer(question._id, answer)}
                          />
                          {answer}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              }
              {question.type === 'открытый вопрос' && 
                <div className="user-variant__answer-open">
                  <input
                    type="text"
                    value={userAnswers.find(item => item.id === question._id)?.answer}
                    onChange={(e) => handleTypeAnswer(question._id, e.target.value)}
                    className="user-variant__answer-text"
                  />
                </div>
              }
            </li>
          );
        })}
      </ol>
      <button className={`user-control__button ${isAllFilled ? "user-control__button-active" : "user-control__button-disable"}`} onClick={handleSubmitAnswers} disabled={!isAllFilled}>Отправить на проверку</button>
    </section>
  );
}

export default UserControl;
