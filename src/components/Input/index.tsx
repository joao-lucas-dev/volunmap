import React, { InputHTMLAttributes, useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import {
  Container
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  styleOf?: string;
}

const Input: React.FC<InputProps> = ({ name, label, styleOf = 'input', ...rest }) => {
  const inputRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>

      {styleOf === 'textArea' && (
        <textarea 
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          cols={30} 
          rows={5}
        />
      )}

      {styleOf === 'input' && (
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}

      {error && <span className="error">{error}</span>}
    </Container>
  )
}

export { Input };