import React from 'react';
import { RightBar } from '../reactjs/RightBar';
import rightbar from "./righbar.json";

const Page = () => {
  return (
    <div>
      <RightBar data={rightbar} />
    </div>
  );
};

export default Page;
