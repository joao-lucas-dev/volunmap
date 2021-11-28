import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #EBF2F5;
`;

export const AreaEvent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 40px;
  align-items: center;

  h4 {
    font-size: 18px;
    color: #8FA7B2;
    font-weight: 400;
  }
`;

export const Card = styled.div`
  width: 708px;
  background: #fff;
  margin: 40px 0;
  border-radius: 20px;

  img {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    object-fit: cover;
    height: 336px;
  }
`;

export const ContainerCard = styled.div`
  padding: 33px 80px;

  h1 {
    font-size: 54px;
    color: #404555;
    margin-bottom: 32px;
  }

  p {
    font-size: 18px;
    color: #898C95;
    text-align: justify;
    margin-bottom: 64px;
    line-height: 28px;
  }
`;

export const Maps = styled.div`
  width: 100%;
  height: 230px;
  background: #FF3F87;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const LinkToGoogleMaps = styled.a`
  display: block;
  padding: 19px 166px;
  background: #FF3F87;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #D3E2E5;
  margin: 64px 0;
`;

export const InfoTitle = styled.h2`
  font-size: 36px;
  color: #404555;
  margin-bottom: 32px;
`;

export const CardHour = styled.div`
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 176px;
  background: linear-gradient(149.97deg, #E6F7FB 8.13%, #FFFFFF 92.67%);
  border: 1px solid #B3DAE2;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 32px 27px;

  svg {
    margin-bottom: 10px;
  }

  span {
    color: #5C8599;
    margin-top: 5px;
    font-size: 18px;
  }
`;

export const DescriptionDonations = styled.p`
  margin: 27px 0;
  line-height: 28px;
  white-space: pre-line;
`;

export const WhatsAppButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3CDC8C;
  width: 100%;
  height: 64px;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: #20AA65;
  }
`;