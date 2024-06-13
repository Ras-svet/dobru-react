import React from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../Enter.css';

function SignUp(props) {
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState('');
  const { register, handleSubmit, trigger, clearErrors, formState: { errors, isValid }, reset } = useForm({
    mode: "onChange",
  });

  function handleChange() {
    setServerError('')
    clearErrors()
    trigger()
  }

  const onSubmit = (data) => {
    props.onClick(data.group, data.firstName, data.lastName, data.email, data.password, data.telegram, data.github)
    reset();
  };

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <form className="entry__form" onSubmit={handleSubmit(onSubmit)}>
        <input
        {...register("firstName", { 
          required: "Поле 'Имя' обязательно для заполнения" })}
          onInput={handleChange}
          className="entry__input"
          placeholder="Имя"
          type="text"
        />
        <p className="entry__input-error">{errors.firstName?.message}</p>
        <input
        {...register("lastName", { 
          required: "Поле 'Фамилия' обязательно для заполнения" })}
          onInput={handleChange}
          className="entry__input"
          placeholder="Фамилия"
          type="text"
        />
        <p className="entry__input-error">{errors.lastName?.message}</p>
        <input
          className="entry__input"
          placeholder="Группа"
          type="text"
          {...register("group", { 
            required: "Поле 'Группа' обязательно для заполнения",
            pattern: {
              value: /^[A-Z].*/,
              message: "Первый символ группы должен быть заглавной буквой английского алфавита"
            }
          })}
          onInput={handleChange}
        />
        <p className="entry__input-error">{errors.group?.message}</p>
        <input
          {...register("telegram", { 
            required: "Поле 'Ссылка на телеграм' обязательно для заполнения",
            pattern: {
              value: /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
              message: "Поле 'GitHub' должно быть формата https://t.me/username"
            }
          })}
          onInput={handleChange}
          className="entry__input"
          placeholder="Ссылка на телеграм"
          type="text"
        />
        <p className="entry__input-error">{errors.telegram?.message}</p>
        <input
          className="entry__input"
          placeholder="Ссылка на GitHub"
          type="text"
          {...register("github", { 
            required: "Поле 'Ссылка на GitHub' обязательно для заполнения",
            pattern: {
              value: /^https?:\/\/github\.com\/[a-zA-Z0-9_-]+$/,
              message: "Поле 'GitHub' должно быть формата https://github.com/username"
            }
          })}
          onInput={handleChange}
        />
        <p className="entry__input-error">{errors.github?.message}</p>
        <input
          {...register("email", { 
            required: "Поле 'Почта' обязательно для заполнения",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Поле 'Почта' должно быть формата example@mail.ru"
            }
          })}
          onInput={handleChange}
          className="entry__input"
          placeholder="Email"
          type="email"
        />
        <p className="entry__input-error">{errors.email?.message}</p>
        <input
          className="entry__input"
          placeholder="Пароль"
          type="text"
          {...register("password", { required: "Поле 'Пароль' обязательно для заполнения" })}
        />
        <p className="entry__input-error">{errors.password?.message}</p>
        <button className={`entry__button ${isValid ? 'entry__button-active' : 'entry__button-disable'}`} disabled={!isValid} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default SignUp;
