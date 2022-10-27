/* eslint-disable import/no-cycle */

import './contactsList.css';
// import React, { useState, useContext } from 'react';
import LeftSection from '../leftSection/LeftSection';
import MiddleSection from '../middleSection/MiddleSection';
import RightSection from '../rightSection/RightSection';

export default function ContactsList() {
  return (
    <div className="home">
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
}
