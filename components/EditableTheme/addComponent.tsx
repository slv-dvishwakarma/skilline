import { SideBar } from "@/app/(cource)/reactjs/SideBar";
import React from "react";

const AddComponent = () => {
  const components: any = {
    // ["sidebar"]:
  };
  return (
    <div>
      <SideBar
        data={{
          category: "GET STARTED",
          sub_category: [
            {
              title: "Installation",
              url: "/installation",
            },
            {
              title: "Add React to an Existing Project",
              url: "/add-react-to-an-existing-project",
            },
            {
              title: "Editor Setup",
              url: "/editor-setup",
            },
            {
              title: "Using TypeScript",
              url: "/using-typeScript",
            },
            {
              title: "React Developer Tools",
              url: "/react-developer-tools",
            },
          ],
        }}
      />
      <button>Add</button>
    </div>
  );
};

export default AddComponent;
