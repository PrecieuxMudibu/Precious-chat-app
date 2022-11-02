/* eslint-disable import/no-cycle */

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
// import image from '../../images/profile.jpg'

const socket = io('http://localhost:3200');

export default function RightSectionFooter() {
  const {
    id,
    contactIdentifiant,
    conversationId,
    tableSocketMessages,
    setTableSocketMessages,
    token
  } = useContext(applicationContext);
  const [messageText, setMessageText] = useState('');
  const [fileChoosen, setFileChoosen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [messageSended, setMessageSended] = useState(true);
  const [test, setTest] = useState('');
  const [localLink, setLocalLink] = useState('');
  const inputMessage = useRef();
  const inputFile = useRef();
  const [fileInfo, setFileInfo] = useState({});
  // const routeSendMessage = 'http://localhost:3200/api/message';
  const routeSendMessage = `${process.env.REACT_APP_API_URL}/api/message`;
  socket.on('connect', () => {
    console.log(`You are connected with: ${socket.id}`);
  });

  useEffect(() => {
    // rejoindre la room
    socket.emit('join-room', conversationId);

    setTableSocketMessages([]);
  }, [conversationId]);

  // eslint-disable-next-line no-shadow
  socket.on('receive-message', (message, tableSocketMessages) => {
    // console.log('MESSAGE RECU DANS LA ROOM',message.text);

    // A DECOMMENTER
    setTableSocketMessages([...tableSocketMessages, message]);
  });

  async function sendMessage() {
    // console.log("SEND MESSAGE",messageText)
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
      // console.log('FORM DATA', formData);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((response) => {
          imageUrl = response.data.secure_url;
          console.log('URL', response.data.secure_url);
          console.log('IMAGE URL', imageUrl);
          // return response.data.secure_url;
        });
      setFileChoosen(false);
      message.image = imageUrl;
    }
    setTest(message.image);
    setTableSocketMessages([...tableSocketMessages, message]);
    socket.emit('send-message', message, tableSocketMessages);
    axios({
      method: 'post',
      url: routeSendMessage,
      data: {
        message_text: messageText,
        // message_image: '',
        message_image: message.image,
        message_date: '',
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
  }

  function uploadImage(files) {
    setFileInfo(files[0]);
    setFileChoosen(true);
    setLocalLink(URL.createObjectURL(files[0]));
  }

  return (
    <>
      {' '}
      {localLink !== '' ? (
        <div className="right-section__photo-preview">
          <img src={localLink} alt="" />
        </div>
      ) : null}
      <div className="right-section__footer">
        {console.log('IMAGE', test)}

        <div>
          <textarea
            className="right-section__text-area"
            rows="1"
            onChange={(e) => setMessageText(e.target.value)}
            ref={inputMessage}
          />
          <span className="right-section__icons">
            <BsEmojiLaughing className="icon-emoji" />
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
          {/* <AiOutlineSend className='send-icon'/> */}
        </button>
      </div>
    </>
  );
}
