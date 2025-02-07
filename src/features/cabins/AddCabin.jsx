import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModelOpen(isModelOpen => !isModelOpen)}>
        Add new Cabin
      </Button>
      {isModelOpen && (
        <Modal onCloseModal={() => setIsModelOpen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModelOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
