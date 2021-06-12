import React from 'react';
import {FaShareAlt} from 'react-icons/fa';
import {BiChalkboard} from 'react-icons/bi';
import {  FiSave } from 'react-icons/fi';
import './Header.css';

const Header = (props) => {

  return (
      <header className="header">
        <BiChalkboard />
        <h1 className="title">{props.title}</h1>
        <div className="buttons">
        <button className="button" onClick={props.handleSave}><p>Save{' '}</p> <FiSave /></button>
        <button className="button"><p>Share{' '}</p> <FaShareAlt /></button>
        </div>
        
      </header>
  );
};

export default Header;
