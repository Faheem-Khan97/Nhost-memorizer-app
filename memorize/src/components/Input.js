import { FormLabel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import React from 'react';

const InputWithLabel = ({
  label,
  htmlFor,
  type,
  required,
  value,
  onChange,
  disabled,
  placeholder,
}) => {
  return (
    <FormControl isRequired={required ? true : false}>
      <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
      <Input
        id={htmlFor}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default InputWithLabel;
