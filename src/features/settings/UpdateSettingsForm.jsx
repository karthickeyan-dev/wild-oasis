import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { register, handleSubmit, reset } = useForm();
  // console.log(settings);

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          {...register('minBookingLength', { required: 'Required' })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          {...register('maxBookingLength', { required: 'Required' })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register('maxGuestsPerBooking', { required: 'Required' })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          {...register('breakfastPrice', { required: 'Required' })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
