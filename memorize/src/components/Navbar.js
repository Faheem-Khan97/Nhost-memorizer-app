import { Heading, HStack, Text, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useUserId, useSignOut } from '@nhost/react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const id = useUserId();
  console.log(id);
  const { signOut } = useSignOut();

  const GET_USER = gql`
    query GetUser($id: uuid!) {
      user(id: $id) {
        id
        email
        displayName
        metadata
      }
    }
  `;
  const { loading, data } = useQuery(GET_USER, {
    variables: { id },
  });

  console.log(loading, data);
  return (
    <Flex
      backgroundColor={'pink.100'}
      paddingX={4}
      paddingY={2}
      color="#444466"
    >
      <Flex grow={1}>
        <Heading as={'h4'} fontFamily={'cursive'}>
          Memories
        </Heading>
      </Flex>
      <Flex>
        <HStack paddingX={4} spacing={10}>
          <Text>
            Welcome,{' '}
            <Text color={'green'} as={'span'}>
              {data?.user.metadata.firstName
                ? data?.user.metadata.firstName
                : 'User'}
            </Text>{' '}
          </Text>
          <Link to={'/create-memo'}>
            <Text decoration="underline" color="#454599">
              {' '}
              Add Memo{' '}
            </Text>
          </Link>
          <Button colorScheme="orange" variant="outline" onClick={signOut}>
            Logout
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
