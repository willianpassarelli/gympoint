import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;

    .Toastify__toast--success {
      background: #77dd77;
      border-radius: 4px;
      padding: 10px 20px;
      font: 14px Roboto, sans-serif;
    }

    .Toastify__toast--error {
      background: #d44059;
      border-radius: 4px;
      padding: 10px 20px;
      font: 14px Roboto, sans-serif;
    }

  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    color: #444;
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
