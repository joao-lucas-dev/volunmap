import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  p {
    margin-bottom: 8px;
    font-size: 16px;
    color: #898C95;
    font-weight: 600;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    border: 1px dashed #96D2F0;
    border-radius: 20px;
    background: #F5F8FA;
    padding: 20px;
    font-size: 16px;
  }

  input {
    display: none;
  }

  span {
    margin-top: 10px;
    color: #ff0000;
  }
`;
