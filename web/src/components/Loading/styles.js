import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    width: 50px;
    height: 50px;
    color: #999;
    animation: ${rotate} 2s linear infinite;
  }
`;
