import styled from "styled-components";

import { HiEye, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ViewSellRequest from "./ViewSellRequest";
import { useDeleteSellRequest } from "./useDeleteSellRequest";
import { formatCurrency } from "../../utils/helpers";
const blank =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
`;

const Equipment = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function SellRow({ equipment }) {
  const { isDeleting, deleteRequest } = useDeleteSellRequest();

  const { id, productName, email, fullName, phone, price, date, photos } =
    equipment;

  return (
    <Table.Row>
      <Img src={!photos?.length ? blank : photos[0]} />
      <Equipment>{productName}</Equipment>
      <div>{fullName}</div>
      <div>{phone}</div>
      <div>{email}</div>
      <div>{formatCurrency(price)}</div>
      <div>{date}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="view">
                <Menus.Button icon={<HiEye />}>View details</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="view">
              <ViewSellRequest itemToView={equipment} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Request"
                disabled={isDeleting}
                onConfirm={() => deleteRequest(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default SellRow;
