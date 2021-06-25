import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../assets/images/file-download-black.svg';
import '../../assets/images/share-black.svg';
import '../../assets/images/about.svg';

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
`;
const Heading = styled.div`
  display: flex;
`;
const Title = styled.h1`
  font-family: 'Lato Heavy';
  color: white;
  font-size: 40px;
  font-weight:bold;
`;
const Letter = styled.h1`
  font-family: 'Lato Heavy';
  color: #FFFFFF;
  font-size: 40px;
  font-weight:bold;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  text-align: center;
  background: linear-gradient(red, blue);
`;

const Button = styled.button`
  background-color: #EDF2F6;
  border-radius: 8px;
  color: #000000;
  border: 1px solid #0E1218;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const Header = (props) => {

  return (
    <HeaderContent>
      <Heading><Letter>B</Letter><Title>lackboard</Title></Heading>
      <ButtonWrapper>
        <Button onClick={props.handleSave}><p>Download &nbsp;</p> <Icon src={chrome.runtime.getURL('static/media/file-download-black.svg')} alt="Download" /></Button>
        <Button onClick={() => window.open(chrome.runtime.getURL('about.html'), "_blank")}><p>About &nbsp;</p> <Icon src={chrome.runtime.getURL('static/media/about.svg')} alt="About" /></Button>
      </ButtonWrapper>
    </HeaderContent>
  );
};

Header.propTypes = {
  handleSave: PropTypes.func
};

export default Header;
