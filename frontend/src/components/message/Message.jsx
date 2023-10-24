/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import './message.css';
import { useContext } from 'react';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { FiDownload } from 'react-icons/fi';
import { applicationContext } from '../../App';

export default function Message({ text, sender, image, date }) {
  const { id } = useContext(applicationContext);
  let style = '';
  let hornStyle = '';
  let leftOrRight = '';
  let time = '';

  if (id === sender) {
    leftOrRight = 'message message--send';
    style = 'message__info message__info--send';
    hornStyle = 'message__horn message__horn--send';
    time = 'message__time message__time--send';
  } else {
    leftOrRight = 'message';
    style = 'message__info message__info--receive';
    hornStyle = 'message__horn';
    time = 'message__time';
  }

  function saveFile(e) {
    saveAs(e);
  }

  return (
    <div className={leftOrRight}>
      <div className={`${style}`}>
        {image !== '' ? (
          <>
            <img
              src={image}
              onClick={() => saveFile(image)}
              className="message__photo"
              alt=""
            />

            <FiDownload onClick={() => saveFile(image)} className="icon-save" />
          </>
        ) : null}

        {text === '' ? null : (
          <p className="message__content">
            {text}
            <br />
          </p>
        )}

        <div className={hornStyle} />
      </div>
      <div className={time}>
        {moment(Date.now()).format('DD/MM/YYYY') ===
        moment(date).format('DD/MM/YYYY')
          ? moment(date).fromNow()
          : moment(date).format('DD/MM/YYYY - h:s')}
      </div>
    </div>
  );
}
