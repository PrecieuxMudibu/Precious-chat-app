import axios from 'axios';
import { useRef, useState, useEffect, useContext } from 'react';
import { AiFillMessage } from 'react-icons/ai';
// import { GrLogout } from 'react-icons/gr';
import { RiLogoutBoxRFill, RiContactsFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
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
  const { id } = useContext(applicationContext);

  const routeGetCurrentUserInfo = `${process.env.REACT_APP_API_URL}/api/user/${id}`;
  useEffect(() => {
    axios
      .get(routeGetCurrentUserInfo)
      .then((response) => {
        setProfilePicture(response.data.user_profile_picture);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // console.log(id);
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
  }

  function cancel() {
    setFileChoosen(false);
  }

  async function updateProfileInDatabase(data) {
    const routeUpdateUser = `${process.env.REACT_APP_API_URL}/api/user/${id}`;
    await axios
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

    formData.append('upload_preset', 'testPresetName');
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((response) => {
        setProfilePicture(response.data.secure_url);
        updateProfileInDatabase(response.data.secure_url);
      });
    setFileChoosen(false);
  }

  function uploadImage(files) {
    alert('En continuant vous allez modifier votre photo de profil.');
    setFileInfo(files[0]);
    setFileChoosen(true);
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
            onClick={cancel}
          >
            Annuler
          </button>
        </>
      ) : null}

      <nav className="left-section__navigation">
        <ul>
          <li>
            <Link
              to="/"
              className={
                window.location.pathname === '/'
                  ? 'left-section__link active'
                  : 'left-section__link'
              }
            >
              <AiFillMessage />
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className={
                window.location.pathname === '/contacts'
                  ? 'left-section__link active'
                  : 'left-section__link'
              }
            >
              <RiContactsFill className="icon-contact" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="left-section__logout">
        <RiLogoutBoxRFill className="icon-logout" onClick={logOut} />
      </div>
    </div>
  );
}
