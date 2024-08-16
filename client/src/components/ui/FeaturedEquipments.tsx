import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "./Header";
import { featuredEquipments } from "@/utils/constants";
import FeaturedEquipmentsItem from "./FeaturedEquipmentsItem";

function FeaturedEquipments() {
  return (
    <div className="relative">
      <Header title1={"Browse Our"} title2={"Featured Equipments"} />
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          enabled: true,
        }}
        spaceBetween={50}
        autoplay={{
          delay: 2000,
        }}
        className="mt-6 xl:mt-12 pb-10 xl:pb-14"
        slidesPerView={"auto"}
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}>
        {featuredEquipments?.map(item => (
          <SwiperSlide className="max-w-96 border border-sky-50 rounded-md overflow-hidden ">
            <FeaturedEquipmentsItem equipment={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedEquipments;
