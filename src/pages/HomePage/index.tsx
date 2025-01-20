import { useEffect, useState } from "react";
import Gainer from "./Gainer";
import Looser from "./Looser";
import Trending from "./Trending";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Corrected import
import "swiper/css";
import "swiper/css/pagination";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between space-x-4">
      {isMobile ? (
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000, disableOnInteraction: false }} 
          modules={[Autoplay]} 
        >
          <SwiperSlide>
            <Trending />
          </SwiperSlide>
          <SwiperSlide>
            <Gainer />
          </SwiperSlide>
          <SwiperSlide>
            <Looser />
          </SwiperSlide>
        </Swiper>
      ) : (
        <>
          <Trending />
          <Gainer />
          <Looser />
        </>
      )}
    </div>
  );
};

export default HomePage;
