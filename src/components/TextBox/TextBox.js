/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import '../../assets/recycle-bin.svg';

const Textarea = styled.textarea`
  color: ${props => props.color} !important;
  min-width: 300px;
  background: none !important;
  border: none !important;
  outline: none !important;
  &:hover{
    border: 1px solid #00BFFF !important;
    border-radius: 5px !important;
  }
  &:focus{
    border: 1px solid #00BFFF !important;
    border-radius: 5px !important;
  }
  ${Container}:hover & {
    border: 1px solid #00BFFF !important;
    border-radius: 5px !important;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Button = styled.button`
  border: 0px;
  display: none;
  width: 20px;
  height: 20px;
  padding: 2px;
  ${Container}:hover & {
    background: #00BFFF;
    color: white;
    display: flex;
    align-self: flex-end;
    align-items: center;
  }
`;

const Icon = styled.img`
    height: 15px;
    width: 15px;
    margin: 0;
    padding: 0;
`;

const TextBox = (props) => {

  return (
      <Draggable disabled={props.disabled}>
        <Container top={props.top} left={props.left}>
            <Textarea
                color={props.color}
            />
            <Button onClick={props.handleTextboxDelete}><Icon src={chrome.extension.getURL('static/media/recycle-bin.svg')} alt="Trash" /></Button>
        </Container>
      </Draggable>
  );
};

export default TextBox;
