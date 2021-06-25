import React from 'react';
import ReactDOM from 'react-dom';
import AboutPage from '../AboutPage';
import GlobalStyle from './theme';

const App = () => (
  <>
    <GlobalStyle />
    <AboutPage/>
  </>
);

  
const app = document.getElementById('about-root');
ReactDOM.render(<App />, app);