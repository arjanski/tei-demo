import React from "react";

const TeiElement = ({ teiDomElement }: any) => {
  const forwardTeiAttributes = () => {
    return Array.from(teiDomElement.attributes).reduce((acc: any, att: any) => {
      acc[att.name] = att.value;
      return acc;
    }, {});
  };

  const teiChildren = Array.from(teiDomElement.childNodes).map(
    (teiEl: any, i: number) => {
      switch (teiEl.nodeType) {
        case 1:
          return (
            <TeiElement key={`${teiEl.tagName}_${i}`} teiDomElement={teiEl} />
          );
        case 3:
          return teiEl.nodeValue;
        default:
          return null;
      }
    }
  );

  return React.createElement(teiDomElement.tagName.toLowerCase(), teiChildren);
};

export default TeiElement;
