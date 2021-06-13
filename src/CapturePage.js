import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';

const Screenshot = styled.div`
  padding-top: 60px;
`

const CapturePage = (props) => {

  const handleSave = (datauri) => {
    let image = datauri.replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "screenshot-" + new Date().getTime() + ".png";
    link.href = image;
    link.click();
  }

  return (
    <div>
        <Header title={'Blackboard'} handleSave={() => {handleSave(props.image)}}></Header>
        <Screenshot>
          <img src={props.image} alt="Blackboard Screenshot"></img>
        </Screenshot>
    </div>
  );
};

export default CapturePage;
