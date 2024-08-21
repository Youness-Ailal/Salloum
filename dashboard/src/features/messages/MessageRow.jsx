import styled from "styled-components";

import { HiEye, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useDeleteMessage } from "./useDeleteMessage";
import ViewMessage from "./ViewMessage";

const Msg = styled.p`
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Seen = styled.div`
  padding-left: 5px;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

function MessageRow({ messageItem }) {
  const { isDeleting, deleteRequest } = useDeleteMessage();

  const { id, email, fullName, phone, date, seen, message } = messageItem;
  return (
    <Table.Row>
      <div>{fullName}</div>
      <p>{phone}</p>
      <div>{email}</div>
      <div>{date}</div>
      <Msg>{message}</Msg>
      <Seen>{seen ? "visited" : "    "}</Seen>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="view">
                <Menus.Button icon={<HiEye />}>View message</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="view">
              <ViewMessage itemToView={messageItem} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Message"
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

export default MessageRow;
