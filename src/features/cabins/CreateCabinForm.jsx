import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import useCreateCabin from './useCreateCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { isCreating, createCabin } = useCreateCabin();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(editValues);
  function handleFormSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    createCabin(
      { newCabin: { ...data, image }, id: editId },
      { onSuccess: () => reset() }
    );
  }

  function handleFormError(error) {
    // console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Maximum capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
