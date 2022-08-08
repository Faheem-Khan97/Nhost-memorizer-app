import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import ShowMemo from '../components/ShowMemo';

const Home = () => {
  return (
    <Flex direction={'column'} h="calc(100vh)">
      <Navbar />
      <ShowMemo />
    </Flex>
  );
};

export default Home;
