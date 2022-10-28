/* eslint-disable import/no-cycle */
import './middleSection.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../searchBar/searchBar';
import Contact from '../contact/Contact';
import { applicationContext } from '../../App';

export default function MiddleSection() {
  const { setId, id } = useContext(applicationContext);
  setId(localStorage.getItem('id'));
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState([]);
  // const [conversationFInal] = useState([]);
  useEffect(() => {
    // console.log('WINDOW LOCATION',window.location.pathname)
    if (window.location.pathname === '/') {
      const routeGetRecentConversation = `${process.env.REACT_APP_API_URL}/api/conversation/${id}`;
      axios
        .get(routeGetRecentConversation)
        .then((response) => {
          setConversation(response.data);
          console.log('CONVERSATION', response.data);
          console.log(
            'CONTACT NAME',
            response.data[0].conversation_participants[0].user_name
          );
          console.log(
            'CONTACT ID',
            response.data[0].conversation_participants[0]._id
          );
          console.log(
            'CONTACT PROFIL PICTURE',
            response.data[0].conversation_participants[0].user_profile_picture
          );
          console.log(
            'LAST MESSAGE',
            response.data[0].conversation_last_message.message_text
          );
          // console.log('CONVERSATION', response.data.users);
        })
        .catch((error) => console.error(error));
    }

    if (window.location.pathname === '/contacts') {
      // const routeGetAllUsers = `${process.env.REACT_APP_API_URL}/api/users`;
      const routeGetAllUsersExceptCurrentUser = `${process.env.REACT_APP_API_URL}/api/users/${id}`;
      axios
        .get(routeGetAllUsersExceptCurrentUser)
        .then((response) => {
          setUsers(response.data.users);
          console.log('USERS', response.data.users);
        })
        .catch((error) => console.error(error));
      // console.log('Users', users);
      // console.log('Users One',users[0]);

      // .then((response) => console.log(response.data.users[0]));
    }
  }, []);

  // console.log(window.location.pathname);
  return (
    <div className="middle-section">
      <SearchBar />
      <div>
        <div className="middle-section__recent">
          <h2 className="middle-section__second-title">Recent</h2>
          <ul>
            {users.map((user) => (
              <Contact
                contactKey={
                  window.location.pathname === '/'
                    ? conversation.conversation_participants[0]._id
                    : user._id
                }
                contactId={
                  window.location.pathname === '/'
                    ? conversation.conversation_participants[0]._id
                    : user._id
                }
                contactName={
                  window.location.pathname === '/'
                    ? conversation.conversation_participants[0].user_name
                    : user.user_name
                }
                contactProfilePicture={
                  window.location.pathname === '/'
                    ? conversation.conversation_participants[0]
                        .user_profile_picture
                    : user.user_profile_picture
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
