/* eslint-disable react/react-in-jsx-scope */
import './contactsList.css';
// eslint-disable-next-line import/no-cycle
import LeftSection from '../leftSection/LeftSection';
// eslint-disable-next-line import/no-cycle
import MiddleSection from '../middleSection/MiddleSection';
// eslint-disable-next-line import/no-cycle
import RightSection from '../rightSection/RightSection';
// import React, { useState, useContext } from 'react';

export default function ContactsList() {
  return (
    <div className="home">
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
}
