/* eslint-disable import/no-cycle */

import Picker from 'emoji-picker-react';
// eslint-disable-next-line no-unused-vars
import { AiOutlineSend } from 'react-icons/ai';
// eslint-disable-next-line no-unused-vars
import { ColorRing } from 'react-loader-spinner';
import { BsCamera, BsEmojiLaughing } from 'react-icons/bs';
import './rightSectionFooter.css';
import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { applicationContext } from '../../App';

const socket = io(`${process.env.REACT_APP_API_URL}`);

export default function RightSectionFooter() {
  const {
    id,
    contactIdentifiant,
    conversationId,
    tableSocketMessages,
    setTableSocketMessages,
    showPicker,
    setShowPicker,
    token,
  } = useContext(applicationContext);
  const [messageText, setMessageText] = useState('');
  const [fileChoosen, setFileChoosen] = useState(false);
  const [messageSended, setMessageSended] = useState(true);
  // const [messageToSend, setMessageToSend] = useState(false);
  const [localLink, setLocalLink] = useState('');
  const inputMessage = useRef();
  const inputFile = useRef();
  const [fileInfo, setFileInfo] = useState({});
  const routeSendMessage = `${process.env.REACT_APP_API_URL}/api/message`;
  socket.on('connect', () => {
    console.log(`You are connected with: ${socket.id}`);
  });

  useEffect(() => {
    socket.emit('join-room', conversationId);
    setTableSocketMessages([]);
  }, [conversationId]);

  // eslint-disable-next-line no-shadow
  socket.on('receive-message', (message, tableSocketMessages) => {
    setTableSocketMessages([...tableSocketMessages, message]);
  });

  async function sendMessage() {
    if (messageText !== '' || fileChoosen !== false) {
      setMessageSended(false);
      const message = {
        text: messageText,
        image: '',
        sender: id,
        message_recipient: contactIdentifiant,
        conversation_id: conversationId,
        room: conversationId,
      };

      if (fileChoosen) {
        let imageUrl;
        const cloudName = 'dzci2uq4z';
        const formData = new FormData();
        formData.append('file', fileInfo);
        // console.log('FILE INFO', fileInfo);

        formData.append('upload_preset', 'testPresetName');
        console.log('FORM DATA', formData);
        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          )
          .then((response) => {
            imageUrl = response.data.secure_url;
          });
        setFileChoosen(false);
        message.image = imageUrl;
      }
      setTableSocketMessages([...tableSocketMessages, message]);
      socket.emit('send-message', message, tableSocketMessages);
      axios({
        method: 'post',
        url: routeSendMessage,
        data: {
          message_text: messageText,
          message_image: message.image,
          message_sender: id,
          message_recipient: contactIdentifiant,
          conversation_id: conversationId,
        },
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      inputMessage.current.value = '';
      setMessageText('');
      setLocalLink('');
      setMessageSended(true);
      setShowPicker(false);
    }
  }

  function uploadImage(files) {
    setFileInfo(files[0]);
    setFileChoosen(true);
    setLocalLink(URL.createObjectURL(files[0]));
  }

  function onEmojiClick(emojiObject) {
    setMessageText((prevInput) => prevInput + emojiObject.emoji);
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <>
      {localLink !== '' ? (
        <div className="right-section__photo-preview">
          <img src={localLink} alt="" />
        </div>
      ) : null}
      {showPicker ? (
        <div className="right-section__emoji-list">
          <Picker pickerStyle={{ width: '100%' }} onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
      <div className="right-section__footer">
        <div>
          <input
            className="right-section__text-area"
            rows="1"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            ref={inputMessage}
            onKeyDown={handleKeyPress}
          />
          <span className="right-section__icons">
            <BsEmojiLaughing
              className="icon-emoji"
              onClick={() => setShowPicker(true)}
              onBlur={() => setShowPicker(false)}
            />
            <input
              ref={inputFile}
              className="input__image-selected"
              type="file"
              name="file"
              accept=".jpg, .png, .gif"
              placeholder="Uploader une image"
              onChange={(event) => {
                uploadImage(event.target.files);
              }}
            />

            <BsCamera
              className="icon-camera"
              onClick={() => inputFile.current.click()}
            />
          </span>
        </div>

        <button
          type="button"
          className="right-section__send"
          onClick={sendMessage}
        >
          {messageSended ? (
            <AiOutlineSend className="send-icon" />
          ) : (
            <ColorRing
              visible
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['white', 'white', 'white', 'white', 'white']}
              className="send-loader"
            />
          )}
        </button>
      </div>
    </>
  );
}
