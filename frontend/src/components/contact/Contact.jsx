/* eslint-disable import/no-cycle */

import './contact.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { applicationContext } from '../../App';

// import profilePicture from '../../images/profile.jpg';

export default function Contact({
  contactKey,
  contactId,
  contactName,
  contactProfilePicture,
  contactText
}) {
  const { id, setConversationId, setContactIdentifiant } =
    useContext(applicationContext);

  // const routeFindOrCreateConversation =
  //     'http://localhost:3200/api/conversation';
  const routeFindOrCreateConversation = `${process.env.REACT_APP_API_URL}/api/conversation`;

  function getConversation() {
    setContactIdentifiant(contactId);
    axios
      .post(routeFindOrCreateConversation, {
        message_sender: id,
        message_recipient: contactId,
      })
      .then((response) => {
        // console.log('CONVERSATION', response);

        if (response.statusText === 'Created') {
          // console.log('ID STATUS Created', response.data.conversation._id);
          setConversationId(response.data.conversation._id);
        } else if (response.statusText === 'OK') {
          // console.log('ID STATUS OK', response.data.data[0]._id);
          setConversationId(response.data.data[0]._id);
          console.log('CONVERSATION', response.data.data[0]._id);
        }
      });
    // .catch((error) => console.error('Erreur trouvée', error));
  }

  return (
    <li
      key={contactKey}
      className="middle-section__contact"
      onClick={getConversation}
    >
      <img
        src={contactProfilePicture}
        alt="profil du contact"
        className="middle-section__profile-picture"
      />
      <div>
        <h3 className="middle-section__third-title">{contactName}</h3>
        <p className="middle-section__paragraph">{contactText}</p>
      </div>
    </li>
  );
}
