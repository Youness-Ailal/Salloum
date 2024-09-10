import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateEquipment } from "./useCreateEquipment";
import Select from "../../ui/Select";
import { categories as cates } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useUpdateEquipment } from "./useUpdateEquipment";
import { useCategories } from "./useCategories";
import uuid4 from "uuid4";
import { BiTrash } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEquipments } from "./useEquipments";
import Spinner from "../../ui/Spinner";

function EditEquipmentForm() {
  const { categories: catesApi, isLoading } = useCategories();
  const { equipments, isLoading: equipsLoading } = useEquipments();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const equipId = searchParam.get("id");
  useEffect(() => {
    if (!equipId) navigate("/equipments");
  }, [equipId]);
  const equipmentToEdit = equipments?.find(item => item.id === equipId);
  const { updateEquipment, isUpdating } = useUpdateEquipment();
  const [category, setcategory] = useState(equipmentToEdit?.category);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesApi, setImagesApi] = useState(
    equipmentToEdit?.images.map(item => ({ image: item, delete: false })) || []
  );

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
  function removeImage(id, isApi) {
    if (isApi) {
      setImagesApi(prev => [
        ...prev.map(item => {
          if (item.image === id) return { ...item, delete: true };
          return item;
        }),
      ]);
      return;
    }
    setImageFiles(prev => [...prev.filter(item => item.id !== id)]);
    setImages(prev => [...prev.filter(item => item.id !== id)]);
  }

  useEffect(() => {
    if (!isLoading && !equipsLoading) {
      setcategory(equipmentToEdit?.category);
      setSubcategory(equipmentToEdit?.subcategory);
      setSubsubcategory(equipmentToEdit?.subsubcategory);
      setImagesApi(
        equipmentToEdit?.images.map(
          item => ({ image: item, delete: false } || [])
        )
      );
    }
  }, [isLoading, equipsLoading]);
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
  const [subcategory, setSubcategory] = useState(equipmentToEdit?.subcategory);
  const [subsubcategory, setSubsubcategory] = useState(
    equipmentToEdit?.subsubcategory
  );
  const [isFeatured, setIsFeatured] = useState(
    equipmentToEdit?.isFeatured ? "Yes" : "No"
  );
  const [stock, setStock] = useState(equipmentToEdit?.stock || "In stock");
  const [condition, setCondition] = useState(
    equipmentToEdit?.condition || "New"
  );
  const [isActive, setIsActive] = useState(
    equipmentToEdit?.isActive ? "Active" : "Inactive"
  );
  const isWorking = isUpdating;

  const { id, ...editValues } = equipmentToEdit || {};

  delete editValues.image;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  function onSubmit(data) {
    const { name, description, brand, brochure } = data;

    updateEquipment(
      {
        id,
        name,
        isFeatured: isFeatured === "Yes",
        isActive: isActive === "Active",
        brochure: brochure[0],
        category,
        subcategory,
        subsubcategory,
        brand,
        description,
        stock,
        condition,
        imagesApi,
        imageFiles,
      },
      {
        onSuccess: data => {
          reset();
        },
      }
    );
  }

  function onError(errors) {
    // console.log(errors);
  }
  if (equipsLoading) return;
  <Spinner />;

  if (!equipId || !equipmentToEdit) return;
  <div className="h-full w-full flex items-center justify-center text-4xl">
    <p>No equipment found!</p>
  </div>;
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
          id="name"
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

      <FormRow label="Status">
        <Select
          options={[
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
          onChange={e => setIsActive(e.target.value)}
          value={isActive}
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
          id="image"
          accept="image/*"
          onChange={e => addImage(e.target.files[0])}
        />
      </FormRow>
      {(images.length > 0 ||
        imagesApi?.filter(item => !item.delete).length > 0) && (
        <div className="flex gap-6 max-w-[1000px] ml-auto flex-wrap p-4 border border-gray-300 rounded-md">
          {imagesApi
            ?.filter(item => !item.delete)
            .map(item => (
              <div
                key={item?.image}
                onClick={() => removeImage(item?.image, true)}
                className="group border relative overflow-hidden cursor-pointer border-gray-300 rounded-sm">
                <img
                  className="size-52 object-cover"
                  src={item?.image}
                  alt=""
                />
                <span className="absolute opacity-0 group-hover:opacity-100 transition h-full w-full text-6xl text-gray-700 flex items-center justify-center bg-red-300/50 top-0 left-0">
                  <BiTrash />
                </span>
              </div>
            ))}
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
          Edit equipment
        </Button>
      </FormRow>
    </form>
  );
}

export default EditEquipmentForm;
