import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { FAB } from '../../components/FAB';
import { SideBar } from '../../components/SideBar';
import api from '../../services';

import { 
  Container,
  Area, 
  Card,
  ProfileArea,
  AreaTop,
  Line,
  Info,
  LeftSide,
  RightSide,
  Table,
} from './styles';

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_update: Date;
  date_creation: Date;
}

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

const Dashboard: React.FC = () => {
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [events, setEvents] = useState<IEvents[]>([]);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('volunMap-token');

    navigate('/');
  }, [navigate]);

  const getCustomerAndYoursEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('volunMap-token');

      const response = await api.get('/users/myprofile', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token || "")}`
        }
      });

      setCustomer(response.data.response);

      const responseEvents = await api.get('/events/myprofile', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token || "")}`
        }
      });

      setEvents(responseEvents.data.response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCustomerAndYoursEvents();
  }, [getCustomerAndYoursEvents]);

  return (
    <Container>
      <SideBar goTo="/"/>

      <Area>
        <Card>
          <ProfileArea>
            <AreaTop>
              <h1>Dados Pessoais</h1>

              <button onClick={handleLogout}>Sair</button>
            </AreaTop>

            <Line />

            <Info>
              <LeftSide>
                <span><strong>Nome:</strong> {customer.first_name}</span>
                <span><strong>Sobrenome:</strong> {customer.last_name}</span>
                <span><strong>E-mail:</strong> {customer.email}</span>
              </LeftSide>
              <RightSide>
                <Button>Editar</Button>
              </RightSide>
            </Info>

            <h1>Meus Eventos</h1>

            <Line />

            <Table>
              <thead>
                <tr>
                  <th>Nome do evento</th>
                  <th>Data do evento</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => {
                  return (
                    <tr key={event.event.id}>
                      <td>{event.event.event_name}</td>
                      <td>
                        {format(new Date(event.event.date_init_event), 'dd/MM/yyyy')}
                      </td>
                      <td>
                        <button 
                          onClick={() => { 
                            navigate(
                              '/atualizar-evento', 
                              { state: event.event.id }
                            )
                            }}>Editar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ProfileArea>
        </Card>
      </Area>

      <FAB onClick={() => navigate('/criar-evento')}/>
    </Container>
  );
}

export { Dashboard };