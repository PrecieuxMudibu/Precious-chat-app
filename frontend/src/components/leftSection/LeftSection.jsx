/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/order */
import profilePicture from '../../images/profile.jpg';
import { AiFillMessage } from 'react-icons/ai';
// import { GrLogout } from 'react-icons/gr';
import { RiLogoutBoxRFill, RiContactsFill } from 'react-icons/ri';
import './leftSection.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function LeftSection() {
  // const { id, setId } = useContext(applicationContext);
  // setId(localStorage.getItem('id'));
  const navigate = useNavigate();

  // console.log(id);
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
  }

  return (
    <div className="left-section">
      <img
        src={profilePicture}
        alt="profil"
        className="left-section__profile-picture"
      />
      <nav className="left-section__navigation">
        <ul>
          {/* <NavLink to="/">
                        <li className="left-section__link">
                            <AiFillMessage />
                        </li>
                    </NavLink>
                    <NavLink to="/contacts">
                        <li className="left-section__link">
                            <RiContactsFill className="icon-contact" />
                        </li>
                    </NavLink> */}
          <li>
            <NavLink to="/" className="left-section__link">
              <AiFillMessage />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className="left-section__link">
              <RiContactsFill className="icon-contact" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="left-section__logout">
        <RiLogoutBoxRFill className="icon-logout" onClick={logOut} />
      </div>
    </div>
  );
}
