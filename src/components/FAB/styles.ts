import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 40px;
  right: 40px;
  width: 64px;
  height: 64px;
  background: #ED0059;
  border-radius: 20px;
  border: 0;
  transition: all 0.2s;

  &:hover {
    background: #E95C9C;
  }
`;
