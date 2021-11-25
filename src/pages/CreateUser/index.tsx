import React, { useCallback, useRef, useState } from 'react';
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

interface IData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const CreateUser: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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

      const { data: dataUser } = await api.post('/users', {
        first_name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      setLoading(false);

      console.log(dataUser);
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        toast.error('Erro. Tente novamente mais tarde!');
      }
    }
  }, []);

  return (
    <Container>
      <SideBar />

      <Area>
        <Card>
          <h1>Cadastrar</h1>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            >
              <Input name="firstName" label="Nome" />
              <Input name="lastName" label="Sobrenome" />
              <Input name="email" label="E-mail" />
              <Input name="password" label="Senha" />
              <Button loading={loading} type="submit">Cadastrar</Button>
            </Form>

            <p>
              Já tem conta? Entre uma clicando {' '}
              <button onClick={() => navigate('/login')}>aqui!</button>
            </p>
        </Card>
      </Area>
    </Container>
  );
}

export { CreateUser };