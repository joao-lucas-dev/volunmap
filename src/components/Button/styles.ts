import styled, { css, keyframes } from 'styled-components';

interface IButton {
  loading?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonContainer = styled.button<IButton>`
  background: #FF3F87;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: #fff;
  font-weight: 500;
  transition: background 0.2s;
  font-weight: 500;
  font-size: 16px;
    ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
  font-size: 18px;
`;