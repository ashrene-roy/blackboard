/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import '../../assets/file-download-black.svg';
import '../../assets/share-black.svg';

const HeaderContent = styled.header`
  background-color: #0E1218;;
  height: 60px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 40px;
  padding-right: 30px;
  justify-content: space-between;
  border-bottom: 1px solid black;
`

const Title = styled.h1`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #ffffff;
  font-size: 40px;
  font-weight:bold;
  -webkit-text-fill-color: black;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: white;
`
const Button = styled.button`
  background-color: #EDF2F6;
  border-radius: 8px;
  color: #000000;
  border: 1px solid #0E1218;
  height: 40px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`

const ButtonWrapper = styled.div`
  display: flex;
`
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const Header = (props) => {

  return (
      <HeaderContent>
        <Title>{props.title}</Title>
        <ButtonWrapper>
        <Button onClick={props.handleSave}><p>Download{' '}</p> <Icon src={chrome.extension.getURL('static/media/file-download-black.svg')} alt="Download" /></Button>
        {/* <Button><p>Share{' '}</p> <Icon src={chrome.extension.getURL('static/media/share-black.svg')} alt="Share" /></Button> */}
        </ButtonWrapper>
      </HeaderContent>
  );
};

export default Header;
