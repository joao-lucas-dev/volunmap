import React, { ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...rest
}) => (
  <ButtonContainer
    loading={loading}
    {...rest}
  >
    {loading ? <FaSpinner color="#FFF" size={18} /> : children}
  </ButtonContainer>
);

export { Button };