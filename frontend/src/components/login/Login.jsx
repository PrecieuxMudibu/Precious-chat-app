/* eslint-disable import/no-cycle */
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useContext } from 'react';
import axios from 'axios';
import ConnectionRight from '../connectionRight/ConnectionRight';
import { applicationContext } from '../../App';

export default function Login() {
  const routeLogin = `${process.env.REACT_APP_API_URL}/api/login`;

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { setToken, id, setId } = useContext(applicationContext);

  const handleClick = () => {
    navigate('/');
  };

  function connect(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    axios
      .post(routeLogin, {
        user_email: email,
        user_password: password,
      })
      .then((response) => {
        console.log(response);
        // console.log('id', response.data.id);
        // console.log('Token', response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);

        // setId(localStorage.getItem('id'));
        // setToken(localStorage.getItem('token'));
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log('State ID', id);

  return (
    <div className="connection">
      <div className="connection__left">
        <h1 className="connection__first-title">Se connecter</h1>
        <p className="connection__paragraph">
          Sécurisez vos conversations avec PreciousChatt.
        </p>
        <form onSubmit={connect} className="connection__form">
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

          <input
            type="submit"
            value="Se connecter!"
            className="connection__button"
          />
        </form>
        <p className="connection__paragraph">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register">Créez-en un par ici.</Link>
          {/* <p>Id de la personne connectée : {id}</p> */}
        </p>
      </div>
      <ConnectionRight />
    </div>
  );
}
