/* eslint-disable import/no-cycle */
import './middleSection.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SearchBar from '../searchBar/searchBar';
import Contact from '../contact/Contact';
import { applicationContext } from '../../App';

export default function MiddleSection() {
  // const { id } = useContext(applicationContext);
  const { setId } = useContext(applicationContext);
  setId(localStorage.getItem('id'));
  const [users, setUsers] = useState([]);
  const [conversationFInal] = useState([]);
  useEffect(() => {
    if (window.location.pathname === '/contacts') {
      // const routeGetAllUsers = 'http://localhost:3200/api/users';
      const routeGetAllUsers = `${process.env.REACT_APP_API_URL}/api/users`;

      axios
        .get(routeGetAllUsers)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => console.error(error));
      // console.log('Users', users);
      // console.log('Users One',users[0]);

      // .then((response) => console.log(response.data.users[0]));
    }

    // else if (window.location.pathname === '/') {
    //     const routeGetConversation = `http://localhost:3200/api/conversation/${id}`;

    //     axios
    //         .get(routeGetConversation)
    //         .then((response) => {
    //             // console.log('CONVERSATION', response);
    //             console.log(
    //                 'ID',
    //                 response.data[0].conversation_participants
    //             );
    //             setConversation(response.data);

    //             if (conversation.length > 0) {
    //                 conversation.forEach((item) => {
    //                     let element = {
    //                         _id: item._id,
    //                     };

    //                     if (item.conversation_participants[0] === id) {
    //                         conversation.contact = conversation[1];
    //                     } else {
    //                         conversation.contact = conversation[0];
    //                     }
    //                     setConversationFInal(...element);
    //                 });
    //             }
    //         })
    //         .catch((error) => console.error('Erreur', error));
    // }
  }, []);

  // console.log(window.location.pathname);
  return (
    <div className="middle-section">
      {console.log('CONVERSTATION', conversationFInal)}

      <SearchBar />
      <div>
        <div className="middle-section__recent">
          <h2 className="middle-section__second-title">Recent</h2>
          <ul>
            {users.map((user) => (
              <Contact
                contactKey={user._id}
                contactId={user._id}
                contactName={user.user_name}
                contactProfilePicture={user.user_profile_picture}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
