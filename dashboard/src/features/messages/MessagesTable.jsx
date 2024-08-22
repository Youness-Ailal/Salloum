import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import MessageRow from "./MessageRow";
import { useMessages } from "./useMessages";

function MessagesTable() {
  const { isLoading, mesasges } = useMessages();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="2.2fr 1.8fr 2fr 1.6fr 4fr .3fr .5fr">
        <Table.Header>
          <div>Name</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Date</div>
          <div>Message</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={mesasges}
          render={messageItem => (
            <MessageRow messageItem={messageItem} key={messageItem.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default MessagesTable;
