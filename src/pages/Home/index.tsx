import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FiPlus } from 'react-icons/fi'

import { useGeoLocation } from '../../hooks/useGeoLocation';

import api from '../../services';

import { 
  Container, 
  Sidebar, 
  SidebarTop, 
  SidebarMiddle, 
  SidebarBottom,
  MapArea,
  FABButton,
  InfoArea,
  TodayArea,
  Block,
  ScheduleArea,
} from './styles';

import logo from '../../assets/logo.svg';
import mapMarkerToday from '../../assets/mapMarkerToday.svg';
import mapMarkerNotToday from '../../assets/mapMarkerNotToday.svg';
import { useNavigate } from 'react-router';

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
    googleMapsApiKey: ""
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
          <strong>Jaboatão dos Guararapes</strong>
          <span>Pernambuco</span>
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
            const today = new Date();
            const someDate = new Date(event.event.date_init_event);
            const isToday = someDate.getDate() === today.getDate() &&
              someDate.getMonth() === today.getMonth() &&
              someDate.getFullYear() === today.getFullYear();

            return (
              <Marker 
                key={event.event.id}
                icon={isToday ? mapMarkerToday : mapMarkerNotToday} 
                position={{ lat: event.event.latitude, lng: event.event.longitude }}
                onClick={() => navigate('/evento', { state: event.event.id })}
                opacity={isToday ? 1 : 0.8 }
              />
            )
          })}
        </GoogleMap>
        ) : (
          <h1>Carregando</h1>
        )}
      </MapArea>

      <FABButton>
        <FiPlus size={32} color="#fff" />
      </FABButton>

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