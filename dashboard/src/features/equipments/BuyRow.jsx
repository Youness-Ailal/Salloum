import styled from "styled-components";

import { HiEye, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import ViewBuyRequest from "./ViewBuyRequest";
import { useDeleteBuyRequest } from "./useDeleteBuyRequest";
import { getCountryCode, getCountryFlag } from "../../utils/helpers";

export const blank =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
`;
export const NameFlag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ActionButton = styled.button`
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 1.8rem;
  color: var(--color-brand-600);
  background-color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-100);
  }
  border: 1px solid var(--color-grey-200);
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

function BuyRow({ equipment }) {
  const { isDeleting, deleteRequest } = useDeleteBuyRequest();

  const { id, email, fullName, phone, date, equipments, entreprise, country } =
    equipment;
  const equisCount =
    (equipments?.length + "").length < 2
      ? "0" + equipments?.length
      : equipments?.length;
  return (
    <Table.Row>
      <Img src={!equipments?.length ? blank : equipments[0]?.image} />
      <p>{fullName}</p>
      <Equipment>{equisCount}</Equipment>
      <div>{phone}</div>
      <div>{email}</div>
      <div>{entreprise}</div>
      <div>{date}</div>
      <div>
        <Modal>
          <ActionButtons>
            <Modal.Open opens="view">
              <ActionButton>{<HiEye />} </ActionButton>
            </Modal.Open>

            <Modal.Open opens="delete">
              <ActionButton>
                <HiTrash />
              </ActionButton>
            </Modal.Open>
          </ActionButtons>

          <Modal.Window name="view">
            <ViewBuyRequest itemToView={equipment} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Request"
              disabled={isDeleting}
              onConfirm={() => deleteRequest(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BuyRow;
