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
  const [conversations, setConversation] = useState([]);
  useEffect(() => {
    // console.log('WINDOW LOCATION',window.location.pathname)
    if (window.location.pathname === '/') {
      const routeGetRecentConversation = `${process.env.REACT_APP_API_URL}/api/conversation/${id}`;
      axios
        .get(routeGetRecentConversation)
        .then((response) => {
          setConversation(response.data);
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
        })
        .catch((error) => console.error(error));
    }
  }, [window.location.pathname]);


  return (
    <div className="middle-section">
      <SearchBar />
      <div>
        <div className="middle-section__recent">
          <h2 className="middle-section__second-title">Recent</h2>
          <ul>
            {window.location.pathname === '/contacts'
              ? users.map((user) => (
                  <Contact
                    key={user._id}
                    contactId={user._id}
                    contactName={user.user_name}
                    contactProfilePicture={user.user_profile_picture}
                  />
                ))
              : conversations.map((conversation) => (
                  <Contact
                    key={conversation.conversation_participants[0]._id}
                    contactId={conversation.conversation_participants[0]._id}
                    contactName={
                      conversation.conversation_participants[0].user_name
                    }
                    contactProfilePicture={
                      conversation.conversation_participants[0]
                        .user_profile_picture
                    }
                    contactText={
                      conversation.conversation_last_message.message_text
                    }
                  />
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// if (window.location.pathname === '/contacts') {
//   return (
//     <div className="middle-section">
//       <SearchBar />
//       <div>
//         <div className="middle-section__recent">
//           <h2 className="middle-section__second-title">Recent</h2>
//           <ul>
//             {users.map((user) => (
//               <Contact
//                 key={user._id}
//                 contactId={user._id}
//                 contactName={user.user_name}
//                 contactProfilePicture={user.user_profile_picture}
//               />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// if (window.location.pathname === '/') {
//   return (
//     <div className="middle-section">
//       <SearchBar />
//       <div>
//         <div className="middle-section__recent">
//           <h2 className="middle-section__second-title">Recent</h2>
//           <ul>
//             {conversations.map((conversation) => (
//               <Contact
//                 key={conversation.conversation_participants[0]._id}
//                 contactId={conversation.conversation_participants[0]._id}
//                 contactName={
//                   conversation.conversation_participants[0].user_name
//                 }
//                 contactProfilePicture={
//                   conversation.conversation_participants[0]
//                     .user_profile_picture
//                 }
//                 contactText={
//                   conversation.conversation_last_message.message_text
//                 }
//               />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
