import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "../ui/Header";
import EquipmentItem from "./EquipmentItem";
import useEquipments from "@/data/useEquipments";
import FeaturedEquipmentsSkeleton from "./FeaturedEquipmentsSkeleton";
import { useTranslation } from "react-i18next";

function FeaturedEquipments() {
  const { isLoading, equipments } = useEquipments();
  const { t } = useTranslation(["translate"]);
  //@ts-ignore
  const featuredEquipments = equipments
    ?.filter(item => item.isActive)
    .filter(item => item?.isFeatured);

  if (isLoading) return <FeaturedEquipmentsSkeleton />;
  return (
    <div className="relative">
      <Header
        title1={t("translate:browse")}
        title2={t("translate:our_equipments")}
      />
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
        spaceBetween={40}
        breakpoints={{
          950: {
            spaceBetween: 27,
          },
        }}
        autoplay={{
          delay: 3000,
        }}
        className="mt-6 xl:mt-12 pb-10 xl:pb-14"
        slidesPerView={"auto"}>
        {featuredEquipments?.map(item => (
          <SwiperSlide
            key={item.id}
            className="max-w-[350px] border border-sky-50 rounded-md overflow-hidden ">
            {
              //@ts-ignore
              <EquipmentItem equipment={item} />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedEquipments;
