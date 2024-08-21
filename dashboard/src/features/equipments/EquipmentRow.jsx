import styled from "styled-components";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateEquipmentForm from "./CreateEquipmentForm";
import Tag from "../../ui/Tag";
import { useCreateEquipment } from "./useCreateEquipment";
import { useDeleteEquipment } from "./useDeleteEquipment";

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

  const { id, name, category, isActive, image, createdAt, isFeatured, stock } =
    equipment;

  return (
    <Table.Row>
      <Img src={image} />
      <Equipment>{name}</Equipment>
      <div>{category}</div>
      <Tag type={isActive ? "green" : "red"}>
        {isActive ? "active" : "inactive"}{" "}
      </Tag>
      <div>{createdAt}</div>
      <div>{(stock + "").length < 2 ? "0" + stock : stock}</div>
      <Tag type={isFeatured ? "green" : "red"}>
        {isFeatured ? "Yes" : "No"}{" "}
      </Tag>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateEquipmentForm equipmentToEdit={equipment} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Equipment"
                disabled={isDeleting}
                onConfirm={() => deleteEquipment(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EquipmentRow;
