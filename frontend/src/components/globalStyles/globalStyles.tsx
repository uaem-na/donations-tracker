import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: Ethnocentric, Futura, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5; 
  }
  a {
    color: var(--color-secondary);
  }
  :root {
    --height-input: 50px;
    --shadow-color: 212 20% 50%;
    --color-background: hsl(212deg, 33%, 96%);
    --color-text: hsl(212deg, 33%, 20%);
    --color-primary: hsl(215, 28%, 28%);
    --color-secondary: hsl(215, 28%, 52%);
    --color-error: hsl(12, 75%, 45%);
    --color-success: hsl(139, 35%, 40%);
    --color-warn: hsl(36, 99%, 47%);
    --color-highlight: hsl(47, 100%, 50%);
    --color-gray-50: hsl(212deg, 19%, 10%);
    --color-gray-100: hsl(212deg, 15%, 20%);
    --color-gray-200: hsl(212deg, 15%, 25%);
    --color-gray-300: hsl(212deg, 10%, 40%);
    --color-gray-400: hsl(212deg, 9%, 45%);
    --color-gray-500: hsl(212deg, 8%, 50%);
    --color-gray-600: hsl(212deg, 12%, 55%);
    --color-gray-700: hsl(212deg, 14%, 66%);
    --color-gray-800: hsl(212deg, 20%, 77%);
    --color-gray-900: hsl(212deg, 25%, 88%);
    --color-gray-1000: hsl(212deg, 25%, 96%);
  }
`;

export default GlobalStyles;
