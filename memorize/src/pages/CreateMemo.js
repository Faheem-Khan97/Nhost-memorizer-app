import { Flex } from '@chakra-ui/react';
import React from 'react';
import CreateForm from '../components/CreateForm';
import Navbar from '../components/Navbar';

const CreateMemo = () => {
  return (
    <Flex direction={'column'} h="calc(100vh)">
      <Navbar />
      <CreateForm />
    </Flex>
  );
};

export default CreateMemo;
