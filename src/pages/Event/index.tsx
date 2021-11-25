import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { format, isToday, getHours } from 'date-fns';

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
    googleMapsApiKey: process.env.REACT_APP_API_KEY || ""
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

  return (
    <Container>
      <SideBar />

      <AreaEvent>
        <h4>Evento de Doação</h4>

        <Card>
          {event?.event?.pictures[0]?.base64 ? (
            <img src={event?.event.pictures[0].base64} alt={event?.event.pictures[0].title} />
          ) : (
            <img src="https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg" alt="Sem Imagem" />
          )}

          <ContainerCard>
            <h1>{event?.event.event_name}</h1>

            <p>{event?.event.drescription}</p>

            <Maps>
            {loadError && <h4>Erro ao carregar o mapa</h4>}

            {isLoaded && event ? (
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
                <h3>Carregando</h3>
              )}
            </Maps>

            <LinkToGoogleMaps
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&destination=${event?.event.latitude},${event?.event.longitude}`}
            >
              Ver rotas no Google Maps
            </LinkToGoogleMaps>

            <Line />

            <InfoTitle>Informações</InfoTitle>

            <CardHour>
              <FiClock size={32} color="#15B6D6" />
              {event && isToday(new Date(event.event.date_init_event)) ? (
                <span>Horário (Hoje)</span>
              ) : (
                <span>Horário (Dia {event && format(new Date(event.event.date_init_event), 'dd/MM/yyyy')})</span>
              )}
              <span>Das {event && getHours(new Date(event.event.date_init_event))}h às {event && getHours(new Date(event.event.date_end_event))}h</span>
            </CardHour>

            <DescriptionDonations>{event?.event.description_donations}</DescriptionDonations>

            <WhatsAppButton 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=+55${event?.event.phone}&text=Olá, gostaria de mais informações sobre o evento ${event?.event.event_name}.`}
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