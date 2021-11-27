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
`;

export const ProfileArea = styled.div`
  h1 {
    font-size: 32px;
    color: #404555;
  }
`;

export const AreaTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 18px;
    color: #FF3F87;
    border: 0;
    background: none;
    transition: all 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #D3E2E5;
  margin: 40px 0;
`;

export const Info = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;

  span {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    color: #404555;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid #D3E2E5;
  border-collapse: collapse;
  padding: 5px;

  th {
    border: 1px solid #D3E2E5;
    padding: 5px;
    font-size: 16px;
  }

  td {
    border: 1px solid #D3E2E5;
    text-align: center;
    padding: 5px;
    font-size: 16px;

    button {
      border: 0;
      color: #FF3F87;
      background: none;
      transition: all 0.2s;
      font-size: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
