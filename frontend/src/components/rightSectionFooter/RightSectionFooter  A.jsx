/* eslint-disable import/no-cycle */

import { AiOutlineSend } from 'react-icons/ai';
import { BsCamera, BsEmojiLaughing } from 'react-icons/bs';
import './rightSectionFooter.css';
import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { applicationContext } from '../../App';

const socket = io('http://localhost:3200');

export default function RightSectionFooter() {
  const {
    id,
    contactIdentifiant,
    conversationId,
    tableSocketMessages,
    setTableSocketMessages,
  } = useContext(applicationContext);
  const [messageText, setMessageText] = useState('');
  const [fileChoosen, setFileChoosen] = useState(false);
  const [test, setTest] = useState('');
  //   const [receive, setReceive] = useState('');
  const inputMessage = useRef();
  const inputFile = useRef();
  const [fileInfo, setFileInfo] = useState({});
  // const routeSendMessage = 'http://localhost:3200/api/message';
  // const routeSendMessage = `${process.env.REACT_APP_API_URL}/api/message`;
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
    // await axios
    //   .post(routeSendMessage, {
    //     message_text: messageText,
    //     // message_image: '',
    //     message_image: imageUrl,
    //     message_date: '',
    //     message_sender: id,
    //     message_recipient: contactIdentifiant,
    //     conversation_id: conversationId,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    inputMessage.current.value = '';
    setMessageText('');
  }

  function uploadImage(files) {
    setFileInfo(files[0]);
    setFileChoosen(true);
  }

  // function sendToCloudinary() {
  //     axios
  //         .post(
  //             'https://api.cloudinary.com/v1_1/dzci2uq4z/image/upload',
  //             formData
  //         )
  //         .then((response) => {
  //             console.log('URL', response.data.secure_url);
  //             // setImageUrl(response.data.secure_url)
  //         });
  // }

  return (
    <div className="right-section__footer">
      {/* {console.log(tableSocketMessages)} */}
      {/* <div><img src="" alt="" /></div> */}
      {/* {console.log('FILE INFO',fileInfo)} */}
      {/* {console.log('IMAGE', imageUrl)} */}
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
        <AiOutlineSend />
      </button>
    </div>
  );
}
