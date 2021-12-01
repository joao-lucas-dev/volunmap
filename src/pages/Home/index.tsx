import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router';

import { isToday } from '../../utils/dateFormat';
import { isBefore } from 'date-fns';

import { useGeoLocation } from '../../hooks/useGeoLocation';

import api from '../../services';

import { 
  Container, 
  Sidebar, 
  SidebarTop, 
  SidebarMiddle, 
  SidebarBottom,
  MapArea,
  InfoArea,
  TodayArea,
  Block,
  ScheduleArea,
} from './styles';

import logo from '../../assets/logo.svg';
import mapMarkerToday from '../../assets/mapMarkerToday.svg';
import mapMarkerNotToday from '../../assets/mapMarkerNotToday.svg';
import { FAB } from '../../components/FAB';

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

interface IEvent {
  id: number,
  event_name: string,
  drescription: string,
  description_donations: string,
  latitude: number,
  longitude: number,
  date_init_event: string,
  date_end_event: string,
  phone: string,
  pictures: Array<any>;
}
interface IEvents {
  user: IUser;
  event: IEvent;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<IEvents[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY || ""
  });

  const location = useGeoLocation();

  const getEvents = useCallback(async () => {
    try {
      const response = await api.get('');
      setEvents(response.data.response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (loadError) {
    return <h1>Erro ao carregar o mapa</h1>;
  }

  return (
    <Container>
      <Sidebar>
        <SidebarTop>
          <img src={logo} alt="VolunMap" />
        </SidebarTop>
        <SidebarMiddle>
          <h1>Escolha um evento de doação no mapa</h1>
          <span>O seu apoio ajuda muitas famílias. Vem doar!</span>
        </SidebarMiddle>
        <SidebarBottom>
          <strong>Pernambuco</strong>
        </SidebarBottom>
      </Sidebar>

      <MapArea>
        {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          center={location.coordinates}
          zoom={15}
          options={{ zoomControl: false }}
        >
          {events.map(event => {
            const isTodayDate = isToday(event.event.date_init_event);
            const isBeforeDate = isBefore(new Date(event.event.date_init_event), new Date());
            return (
              <div key={event.event.id}>
                {!isBeforeDate && (
                  <Marker 
                    icon={isTodayDate ? mapMarkerToday : mapMarkerNotToday} 
                    position={{ lat: event.event.latitude, lng: event.event.longitude }}
                    onClick={() => navigate('/evento', { state: event.event.id })}
                    opacity={isTodayDate ? 1 : 0.8 }
                  />
                )}
              </div>
            )
          })}
        </GoogleMap>
        ) : (
          <h1>Carregando</h1>
        )}
      </MapArea>

      <FAB onClick={() => navigate("/login")}/>

      <InfoArea>
        <TodayArea>
          <Block />
          <span>Evento Hoje</span>
        </TodayArea>

        <ScheduleArea>
          <Block isGray={true} />
          <span>Evento Agendado</span>
        </ScheduleArea>
      </InfoArea>
    </Container>
  );
}

export { Home };