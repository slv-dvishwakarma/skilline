import React, { useState } from "react";

const DropDown = ({ options, handleDropDown, value }: any) => {
  const [dropdow, setDropDown] = useState(false);
  return (
    <div className="column-selection  flex">
      <label htmlFor="numColumns" className="mr-2">
        Select number of columns:
      </label>
      <div className="relative">
        <div
          id="numColumns"
          // value={value.display_name}
          // onChange={(e) => handleDropDown(options[e.target.value])}
          className="p-2 border border-gray-300 rounded  w-[200px] cursor-pointer"
          onClick={() => setDropDown(!dropdow)}
        >
          <div>{value?.display_name}</div>

          {/* Add more options as needed */}
        </div>
        {dropdow && (
          <div className="p-2 border border-gray-300 rounded absolute bg-white  w-[200px] ">
            {options?.map((item: any, index: number) => {
              return (
                <option key={index}
                  value={index}
                  onClick={() => {
                    handleDropDown(item);
                    setDropDown(false);
                  }}
                  className="cursor-pointer"
                >
                  {item?.display_name}
                </option>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
