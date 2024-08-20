import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useEditCabin } from "./useEditCabin";
import { useCreateEquipment } from "./useCreateEquipment";
import Select from "../../ui/Select";
import { categories } from "../../utils/constants";
import { useState } from "react";

function CreateEquipmentForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createEquipment } = useCreateEquipment();
  const [category, setcategory] = useState(categories[0].label);
  const [isFeatured, setIsFeatured] = useState("No");
  const [isActive, setIsActive] = useState("Active");
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const { image, name, stock, description } = data;

    const imageFile = image[0];
    if (isEditSession)
      editCabin(
        {
          newCabinData: {
            name,
            description,
            imageFile,
            stock: +stock,
            category,
            isFeatured: isFeatured === "Yes",
            isActive: isActive === "Active",
          },
          id: editId,
        },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createEquipment(
        {
          name,
          description,
          imageFile,
          stock: +stock,
          category,
          isFeatured: isFeatured === "Yes",
        },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Equipment name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.maxCapacity?.message}>
        <Select
          value={category}
          disabled={isWorking}
          onChange={e => setcategory(e.target.value)}
          options={categories}
        />
      </FormRow>

      <FormRow label="Stock" error={errors?.stock?.message}>
        <Input
          type="number"
          id="stock"
          disabled={isWorking}
          defaultValue={1}
          {...register("stock", {
            required: "This field is required",
            min: {
              value: 0,
              message: "can't be negative",
            },
          })}
        />
      </FormRow>
      {isEditSession && (
        <FormRow label="Status">
          <Select
            value={[
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "Inactive",
                label: "Inactive",
              },
            ]}
            disabled={isWorking}
            onChange={e => setcategory(e.target.value)}
            options={isActive}
          />
        </FormRow>
      )}

      <FormRow label="Featured" error={errors?.discount?.message}>
        <Select
          disabled={isWorking}
          value={isFeatured}
          onChange={e => setIsFeatured(e.target.value)}
          options={[
            {
              value: "No",
              label: "No",
            },
            {
              value: "Yes",
              label: "Yes",
            },
          ]}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Equipment photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} isLoading={isWorking}>
          {isEditSession ? "Edit equipment" : "Create new equipment"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEquipmentForm;
