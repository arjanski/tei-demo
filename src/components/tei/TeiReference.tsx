const TeiReference = (props: any) => {
  const target = props.teiNode.getAttribute("target");

  return (
    <a href={target} className="text-blue-500">
      {props.children}
    </a>
  );
};

export default TeiReference;
