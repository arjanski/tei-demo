import { useCallback, useEffect, useState } from "react";
import CETEI from "@/utils/CETEI";
import { TEIRender, TEIRoute } from "@/components/TEIRouter";
import TeiReference from "@/components/tei/TeiReference";
import TeiHeader from "@/components/tei/TeiHeader";
import TeiSalute from "@/components/tei/TeiSalute";
import { NextPage } from "next";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const TeiIndex: NextPage = () => {
  const [domData, setDomData] = useState(null);
  const [facsimiles, setFacsimiles] = useState([]);

  useEffect(() => {
    const getTEI = async () => {
      const ct = new CETEI();
      // Extract facsimile image url's (this is one way of doing it)
      // See https://github.com/TEIC/CETEIcean/wiki/Anatomy-of-a-behaviors-object#ceteicean-behaviors
      ct.addBehaviors({
        tei: {
          graphic: (e: any) => {
            const url = e.getAttribute("url");
            console.log(url);
            // @ts-ignore
            setFacsimiles((arr) => [...arr, url]);
          },
        },
      });
      // Open XML file to parse it
      const result = await ct.getHTML5(`test-der-sturm.xml`);
      setDomData(result);
    };

    getTEI();
  }, []);

  // This is just stuff for the carousel library
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="prose lg:prose-xl mx-auto max-w-xl p-8 leading-8">
      {domData && facsimiles?.length && (
        <div className="embla overflow-hidden mb-12" ref={emblaRef}>
          <div className="embla__container flex">
            {facsimiles.map((image: any, index: number) => (
              <div className="embla__slide flex-[0_0_100%]" key={index}>
                <Image
                  src={image}
                  alt=""
                  className="aspect-w-4 aspect-h-3"
                  width="800"
                  height="500"
                />
              </div>
            ))}
          </div>
          <nav className="flex justify-center gap-x-4">
            <button
              className="embla__prev inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={scrollPrev}
            >
              Previous
            </button>
            <button
              className="embla__next inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={scrollNext}
            >
              Next
            </button>
          </nav>
        </div>
      )}
      <TEIRender data={domData}>
        <TEIRoute el="tei-teiheader" component={TeiHeader} />
        <TEIRoute el="tei-salute" component={TeiSalute} />
        <TEIRoute el="tei-ref" component={TeiReference} />
      </TEIRender>
    </div>
  );
};

export default TeiIndex;
