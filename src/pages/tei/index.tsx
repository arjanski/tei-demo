import { useEffect, useRef } from "react";
import TeiElement from "../../components/TeiElement";
import CETEI from "../../utils/CETEI";

const TeiIndex = () => {
  const teiDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getTEI() {
      const ct = new CETEI();

      // Override default CETEI TEI behaviors.
      ct.addBehavior("tei", "teiHeader", undefined);

      return await ct.getHTML5(`example.xml`);

      // Add here other DOM operations as needed.
      /*       if (teiDiv?.current) {
        teiDiv.current.innerHTML = teiData.outerHTML;
      } */
    }
    const teiData = getTEI();
    const teiContent = teiData ? (
      <TeiElement teiDomElement={teiData} />
    ) : (
      "Loading ..."
    );

    console.log(teiContent);
  }, []);

  return <div className="App"></div>;
};

export default TeiIndex;
