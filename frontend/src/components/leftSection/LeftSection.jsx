import axios from 'axios';
import { useRef, useState, useEffect, useContext } from 'react';
import { AiFillMessage } from 'react-icons/ai';
// import { GrLogout } from 'react-icons/gr';
import { RiLogoutBoxRFill, RiContactsFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { applicationContext } from '../../App';
// import profilePicture from '../../images/profile.jpg';
import './leftSection.css';

export default function LeftSection() {
  const navigate = useNavigate();
  const pictureFile = useRef();

  const [fileChoosen, setFileChoosen] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const { id } = useContext(applicationContext);

  const routeGetCurrentUserInfo = `${process.env.REACT_APP_API_URL}/api/user/${id}`;
  useEffect(() => {
    axios
      .get(routeGetCurrentUserInfo)
      .then((response) => {
        console.log('UTILISATEUR COURANT', response.data.user_profile_picture);
        setProfilePicture(response.data.user_profile_picture);
      })
      .catch((error) => console.error(error));
  });
  // console.log(id);
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
  }

  async function updateProfileInDatabase(data) {
    const routeUpdateUser = `${process.env.REACT_APP_API_URL}/api/user/${id}`;
    await axios
      // .put(routeUpdateUser, { user_profile_picture: 'newProfilePicture' })
      .put(routeUpdateUser, { user_profile_picture: data })
      .then((response) =>
        console.log('MIS A JOUR DANS LA BASE DE DONNEES', response)
      )
      .catch((error) =>
        console.error('ENVOI DANS LA BASE DE DONNEES ECHOUEE', error)
      );
  }

  async function changeProfilePicture() {
    const cloudName = 'dzci2uq4z';
    const formData = new FormData();
    formData.append('file', fileInfo);
    // console.log('FILE INFO', fileInfo);

    formData.append('upload_preset', 'testPresetName');
    // console.log('FORM DATA', formData);
    let test;
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((response) => {
        // console.log('URL', response.data.secure_url);
        setNewProfilePicture(response.data.secure_url);
        test = response.data.secure_url;
        updateProfileInDatabase(test);
      });
    setFileChoosen(false);
  }

  function uploadImage(files) {
    console.log('CHANGE IMAGE', files[0]);
    alert('En continuant vous allez modifier votre profil.');
    setFileInfo(files[0]);
    setFileChoosen(true);
    // }
  }
  return (
    <div className="left-section">
      <img
        src={profilePicture}
        alt="profil"
        className="left-section__profile-picture"
        onClick={() => pictureFile.current.click()}
      />
      <input
        ref={pictureFile}
        type="file"
        className="inputFile"
        onChange={(event) => {
          uploadImage(event.target.files);
        }}
      />
      {fileChoosen ? (
        <>
          <button
            type="button"
            className="left-section__button"
            onClick={changeProfilePicture}
          >
            Valider
          </button>
          <button
            type="button"
            className="left-section__button left-section__button--cancel"
          >
            Annuler
          </button>
        </>
      ) : null}

      <nav className="left-section__navigation">
        <ul>
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
      {console.log('NEW PROFILE PICTURE', newProfilePicture)}
      <button type="button" onClick={updateProfileInDatabase}>
        Base de données
      </button>
    </div>
  );
}
