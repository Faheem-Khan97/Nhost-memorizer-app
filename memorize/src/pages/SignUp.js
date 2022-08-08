import { useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import InputWithLabel from '../components/Input';
import { VStack, Button, Heading, Text, HStack, Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);
  const { signUpEmailPassword, isLoading, isSuccess } = useSignUpEmailPassword({
    displayName: `${firstName} ${lastName}`,
    metadata: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    },
  });

  const handleSignupSubmit = async () => {
    if (validateForm()) {
      const { error } = await signUpEmailPassword(
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
    if (firstName.trim().length === 0) {
      errs.push(...errors, 'First Name is a required field.');
    }
    if (lastName.trim().length === 0) {
      errs.push(...errors, 'Last Name is a required field.');
    }
    if (email.trim().length === 0) {
      errs.push(...errors, 'Email is a required field.');
    }
    if (password.trim().length === 0) {
      errs.push(...errors, 'Password must be of 8 characters at least.');
    }
    setErrors(errs);
    return errors.length > 0 ? false : true;
  };
  // Disable the form when either it is loading or needs email verification
  const disableForm = isLoading;

  // If success return to the home page
  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Flex h="calc(100vh)" justifyContent={'center'} px={4} alignItems="center">
      <Flex
        p={4}
        rounded="md"
        border="1px solid #eeeeee"
        direction={'column'}
        alignItems="center"
        rowGap={2}
      >
        <Heading size={'lg'} marginBottom={8} color={'#6767dd'}>
          Create Account
        </Heading>
        <form onSubmit={handleSignupSubmit}>
          <VStack spacing={6} paddingTop={4}>
            <HStack spacing={4}>
              <InputWithLabel
                htmlFor={'fname'}
                label={'First Name'}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                disabled={disableForm}
              />
              <InputWithLabel
                htmlFor={'lname'}
                label={'Last Name'}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                disabled={disableForm}
              />
            </HStack>
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
              onClick={handleSignupSubmit}
              variant={'solid'}
              w="full"
              disabled={disableForm}
            >
              {isLoading ? `Processing...` : `Create Account`}
            </Button>
          </VStack>
        </form>
        {errors.length !== 0 ? (
          <VStack spacing={2} marginTop={2}>
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

export default SignUp;
