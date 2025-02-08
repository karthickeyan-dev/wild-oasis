import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import CreateCabinForm from './CreateCabinForm';

import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import { formatCurrency } from '../../utils/helpers';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id, image, name, regularPrice, discount, maxCapacity, description } =
    cabin;

  function handleDuplicate() {
    createCabin({
      newCabin: {
        name: `copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Item
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Item>

                <Modal.Open opens="edit">
                  <Menus.Item icon={<HiPencil />}>Edit</Menus.Item>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Item icon={<HiTrash />}>Delete</Menus.Item>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
