/* eslint-disable import/no-cycle */
import './contact.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { applicationContext } from '../../App';

// import profilePicture from '../../images/profile.jpg';

export default function Contact({
  contactId,
  contactName,
  contactProfilePicture,
  contactText,
}) {
  const { id, setConversationId, setContactIdentifiant, setContactSelected } =
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
        if (response.statusText === 'Created') {
          setConversationId(response.data.conversation._id);
        } else if (response.statusText === 'OK') {
          setConversationId(response.data.data[0]._id);
        }
      });
      setContactSelected(true)
    // .catch((error) => console.error('Erreur trouvée', error));
  }

  return (
    <li className="middle-section__contact" onClick={getConversation}>
      <img
        src={contactProfilePicture}
        alt="profil du contact"
        className="middle-section__profile-picture"
      />
      <div>
        <h3 className="middle-section__third-title">{contactName}</h3>
        <p className="middle-section__paragraph">
          {contactText === '' ? 'Photo' : contactText}
        </p>
        {/* {console.log('CONTACT TEXT',contactText)} */}
      </div>
    </li>
  );
}
