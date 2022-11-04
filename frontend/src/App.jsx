/* eslint-disable import/no-cycle */
import { Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import './App.css';
// eslint-disable-next-line import/no-cycle
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import ContactsList from './components/contactsList/ContactsList';

const applicationContext = createContext();

// import Connection from './components/connection/Connection';

function App() {
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [contactIdentifiant, setContactIdentifiant] = useState('');
  const [tableSocketMessages, setTableSocketMessages] = useState([]);
  const [contactSelected, setContactSelected] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="App">
      <applicationContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          // eslint-disable-next-line max-len
          token,
          setToken,
          id,
          setId,
          conversationId,
          setConversationId,
          contactIdentifiant,
          setContactIdentifiant,
          tableSocketMessages,
          setTableSocketMessages,
          contactSelected,
          setContactSelected,
          showPicker,
          setShowPicker,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contacts" element={<ContactsList />} />
        </Routes>
      </applicationContext.Provider>
    </div>
  );
}

export default App;
export { applicationContext };
