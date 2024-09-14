import { useEffect, useState } from "react";
import uuid4 from "uuid4";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import { HiPlus, HiTrash, HiXMark } from "react-icons/hi2";
import { Icon } from "@iconify/react";
import { CiSearch } from "react-icons/ci";
import { useCategories } from "./useCategories";
import { useUpdateCategories } from "./useUpdateCategories";
export const ICON_URL_API = "https://api.iconify.design";

function UpdatCategories() {
  const { isLoading, categories } = useCategories();
  const { isUpdating, updateCategoriesApi } = useUpdateCategories();
  const isWorking = isLoading || isUpdating;
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setCategoriesData(categories);
    }
  }, [categories]);
  function addNewCatgory() {
    setCategoriesData(prev => [
      {
        id: uuid4(),
        category: "",
        icon: "",
        subCategories: [],
        subSubCategories: [],
      },
      ...prev,
    ]);
  }
  function deleteCatgory(id) {
    setCategoriesData(prev => [...prev.filter(item => item.id !== id)]);
  }

  function deleteSubCatgory(id, sub) {
    setCategoriesData(prev => [
      ...prev.map(item => {
        if (item.id === id)
          return {
            ...item,
            subCategories: item.subCategories.filter(item => item !== sub),
          };
        return item;
      }),
    ]);
  }
  function addSubCatgory(e, id) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setCategoriesData(prev => [
          ...prev.map(item => {
            if (item.id === id) {
              return {
                ...item,
                subCategories: [...item.subCategories, value],
              };
            }
            return item;
          }),
        ]);
        e.target.value = "";
      }
    }
  }
  function deleteSubSubCatgory(id, subsub) {
    setCategoriesData(prev => [
      ...prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            subSubCategories: item.subSubCategories.filter(
              item => item !== subsub
            ),
          };
        }
        return item;
      }),
    ]);
  }
  function addSubSubCatgory(e, id) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setCategoriesData(prev => [
          ...prev.map(item => {
            if (item.id === id)
              return {
                ...item,
                subSubCategories: [...item.subSubCategories, value],
              };
            return item;
          }),
        ]);
        e.target.value = "";
      }
    }
  }
  function updateCategoryName(id, name) {
    setCategoriesData(prev => [
      ...prev.map(item => {
        if (item.id === id) return { ...item, category: name };
        return item;
      }),
    ]);
  }
  function changeIcon(id, icon, onCloseModal) {
    setCategoriesData(prev => [
      ...prev.map(item => {
        if (item.id === id) return { ...item, icon };
        return item;
      }),
    ]);
    onCloseModal();
  }

  const handlecategoriesUpdate = () => {
    let hasErrors = false;
    if (!categoriesData.length) {
      toast.error("categories empty");
      return;
    }
    categoriesData.forEach(item => {
      const { category, icon, subSubCategories, subCategories } = item;

      if (!category.length) {
        toast.error("missing category name");
        hasErrors = true;
      } else if (!icon.length) {
        toast.error("missing icon for " + category);
        hasErrors = true;
      } else if (!subCategories.length) {
        toast.error("missing subcategories for " + category);
        hasErrors = true;
      }
    });
    !hasErrors && updateCategoriesApi(categoriesData);
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <Button
        isLoading={isWorking}
        onClick={handlecategoriesUpdate}
        className="self-end">
        Update Categories
      </Button>
      <div className="p-10 bg-white flex flex-col">
        <button
          onClick={addNewCatgory}
          className="w-full hover:bg-gray-300 bg-gray-200 text-gray-800 p-4 flex items-center justify-center gap-4 rounded-md mt-2">
          <HiPlus /> Add new category
        </button>
        {categoriesData?.map((item, i) => {
          const { id, category, subCategories, icon, subSubCategories } = item;
          return (
            <div
              className="py-16
          border-b-2 border-dashed border-gray-400/80 ">
              <div className="flex items-center gap-8">
                <Input
                  value={category}
                  onChange={e => updateCategoryName(id, e.target.value)}
                  className="w-full"
                  placeholder="category name"
                />
                <button
                  onClick={() => deleteCatgory(item.id)}
                  className="p-4 rounded-md flex items-center bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500 text-3xl">
                  <HiTrash />
                </button>
              </div>
              <div className="mt-4">
                <div className="flex my-4 flex-wrap gap-4">
                  {subCategories?.map(item => (
                    <span className="pl-4 rounded-sm flex items-center gap-2 text-gray-600  bg-gray-200/80">
                      {item}
                      <button
                        onClick={() => deleteSubCatgory(id, item)}
                        className="px-4 py-4 bg-gray-200 border-l border-gray-400">
                        <HiXMark />
                      </button>
                    </span>
                  ))}
                  <Input
                    onKeyPress={e => {
                      addSubCatgory(e, id);
                    }}
                    className="w-full"
                    placeholder="Subcategories"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex my-4 flex-wrap gap-4">
                  {subSubCategories?.map(item => (
                    <span className="pl-4 rounded-sm flex items-center gap-2 text-gray-600  bg-gray-200/80">
                      {item}
                      <button
                        onClick={() => deleteSubSubCatgory(id, item)}
                        className="px-4 py-4 bg-gray-200 border-l border-gray-400">
                        <HiXMark />
                      </button>
                    </span>
                  ))}
                </div>
                <Input
                  onKeyPress={e => {
                    addSubSubCatgory(e, id);
                  }}
                  className="w-full"
                  placeholder="Sub-Subcategories"
                />
              </div>
              <Modal>
                <Modal.Open opens={"icons"}>
                  <button className="p-4 border border-gray-200 bg-gray-100 mt-6 uppercase font-medium text-gray-600 flex text-2xl items-center gap-4 hover:bg-gray-200/80 px-10 py-3 rounded-sm">
                    Category Icon
                    {icon?.length ? (
                      <Icon className="text-5xl text-sky-600" icon={icon} />
                    ) : null}
                  </button>
                </Modal.Open>
                <Modal.Window name={"icons"}>
                  <UpdateIcon id={id} changeIcon={changeIcon} />
                </Modal.Window>
              </Modal>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UpdatCategories;

function UpdateIcon({ id, onCloseModal, changeIcon }) {
  const [query, setQuery] = useState("");
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchIcons() {
      if (query.length) {
        try {
          setLoading(true);
          const res = await fetch(`${ICON_URL_API}/search?query=${query}`, {
            signal: controller.signal,
          });
          if (!res.ok) {
            setIcons([]);
            throw new Error("couldnt fetch icons");
          }
          const data = await res.json();
          setIcons(data.icons);
        } catch (error) {
          setIcons([]);
          throw new error("couldnt fetch icons");
        } finally {
          setLoading(false);
        }
      } else {
        setIcons([]);
      }
    }
    fetchIcons();
    return () => controller.abort();
  }, [query]);
  return (
    <div className="bg-white py-12 px-10  rounded-lg min-w-[800px] ">
      <div className="mb-5 flex items-center gap-2">
        <p className="text-3xl font-medium">Search for icons</p>
      </div>
      <div className=" text-4xl relative">
        <span className="absolute bottom-1/2 translate-y-1/2 left-2  text-gray-500 pointer-events-none ">
          <CiSearch />
        </span>
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ex. Cooling"
          type="text"
          className="bg-gray-50 border border-gray-400 rounded-md p-2 w-full focus:outline-none text-3xl  !pl-16 focus:border-gray-500"
        />
      </div>
      <div className=" border border-gray-400 rounded-md p-3 w-full mt-6 min-h-[400px]">
        {loading ? (
          <div className="h-full min-h-60 flex items-center justify-center ">
            <p>loading...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 h-full w-full">
            {icons?.map(icon => (
              <div
                onClick={() => changeIcon(id, icon, onCloseModal)}
                key={icon}
                className="size-16 p-1 border rounded-sm border-gray-400 hover:border-gray-500 cursor-pointer hover:bg-white hover:scale-125 transition-all ">
                <Icon icon={icon} className="h-full w-full text-sky-600" />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className='flex items-center justify-end gap-5 mt-10 text-base'>
        <Button onClick={onCloseModal}>Add Icon</Button>
      </div> */}
    </div>
  );
}
