import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function UpdateCategoriesForm({ onCloseModal }) {
  function onSubmit() {}

  function onError(errors) {
    // console.log(errors);
  }
  const isWorking = false;

  return (
    <Form onSubmit={onSubmit} type={onCloseModal ? "modal" : "regular"}>
      {Array.from({ length: 6 }).map((item, i) => {
        return (
          <div label={`Category ${i + 1}`}>
            <Input
              type="text"
              id="name"
              placeholder="Category Name (Motors)"
              disabled={isWorking}
              required
            />
            <Textarea
              type="text"
              id="subcategories"
              placeholder="Subcategories (Fan Motors,Boat Motors,Starter Motors )"
              disabled={isWorking}
              required
            />
          </div>
        );
      })}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} isLoading={isWorking}>
          Update
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateCategoriesForm;
