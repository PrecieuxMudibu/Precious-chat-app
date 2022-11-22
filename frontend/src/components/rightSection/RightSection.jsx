/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import RightSectionFooter from '../rightSectionFooter/RightSectionFooter';
import RightSectionHeader from '../rightSectionHeader/RightSectionHeader';
import Message from '../message/Message';
import './rightSection.css';
import { applicationContext } from '../../App';
import background from '../../images/background.png';

export default function RightSection() {
  const {
    conversationId,
    tableSocketMessages,
    contactSelected,
    showPicker,
    setShowPicker,
    token,
  } = useContext(applicationContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    const routeGetAllMessages = `${process.env.REACT_APP_API_URL}/api/message/${conversationId}`;

    axios({
      method: 'get',
      url: routeGetAllMessages,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => console.error(error));
  }, [conversationId]);

  return contactSelected ? (
    <div className="right-section">
      <RightSectionHeader />
      <div
        className="right-section__messages"
        onClick={() => setShowPicker(false)}
      >
        <div className="right-section__message">
          {messages?.map((message) => (
            <Message
              key={message._id}
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
  ) : (
    <div className="right-section">
      <figure>
        <img src={background} alt="" />
      </figure>
    </div>
  );
}
