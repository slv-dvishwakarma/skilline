"use client";
import classNames from "classnames";
import React, { useState } from "react";
import DropDown from "../DropDown";
import DualTheme from "./dualTheme";

const MultiPage = () => {
  const [numColumns, setNumColumns] = useState({
    display_name: "1 column",
    value: 1,
  });

  const handleNumColumnsChange = (e: any) => {
    console.log(e);
    setNumColumns(e);
  };

  return (
    <div className="multi-page-container p-8">
      <DropDown
        handleDropDown={handleNumColumnsChange}
        value={numColumns}
        options={[
          { display_name: "1 Column", value: 1 },
          { display_name: "2 Column", value: 2 },
          { display_name: "3 Column", value: 3 },
          { display_name: "4 Column", value: 4 },
        ]}
      />

      <div className="page-content grid grid-cols-1 gap-8">
        <DualTheme />
      </div>
    </div>
  );
};

export default MultiPage;
