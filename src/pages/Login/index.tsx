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
  AreaLogin,
  CardLogin,
} from './styles';
import getValidationErrors from '../../utils/getValidationsErros';
import api from '../../services';

interface IData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: IData) => {
    try {
      formRef.current?.setErrors({});

      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().min(4, 'Senha deve conter no mínimo 4 caracteres').required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { data: dataToken } = await api.get('/auth/login', { auth: {
        username: data.email,
        password: data.password
      }});

      setLoading(false);

      console.log(dataToken.access_token);
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        toast.error('E-mail ou senha inválidos');
      }
    }
  }, []);

  return (
    <Container>
      <SideBar />

      <AreaLogin>
        <CardLogin>
          <h1>Login</h1>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              login: '',
              password: '',
            }}
            >
              <Input name="email" label="E-mail" />
              <Input name="password" label="Senha" type="password" />
              <Button loading={loading} type="submit">Entrar</Button>
            </Form>

            <span>
              Não tem conta, crie uma clicando{' '}
              <button onClick={() => navigate('/criar-conta')}>aqui</button>
            </span>
        </CardLogin>
      </AreaLogin>
    </Container>
  );
}

export { Login };