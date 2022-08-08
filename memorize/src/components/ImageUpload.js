import { Button, Text, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import '../ImageUpload.css';
import { uid } from '../utils/date';

const sizeValidation = (fileSize, allowedSizeInMb) => {
  return (fileSize / (1024 * 1024)).toFixed(2) <= allowedSizeInMb;
};

export const ImageUpload = ({
  maxFileSizeInMb,
  maxNumberOfImages,
  files,
  setFile,
  setStep,
  handleCreateClick,
}) => {
  const [error, setError] = useState('');
  const handleChangeImage = event => {
    //check if image is selected or cancelled
    if (event.target.files.length) {
      const reader = new FileReader();
      if (sizeValidation(event.target.files[0].size, maxFileSizeInMb)) {
        reader.onload = loadEvent => {
          if (loadEvent.target.readyState === 2) {
            setFile([
              ...files,
              {
                src: loadEvent.target.result,
                id: uid(),
                file: event.target.files[0],
              },
            ]);
          }
        };

        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('Your Image is too large');
      }
    }
  };

  const deleteImage = uid => {
    const filesImg = files.filter((e, i) => e.id !== uid);
    setFile(filesImg);
  };

  const handleNext = event => {
    event.preventDefault();
    if (!files.length) {
      setError('Add at least one image');
    } else {
      handleCreateClick(event);
    }
  };

  // console.log(files);
  return (
    <Flex direction={'column'}>
      <div id="wrapper">
        {files.map((file, index) => (
          <div id="img-container" key={file.id}>
            <div className="upload-img">
              <img src={file.src} alt="Uploaded" />
            </div>
            <div id="btn-div">
              <button className="Delete" onClick={() => deleteImage(file.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {files.length < maxNumberOfImages && (
          <div
            id="upload-form"
            action=""
            method="post"
            encType="multipart/form-data"
          >
            <label htmlFor="adsfile">
              {files.length ? 'Add More' : 'Upload Image'}
              <p id="maxsize">Max: {maxFileSizeInMb}Mb</p>
            </label>

            <input
              type="file"
              name="adsfile"
              id="adsfile"
              accept="image/*"
              onChange={handleChangeImage}
            />
          </div>
        )}
      </div>
      <HStack marginTop={4} justifyContent={'space-between'}>
        <Button
          alignSelf="center"
          colorScheme={'blue'}
          onClick={() => setStep(1)}
          variant={'outline'}
        >
          Back
        </Button>
        <Button
          type="submit"
          colorScheme={'blue'}
          onClick={handleNext}
          alignSelf="flex-start"
          variant={'solid'}
        >
          Create
        </Button>
      </HStack>
      {error ? (
        <Text size={'xs'} color="red" marginTop={4}>
          * {error}
        </Text>
      ) : null}
    </Flex>
  );
};
