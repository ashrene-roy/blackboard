/*global chrome*/
import React from 'react';
import './App.css';
import Header from './components/Header/Header';

const CapturePage = (props) => {

  const handleSave = (datauri) => {
    let image = datauri.replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
  }

  return (
    <div className="App">
      <Header title={'Blackboard'} handleSave={() => {handleSave(props.image)}}></Header>
      <div className="content">
      <img src={props.image}></img>
      </div>
    </div>
  );
};

export default CapturePage;
