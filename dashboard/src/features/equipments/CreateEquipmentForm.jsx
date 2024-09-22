import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateEquipment } from "./useCreateEquipment";
import Select from "../../ui/Select";
import { useEffect, useState } from "react";
import { useCategories } from "./useCategories";
import uuid4 from "uuid4";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
export function addEmptyOption(array) {
  array?.push({ label: "None", value: "none" });
}

function CreateEquipmentForm() {
  const { categories: catesApi, isLoading } = useCategories();
  const navigate = useNavigate();

  const { isCreating, createEquipment } = useCreateEquipment();
  const [category, setcategory] = useState(catesApi?.at(0)?.category);

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  function addImage(file) {
    const fileReader = new FileReader();
    setImageFiles(prev => [...prev, { file, id: uuid4(), isNew: true }]);
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImages(prev => [
        ...prev,
        { image: fileReader.result.toString(), id: uuid4() },
      ]);
    };
  }
  function removeImage(id) {
    setImageFiles(prev => [...prev.filter(item => item.id !== id)]);
    setImages(prev => [...prev.filter(item => item.id !== id)]);
  }

  const categories = catesApi?.map(item => ({
    value: item.category,
    label: item.category,
  }));
  const subCategories = catesApi
    ?.filter(item => item.category === category)[0]
    ?.subCategories?.map(item => ({
      value: item,
      label: item,
    }));
  const SubsubCategories = catesApi
    ?.filter(item => item.category === category)[0]
    ?.subSubCategories?.map(item => ({
      value: item,
      label: item,
    }));
  addEmptyOption(subCategories);
  addEmptyOption(SubsubCategories);
  const [subcategory, setSubcategory] = useState(
    catesApi?.at(0)?.subCategories[0]
  );
  const [subsubcategory, setSubsubcategory] = useState(
    catesApi?.at(0)?.subSubCategories[0]
  );
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (!isFirstRender) {
      setSubcategory(subCategories[0].value);
      setSubsubcategory(SubsubCategories[0].value);
    }
  }, [category]);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setcategory(catesApi[0].category);
      setSubcategory(catesApi?.at(0)?.subCategories[0]);
      setSubsubcategory(catesApi?.at(0)?.subSubCategories[0]);
    }
  }, [isLoading]);
  const [isFeatured, setIsFeatured] = useState("No");
  const [stock, setStock] = useState("In stock");
  const [condition, setCondition] = useState("New");
  const isWorking = isCreating;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const { name, description, brand, brochure } = data;
    const newDesc = description.replace("/\n/g", "<br/>");

    createEquipment(
      {
        name,
        isFeatured: isFeatured === "Yes",
        category,
        subcategory,
        brochure: brochure[0],
        subsubcategory,
        brand: brand,
        description: newDesc,
        stock,
        imageFiles,
        condition,
      },
      {
        onSuccess: () => navigate("/"),
      }
    );

    return;
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <form
      className="bg-white px-10 py-16"
      onSubmit={handleSubmit(onSubmit, onError)}
      type={"regular"}>
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
      <FormRow label="Subcategory" error={errors?.maxCapacity?.message}>
        <Select
          value={subcategory}
          disabled={isWorking}
          onChange={e => setSubcategory(e.target.value)}
          options={subCategories}
        />
      </FormRow>
      <FormRow label=" Sub-Subcategory" error={errors?.maxCapacity?.message}>
        <Select
          value={subsubcategory}
          disabled={isWorking}
          onChange={e => setSubsubcategory(e.target.value)}
          options={SubsubCategories}
        />
      </FormRow>

      <FormRow label="Brand name" error={errors?.name?.message}>
        <Input
          type="text"
          id="brand"
          disabled={isWorking}
          {...register("brand", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Stock" error={errors?.stock?.message}>
        <Select
          options={[
            {
              value: "In stock",
              label: "In stock",
            },
            {
              value: "Out of stock",
              label: "Out of stock",
            },
          ]}
          disabled={isWorking}
          onChange={e => setStock(e.target.value)}
          value={stock}
        />
      </FormRow>

      <FormRow label="Condition" error={errors?.discount?.message}>
        <Select
          disabled={isWorking}
          value={condition}
          onChange={e => setCondition(e.target.value)}
          options={[
            {
              value: "New",
              label: "New",
            },
            {
              value: "Used",
              label: "Used",
            },
            {
              value: "Refurbished",
              label: "Refurbished",
            },
          ]}
        />
      </FormRow>
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
      <FormRow label="Equipment Brochure (PDF)">
        <FileInput
          id="brochure"
          accept=".pdf"
          disabled={isWorking}
          {...register("brochure")}
        />
      </FormRow>
      <FormRow label="Equipment photos">
        <FileInput
          multiple
          id="image"
          accept="image/*"
          onChange={e => [...e.target.files].forEach(file => addImage(file))}
        />
      </FormRow>
      {images.length > 0 && (
        <div className="flex gap-6 max-w-[1000px] ml-auto flex-wrap p-4 border border-gray-300 rounded-md">
          {images?.map(item => (
            <div
              key={item?.id}
              onClick={() => removeImage(item?.id)}
              className="group border relative overflow-hidden cursor-pointer border-gray-300 rounded-sm">
              <img className="size-52 object-cover" src={item.image} alt="" />
              <span className="absolute opacity-0 group-hover:opacity-100 transition h-full w-full text-6xl text-gray-700 flex items-center justify-center bg-red-300/50 top-0 left-0">
                <BiTrash />
              </span>
            </div>
          ))}
        </div>
      )}

      <FormRow>
        <Button disabled={isWorking} isLoading={isWorking}>
          Create new equipment
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateEquipmentForm;
