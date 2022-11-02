/* eslint-disable import/no-cycle */

import './contactsList.css';
// import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import LeftSection from '../leftSection/LeftSection';
// import MiddleSection from '../middleSection/MiddleSection';
import RightSection from '../rightSection/RightSection';
import SearchBar from '../searchBar/searchBar';
import Contact from '../contact/Contact';
import { applicationContext } from '../../App';

export default function ContactsList() {
  const { setId, id, token } = useContext(applicationContext);
  setId(localStorage.getItem('id'));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (window.location.pathname === '/contacts') {
      // const routeGetAllUsers = `${process.env.REACT_APP_API_URL}/api/users`;
      const routeGetAllUsersExceptCurrentUser = `${process.env.REACT_APP_API_URL}/api/users/${id}`;

      axios({
        method: 'get',
        url: routeGetAllUsersExceptCurrentUser,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  return (
    <div className="home">
      <LeftSection />
      {/* <MiddleSection /> */}

      <div className="middle-section">
        <SearchBar />
        <div>
          <div className="middle-section__recent">
            <h2 className="middle-section__second-title">Contacts</h2>
            <ul>
              {users.map((user) => (
                <Contact
                  key={user._id}
                  contactId={user._id}
                  contactName={user.user_name}
                  contactProfilePicture={user.user_profile_picture}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RightSection />
    </div>
  );
}
