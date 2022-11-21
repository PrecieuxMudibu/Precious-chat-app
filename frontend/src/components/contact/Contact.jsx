/* eslint-disable import/no-cycle */
import './contact.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { applicationContext } from '../../App';

export default function Contact({
  contactId,
  contactName,
  contactProfilePicture,
  contactText,
}) {
  const {
    id,
    setConversationId,
    setContactIdentifiant,
    setContactSelected,
    token,
  } = useContext(applicationContext);

  const routeFindOrCreateConversation = `${process.env.REACT_APP_API_URL}/api/conversation`;

  function getConversation() {
    setContactIdentifiant(contactId);

    axios({
      method: 'post',
      url: routeFindOrCreateConversation,
      data: {
        message_sender: id,
        message_recipient: contactId,
      },
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      if (response.statusText === 'Created') {
        setConversationId(response.data.conversation._id);
      } else if (response.statusText === 'OK') {
        setConversationId(response.data.data[0]._id);
      }
    });
    setContactSelected(true);
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
      </div>
    </li>
  );
}
