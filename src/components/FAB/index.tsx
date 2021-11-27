import React, { ButtonHTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Button } from './styles';

const FAB: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  return (
    <Button {...rest}>
      <FiPlus size={32} color="#fff" />
    </Button>
  );
}

export { FAB };