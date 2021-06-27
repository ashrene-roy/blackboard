import React from 'react';
import styled from 'styled-components';
import './assets/images/SupportMe_blue@2x.png';

const AboutPage = () => {
  const About = styled.div`
    padding-top: 90px;
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 10%;
    margin: -8px;
    background-color: #EDF2F6;
	`;

  const Image = styled.img`
    width: 100%;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 40%);
    margin-bottom: 20px;
  `;

  const Box = styled.div`
    width: 100%;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 40%);
    text-align: justify;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
  `;

  const Content = styled.div`
    width: 80%;
    padding-bottom: 80px;
  `;

  const HeaderContent = styled.header`
    background-color: #0E1218;;
    height: 60px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    padding-left: 40px;
    padding-right: 30px;
    border-bottom: 1px solid black;
    justify-content: space-between;
    align-items: center;
  `;

  const Support = styled.img`
    width: 200px;
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

  const H1 = styled.h1`
    font-family: 'Source Code Pro Bold';
    font-size: 25px;
    padding-top: 30px;
    padding-bottom: 30px;
  `;

  const H2 = styled.h2`
    font-family: 'Source Code Pro Semi Bold';
    font-size: 20px;
  `;

  const P = styled.p`
    font-family: 'Source Code Pro Regular';
    font-size: 16px;
  `;

  const UL = styled.ul`
    font-family: 'Source Code Pro Regular';
    list-style-type:none;
    font-size: 16px;
    padding-right: 20px;
  `;

  const Tutorial = styled.img`
    width: 800px;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 40%);
    margin: 20px 0 20px 0;
  `;

  const ThankYou = styled.p`
    font-family: 'Source Code Pro Semi Bold';
    font-size: 20px;
    margin-top: 80px;
  `;

  return (
    <div>
      <HeaderContent>
        <Heading><Letter>B</Letter><Title>lackboard</Title></Heading>
        <Support src={chrome.runtime.getURL('static/media/SupportMe_blue@2x.png')} alt="Support" onClick={() => window.open('https://ko-fi.com/ashrene', '_blank')}/>
      </HeaderContent>
      <About>
        <Image src="https://i.imgur.com/Go1Y1hJ.png" title="source: imgur.com" alt="About Blackboard"/>
        <Box>
          <Content>
            <H1>👋 Hello there! Thanks for downloading Blackboard 💜</H1>
            <H2>Use Blackboard to annotate live webpages and take full length screenshots.</H2>
            <H2>🚀 Features:</H2>
            <UL>
              <li>✏️ Pencil tool</li>
              <li>📷 Full page screenshot</li>
              <li>✨ Textbox</li>
              <li>🎚️ Size adjustor for drawing/writing</li>
              <li>✨ Eraser tool</li>
              <li>🎨 Colour Palette</li>
              <li>🖌️ Colour Picker</li>
              <li>📥 Download screenshot</li>
              <li>🗑️ Reset</li>
            </UL>
            <P>📌 Stay tuned for more exciting features coming through! 🎁</P>
            <H2>📋 Quick tutorial:</H2>
            <P>👉 Click on pencil to free hand draw, eraser/trash/undo/redo for corrections, double-click anywhere on screen after selecting Textbox to insert Textbox.</P>
            <Tutorial src="https://i.imgur.com/VK0UaLl.png" title="source: imgur.com"/>
            <P>👉 Take screenshots by clicking on the camera button. Wait for the page to be scrolled till the end to capture the full length. Avoid manually scrolling or changing tabs while the tool is capturing the screen.</P>
            <Tutorial src="https://i.imgur.com/ZxNxJTv.gif" title="source: imgur.com"/>
            <P>👉 Drag the text box anywhere. Dragging is enabled when Textbox(T) is not selected.</P>
            <Tutorial src="https://i.imgur.com/TQJ0jMx.gif" title="source: imgur.com"/>
            <P>👉 Resize by dragging bottom right corner. Resizing is enabled when Textbox(T) is selected.</P>
            <Tutorial src="https://i.imgur.com/b3G2ZxD.gif" title="source: imgur.com"/>
            <P>If you like the tool please consider supporting the project. To donate just click on the Ko-fi button above ☝️ And do leave review on chrome webstore if you can :)</P>
            <ThankYou>Have a good day! 🍔🍟</ThankYou>
          </Content>
        </Box>
      </About>
    </div>
  );
};

export default AboutPage;
