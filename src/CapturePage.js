import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';

const Screenshot = styled.div`
  padding-top: 90px;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 10%;
  margin: -8px;
  background-color: #EDF2F6;
`;

const Image = styled.img`
  width: 100%;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 40%);
`;

const Footer = styled.footer`
  padding: 10px;
  margin: 0;
  font-size: 14px;
`;

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
        <Image src={props.image} alt="Blackboard Screenshot"></Image>
      </Screenshot>
      <Footer>👋 Like the tool? Please consider supporting the project on <a href="https://ko-fi.com/ashrene" target="_blank">Ko-fi</a> ❤️</Footer>
    </div>
  );
};

export default CapturePage;
