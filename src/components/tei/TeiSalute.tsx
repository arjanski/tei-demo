const TEISalute = (props: any) => {
  console.log("props: ", props);
  return (
    <div className="text-indigo-500 font-semibold italic mb-6 font-serif">
      {props.children}
    </div>
  );
};

export default TEISalute;
