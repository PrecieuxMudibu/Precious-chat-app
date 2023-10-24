/* eslint-disable import/no-cycle */
/* eslint-disable import/newline-after-import */
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { applicationContext } from '../../App';
import './searchResults.css';
import LeftSection from '../leftSection/LeftSection';
import SearchBar from '../searchBar/searchBar';
import Contact from '../contact/Contact';
import RightSection from '../rightSection/RightSection';
export default function SearchResults() {
  const { token, textSearchInput } = useContext(applicationContext);
  const routeGetUsersSearched = `${process.env.REACT_APP_API_URL}/api/users/${textSearchInput}`;
  const [resultsList, setResultsList] = useState([]);
  useEffect(() => {
    axios({
      method: 'post',
      url: routeGetUsersSearched,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setResultsList([...response.data.users]);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="home">
      <LeftSection />
      {console.log('RESULT LIST', resultsList)}
      <div className="middle-section">
        <SearchBar />
        {console.log('RESULT LIST', resultsList)}
        <div>
          <div className="middle-section__recent">
            <h2 className="middle-section__second-title">Contacts</h2>
            <ul>
              {resultsList.map((user) => (
                <Contact
                  key={user._id}
                  contactId={user._id}
                  contactName={user.user_name}
                  contactProfilePicture={user.user_profile_picture}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RightSection />
    </div>
  );
}
