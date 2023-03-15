import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    color: ${theme.colors.black};
    font-size: ${theme.fontSizes.text};
    font-family: "NG";
    font-weight: normal;
    
    box-sizing: border-box;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 16px ${theme.colors.grey};
    }
  }
  strong {
    font-weight: bold;
  }

  html {
    background-color: ${theme.colors.white};

    overflow: overlay;
  }

  html, body {
    max-width: 100%;
    
    overflow-x: hidden;
  }

  h1 {
    font-size: ${theme.fontSizes.title};
  }

  h2 {
    font-size: ${theme.fontSizes.subTitle};
  }
  
  span {
    color: ${theme.colors.darkGrey};
    font-size: ${theme.fontSizes.subText};
  }
  
  a {
    color: ${theme.colors.darkGrey};
    font-size: ${theme.fontSizes.subText};
    text-decoration: none;

    ${theme.common.hoverEffect};
  }

  img {
    object-fit: cover;
    -webkit-user-drag: none;
    -moz-user-drag: none;
    -ms-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
