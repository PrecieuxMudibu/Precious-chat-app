/* eslint-disable import/no-cycle */

import './home.css';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import LeftSection from '../leftSection/LeftSection';
import RightSection from '../rightSection/RightSection';
import SearchBar from '../searchBar/searchBar';
// eslint-disable-next-line
import Contact from '../contact/Contact';
import { applicationContext } from '../../App';

export default function Home() {
  const { setId, id } = useContext(applicationContext);
  setId(localStorage.getItem('id'));
  // eslint-disable-next-line
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // console.log('WINDOW LOCATION',window.location.pathname)
    const routeGetRecentConversation = `${process.env.REACT_APP_API_URL}/api/conversation/${id}`;
    axios
      .get(routeGetRecentConversation)
      .then((response) => {
        setConversations(response.data);
        console.log('CONVERSATION', response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home">
      <LeftSection />
      <div className="middle-section">
        <SearchBar />
        <div>
          <div className="middle-section__recent">
            <h2 className="middle-section__second-title">Recent</h2>
            <ul>
              {/* eslint-disable-next-line */}
              {conversations.length > 0 &&
                conversations.map((conversation) => (
                  // <div>Contact</div>
                  <Contact
                    key={conversation.conversation_participants[0]._id}
                    // eslint-disable-next-line
                    // key={index}
                    contactId={conversation.conversation_participants[0]._id}
                    contactName={
                      conversation.conversation_participants[0].user_name
                    }
                    contactProfilePicture={
                      conversation.conversation_participants[0]
                        .user_profile_picture
                    }
                    // var obj = { one : 1, two : 2, three : 3 };
                    // var key = 'two';

                    // var hasKey = key in obj;
                    // console.log(hasKey);
                    contactText={
                      'conversation_last_message' in conversation
                        ? conversation.conversation_last_message.message_text
                        : null
                        // ? console.log('TROUVE')
                        // :console.log('ASTROUVE')
                      // conversation.conversation_last_message.message_text
                      // 'alllo'
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
