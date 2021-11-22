import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import { SideBar } from '../../components/SideBar';
import api from '../../services';

import mapMarkerToday from '../../assets/mapMarkerToday.svg';

import { 
  Container, 
  AreaEvent,
  Card, 
  ContainerCard,
  Maps,
  LinkToGoogleMaps,
  Line,
  InfoTitle,
  CardHour,
  DescriptionDonations,
  WhatsAppButton,
} from './styles';

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

interface IEventObj {
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
interface IEvent {
  user: IUser;
  event: IEventObj;
}

const Event: React.FC = () => {
  const [event, setEvent] = useState<IEvent>();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: ""
  });

  const location = useLocation();

  const getEvent = useCallback(async () => {
    try {
      const response = await api.get(`/events/${location.state}`);
      setEvent(response.data.response);
    } catch (err) {
      console.log(err);
    }
  }, [location]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);
  
  if (!event) {
    return <></>;
  }
  
  return (
    <Container>
      <SideBar />

      <AreaEvent>
        <h4>Evento de Doação</h4>

        <Card>
          {event.event.event_name}
          <img src="https://portalp1.com.br/wp-content/uploads/2021/09/Setembro-Verde-4-750x375-1.jpg" alt="Imagem" />

          <ContainerCard>
            <h1>{event.event.event_name}</h1>

            <p>{event.event.drescription}</p>

            <Maps>
            {loadError && <h1>Erro ao carregar o mapa</h1>}

            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: 227,
                  borderRadius: 20
                }}
                center={{ lat: event.event.latitude, lng: event.event.longitude }}
                zoom={15}
                options={{ 
                  zoomControl: false, 
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                <Marker 
                  icon={mapMarkerToday} 
                  position={{ lat: event.event.latitude, lng: event.event.longitude }}
                />
              </GoogleMap>
              ) : (
                <h1>Carregando</h1>
              )}
            </Maps>

            <LinkToGoogleMaps
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&destination=${event.event.latitude},${event.event.longitude}`}
            >
              Ver rotas no Google Maps
            </LinkToGoogleMaps>

            <Line />

            <InfoTitle>Informações</InfoTitle>

            <CardHour>
              <FiClock size={32} color="#15B6D6" />
              <span>Horário</span>
              <span>Das 19h às 22h</span>
            </CardHour>

            <DescriptionDonations>{event.event.description_donations}</DescriptionDonations>

            <WhatsAppButton 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=+55${event.event.phone}`}
            >
                <FaWhatsapp size={20} color="#FFF"/>
                Entrar em contato
            </WhatsAppButton>
          </ContainerCard>
        </Card>
      </AreaEvent>
    </Container>
  );
}

export { Event };