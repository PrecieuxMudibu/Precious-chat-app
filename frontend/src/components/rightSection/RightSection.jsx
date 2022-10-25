/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import RightSectionFooter from '../rightSectionFooter/RightSectionFooter';
import RightSectionHeader from '../rightSectionHeader/RightSectionHeader';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Message from '../message/Message';
import './rightSection.css';
import { applicationContext } from '../../App';
// eslint-disable-next-line import/order
import axios from 'axios';
// import { io } from 'socket.io-client';

export default function RightSection() {
  // On passe l'url de notre serveur pour le connecter au frontend
  // const socket = io('http://localhost:3200');
  // socket.on('connect', () => {
  //     console.log(`You are connected with: ${socket.id}`);
  // });

  // Envoyer un évènement dans le backend
  // socket.emit('custom-event', 10, 'Hi');
  const { conversationId, tableSocketMessages } =
    useContext(applicationContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    // const routeGetAllMessages = `http://localhost:3200/api/message/${conversationId}`;
    const routeGetAllMessages = `${process.env.REACT_APP_API_URL}/api/message/${conversationId}`;

    axios
      .get(routeGetAllMessages)
      .then((response) => {
        // console.log('MESSAGES TROUVES', response.data);
        console.log('TABLE DES MESSAGES', response.data.messages);
        setMessages(response.data.messages);
        // console.log('NOM TROUVE', response.data.users.user_name);
        // setContactInfo(response.data.users);
      })
      .catch((error) => console.error(error));
  }, [conversationId]);
  return (
    <div className="right-section">
      <RightSectionHeader />
      <div className="right-section__messages">
        <div className="right-section__message">
          {messages?.map((message) => (
            <Message
              text={message.message_text}
              sender={message.message_sender}
              image={message.message_image}
              date={message.createdAt}
            />
          ))}

          {tableSocketMessages?.map((message) => (
            <Message
              text={message.text}
              sender={message.sender}
              image={message.image}
              date={message.date}
            />
          ))}

          {/* <Message /> */}
        </div>
      </div>
      <RightSectionFooter />
    </div>
  );
}
