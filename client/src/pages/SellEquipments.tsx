import Footer from "@/components/Footer/Footer";
import Button from "@/components/ui/Button";
import InfoBox, { infoBoxProps } from "@/components/ui/InfoBox";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import useSendSellRequest from "@/data/useSendSellRequest";
import { RECAPTCHA_KEY } from "@/utils/constants";
import { useRef, useState } from "react";
import { BiEuro } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { GoAlert } from "react-icons/go";
import { HiPhoto } from "react-icons/hi2";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

type fileType = {
  file: File;
  id: string;
  image: string;
};
function SellEquipments() {
  const { isLoading, sendRequest } = useSendSellRequest();
  const [infoBoxData, setInfoBoxData] = useState<infoBoxProps>();
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const handleCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };
  const clearInfoBox = () => setInfoBoxData({ type: "error", message: "" });
  const [sellData, setSellData] = useState({
    fullName: "",
    productName: "",
    email: "",
    phone: "",
    price: "",
    details: "",
  });
  const [images, setImages] = useState<fileType[]>([]);
  const { t, i18n } = useTranslation("translate");
  const resetFields = () => {
    setSellData({
      fullName: "",
      productName: "",
      email: "",
      phone: "",
      price: "",
      details: "",
    });
    setImages([]);
  };
  function removeImage(id: string) {
    setImages(prev => [...prev.filter(item => item.id !== id)]);
  }
  //@ts-ignore
  function addImage(e) {
    const file: File = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const newFile = {
          file,
          id: Math.random() + "",
          image: fileReader.result?.toString(),
        };
        //@ts-ignore
        setImages(prev => [...prev, newFile]);
      };
      fileReader.readAsDataURL(file);
    }
  }

  //@ts-ignore
  function handleSubmit(e) {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    if (!images?.length) {
      setInfoBoxData({
        type: "error",
        message: "please upload some image first",
      });
      return;
    }
    const { fullName, productName, email, phone, price, details } = sellData;
    sendRequest(
      {
        fullName,
        productName,
        email,
        phone,
        price,
        details,
        photosFiles: images.map(item => item.file),
      },
      {
        onSuccess: () => {
          globalThis.scrollTo({ top: 0 });
          setInfoBoxData({
            type: "success",
            message: "Sell request received. We'll respond shortly.",
          });
          resetFields();
        },
        onError: err =>
          setInfoBoxData({
            type: "error",
            message: err.message,
          }),
      }
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t("sell_your_equipments")} />
      <div className=" container mx-auto p-2 py-5 lg:py-10">
        <p className="text-lg text-sky-950 lg:text-xl">{t("looking_sell")}</p>
        <div className="my-2 flex flex-col lg:my-8">
          {infoBoxData?.message.length && (
            <InfoBox
              clear={clearInfoBox}
              type={infoBoxData.type}
              message={infoBoxData.message}
            />
          )}
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
              placeholder={t("full_name") + " *"}
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({ ...prev, productName: e.target.value }))
              }
              value={sellData.productName}
              id={"productName"}
              placeholder={t("product_name") + " *"}
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({ ...prev, email: e.target.value }))
              }
              value={sellData.email}
              id={"email"}
              placeholder={t("email") + " *"}
              type="email"
              required
            />
            <Input
              //@ts-ignore
              onChange={item => setSellData(prev => ({ ...prev, phone: item }))}
              value={sellData.phone}
              id={"phone"}
              as="phone"
              placeholder={t("phone") + " *"}
              required
            />
            <Input
              onChange={e =>
                setSellData(prev => ({
                  ...prev,
                  price: Math.max(0, +e.target.value) + "",
                }))
              }
              type="number"
              value={sellData.price}
              icon={<BiEuro />}
              id={"price"}
              // type="number"
              inputMode="numeric"
              placeholder={t("your_best_price") + " " + t("optional")}
            />
            <Input
              id={"details"}
              value={sellData.details}
              onChange={e =>
                setSellData(prev => ({ ...prev, details: e.target.value }))
              }
              placeholder={t("additional_details") + " " + t("optional")}
            />
          </form>
          <div className="my-2 flex flex-col lg:my-4">
            {/* <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
              Upload Photos
            </p> */}
            <label
              className="w-full text-sky-950/95 flex items-center justify-center flex-col gap-1 uppercase font-medium cursor-pointer lg:text-lg min-h-20 lg:min-h-32 mt-2 bg-sky-50/50 border border-gray-400 rounded-sm"
              htmlFor="images">
              <HiPhoto className="text-2xl lg:text-4xl" />
              <p>{t("click_to_upload_images")}</p>
              <p className="text-sm flex items-center gap-1 normal-case">
                {" "}
                <GoAlert />
                {t("max_file_size")}
              </p>
              <input
                onChange={addImage}
                className="hidden "
                type="file"
                id="images"
                accept="image/*"
              />
            </label>

            <div className="mt-2 lg:mt-4 flex gap-3 flex-wrap lg:gap-6 self-start">
              {images.map(item => {
                const { image } = item;

                return (
                  <div
                    key={item.id}
                    className="p-2 lg:p-3 group relative border overflow-hidden border-gray-200 rounded-sm">
                    <img
                      className="object-cover h-32 lg: gap-40"
                      src={image}
                      alt=""
                    />
                    <button
                      className="absolute top-0 left-0 h-full w-full bg-red-200/50 text-red-500 text-xl lg:text-3xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                      onClick={() => removeImage(item.id)}>
                      <BsTrash />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <ReCAPTCHA
                hl={i18n.language || "en"}
                ref={recaptchaRef}
                sitekey={RECAPTCHA_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
          </div>
          <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
            <Button isLoading={isLoading} form="contact">
              {t("submit")}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellEquipments;
