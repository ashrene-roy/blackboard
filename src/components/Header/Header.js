/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import '../../assets/file-download-white.svg';
import '../../assets/share-white.svg';

const HeaderContent = styled.header`
  background-color: #000000;
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
  background-color: #000000;
  border-radius: 5px;
  color: #ffffff;
  border: 1px solid #ffffff;
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
        <Button onClick={props.handleSave}><p>Download{' '}</p> <Icon src={chrome.extension.getURL('static/media/file-download-white.svg')} alt="Download" /></Button>
        <Button><p>Share{' '}</p> <Icon src={chrome.extension.getURL('static/media/share-white.svg')} alt="Share" /></Button>
        </ButtonWrapper>
      </HeaderContent>
  );
};

export default Header;
