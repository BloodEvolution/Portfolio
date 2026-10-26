import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
  
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing:border-box;
}

html, body, :root {
    //font-family: 'Open Sans', sans-serif;    
    font-family: 'Fira Sans', sans-serif;
    //font-family: 'Lato', sans-serif;
    min-height: 100%;    
    scroll-behavior: smooth;
    overflow-x: hidden;
  }  

  ::selection {
    background: ${(props) => props.theme.colors.branding};
    color: ${(props) => props.theme.colors.background};
  }
       
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: #a8a8a8;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${(props) => props.theme.colors.branding}; 
    //border: 1px solid #ffffff;
  }

  ::-webkit-scrollbar-thumb:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  /* Animations d'apparition (ex-animate.css 3.5.2 et react-reveal), voir components/ScrollAnimation.jsx et components/Fade.jsx */
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes revealFade {
    from { opacity: 0; }
    to { opacity: 1; transform: none; }
  }

  @keyframes revealFromTop {
    from { opacity: 0; transform: translate3d(0, -100%, 0); }
    to { opacity: 1; transform: none; }
  }

  @keyframes revealFromLeft {
    from { opacity: 0; transform: translate3d(-100%, 0, 0); }
    to { opacity: 1; transform: none; }
  }
`;
export default GlobalStyle;
