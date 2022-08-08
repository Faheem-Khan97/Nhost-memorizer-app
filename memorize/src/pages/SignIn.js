import { Flex } from '@chakra-ui/react';
import { Text, Heading, VStack, Button } from '@chakra-ui/react';
import { useSignInEmailPassword } from '@nhost/react';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import InputWithLabel from '../components/Input';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { signInEmailPassword, isLoading, isSuccess } =
    useSignInEmailPassword();
  const disableForm = isLoading;

  const handleLoginSubmit = async () => {
    if (validateForm()) {
      const { error } = await signInEmailPassword(
        email.trim(),
        password.trim()
      );
      if (error?.error) {
        setErrors([error.message]);
      }
    }
  };

  const validateForm = () => {
    const errs = [];
    if (email.trim().length === 0) {
      errs.push(...errors, 'Email is a required field.');
    }
    if (password.trim().length === 0) {
      errs.push(...errors, 'Password must be of 8 characters at least.');
    }
    setErrors(errs);
    return errors.length > 0 ? false : true;
  };

  // If success return to the home page
  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Flex h="calc(100vh)" justifyContent={'center'} px={4} alignItems="center">
      <Flex
        p={4}
        paddingX={10}
        rounded="md"
        border="1px solid #eeeeee"
        direction={'column'}
        alignItems="center"
        rowGap={2}
      >
        <Heading size={'lg'} marginBottom={10} color={'#6767dd'}>
          Login
        </Heading>
        <form onSubmit={handleLoginSubmit}>
          <VStack spacing={6} paddingTop={4}>
            <InputWithLabel
              type="email"
              htmlFor={'email'}
              label={'Email'}
              required
              disabled={disableForm}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <InputWithLabel
              type="password"
              htmlFor={'password'}
              label={'Password'}
              required
              disabled={disableForm}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              colorScheme={'blue'}
              onClick={handleLoginSubmit}
              alignSelf="flex-start"
              variant={'solid'}
              w="full"
              disabled={disableForm}
            >
              {isLoading ? `Processing...` : `Login`}
            </Button>
          </VStack>
        </form>
        {errors.length !== 0 ? (
          <VStack spacing={2} alignSelf="flex-start" marginTop={2}>
            {errors.map(e => (
              <Text key={e} fontSize="xs" color={'red'}>
                * {e}
              </Text>
            ))}
          </VStack>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default SignIn;
