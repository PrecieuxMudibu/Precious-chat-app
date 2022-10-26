import './contactsList.css';
import LeftSection from '../leftSection/LeftSection';
import MiddleSection from '../middleSection/MiddleSection';
import RightSection from '../rightSection/RightSection';
import React, { useState, useContext } from 'react';

export default function ContactsList() {
  return (
    <div className="home">
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
}
