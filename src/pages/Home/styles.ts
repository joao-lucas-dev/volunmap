import styled from 'styled-components';

interface IBlock {
  isGray?: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: linear-gradient(329.54deg, #E95C9C 0%, #ED0059 100%);
  padding: 50px 91px 80px 84px;
`;

export const SidebarTop = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;

  img {
    width: 64px;
  }
`;
  
export const SidebarMiddle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  color: #fff;

  h1 {
    font-size: 40px;
    margin-bottom: 10px; 
  }

  span {
    font-size: 18px;
  }
`;
  
export const SidebarBottom = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 18px;
  color: #fff;
  line-height: 28px;
`;

export const MapArea = styled.div`
  width: 100%;
  height: 100%;
`;

export const FABButton = styled.button`
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
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 180px;
  height: 80px;
  background: #fff;
  position: absolute;
  top: 100px;
  right: 20px;
  padding-left: 10px;
`;

export const TodayArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Block = styled.div<IBlock>`
  width: 20px;
  height: 20px;
  background: ${props => props.isGray ? '#827C7E' : '#FFCA01'};
  margin-right: 10px;
`;

export const ScheduleArea = styled.div`
  display: flex;
  align-items: center;
`;


