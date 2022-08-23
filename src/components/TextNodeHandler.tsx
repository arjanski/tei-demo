const TextNodeHandler = (props: any) => {
  console.log(props.teiNode);

  const isSalute = props.teiNode.parentElement.nodeName === "TEI-OPENER";

  return (
    <div>
      {props.children}
      {isSalute && <span className="text-indigo-400">TEST</span>}
    </div>
  );
};

export default TextNodeHandler;
