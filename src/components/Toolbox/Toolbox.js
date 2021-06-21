/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import { TOOLBOX } from '../../constants/values';
import '../../assets/pencil-black.svg';
import '../../assets/eraser-black.svg';
import '../../assets/camera-black.svg';
import '../../assets/pencil-white.svg';
import '../../assets/eraser-white.svg';
import '../../assets/camera-white.svg';
import '../../assets/text-tool-white.svg';
import '../../assets/text-tool-black.svg';
import '../../assets/undo-arrow-white.svg';
import '../../assets/redo-arrow-white.svg';
import '../../assets/undo-arrow-grey.svg';
import '../../assets/redo-arrow-grey.svg';
import '../../assets/recycle-bin-white.svg';

	const Container = styled.div`
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		background-color: #000000;
		border-radius: 5px;
		border: 2px solid #000000;
	`;

	const Tools = styled.div`
		display: ${props => props.isCollapse? 'none' : 'flex'};
		flex-wrap: wrap;
		background-color: #000000;
		align-items: center;
		width: 430px;
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
	`;

	const Icon = styled.img`
		height: 30px;
		width: 30px;
	`;

	const StrokeOption = styled.div`
		display: flex;
		justify-content: space-between;
		width: 380px;
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

const Toolbox = (props) => {

	const [selectedTool, setSelectedTool] = React.useState(props.tool);
	const [isCollapse, setCollapse] = React.useState(false);

	const handleCollapse = () => {
		const state = isCollapse;
		setCollapse(!state);
	}

	const handleSelectedTool = (tool) => {
		setSelectedTool(tool);
		props.handleSetTool(tool)
	}

	const handleslider = (e) => {
		props.handlePencilOption(parseInt(e.target.value));
	}

	const handleColourPalette = (e) => {
		props.handleColourPalette(e.target.value);
	}

	const handleTextbox = (tool) => {
		setSelectedTool(tool);
		props.handleSetTool(tool);
	}

	const selected = {
		backgroundColor: 'white',
	};

  return (
		<Container id="blackboard-canvas-1234-toolbox">
			<CollapseButton onClick={handleCollapse}>{'>'}</CollapseButton>
			<Tools isCollapse={isCollapse}>
				<Tool onClick={() => props.handleUndo()} disabled={props.isUndoDisabled}>
					{
						props.isUndoDisabled ? <Icon src={chrome.extension.getURL('static/media/undo-arrow-grey.svg')} alt="Undo" /> :
						<Icon src={chrome.extension.getURL('static/media/undo-arrow-white.svg')} alt="Undo" />
  					}
				</Tool>
				<Tool onClick={() => props.handleRedo()} disabled={props.isRedoDisabled}>
					{
						props.isRedoDisabled ? <Icon src={chrome.extension.getURL('static/media/redo-arrow-grey.svg')} alt="Redo" /> :
						<Icon src={chrome.extension.getURL('static/media/redo-arrow-white.svg')} alt="Redo" />
					}
				</Tool>
				{
					selectedTool === TOOLBOX.PEN ?
					<Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)} style={selected}>
						<Icon src={chrome.extension.getURL('static/media/pencil-black.svg')} alt="Pencil" />
					</Tool> :
					<Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)}>
						<Icon src={chrome.extension.getURL('static/media/pencil-white.svg')} alt="Pencil" />
					</Tool>
				}
				<ColourPalette type='color' value={props.colourValue} onChange={handleColourPalette} />
				{
					selectedTool === TOOLBOX.ERASER ?
					<Tool onClick={() => handleSelectedTool(TOOLBOX.PEN)} style={selected}>
						<Icon src={chrome.extension.getURL('static/media/eraser-black.svg')} alt="Eraser" />
					</Tool> :
					<Tool onClick={() => handleSelectedTool(TOOLBOX.ERASER)}>
						<Icon src={chrome.extension.getURL('static/media/eraser-white.svg')} alt="Eraser" />
					</Tool>
				}
				{
					selectedTool === TOOLBOX.TEXTBOX ?
					<Tool onClick={() => handleTextbox(TOOLBOX.PEN, true)} style={selected}>
						<Icon src={chrome.extension.getURL('static/media/text-tool-black.svg')} alt="Text" />
					</Tool> :
					<Tool onClick={() => handleTextbox(TOOLBOX.TEXTBOX, false)}>
						<Icon src={chrome.extension.getURL('static/media/text-tool-white.svg')} alt="Text" />
					</Tool>
				}
				<Tool onClick={() => props.handleCapture()}>
					<Icon src={chrome.extension.getURL('static/media/camera-white.svg')} alt="Screenshot" />
				</Tool>
				<Tool onClick={() => props.handleReset()}>
					<Icon src={chrome.extension.getURL('static/media/recycle-bin-white.svg')} alt="Trash" />
				</Tool>
				<StrokeOption>
					<Label>Size:</Label>
					<Slider type='range' min={3} max={100} value={props.strokeWidth} onChange={handleslider} />
				</StrokeOption>
			</Tools>
		</Container>
  );
};

export default Toolbox;
