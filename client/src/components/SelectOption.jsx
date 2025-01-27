const SelectOption = ({ icon }) => {
  return (
    <div className="duration-250 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-md transition-all ease-in hover:border-gray-800 hover:bg-gray-800 hover:text-white">
      {icon}
    </div>
  );
};

export default SelectOption;
