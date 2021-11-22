import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 96px;
  height: 100vh;
  background: #EC1C6D;
  padding: 32px 24px;
`;

export const AreaTop = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 48px;
  }
`;

export const AreaBottom = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;

  button {
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 16px;
    background: #FF3F87;
    transition: all 0.2s;

    &:hover {
      background: #AB2457;
    }
  }
`;

