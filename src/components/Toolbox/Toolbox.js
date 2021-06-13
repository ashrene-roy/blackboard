import React from 'react';
import styled from 'styled-components';
import { BsPencil } from 'react-icons/bs';
import { BiEraser } from 'react-icons/bi';
import { AiOutlineCamera } from 'react-icons/ai';

const Toolbox = (props) => {

	const [selectedTool, setSelectedTool] = React.useState('');
	const [isCollapse, setCollapse] = React.useState(false);

	const Container = styled.div`
		display: flex;
		justify-content: flex-end;
		position: absolute;
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
		border: 2px solid #ffffff;
		border-radius: 5px;
		display: flex;
		align-items: center;
		color: #ffffff;
		justify-content: center;
	`;

	const Tool = styled.button`
		height: 100%;
		color: white;
		background-color: black;
		border: none;
		padding-top: 0;
		padding-bottom: 0;
		margin-left: 5px;
		margin-right: 5px;
		&:hover {
			background-color: white;
			color: black;
		}
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
		color: 'black'
	};

  return (
		<Container>
			<CollapseButton onClick={handleCollapse}>{'>'}</CollapseButton>
			<Tools>
				<Tool onClick={() => handleSelectedTool('pen')} style={selectedTool === 'pen' ? selected : {}}>
					<BsPencil size={30}/>
				</Tool>
				<Tool onClick={() => handleSelectedTool('eraser')} style={selectedTool === 'eraser' ? selected : {}}>
					<BiEraser size={30}/>
				</Tool>
				<Tool onClick={() => props.handleCapture()}>
					<AiOutlineCamera size={30}/>
				</Tool>
			</Tools>
		</Container>
  );
};

export default Toolbox;
