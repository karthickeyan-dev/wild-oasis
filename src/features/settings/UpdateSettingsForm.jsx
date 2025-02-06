import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';

import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(settings);

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  // function handleFormSubmit(data) {
  //   updateSetting(data);
  // }
  // function handleFormError(error) {
  //   console.log(error.message);
  // }

  if (isPending) return <Spinner />;

  return (
    // <Form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
    <Form onSubmit={handleSubmit(updateSetting)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          {...register('minBookingLength', { required: 'Required' })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          {...register('maxBookingLength', { required: 'Required' })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
          {...register('maxGuestsPerBooking', { required: 'Required' })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          {...register('breakfastPrice', { required: 'Required' })}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Update Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
