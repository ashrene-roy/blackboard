import React from 'react';
import styled from 'styled-components';
import {FaShareAlt} from 'react-icons/fa';
import {BiChalkboard} from 'react-icons/bi';
import {  FiSave } from 'react-icons/fi';

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
  height: 30px;
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`

const ButtonWrapper = styled.div`
  display: flex;
`

const Header = (props) => {

  return (
      <HeaderContent>
        <BiChalkboard />
        <Title>{props.title}</Title>
        <ButtonWrapper>
        <Button onClick={props.handleSave}><p>Save{' '}</p> <FiSave /></Button>
        <Button><p>Share{' '}</p> <FaShareAlt /></Button>
        </ButtonWrapper>
      </HeaderContent>
  );
};

export default Header;
