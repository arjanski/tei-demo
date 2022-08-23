import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselItems = string[];

const TeiFacsimileCarousel = (data: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          {data && (
            <img
              src={data[0]}
              alt=""
              className="aspect-video embla_item"
              width="600"
              height="300"
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default TeiFacsimileCarousel;
