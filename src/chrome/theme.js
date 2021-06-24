import { createGlobalStyle } from 'styled-components';
import LatoHeavyTTF from '../assets/fonts/Lato-Heavy.ttf';
import LatoRegularTTF from '../assets/fonts/Lato-Heavy.ttf';
import SourceCodeProRegular from '../assets/fonts/SourceCodePro-Regular.ttf';
import SourceCodeProSemiBold from '../assets/fonts/SourceCodePro-SemiBold.ttf';
import SourceCodeProBold from '../assets/fonts/SourceCodePro-Bold.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lato Heavy';
    src: url(${LatoHeavyTTF}) format('truetype');
  }
  @font-face {
    font-family: 'Lato Regular';
    src: url(${LatoRegularTTF}) format('truetype');
  }
  @font-face {
    font-family: 'Source Code Pro Regular';
    src: url(${SourceCodeProRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Source Code Pro Semi Bold';
    src: url(${SourceCodeProSemiBold}) format('truetype');
  }
  @font-face {
    font-family: 'Source Code Pro Bold';
    src: url(${SourceCodeProBold}) format('truetype');
  }
`;

export default GlobalStyle;