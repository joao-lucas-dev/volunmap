import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #EBF2F5;
`;

export const Area = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 708px;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 64px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  h1 {
    color: #404555;
    font-size: 32px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;

    h3 {
      color: #404555;
      margin-bottom: 20px;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      height: 336px;
      margin-bottom: 20px;
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #D3E2E5;
  margin: 24px 0;
`;

export const Maps = styled.div`
  width: 100%;
  height: 230px;
  background: #F5F8FA;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Caption = styled.span`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  background: #F5F8FA;
  color: #FF3F87;
  font-size: 14px;
  font-weight: 500;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const SpanError = styled.span`
  margin-top: 10px;
  color: #ff0000;
`;