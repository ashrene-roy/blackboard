/*global chrome*/
import React from 'react';
import styled from 'styled-components';
import '../../assets/pencil-black.svg';
import '../../assets/eraser-black.svg';
import '../../assets/camera-black.svg';
import '../../assets/pencil-white.svg';
import '../../assets/eraser-white.svg';
import '../../assets/camera-white.svg';

const Toolbox = (props) => {

	const [selectedTool, setSelectedTool] = React.useState('');
	const [isCollapse, setCollapse] = React.useState(false);

	const Container = styled.div`
		display: flex;
		justify-content: flex-end;
		position: fixed;
		height: 50px;
		top: 0;
		right: 0;
		background-color: #000000;
		border-radius: 5px;
		border: 2px solid #000000;
	`;

	const Tools = styled.div`
		display: ${isCollapse? 'none' : 'flex'};
		background-color: #000000;
		align-items: center;
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
		height: 40px;
		width: 40px;
		color: white;
		background-color: #17191D;
		border: 1px solid #26282A;
		border-radius: 5px;
		padding-top: 0;
		padding-bottom: 0;
		margin-left: 5px;
		margin-right: 5px;
	`;

	const Icon = styled.img`
	`;

	const handleCollapse = () => {
		const state = isCollapse;
		setCollapse(!state);
	}

	const handleSelectedTool = (tool) => {
		setSelectedTool(tool);
		props.handleSetTool(tool)
	}

	const selected = {
		backgroundColor: 'white',
	};

  return (
		<Container id="blackboard-canvas-1234-toolbox">
			<CollapseButton onClick={handleCollapse}>{'>'}</CollapseButton>
			<Tools>
				{
					selectedTool === 'pen' ?
					<Tool onClick={() => handleSelectedTool('pen')} style={selected}>
						<Icon src={chrome.extension.getURL('static/media/pencil-black.svg')} alt="Pencil" />
					</Tool> :
					<Tool onClick={() => handleSelectedTool('pen')}>
						<Icon src={chrome.extension.getURL('static/media/pencil-white.svg')} alt="Pencil" />
					</Tool>
				}
				{
					selectedTool === 'eraser' ?
					<Tool onClick={() => handleSelectedTool('eraser')} style={selected}>
						<Icon src={chrome.extension.getURL('static/media/eraser-black.svg')} alt="Eraser" />
					</Tool> :
					<Tool onClick={() => handleSelectedTool('eraser')}>
						<Icon src={chrome.extension.getURL('static/media/eraser-white.svg')} alt="Eraser" />
					</Tool>
				}
				<Tool onClick={() => props.handleCapture()}>
					<Icon src={chrome.extension.getURL('static/media/camera-white.svg')} alt="Screenshot" />
				</Tool>
			</Tools>
		</Container>
  );
};

export default Toolbox;
