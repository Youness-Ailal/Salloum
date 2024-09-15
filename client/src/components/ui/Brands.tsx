import useLayout from "@/data/useLayout";
import { useEffect, useRef } from "react";

function Brands() {
  // const partners = import.meta.glob("../../assets/brands/*.jpg", {
  //   eager: true,
  //   as: "url",
  // });
  // const images = [];
  // for (const img in partners) {
  //   images.push(partners[img]);
  // }
  const { isLoading, layout } = useLayout();
  //@ts-ignore
  const brands = layout?.filter(item => item?.type === "partner");

  const scrollerRef = useRef(null);
  const scrollerInnerRef = useRef(null);
  const animationAddedRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef?.current;
    const scrollerInner = scrollerInnerRef?.current;
    if (scroller && scrollerInner && !animationAddedRef.current) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation(scrollerInner);
        animationAddedRef.current = true;
      }
    }

    function addAnimation(scrollerInner) {
      // scroller.setAttribute('data-animated', true);
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach(item => {
        const duplicatedItem = item?.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, [scrollerRef.current, scrollerInnerRef.current]);

  return (
    <div className="py-2 lg:py-10">
      {/* <p className="text-center p-4 xl:p-6 text-xl lg:text-3xl text-sky-900 font-semibold">
        We provide high-quality used machines from leading European brands.
      </p> */}
      <div
        ref={scrollerRef}
        data-animated="true"
        className="scroller  overflow-hidden max-h-20">
        <ul
          ref={scrollerInnerRef}
          className="tag-list scroller__inner flex items-center justify-center gap-8 xl:gap-12 w-full">
          {brands?.map(item => (
            <li key={item.id}>
              <img
                src={item.image}
                alt="partner"
                className="max-h-10 object-cover grayscale-[60%] "
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Brands;
