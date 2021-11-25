import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    margin-bottom: 8px;
    font-size: 16px;
    color: #898C95;
    font-weight: 600;
  }

  input {
    height: 64px;
    border: 1px solid #D3E2E5;
    border-radius: 20px;
    background: #F5F8FA;
    padding: 20px;
    font-size: 16px;
  }

  span {
    margin-top: 10px;
    color: #ff0000;
  }
`;
