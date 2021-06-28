import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TOOLBOX, APP_TOOLBOX_ID } from '../../constants/values';
import '../../assets/images/exit-white.svg';
import '../../assets/images/pencil-black.svg';
import '../../assets/images/eraser-black.svg';
import '../../assets/images/camera-black.svg';
import '../../assets/images/pencil-white.svg';
import '../../assets/images/eraser-white.svg';
import '../../assets/images/camera-white.svg';
import '../../assets/images/text-tool-white.svg';
import '../../assets/images/text-tool-black.svg';
import '../../assets/images/undo-arrow-white.svg';
import '../../assets/images/redo-arrow-white.svg';
import '../../assets/images/undo-arrow-grey.svg';
import '../../assets/images/redo-arrow-grey.svg';
import '../../assets/images/recycle-bin-white.svg';

const Container = styled.div`
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		right: 0;
		background-color: #000000;
		border-radius: 5px;
		border: 2px solid #000000;
	`;

const Row = styled.div`
		display: flex;
	`;

const Tools = styled.div`
		display: ${props => props.isCollapse ? 'none' : 'flex'};
		flex-wrap: wrap;
		background-color: #000000;
		align-items: center;
		width: 470px;
	`;

const CollapseButton = styled.button`
		background-color: #000000;
		width: 15px;
		border: 2px solid #17191D;
		border-radius: 5px;
		display: flex;
		align-items: center;
		color: #ffffff;
		justify-content: center;
	`;

const Tool = styled.button`
		color: white;
		background-color: #17191D;
		border: 1px solid #26282A;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 0px;
		margin-left: 5px;
		margin-right: 5px;
    height: 40px;
		width: 40px;
	`;

const Icon = styled.img`
		height: 30px;
		width: 30px;
	`;

const StrokeOption = styled.div`
		display: flex;
		justify-content: space-between;
		width: 450px;
		margin-left: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
	`;

const Slider = styled.input`
		width: 100%;
	`;

const ColourPalette = styled.input`
		height: 40px;
		width: 40px;
		margin-left: 5px;
		margin-right: 5px;
		border: none;
		padding: 0;
	`;

const Label = styled.label`
		color: #FFFFFF;
		margin-right: 15px;
	`;

const Info = styled.p`
		padding: 0;
		margin: 0;
		color: #ffffff;
		margin-left: 20px;
	`;

const Toolbox = (props) => {

  const [selectedTool, setSelectedTool] = React.useState(props.tool);
  const [isCollapse, setCollapse] = React.useState(false);

  React.useEffect(() => {
    setSelectedTool(props.tool);
  }, [props.tool]);

  const handleCollapse = () => {
    const state = isCollapse;
    setCollapse(!state);
  };

  const handleSelectedTool = (tool) => {
    setSelectedTool(tool);
    props.handleSetTool(tool);
  };

  const handleslider = (e) => {
    props.handlePencilOption(parseInt(e.target.value));
  };

  const handleColourPalette = (e) => {
    props.handleColourPalette(e.target.value);
  };

  const handleTextbox = (tool) => {
    setSelectedTool(tool);
    props.handleSetTool(tool);
  };

  const selected = {
    backgroundColor: 'white',
  };

  return (
    <Container id={APP_TOOLBOX_ID}>
      <Row>
        <CollapseButton onClick={handleCollapse}>{'>'}</CollapseButton>
        <Tools isCollapse={isCollapse}>
          <Tool onClick={() => props.handleUndo()} disabled={props.isUndoDisabled}>
            {
              props.isUndoDisabled ? <Icon src={chrome.runtime.getURL('static/media/undo-arrow-grey.svg')} alt="Undo" /> :
                <Icon src={chrome.runtime.getURL('static/media/undo-arrow-white.svg')} alt="Undo" />
            }
          </Tool>
          <Tool onClick={() => props.handleRedo()} disabled={props.isRedoDisabled}>
            {
              props.isRedoDisabled ? <Icon src={chrome.runtime.getURL('static/media/redo-arrow-grey.svg')} alt="Redo" /> :
                <Icon src={chrome.runtime.getURL('static/media/redo-arrow-white.svg')} alt="Redo" />
            }
          </Tool>
          {
            selectedTool === TOOLBOX.PEN ?
              <Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)} style={selected}>
                <Icon src={chrome.runtime.getURL('static/media/pencil-black.svg')} alt="Pencil" />
              </Tool> :
              <Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)}>
                <Icon src={chrome.runtime.getURL('static/media/pencil-white.svg')} alt="Pencil" />
              </Tool>
          }
          <ColourPalette type='color' value={props.colourValue} onChange={handleColourPalette} />
          {
            selectedTool === TOOLBOX.ERASER ?
              <Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)} style={selected}>
                <Icon src={chrome.runtime.getURL('static/media/eraser-black.svg')} alt="Eraser" />
              </Tool> :
              <Tool onClick={() => handleSelectedTool(TOOLBOX.ERASER)}>
                <Icon src={chrome.runtime.getURL('static/media/eraser-white.svg')} alt="Eraser" />
              </Tool>
          }
          {
            selectedTool === TOOLBOX.TEXTBOX ?
              <Tool onClick={() => handleTextbox(TOOLBOX.PEN, true)} style={selected}>
                <Icon src={chrome.runtime.getURL('static/media/text-tool-black.svg')} alt="Text" />
              </Tool> :
              <Tool onClick={() => handleTextbox(TOOLBOX.TEXTBOX, false)}>
                <Icon src={chrome.runtime.getURL('static/media/text-tool-white.svg')} alt="Text" />
              </Tool>
          }
          <Tool onClick={() => props.handleCapture()}>
            <Icon src={chrome.runtime.getURL('static/media/camera-white.svg')} alt="Screenshot" />
          </Tool>
          <Tool onClick={() => props.handleReset()}>
            <Icon src={chrome.runtime.getURL('static/media/recycle-bin-white.svg')} alt="Trash" />
          </Tool>
          <Tool onClick={() => props.handleAppClose()}>
            <Icon src={chrome.runtime.getURL('static/media/exit-white.svg')} alt="Trash" />
          </Tool>
          <StrokeOption>
            <Label>Size:</Label>
            <Slider type='range' min={3} max={100} value={props.strokeWidth} onChange={handleslider} />
          </StrokeOption>
        </Tools>
      </Row>
      {
        selectedTool === TOOLBOX.TEXTBOX && !isCollapse ? <Info>Double-click anywhere to insert Textbox</Info> : null
      }
    </Container>
  );
};

Toolbox.propTypes = {
  isUndoDisabled: PropTypes.bool,
  colourValue: PropTypes.string,
  isRedoDisabled: PropTypes.bool,
  strokeWidth: PropTypes.number,
  tool: PropTypes.string,
  handlePencilOption: PropTypes.func,
  handleColourPalette: PropTypes.func,
  handleSetTool: PropTypes.func,
  handleUndo: PropTypes.func,
  handleRedo: PropTypes.func,
  handleAppClose: PropTypes.func,
  handleCapture: PropTypes.func,
  handleReset: PropTypes.func,

};


export default Toolbox;
