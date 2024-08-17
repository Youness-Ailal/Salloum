import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "./Header";
import { featuredEquipments } from "@/utils/constants";
import EquipmentItem from "./EquipmentItem";

function FeaturedEquipments() {
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
            <EquipmentItem equipment={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedEquipments;
