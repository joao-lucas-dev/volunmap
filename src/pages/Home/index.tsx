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
} from './styles';

import logo from '../../assets/logo.svg';
import mapMarker from '../../assets/mapMarker.svg';

const Home: React.FC = () => {
  const [events, setEvents] = useState([
    {
      user: {
          first_name: "João",
          last_name: "Lucas",
          email: "joaolucas@teste.com"
      },
      event: {
          id: 5,
          event_name: "Novo evento SESC",
          drescription: "descrição",
          description_donations: "descrição de doações",
          latitude: -8.190960160125,
          longitude: -34.918197089208,
          date_init_event: "2021-11-22 18:00:00",
          date_end_event: "2021-11-22 20:00:00",
          phone: "81999999999",
          pictures: []
      }
    }
  ]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBvP9WgzzF2p_HrFflX1iB4adeNmX4Dzjs"
  });

  const location = useGeoLocation();

  const getEvents = useCallback(async () => {
    try {
      const response = await api.get('/');
      console.log(response);
      // setEvents(response.data.response);
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
          {events.map(event => (
            <Marker 
              icon={mapMarker} 
              position={{ lat: event.event.latitude, lng: event.event.longitude }} 
            />
          ))}
        </GoogleMap>
        ) : (
          <h1>Carregando</h1>
        )}
      </MapArea>

      <FABButton>
        <FiPlus size={32} color="#fff" />
      </FABButton>
    </Container>
  );
}

export { Home };