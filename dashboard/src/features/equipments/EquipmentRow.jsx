import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useDeleteEquipment } from "./useDeleteEquipment";
import { ActionButton, ActionButtons } from "./BuyRow";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
`;

const Equipment = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  max-width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function EquipmentRow({ equipment }) {
  const { isDeleting, deleteEquipment } = useDeleteEquipment();
  const navigate = useNavigate();
  const { id, name, category, isActive, images, createdAt, isFeatured, stock } =
    equipment;
  const goToEdit = () => navigate("/equipments/edit?id=" + id);

  return (
    <Table.Row>
      <Img src={images[0]} />
      <Equipment>{name}</Equipment>
      <div>{category}</div>
      <Tag type={isActive ? "green" : "red"}>
        {isActive ? "active" : "inactive"}{" "}
      </Tag>
      <div>{createdAt}</div>
      <Tag type={stock.toLowerCase() === "in stock" ? "green" : "red"}>
        {stock}
      </Tag>
      <Tag type={isFeatured ? "green" : "red"}>
        {isFeatured ? "Yes" : "No"}{" "}
      </Tag>
      <div>
        <Modal>
          <ActionButtons>
            <ActionButton onClick={goToEdit}>{<HiPencil />} </ActionButton>

            <Modal.Open opens="delete">
              <ActionButton>
                <HiTrash />
              </ActionButton>
            </Modal.Open>
          </ActionButtons>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Equipment"
              disabled={isDeleting}
              onConfirm={() => {
                deleteEquipment(id);
              }}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EquipmentRow;
