import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #EBF2F5;
`;

export const Area = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 708px;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 32px;
    color: #404555;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    justify-content: center;
  }

  p {
    margin-top: 24px;
    
      button {
        border: none;
        background: none;
        color: #FF3F87;

        &:hover {
          text-decoration: underline;
        }
      }
    }
`;

