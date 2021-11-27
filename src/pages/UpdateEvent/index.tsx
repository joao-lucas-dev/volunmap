import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { SideBar } from '../../components/SideBar';
import api from '../../services';
import * as Yup from 'yup';

import mapMarkerToday from '../../assets/mapMarkerToday.svg';

import { 
  Container,
  Area, 
  Card,
  Line,
  Maps,
  Caption,
  SpanError,
} from './styles';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { Form } from '@unform/web';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FormHandles } from '@unform/core';
import { InputFile } from '../../components/InputFile';
import getValidationErrors from '../../utils/getValidationsErros';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

interface IPosition {
  latitude: number;
  longitude: number;
}

interface IData {
  latitude: number;
  longitude: number;
  eventName: string;
  drescription: string;
  phone: string;
  photo: string;
  descriptionDonations: string;
  dateInitEvent: string;
  dateEndEvent: string;
}

interface IPhoto {
  mimo: string,
  base64: any;
}

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
  date_init_event: string | Date,
  date_end_event: string | Date,
  phone: string,
  pictures: Array<any>;
}
interface IEvent {
  user?: IUser;
  event: IEventObj;
}

const UpdateEvent: React.FC = () => {
  const [eventInfo, setEventInfo] = useState<IEvent>({
    event: {
      event_name: '',
      date_end_event: '',
      date_init_event: '',
      drescription: '',
      description_donations: '',
      id: 0,
      latitude: 0,
      longitude: 0,
      phone: '',
      pictures: [],
    },
  });
  const [position, setPosition] = useState<IPosition>({} as IPosition);
  const [positionArea, setPositionArea] = useState<IPosition>({} as IPosition);
  const [loading, setLoading] = useState(false);
  const [errorMarker, setErrorMarker] = useState<boolean>(false);
  const [photo, setPhoto] = useState<IPhoto>({} as IPhoto);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY || ""
  });

  const location = useGeoLocation();
  const locationParams = useLocation();
  const formRef = useRef<FormHandles>(null);

  const navigate = useNavigate();

  const handleMapClick = useCallback((event: any) => {
    
    const { lat, lng } = event.latLng;

    setPosition({
      latitude: lat(),
      longitude: lng(),
    });

    setPositionArea({
      latitude: lat(),
      longitude: lng(),
    });
  }, []);

  const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleOnChange = useCallback(async (e) => {
    const imageBase64 = await toBase64(e.target.files[0]);

    setPhoto({
      mimo: e.target.files[0].type,
      base64: imageBase64,
    });
  }, []);

  const handleSubmit = useCallback(async (data: IData) => {
    try {
      formRef.current?.setErrors({});

      setLoading(true);

      const schema = Yup.object().shape({
        eventName: Yup.string().required('Nome do evento obrigatório'),
        drescription: Yup.string().required('Sobre obrigatório'),
        phone: Yup.string().required('Número de WhatsApp obrigatório'),
        descriptionDonations: Yup.string().required('Informações das doações obrigatória'),
        dateInitEvent: Yup.string().required('Horário inicial obrigatório'),
        dateEndEvent: Yup.string().required('Horário final obrigatório'),
      });

      if (!position.latitude) {
        throw new Error();
      } else {
        setErrorMarker(false);
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const token = localStorage.getItem('volunMap-token');

      await api.put(`/events/${locationParams.state}`, {
        event_name: data.eventName,
        drescription: data.drescription,
        description_donations: data.descriptionDonations,
        latitude: position.latitude,
        longitude: position.longitude,
        date_init_event: data.dateInitEvent,
        date_end_event: data.dateEndEvent,
        phone: Number(data.phone),
        pictures: [
          photo
        ]
      }, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token || "")}`
        }
      });

      toast.success('Evento atualizado com sucesso!');

      navigate('/dashboard');

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else if (!position.latitude) {
        setErrorMarker(true);
      } else {
        toast.error('Erro. Tente novamente mais tarde!');
      }
    }
  }, [position.latitude, photo, position.longitude, navigate, locationParams]);

  const getInfoEvent = useCallback(async () => {
    try {
      const response = await api.get(`/events/${locationParams.state}`);
      setEventInfo(response.data.response);
      setPosition({
        latitude: response.data.response.event.latitude,
        longitude: response.data.response.event.longitude,
      });
      setPositionArea({
        latitude: response.data.response.event.latitude,
        longitude: response.data.response.event.longitude,
      });
      setPhoto(response.data.response.event.pictures[0]);
    } catch (err) {
      console.log(err);
    }
  }, [locationParams]);

  useEffect(() => {
    getInfoEvent();

    setPositionArea({
      latitude: location.coordinates?.lat,
      longitude: location.coordinates?.lng,
    })
  }, [getInfoEvent, location]);
  
  if (!eventInfo.event.date_init_event) {
    return <></>
  }

  return (  
    <Container>
      <SideBar goTo="/dashboard"/>

      <Area>
        <Card>
          <h1>Dados</h1>

          <Line />

          <Maps>
            {loadError && <h4>Erro ao carregar o mapa</h4>}

            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: 227,
                  borderRadius: 20
                }}
                center={{ lat:  positionArea.latitude, lng: positionArea.longitude }}
                zoom={15}
                options={{ 
                  zoomControl: false, 
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
                onClick={handleMapClick}
              >
                {position.latitude && position.longitude && (
                  <Marker 
                    icon={mapMarkerToday} 
                    position={{ lat: position.latitude, lng: position.longitude }}
                  />
                )}
              </GoogleMap>
              ) : (
                <h3>Carregando</h3>
              )}
            </Maps>

            <Caption>
              Clique no mapa para adicionar a localização
            </Caption>

            {errorMarker && <SpanError>Marcação de local obrigatório</SpanError>}

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                eventName: eventInfo.event.event_name,
                drescription: eventInfo.event.drescription,
                phone: eventInfo.event.phone,
                descriptionDonations: eventInfo?.event.description_donations,
                dateInitEvent: new Date(new Date(eventInfo.event.date_init_event).getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19),
                dateEndEvent: new Date(new Date(eventInfo.event.date_end_event).getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19),
              }}
            >
              <Input name="eventName" label="Nome do evento" />
              <Input styleOf="textArea" name="drescription" label="Sobre" />
              <Input name="phone" label="Número do WhatsApp" />
              <InputFile  type="file" name="photo" label="Foto" onChange={handleOnChange} />
              {photo.base64 && (
                <>
                  <h3>Preview</h3>
                  <img src={photo.base64} alt="Teste" />
                </>
              )}

              <h1>Informações</h1>

              <Line />

              <Input styleOf="textArea" name="descriptionDonations" label="Informações para doações" />
              <Input type="datetime-local" name="dateInitEvent" label="Horário Inicial" />
              <Input type="datetime-local" name="dateEndEvent" label="Horário Final" />

              <Button loading={loading} type="submit">Atualizar</Button>
            </Form>
        </Card>
      </Area>
    </Container>
  );
}

export { UpdateEvent };