import { Heading, Text, Flex } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { nhost } from '../lib/nhost';
import { ImageUpload } from '../components/ImageUpload';
import CreateFormStep1 from './createStep1';

const CreateForm = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [files, setFile] = useState([]);
  const [desc, setDesc] = useState('');

  const FormStep1Props = {
    title,
    setTitle,
    month,
    setMonth,
    year,
    setYear,
    desc,
    setDesc,
    location,
    setLocation,
    step,
    setStep,
  };

  const ADD_MEMO = gql`
    mutation InsertMemoryDetails($memdetails: memdetails_insert_input!) {
      insert_memdetails(objects: [$memdetails]) {
        affected_rows
        returning {
          mem_id
          title
        }
      }
    }
  `;

  const ADD_IMAGE = gql`
    mutation InsertImages($file: files_insert_input!) {
      insertFiles(objects: [$file]) {
        affected_rows
      }
    }
  `;
  // const [insert_memdetails] = useMutation(ADD_MEMO);
  const [insert_files] = useMutation(ADD_IMAGE);

  const objToSend = { title, location, month, year, description: desc };

  const handleCreateClick = async event => {
    event.preventDefault();
    console.log('Let"s create ');

    try {
      const id = await nhost.storage.upload({ file: files[0].file });
      console.log(id);
      // const res = await insert_files({
      //   variables: {
      //     file: { file: files[0].src },
      //   },
      // });
      // console.log('responseeee', res);

      // const res = await insert_memdetails({
      //   variables: {
      //     memdetails: objToSend,
      //   },
      // });

      // console.log('responseeee', res);
    } catch (error) {
      console.log(error);
    }
  };

  // mutation addTeam($name: String!, $description: String, $companyId: uuid!) {
  //   insert_teams(
  //     objects: {
  //       name: $name
  //       description: $description
  //       company_id: $companyId
  //     }
  //   ) {
  //     returning {
  //       id
  //       name
  //       description
  //       created_at
  //       company_id
  //     }
  //   }
  // }

  console.table(files);
  return (
    <Flex grow={1} justifyContent="center" padding={4}>
      <Flex
        p={4}
        paddingX={10}
        rounded="md"
        border="1px solid #eeeeee"
        direction={'column'}
        alignItems="center"
        rowGap={2}
        height="fit-content"
      >
        <VStack>
          <Heading size={'lg'} color={'#6767dd'} marginBottom={'-2'}>
            Add a Memory
          </Heading>
          <Text fontSize={'smaller'} color="#aaaaff">
            Add some details and images
          </Text>
        </VStack>
        <form method="post">
          <Flex direction={'column'} width="lg">
            {step === 1 ? (
              <CreateFormStep1 {...FormStep1Props} />
            ) : (
              <ImageUpload
                maxFileSizeInMb={2}
                maxNumberOfImages={4}
                files={files}
                setFile={setFile}
                setStep={setStep}
                handleCreateClick={handleCreateClick}
              />
            )}
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateForm;
