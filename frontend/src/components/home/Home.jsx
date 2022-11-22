/* eslint-disable import/no-cycle */

import './home.css';
import axios from 'axios';
import { useContext, useEffect,useState } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
import LeftSection from '../leftSection/LeftSection';
import RightSection from '../rightSection/RightSection';
import SearchBar from '../searchBar/searchBar';
// eslint-disable-next-line
import Contact from '../contact/Contact';
import { applicationContext } from '../../App';

export default function Home() {
  const { setId, id, token } = useContext(applicationContext);
  const [conversations, setConversations] = useState([]);

  setId(localStorage.getItem('id'));
  // eslint-disable-next-line

  useEffect(() => {
    const routeGetRecentConversation = `${process.env.REACT_APP_API_URL}/api/conversation/${id}`;
    axios({
      method: 'get',
      url: routeGetRecentConversation,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  // useEffect(() => {
  //   alert('Votre compte a été créé avec succès.');
  //   setTimeout(setTextAccountCreated(''), 10000);
  // }, [id]);

  return (
    <div className="home">
      {/* textAccountCreated !== '' ? (
        <div className="home__account-created-text">
          <p>{textAccountCreated}</p>
        </div>
      ) : null */}
      <LeftSection />
      <div className="middle-section">
        <SearchBar />
        <div>
          <div className="middle-section__recent">
            <h2 className="middle-section__second-title">Recent</h2>
            <ul>
              {conversations.length > 0 &&
                conversations.map((conversation) => (
                  <Contact
                    key={conversation.conversation_participants[0]._id}
                    contactId={
                      conversation.conversation_participants[0]._id === id
                        ? conversation.conversation_participants[1]._id
                        : conversation.conversation_participants[0]._id
                    }
                    contactName={
                      conversation.conversation_participants[0]._id === id
                        ? conversation.conversation_participants[1].user_name
                        : conversation.conversation_participants[0].user_name
                    }
                    contactProfilePicture={
                      conversation.conversation_participants[0]._id === id
                        ? conversation.conversation_participants[1]
                            .user_profile_picture
                        : conversation.conversation_participants[0]
                            .user_profile_picture
                    }
                    contactText={
                      'conversation_last_message' in conversation
                        ? conversation.conversation_last_message.message_text
                        : null
                    }
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
