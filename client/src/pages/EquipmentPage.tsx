import Footer from "@/components/Footer/Footer";
import MobileNav from "@/components/Nav/MobileNav";
import Nav from "@/components/Nav/Nav";
import Button from "@/components/ui/Button";
import SellMachineBanner from "@/components/ui/SellMachineBanner";
import { useQuotesContext } from "@/context/QuotesProvider";
import useEquipments from "@/data/useEquipments";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

//@ts-ignore
import Headroom from "react-headroom";
import { useTranslation } from "react-i18next";
import { BiMessage } from "react-icons/bi";
import {
  BsBagPlus,
  BsCopy,
  BsFacebook,
  BsLink,
  BsLinkedin,
  BsShare,
  BsTwitter,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { GoDownload } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagRemoveOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams } from "react-router-dom";
import useShareSocial from "@/hooks/useShareSocial";

function EquipmentPage() {
  const isSmall = useMediaQuery({
    maxWidth: 1200,
  });
  const {
    shareToFacebook,
    shareToLinkedIn,
    shareToTwitter,
    shareToWhatsapp,
    copyLink,
  } = useShareSocial();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const NavHeader = isSmall ? <MobileNav /> : <Nav scrollYValue={20} />;
  const { equipments, isLoading } = useEquipments();
  const params = useParams();
  const { id } = params;
  const equipment = equipments?.find(item => item.id === id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const {
    name,
    images,
    description,
    category,
    isFeatured,
    subcategory,
    brochure,
    subsubcategory,
    brand,
    stock,
    condition,
    createdAt,
  } = equipment || {};

  const { t } = useTranslation(["translate"]);
  const { quotes, addQuote, removeQuote } = useQuotesContext();
  const navigate = useNavigate();
  function removeFromQuotes(e) {
    e?.preventDefault();
    removeQuote(id);
  }
  function addToQuotes(e) {
    e?.preventDefault();
    addQuote({ name, id, description, image: images[0] });
  }
  function handleContact(e) {
    e?.preventDefault();
    navigate("/new-quote?id=" + id);
  }

  const isInQuote = quotes.findIndex(item => item.id === id) !== -1;

  const stockText =
    stock?.toLowerCase() === "in stock" ? t("stock_in") : t("stock_out");
  const isInStock = stock?.toLowerCase() === "in stock";

  const [mainImage, setMainImage] = useState(images?.at(0) || "");
  useEffect(() => {
    if (equipment) {
      setMainImage(equipment.images[0]);
    }
  }, [equipment]);

  if (isLoading)
    return (
      <>
        <Headroom style={{ zIndex: 999 }} className="bg-sky-950/90 hero-bg">
          {NavHeader}
        </Headroom>
        <EquipmentPageSkeleton />
        <div className="w-[min(1500px,100%)] mx-auto my-8 mt-16 p-4">
          <SellMachineBanner />
        </div>
        <Footer />
      </>
    );
  //@ts-ignore
  if (!id || !equipment || !equipment?.isActive)
    return (
      <div className="flex flex-col gap-8 min-h-screen">
        <Headroom style={{ zIndex: 999 }} className="bg-sky-950/90 hero-bg">
          {NavHeader}
        </Headroom>
        <div className="grow max-w-7xl mx-auto flex items-center justify-center uppercase font-medium text-xl lg:text-3xl text-sky-950 flex-col gap-8">
          <p>No Equipment Found :(</p>
          <Link
            to={"/equipments"}
            className="text-base normal-case px-7 py-3 bg-sky-600 hover:bg-sky-700 text-sky-50 rounded-sm">
            Go Back To Equipments
          </Link>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Headroom style={{ zIndex: 999 }} className="bg-sky-950/90 hero-bg">
        {NavHeader}
      </Headroom>
      <main className="p-8 grow w-[min(1500px,100%)] mx-auto py-10 lg:py-16 px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
          <div className="space-y-4 self-start">
            <PhotoSlider
              onIndexChange={setIndex}
              index={index}
              visible={visible}
              images={images?.map(item => ({ src: item, key: item }))}
              onClose={() => setVisible(false)}
            />
            <img
              onClick={() => setVisible(true)}
              className="h-[300px] cursor-pointer hover:border-sky-300 transition border-2 border-sky-900/15 lg:h-[400px] xl:h-[500px] w-full object-cover"
              src={mainImage}
              alt={name}
            />
            <div className="flex items-center flex-wrap gap-4">
              {images?.map((item, i) => (
                <div
                  key={item}
                  className="cursor-pointer"
                  onClick={() => {
                    setIndex(i);
                    setMainImage(item);
                  }}>
                  <img
                    className={cn(
                      "lg:h-20 lg:w-32 h-16 w-28 border-2 object-cover",
                      {
                        "border-sky-500": mainImage === item,
                      }
                    )}
                    src={item}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p
              className={
                "uppercase font-light tracking-widest text-start text-base " +
                `${isInStock ? "text-teal-600" : "text-red-700"}`
              }>
              {stockText}
            </p>
            <h2 className="text-xl lg:text-3xl font-medium text-sky-950 lg:leading-10">
              {name}
            </h2>

            <div className="space-y-1 text-sky-950">
              <div className="grid grid-cols-[auto_1fr_auto] text-lg mt-4  items-center gap-3">
                <p className="uppercase font-medium">{t("description")} </p>
                <p className="h-[1px] bg-sky-900 w-full"></p>
                <IoIosArrowDown />
              </div>
              <p
                className="ml-4 text-sky-950/90 text-lg leading-8 overflow-hidden whitespace-nowrap overflow-ellipsis"
                dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <div className="space-y-1 text-sky-950">
              <div className="grid grid-cols-[auto_1fr_auto] text-lg mt-4  items-center gap-3">
                <p className="uppercase font-medium">{t("technical")}</p>
                <p className="h-[1px] bg-sky-900 w-full"></p>
                <IoIosArrowDown />
              </div>
              <ul className="flex flex-col gap-4  pt-2">
                <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                  <p className="">{t("category")} </p>:
                  <p className="font-medium">{category} </p>
                </li>
                <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                  <p className="">{t("brand")} </p>:
                  <p className="font-medium">{brand} </p>
                </li>
                <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                  <p className="">{t("condition")} </p>:
                  <p className="font-medium">{condition} </p>
                </li>
              </ul>
            </div>
            {brochure?.length > 0 && (
              <div className="w-full uppercase font-medium mt-6">
                <a
                  href={brochure}
                  download
                  target="_blank"
                  className="flex  underline-offset-4 border-sky-950/60 justify-center rounded-sm text-sky-950 items-center gap-4 text-lg py-3 px-5 border">
                  <button className="">Download Brochure</button>
                  <GoDownload className="text-xl" />
                </a>
              </div>
            )}
            <div className="flex items-center gap-4 flex-wrap w-full my-6 mt-8">
              <button
                onClick={handleContact}
                className="text-sky-800 p-3 lg:p-4 border-2 outline transition-all outline-2 outline-transparent hover:outline-sky-700 rounded-sm border-sky-700 font-semibold text-lg flex items-center justify-center gap-3 uppercase grow ">
                {t("get_quote")}
                <span className="font-bold text-xl lg:text-3xl ml-auto">
                  <BiMessage />
                </span>
              </button>
              {isInQuote ? (
                <Button
                  onClick={removeFromQuotes}
                  className="!text-2xl bg-sky-900 hover:bg-sky-950 lg:p-4 lg:px-4 p-3 h-full">
                  <IoBagRemoveOutline />
                </Button>
              ) : (
                <Button
                  onClick={addToQuotes}
                  className="!text-2xl lg:p-4 lg:px-4 p-3 h-full">
                  <BsBagPlus />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 uppercase text-sky-950 font-medium mt-10">
              <p className="flex items-center gap-2">
                <BsShare className="text-xl" /> share :
              </p>
              <div className="flex items-center gap-5">
                <BsLinkedin
                  onClick={shareToLinkedIn}
                  className="text-2xl lg:text-3xl hover:text-sky-900 cursor-pointer"
                />
                <BsFacebook
                  onClick={shareToFacebook}
                  className="text-2xl lg:text-3xl hover:text-sky-900 cursor-pointer"
                />
                <BsTwitterX
                  onClick={shareToTwitter}
                  className="text-2xl lg:text-3xl hover:text-sky-900 cursor-pointer"
                />
                <BsWhatsapp
                  onClick={shareToWhatsapp}
                  className="text-2xl lg:text-3xl hover:text-sky-900 cursor-pointer"
                />
                <BsCopy
                  onClick={copyLink}
                  className="text-xl lg:text-2xl hover:text-sky-900 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="w-[min(1500px,100%)] mx-auto my-8 mt-16 p-4">
        <SellMachineBanner />
      </div>
      <Footer />
    </div>
  );
}

export default EquipmentPage;

function EquipmentPageSkeleton() {
  return (
    <main className="p-8 grow w-[min(1500px,100%)] mx-auto py-10 lg:py-16 px-4 lg:px-8">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
        <div className=" space-y-4">
          <div className="h-[300px] border-sky-900/5 lg:h-[400px] xl:h-[500px]">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <div className="flex items-center flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="lg:h-20 lg:w-32 h-16 w-28 object-cover">
                <Skeleton height={"100%"} width={"100%"} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            <Skeleton height={20} width={"20%"} />
          </p>
          <h2 className="text-xl h-20 lg:text-3xl font-medium text-sky-950 lg:leading-10">
            <Skeleton height={"100%"} width={"100%"} />
          </h2>
          <div className="grid grid-cols-[4fr_1fr] max-w-[400px]  items-center gap-4 flex-wrap w-full my-3">
            <Skeleton height={40} width={"100%"} />
            <Skeleton height={40} width={"100%"} />
          </div>

          <div className="space-y-1 text-sky-950/20">
            <div className="grid grid-cols-[auto_1fr_auto] text-lg mt-4  items-center gap-3">
              <p className="uppercase font-medium w-20">
                <Skeleton height={"100%"} width={"100%"} />{" "}
              </p>
              <p className="h-[1px] bg-sky-900/20 w-full">
                <Skeleton height={"100%"} width={"100%"} />
              </p>
              <IoIosArrowDown />
            </div>
            <p className="ml-4 text-sky-950/20 text-lg leading-8">
              <Skeleton height={"100%"} width={"100%"} />
              <Skeleton height={"100%"} width={"100%"} />
              <Skeleton height={"100%"} width={"100%"} />
              <Skeleton height={"100%"} width={"80%"} />
            </p>
          </div>
          <div className="space-y-1 text-sky-950/20">
            <div className="grid grid-cols-[auto_1fr_auto] text-lg mt-4  items-center gap-3">
              <p className="uppercase font-medium w-20">
                <Skeleton height={"100%"} width={"100%"} />
              </p>
              <p className="h-[1px] bg-sky-900/20 w-full"></p>
              <IoIosArrowDown />
            </div>
            <ul className="flex flex-col gap-4  pt-2">
              <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                <p className="">
                  <Skeleton height={"100%"} width={"100%"} />{" "}
                </p>
                :
                <p className="font-medium">
                  <Skeleton height={"100%"} width={"100%"} />{" "}
                </p>
              </li>
              <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                <p className="">
                  <Skeleton height={"100%"} width={"100%"} />{" "}
                </p>
                :
                <Skeleton height={"100%"} width={"100%"} />
              </li>
              <li className="p-3  bg-sky-50/80 border border-sky-500/5 grid grid-cols-[100px_5px_1fr] gap-4 justify-between text-lg">
                <p className="">
                  <Skeleton height={"100%"} width={"100%"} />{" "}
                </p>
                :
                <p className="font-medium">
                  <Skeleton height={"100%"} width={"100%"} />{" "}
                </p>
              </li>
            </ul>
          </div>
          <Skeleton height={"100%"} width={"100%"} />
        </div>
      </div>
    </main>
  );
}
