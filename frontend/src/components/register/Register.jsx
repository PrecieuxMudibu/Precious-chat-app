/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './register.css';
import ConnectionRight from '../connectionRight/ConnectionRight';

export default function Register() {
  // const routeRegister = 'http://localhost:3200/api/register';
  const navigate = useNavigate();
  const routeRegister = `${process.env.REACT_APP_API_URL}/api/register`;

  const handleClick = () => {
    navigate('/');
  };

  function createPost(e) {
    e.preventDefault();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      if (e.target[i].value === '') {
        e.target[i].style.borderBottom = '1px solid #FF3838';
      } else {
        e.target[i].style.borderBottom = '1px solid grey';
      }
    }

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    axios
      .post(routeRegister, {
        user_name: name,
        user_email: email,
        user_password: password,
      })
      .then((response) => {
        console.log(response);
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="connection">
      <div className="connection__left">
        {/* {eslint-disable-next-line react/no-unescaped-entities} */}
        <h1 className="connection__first-title">S&apos;inscrire</h1>
        <p className="connection__paragraph">
          Sécurisez vos conversations avec PreciousChatt
        </p>
        <form onSubmit={createPost} className="connection__form">
          <label htmlFor="name" className="connection__input-group">
            <BsFillPersonFill className="connection__icon" />
            <input id="name" type="text" placeholder="Nom" />
          </label>
          <label htmlFor="email" className="connection__input-group">
            <MdEmail className="connection__icon" />
            <input id="email" type="email" placeholder="Email" />
          </label>
          <label htmlFor="password" className="connection__input-group">
            <RiLockPasswordFill className="connection__icon" />
            <input
              id="password"
              type="password"
              placeholder="Votre Mot de passe"
            />
          </label>
          <label htmlFor="confirm_password" className="connection__input-group">
            <RiLockPasswordFill className="connection__icon" />
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirmer votre Mot de passe"
            />
          </label>

          <input
            type="submit"
            value="S'inscrire!"
            className="connection__button"
          />
        </form>
        <p className="connection__paragraph">
          Déjà membre ?<Link to="/login">Connectez-vous !</Link>
        </p>
      </div>
      <ConnectionRight />
    </div>
  );
}
