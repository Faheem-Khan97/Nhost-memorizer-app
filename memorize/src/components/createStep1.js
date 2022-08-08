import {
  Textarea,
  FormControl,
  HStack,
  Button,
  Select,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import { getYearsOptions, Months } from '../utils/date';
import InputWithLabel from './Input';

const Years = getYearsOptions();
const validate = (...fields) => {
  let res = true;
  fields.forEach(field => {
    if (field.trim().length === 0) {
      res = false;
    }
  });
  return res;
};

const CreateFormStep1 = ({
  title,
  setTitle,
  month,
  setMonth,
  year,
  setYear,
  location,
  setLocation,
  desc,
  setDesc,
  step,
  setStep,
}) => {
  const onNextClick = () => {
    if (validate(title, location, month, year)) {
      setStep(2);
    } else {
      alert('Fill all the required fields');
    }
  };
  return (
    <VStack spacing={6} paddingY={6}>
      <InputWithLabel
        type="text"
        value={title}
        htmlFor={'title'}
        label={'Title'}
        placeholder="San Francisco Tour "
        required
        onChange={e => setTitle(e.target.value)}
      />
      <HStack spacing={4} width="full">
        <Select
          htmlFor={'month'}
          value={month}
          required
          placeholder={'Select Month'}
          onChange={e => setMonth(e.target.value)}
        >
          {Months.map(month => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          htmlFor={'year'}
          value={year}
          required
          placeholder={'Select Year'}
          onChange={e => setYear(e.target.value)}
        >
          {Years.map(year => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Select>
      </HStack>
      <InputWithLabel
        type="text"
        htmlFor={'location'}
        label={'Location'}
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        placeholder={'San Francisco, USA'}
      />
      <FormControl>
        <FormLabel htmlFor={'desc'}>{'Short Description'}</FormLabel>
        <Textarea
          size={'sm'}
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme={'blue'}
        onClick={onNextClick}
        variant={'solid'}
        width="sm"
        marginX="auto"
      >
        Next
      </Button>
    </VStack>
  );
};

export default CreateFormStep1;
