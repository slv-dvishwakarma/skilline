import React from 'react';
import { RightBar } from '../reactjs/RightBar';
import data from "./data.json";

const Page = () => {
  return (
    <div>
      <RightBar data={data} />
    </div>
  );
};

export default Page;
