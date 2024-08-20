import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "../ui/Header";
import EquipmentItem from "./EquipmentItem";
import useEquipments from "@/data/useEquipments";
import FeaturedEquipmentsSkeleton from "./FeaturedEquipmentsSkeleton";

function FeaturedEquipments() {
  const { isLoading, equipments } = useEquipments();
  //@ts-ignore
  const featuredEquipments = equipments?.filter(item => item?.isFeatured);

  if (isLoading) return <FeaturedEquipmentsSkeleton />;
  return (
    <div className="relative">
      <Header title1={"Browse Our"} title2={"Featured Equipments"} />
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
