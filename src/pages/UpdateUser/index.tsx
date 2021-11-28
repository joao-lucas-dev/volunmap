import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { 
  Container,
  Area,
  Card,
} from './styles';
import getValidationErrors from '../../utils/getValidationsErros';
import api from '../../services';

interface ICustomer {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface IData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UpdateUser: React.FC = () => {
  const [customer, setCustomer] = useState({} as ICustomer);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const getCustomer = useCallback(async () => {
    try {
      const token = localStorage.getItem("volunMap-token");

      const response = await api.get("users/myprofile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token || "")}`
        }
      });
      setCustomer(response.data.response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = useCallback(async (data: IData) => {
    try {
      formRef.current?.setErrors({});

      setLoading(true);

      const schema = Yup.object().shape({
        firstName: Yup.string().required('Nome obrigatório'),
        lastName: Yup.string().required('Sobrenome obrigatório'),
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().min(4, 'Senha deve conter no mínimo 4 caracteres').required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const token = localStorage.getItem("volunMap-token");

      await api.put('/users/myprofile', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token || "")}`
        }
      });

      setLoading(false);

      toast.success('Atualização realizada com sucesso!');

      navigate('/dashboard');
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        toast.error('Erro. Tente novamente mais tarde!');
      }
    }
  }, [navigate]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!customer) {
    return <></>;
  }

  return (
    <Container>
      <SideBar goTo="/dashboard"/>

      <Area>
        <Card>
          <h1>Atualizar</h1>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              firstName: customer.first_name,
              lastName: customer.last_name,
              email: customer.email,
              password: '',
            }}
            >
              <Input name="firstName" label="Nome" />
              <Input name="lastName" label="Sobrenome" />
              <Input name="email" label="E-mail" />
              <Input name="password" label="Senha" />
              <Button loading={loading} type="submit">Atualizar</Button>
            </Form>
        </Card>
      </Area>
    </Container>
  );
}

export { UpdateUser };