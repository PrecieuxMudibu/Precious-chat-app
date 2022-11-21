/* eslint-disable no-unused-vars */
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './register.css';
import { useState, useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { applicationContext } from '../../App';
import ConnectionRight from '../connectionRight/ConnectionRight';

export default function Register() {
  const { setId, setToken } = useContext(applicationContext);
  const navigate = useNavigate();
  const routeRegister = `${process.env.REACT_APP_API_URL}/api/register`;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emptyField, setEmptyField] = useState(true);
  const goToHomePage = () => {
    navigate('/');
  };

  function createPost(e) {
    e.preventDefault();

    // Chècker si les champs sont vides pa une boucle
    // Si aucun champ

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      if (e.target[i].value === '') {
        e.target[i].style.borderBottom = '1px solid #FF3838';
        setEmptyField(true);
      } else {
        e.target[i].style.borderBottom = '1px solid grey';
        setName(e.target[0].value);
        setEmail(e.target[1].value);
        setPassword(e.target[2].value);
        setConfirmPassword(e.target[3].value);
        setEmptyField(false);
      }
    }

    if (emptyField === false) {
      if (e.target[2].value === e.target[3].value) {
        axios
          .post(routeRegister, {
            user_name: e.target[0].value,
            user_email: e.target[1].value,
            user_password: e.target[2].value,
          })
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            goToHomePage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  return (
    <div className="register">
      <div className="register__left">
        {/* {eslint-disable-next-line react/no-unescaped-entities} */}
        <h1 className="register__first-title">S&apos;inscrire</h1>
        <p className="register__paragraph">
          Sécurisez vos conversations avec PreciousChatt
        </p>
        <form onSubmit={createPost} className="register__form">
          <label htmlFor="name" className="register__input-group">
            <BsFillPersonFill className="register__icon" />
            <input id="name" type="text" placeholder="Nom" />
          </label>
          <label htmlFor="email" className="register__input-group">
            <MdEmail className="register__icon" />
            <input id="email" type="email" placeholder="Email" />
          </label>
          <label htmlFor="password" className="register__input-group">
            <RiLockPasswordFill className="register__icon" />
            <input
              id="password"
              type="password"
              placeholder="Votre Mot de passe"
            />
          </label>
          <label htmlFor="confirm_password" className="register__input-group">
            <RiLockPasswordFill className="register__icon" />
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirmer votre Mot de passe"
            />
          </label>
          {password !== confirmPassword ? (
            <p className="register__error">
              Saisissez correctement votre mot de passe
            </p>
          ) : null}
          <input
            type="submit"
            value="S'inscrire!"
            className="register__button"
          />
        </form>

        <p className="register__paragraph">
          Déjà membre ?{' '}
          <Link to="/login" className="register__link-to-login">
            Connectez-vous !
          </Link>
        </p>
      </div>
      <ConnectionRight />
    </div>
  );
}
