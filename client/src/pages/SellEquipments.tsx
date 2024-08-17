import Footer from "@/components/Footer/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import { useEffect, useState } from "react";
import { BiEuro } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { GoAlert } from "react-icons/go";
import { HiPhoto } from "react-icons/hi2";

function SellEquipments() {
  const [sellData, setSellData] = useState({
    fullName: "",
    productName: "",
    email: "",
    phone: "",
    price: "",
  });
  type fileType = {
    file: File;
    id: string;
  };
  const [images, setImages] = useState<fileType[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  useEffect(() => {
    images?.forEach(file => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        //@ts-ignore
        setImagesSrc(prev => [...prev, fileReader.result?.toString()]);
      };

      fileReader.readAsDataURL(file.file);
    });
    return () => setImagesSrc([]);
  }, [images]);

  function removeImage(id: string) {
    setImages(prev => [...prev.filter(item => item.id !== id)]);
  }
  function addImage(e) {
    const file: File = e.target.files[0];
    if (file) {
      const newFile = { file, id: Math.random() + "" };

      setImages(prev => [...prev, newFile]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"Sell Your Equipments"} />
      <div className=" container mx-auto p-2 py-5 lg:py-10">
        <p className="text-lg text-sky-950 lg:text-xl">
          Looking to sell your equipment? Just complete this form, and we’ll
          reach out to you shortly.
        </p>
        <div className="my-2 flex flex-col lg:my-8">
          {/* <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Equipment Details
          </p> */}
          <form
            onSubmit={handleSubmit}
            id="contact"
            className="grid gap-3 gap-y-6 lg:gap-6 lg:grid-cols-2 mt-2 lg:mt-4">
            <Input
              value={sellData.fullName}
              onChange={e =>
                setSellData(prev => ({ ...prev, fullName: e.target.value }))
              }
              id={"fullName"}
              placeholder="Full name *"
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({ ...prev, productName: e.target.value }))
              }
              value={sellData.productName}
              id={"productName"}
              placeholder="Product name *"
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({ ...prev, email: e.target.value }))
              }
              value={sellData.email}
              id={"email"}
              placeholder="Email *"
              type="email"
              required
            />
            <Input
              //@ts-ignore
              onChange={item => setSellData(prev => ({ ...prev, phone: item }))}
              value={sellData.phone}
              id={"phone"}
              as="phone"
              placeholder="Phone *"
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({ ...prev, price: e.target.value }))
              }
              value={sellData.price}
              icon={<BiEuro />}
              id={"price"}
              placeholder="Your Best Price"
              required
            />
            <Input id={"details"} placeholder="Additional details (optional)" />

            {/* <Input
              onChange={e =>
                //@ts-ignore
                setSellData(prev => ({ ...prev, image: e.target.files[0] }))
              }
              icon={<HiPhoto />}
              type="file"
              id={"image"}
              placeholder="Upload Image"
              required
              className=""
            /> */}
          </form>
          <div className="my-2 flex flex-col lg:my-4">
            {/* <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
              Upload Photos
            </p> */}
            <label
              className="w-full text-sky-950/95 flex items-center justify-center flex-col gap-1 uppercase font-medium cursor-pointer lg:text-lg min-h-20 lg:min-h-32 bg-sky-50/50 border border-gray-400 rounded-sm"
              htmlFor="images">
              <HiPhoto className="text-2xl lg:text-4xl" />
              <p>Click To Upload Images</p>
              <p className="text-sm flex items-center gap-1 normal-case">
                {" "}
                <GoAlert />
                Max file size : 5MB
              </p>
              <input
                onChange={addImage}
                className="hidden "
                type="file"
                id="images"
                accept="image/*"
              />
            </label>
            {/* <div className="mt-2 grid grid-cols-4 gap-4 lg:gap-8 rounded-sm">
              {imagesSrc?.map(item => (
                <div>
                  <img className="w-full max-h-40 object-cover" src={item} />
                </div>
              ))}
            </div> */}
            <div className="mt-2 lg:mt-4 flex flex-col gap-2 self-start">
              {images.map(item => {
                const { file } = item;
                const type = file.type.split("/")[1].toUpperCase();
                const name = file.name;
                const size = (file.size / 1024 / 1024).toFixed(2) + " MB";
                return (
                  <div className="flex gap-3 lg:gap-6 p-2 overflow-hidden border-b border-sky-950/30 ">
                    <p className="p-2 rounded-sm flex items-center justify-center font-medium text-sky-950 bg-sky-200 text-sm">
                      {type}{" "}
                    </p>
                    <p className="flex flex-col mx-4 text-gray-800">
                      <span>{name} </span>
                      <span className="uppercase text-sm font-medium text-gray-900">
                        {size}{" "}
                      </span>
                    </p>
                    <button
                      className="ml-auto text-xl text-sky-950 hover:text-sky-800"
                      onClick={() => removeImage(item.id)}>
                      <BsTrash />{" "}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
            <Button form="contact">Submit</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellEquipments;
